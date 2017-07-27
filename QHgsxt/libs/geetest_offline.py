#!/usr/bin/python
# -*- coding: utf-8 -*-
'''
against geetest offline 5.9.0
for gsxt 上海 河北
'''

import random
import execjs
import util

# Set default logging handler to avoid "No handler found" warnings.
# try:  # Python 2.7+
#     from logging import NullHandler
# except ImportError:
#     class NullHandler(logging.Handler):
#         '''NullHandler'''
#         def emit(self, record):
#             pass

# logging.getLogger(__name__).addHandler(NullHandler())
# logging.basicConfig(level=logging.DEBUG)

HOST = ''
INDEX = ''

# JSRUNTIME = execjs.get(execjs.runtime_names.Node)

CAPTCHA_JSON = []

# USERRESPONSE_JSCONTEXT = JSRUNTIME.compile(util.USERRESPONSE_JS)
USERRESPONSE_JSCONTEXT = execjs.compile(util.USERRESPONSE_JS)

TIMEOUT = 10


def config(host, index):
    '''设置 host and index URL'''
    global HOST, INDEX
    HOST, INDEX = host, index


def calc_userresponse(distance, challenge):
    '''根据滑动距离distance和challenge，计算userresponse值'''
    return USERRESPONSE_JSCONTEXT.call('userresponse', distance, challenge)
    # return execjs.eval


def calc_validate(challenge):
    '''计算validate值'''
    _r = random.randint(0, len(util.OFFLINE_SAMPLE) - 1)
    distance, rand0, rand1 = util.OFFLINE_SAMPLE[_r]
    distance_r = calc_userresponse(distance, challenge)
    rand0_r = calc_userresponse(rand0, challenge)
    rand1_r = calc_userresponse(rand1, challenge)
    validate = distance_r + '_' + rand0_r + '_' + rand1_r
    return validate


if __name__ == "__main__":
    challenge = "92cc227532d17e56e07902b254dfad109f"
    print calc_validate(challenge)
