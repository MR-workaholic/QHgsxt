# -*- coding: utf-8 -*-
import scrapy
from hashlib import md5
import time
from copy import deepcopy
import json
# import PyV8
from urllib import quote
from QHgsxt.items import QHCompanyDivOneItem, QHCompanyDivTwoItem
import datetime
from QHgsxt.libs import geetest_offline


class QhGsxtSpider(scrapy.Spider):
    name = 'qh_gsxt'
    allowed_domains = ['qh.gsxt.gov.cn']
    # start_urls = ['http://qh.gsxt.gov.cn/']
    search_words = [
        '好宜家超市',
        '开心便利超市',
        '动力',
        '创美',
        '富力',
        '国美',
        '新泰',
        '山水',
    ]

    index_url = 'http://qh.gsxt.gov.cn/index.jspx'
    register_validate_url = 'http://qh.gsxt.gov.cn/registerValidate.jspx?t=%s'
    second_validate_url = 'http://qh.gsxt.gov.cn/validateSecond.jspx'
    host_url = 'http://qh.gsxt.gov.cn/'
    company_detail_url = \
        'http://qh.gsxt.gov.cn/company/detail.jspx?id=%s&jyzk=jyzc'
    company_basic_url = \
        'http://qh.gsxt.gov.cn/company/basic.jspx?id=%s'
    business_jcxx_url = \
        'http://qh.gsxt.gov.cn/business/JCXX.jspx?id=%s&date=%s'
    datetime_pat = "{}%20{}%20{}%20{}%20{}:{}:{}%20GMT+0800%20(CST)"

    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Host': 'qh.gsxt.gov.cn',
        'Proxy-Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    }

    custom_settings = {
        'DOWNLOAD_DELAY': 0.1,
        'CONCURRENT_REQUESTS_PER_DOMAIN': 20,
        'CONCURRENT_REQUESTS': 20,
    }

    month = ['None', 'Jan', 'Feb', 'Mar', 'Apr', 'May',
             'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    def parse(self, response):
        print 'begin parse'
        selector = scrapy.Selector(response)
        meta = deepcopy(response.meta)
        headers = self.headers
        headers.update({
            'Referer': response.url,
        })
        for company_item in selector.xpath(
                '//div[@class="gggscpnamebox"]/@data-label').extract():
            # print company_item
            url = self.company_detail_url % str(company_item)
            meta.update({
                'id': company_item,
            })
            yield scrapy.Request(
                url=url,
                method='GET',
                meta=meta,
                headers=headers,
                callback=self.request_basic_info,
                dont_filter=True,
                errback=self.reparse,
            )
        pass

    def request_basic_info(self, response):
        print 'begin request_basic_info'
        meta = deepcopy(response.meta)
        headers = deepcopy(self.headers)
        headers.update({
            'Referer': response.url,
            'X-Requested-With': 'XMLHttpRequest',
        })
        url_basic = self.company_basic_url % meta['id']
        yield scrapy.Request(
            url=url_basic,
            headers=headers,
            meta=meta,
            callback=self.get_basic_info,
            dont_filter=True,
            method='GET',
            errback=self.reparse,
        )
        now = datetime.datetime.now()
        date = self.datetime_pat.format(
            self.weekday[now.weekday()],
            self.month[now.month],
            now.day,
            now.year,
            now.hour,
            now.minute,
            now.second
        )  # Tue Jul 25 2017 20:47:33 GMT 0800 (CST)
        url_jcxx = self.business_jcxx_url % (meta['id'], date)
        yield scrapy.Request(
            url=url_jcxx,
            headers=headers,
            meta=meta,
            dont_filter=True,
            method='GET',
            callback=self.get_jcxx_info,
            errback=self.reparse
        )

    def get_basic_info(self, response):
        print 'begin get_basic_info'
        try:
            selector = scrapy.Selector(response)
            item = QHCompanyDivOneItem()
            item['basic_center_div'] = selector.xpath(
                '//div[@id="basic_center"]//text()').extract()
            item['company_id'] = response.meta['id']
            yield item
            print selector.xpath(
                '//span[@id="entName"]//text()').extract_first().strip()
            pass
        except Exception as e:
            print 'error ', e
        pass

    def get_jcxx_info(self, response):
        print 'begin get_jcxx_info'
        try:
            selector = scrapy.Selector(response)
            item = QHCompanyDivTwoItem()
            item['company_id'] = response.meta['id']
            item['baseinfo_div'] = selector.xpath(
                '//div[@class="baseinfo"]//text()').extract()
            yield item
            print selector.xpath(
                '//div[@id="zhizhao"]/table/tr[2]/td[2]/span/text()'
            ).extract_first().strip()
        except Exception as e:
            print 'error ', e
        pass

    def _get_timestamp(self):
        return str(int(round(time.time() * 1000)))

    def recall(self, failure):
        print 'recall! season is ', repr(failure)
        request = failure.request.copy()
        meta = deepcopy(request.meta)
        t = self._get_timestamp()
        headers = self.headers
        headers.update({
            'Referer': self.index_url,
            'X-Requested-With': 'XMLHttpRequest',
        })

        yield scrapy.Request(
            url=self.register_validate_url % t,
            method='GET',
            dont_filter=True,
            headers=headers,
            meta=meta,
            callback=self.fun2,
            errback=self.recall,
        )

    def reparse(self, failure):
        print 'reparse! season is ', repr(failure)
        request = failure.request.copy()
        # print request.headers['Referer']
        yield request

    def start_requests(self):
        print 'begin start_requests'
        for search_word in self.search_words:
            meta = {
                'cookiejar': md5(search_word).hexdigest(),
                'searchword': search_word,
            }
            headers = self.headers
            headers.update({
                # 'Referer': self.index_url, #不从index_url开始访问，则不能放置头部的referer
                'X-Requested-With': 'XMLHttpRequest',
            })
            t = self._get_timestamp()

            yield scrapy.Request(
                url=self.register_validate_url % t,
                method='GET',
                dont_filter=True,
                headers=headers,
                meta=meta,
                callback=self.fun2,
                errback=self.recall,
            )

            # yield scrapy.Request(
            #     url=self.index_url,
            #     callback=self.fun1,
            #     method='GET',
            #     dont_filter=True,
            #     headers=headers,
            #     meta=meta,
            # )

    def fun1(self, response):
        print 'begin fun1'
        meta = deepcopy(response.meta)
        t = self._get_timestamp()
        headers = self.headers
        headers.update({
            # 'Referer': self.index_url,
            'X-Requested-With': 'XMLHttpRequest',
        })

        yield scrapy.Request(
            url=self.register_validate_url % t,
            method='GET',
            dont_filter=True,
            headers=headers,
            meta=meta,
            callback=self.fun2,
            errback=self.recall,
        )
        pass

    def fun2(self, response):
        print 'begin fun2'
        meta = deepcopy(response.meta)

        json_response = json.loads(response.body)
        success = json_response['success']
        # gt = json_response['gt']
        challenge = json_response['challenge']

        if success == 0:
            validate = geetest_offline.calc_validate(challenge)
            seccode = validate + '|jordan'

            formdata = {
                'searchText': meta['searchword'],
                'geetest_challenge': challenge,
                'geetest_validate': validate,
                'geetest_seccode': seccode,
            }

            headers = self.headers
            headers.update({
                'Referer': self.index_url,
                'X-Requested-With': 'XMLHttpRequest',
            })

            yield scrapy.FormRequest(
                url=self.second_validate_url,
                callback=self.fun3,
                method='POST',
                headers=headers,
                formdata=formdata,
                meta=meta,
                dont_filter=True,
                errback=self.recall,
            )
        else:
            print 'failed! try again'
            yield self.fun1(response).next()

        pass

    def fun3(self, response):
        print 'begin fun3'
        meta = deepcopy(response.meta)

        json_response = json.loads(response.body)
        success = json_response['success']
        if success:
            # msg = json_response['msg']
            obj = json_response['obj']

            url = self.host_url + obj + '&searchType=1&entName=' + \
                quote(quote(meta['searchword']))

            headers = self.headers
            headers.update({
                'Referer': self.index_url,
                'X-Requested-With': 'XMLHttpRequest',
            })

            yield scrapy.Request(
                url=url,
                method='GET',
                headers=headers,
                dont_filter=True,
                meta=meta,
                callback=self.parse,
                errback=self.recall
            )
        else:
            print 'failed! try again'
            yield self.fun1(response).next()
