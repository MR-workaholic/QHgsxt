# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class QhgsxtItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass


class QHCompanyDivOneItem(scrapy.Item):
    company_id = scrapy.Field()
    basic_center_div = scrapy.Field()


class QHCompanyDivTwoItem(scrapy.Item):
    company_id = scrapy.Field()
    baseinfo_div = scrapy.Field()
