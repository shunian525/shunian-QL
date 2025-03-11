# 牛毛圈 入口https://n.hongbaoquanzi.com/?userid=26168
# 抓token
# 多账号 & 分割
# 变量名'nmq_001'
# 交流群767421468

import requests
import time
import os
import json
import warnings
from requests.packages.urllib3.exceptions import InsecureRequestWarning

# 禁用SSL警告
warnings.filterwarnings("ignore", category=InsecureRequestWarning)
requests.packages.urllib3.disable_warnings()

TOKEN = ""

class NMQ:
    def __init__(self, token):
        # 创建Session对象并禁用SSL验证
        self.session = requests.Session()
        self.session.verify = False  # 全局关闭SSL验证
        
        self.token = token
        self.id = None
        self.headers = {
            "Content-Type": "application/json",
            "token": self.token,
            "user-agent": "Mozilla/5.0 (Linux; Android 13; M2012K11AC Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/104.0.5112.97 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/29.09091)",
            "Host": "n.hongbaoquanzi.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip"
        }

    def sign(self):
        url = "https://n.hongbaoquanzi.com/addons/skaitooln/user/sign"
        try:
            response = self.session.get(url, headers=self.headers, timeout=15).json()
            if response['code'] == 1:
                print("🎉[签到]{} {}能量".format(response['msg'], response['data']['addpower']))
            else:
                print("🎉[签到]{}".format(response['msg']))
        except Exception as e:
            print(f"⚠️ 签到请求异常：{str(e)}")

    def vedio(self):
        for i in range(10):
            url = "https://n.hongbaoquanzi.com/addons/skaitooln/task/video"
            try:
                response = self.session.get(url, headers=self.headers, timeout=15).json()
                if response['code'] == 1:
                    print("🌈[观看视频]第{}次 {} {}能量".format(i+1, response['msg'], response['data']['addpower']))
                elif "观看次数已达上限" in response['msg']:
                    print("🌈[观看视频]第{}次 {}".format(i + 1, response['msg']))
                    break
                else: 
                    print("🌈[观看视频]第{}次 {}".format(i+1, response['msg']))
                time.sleep(32)
            except Exception as e:
                print(f"⚠️ 视频任务异常：{str(e)}")
                break

    def upload(self):
        url = "https://n.hongbaoquanzi.com/addons/skaitooln/user/upgrade"
        try:
            response = self.session.get(url, headers=self.headers, timeout=15)
            if response.status_code == 200:
                print("👑[吊毛升级]{}".format(response.json()['msg']))
            else:
                print("👑[吊毛升级]请求失败，状态码：{}".format(response.status_code))
        except Exception as e:
            print(f"⚠️ 升级请求异常：{str(e)}")

    def get_power(self):
        url = "https://n.hongbaoquanzi.com/addons/skaitooln/user/info"
        try:
            response = self.session.get(url, headers=self.headers, timeout=15).json()
            if response['code'] == 1:
                self.id = response['data']['user_id']
                print('💧[用户信息][{}]能量{} 等级{} 牛毛{} 升级需要{}'.format(
                    response['data']['nickname'], 
                    response['data']['power'], 
                    response['data']['level'], 
                    response['data']['stone'],  
                    response['data']['update_grade_stone']
                ))
                if float(response['data']['stone']) > float(response['data']['update_grade_stone']):
                    self.upload()
                else: 
                    print("👑[吊毛升级]牛毛不足 再撸撸如何呢")
                return response['data']['power']
            else:
                print('💧[用户信息]{} ❗TOKEN可能过期 请检查'.format(response['msg']))
                return None
        except Exception as e:
            print(f"⚠️ 获取用户信息异常：{str(e)}")
            return None

    def lottery(self):
        print('默认抽奖为1元')
        for i in range(3):
            url = "https://n.hongbaoquanzi.com/addons/skaitooln/lottery/take"
            data = json.dumps({"id":10})
            try:
                response = self.session.post(url, headers=self.headers, data=data, timeout=15).json()
                if response['code'] == 1:
                    print("🎁[每日抽奖]第{}次{}".format(i + 1, response['msg']))
                elif "观看次数已达上限" in response['msg']:
                    print("🎁[每日抽奖]第{}次{}".format(i + 1, response['msg']))
            except Exception as e:
                print(f"⚠️ 抽奖请求异常：{str(e)}")
                break

    def makestone(self):
        power = self.get_power()
        if power is None:
            return
            
        url = "https://n.hongbaoquanzi.com/addons/skaitooln/user/makestone"
        data = json.dumps({'make_power':power})
        try:
            response = self.session.post(url, headers=self.headers, data=data, timeout=15).json()
            if response['code'] == 1:
                print('️⏰[薅牛毛]预计{}min'.format(response['data']['make_stone_time']/60) + os.linesep)
            else:
                print('️⏰[薅牛毛]失败：{}'.format(response['msg']) + os.linesep)
        except Exception as e:
            print(f"⚠️ 薅牛毛异常：{str(e)}")

    def main(self):
        self.sign()
        time.sleep(2)
        self.vedio()
        time.sleep(2)
        self.makestone()
        self.lottery()

if __name__ == '__main__':
    env_name = "牛毛圈"
    env = os.getenv('nmq')
    if not env: 
        print("❗未检测到环境变量 启用内置TOKEN")
    TOKEN = os.environ.get('nmq_001') if env else TOKEN
    TOKEN_LIST = TOKEN.strip().split("&") if TOKEN else []
    
    if not TOKEN_LIST:
        print("❌ 未找到有效的TOKEN配置")
        exit()
        
    print("🔔共获取到[{}]个账号 开始运行{}".format(len(TOKEN_LIST), env_name))
    for i, token in enumerate(TOKEN_LIST):
        print("\n" + "="*30)
        print("🃏 执行第[{}]个账号".format(i + 1))
        nmq = NMQ(token.strip())
        nmq.main()
        time.sleep(3)
