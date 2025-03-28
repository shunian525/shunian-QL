#入口:https://i.postimg.cc/7YjhgtCH/mmexport1742029346894.jpg
#抓包任意域名下的authorization，注意不要开头的Bearer，支持多账号
#环境变量名:NWDJG


import os
import requests
import jwt
from datetime import datetime

# 环境变量配置
tokens = os.getenv("NWDJG")
if not tokens:
    raise ValueError("环境变量 NWDJG 未设置，请确保已正确配置环境变量。")
token_list = tokens.split("&")

# 请求头模板
headers_template = {
    'xweb_xhr': '1',
    'content-type': 'application/json',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'accept-language': 'zh-CN,zh;q=0.9',
}

# API端点配置
sign_url = 'https://stdcrm.dtmiller.com/scrm-promotion-service/promotion/sign/today'
sign_params = {'promotionId': 'PI67c25977540856000aac6ac0'}
points_url = 'https://stdcrm.dtmiller.com/scrm-promotion-service/mini/wly/user/info'

def is_token_expired(token):
    try:
        payload = jwt.decode(token, options={"verify_signature": False})
        exp = payload.get('exp')
        if exp is None:
            return False
        # 处理可能的毫秒时间戳
        if exp > 9999999999:  # 超过该值视为毫秒
            exp = exp / 1000
        exp_timestamp = float(exp)
        now = datetime.utcnow().timestamp()
        return now > exp_timestamp
    except Exception as e:
        print(f"Token解析失败: {str(e)}")
        return True

def anonymize_mobile(mobile):
    return f"{mobile[:3]}*****{mobile[-3:]}" if mobile else "未知账号"

total_accounts = len(token_list)
success_count = 0
fail_count = 0

for index, token in enumerate(token_list, start=1):
    current_token = token.strip()
    print(f"\n正在处理账号 {index}/{total_accounts}...")
    
    if is_token_expired(current_token):
        print("❗Token已过期，请手动更新环境变量")
        fail_count += 1
        continue
    
    headers = headers_template.copy()
    headers['authorization'] = f"Bearer {current_token}"
    
    try:
        points_response = requests.get(points_url, headers=headers, timeout=10)
        points_data = points_response.json() if points_response.status_code == 200 else {}
        
        if points_data.get('code') == 0:
            mobile = points_data.get('data', {}).get('member', {}).get('mobile', '')
            print(f"账号：{anonymize_mobile(mobile)}")
        else:
            print(f"❌ 查询账户信息失败: {points_data.get('msg', '未知错误')}")
            fail_count += 1
            continue
    except Exception as e:
        print(f"⚠️ 网络请求异常: {str(e)}")
        fail_count += 1
        continue
    
    try:
        sign_response = requests.get(sign_url, params=sign_params, headers=headers, timeout=10)
        sign_data = sign_response.json() if sign_response.status_code == 200 else {}
        
        if sign_data.get('code') == 0:
            print("🎉 签到成功！")
            success_count += 1
        else:
            error_msg = sign_data.get('msg', '未知错误')
            print(f"❌ 签到失败: {error_msg}")
            
            if "已签到" in error_msg:
                print("⚠️ 今日已签到，视为成功")
                success_count += 1
            else:
                if "JWT expired" in error_msg:
                    print("⚠️ 检测到Token过期，请及时更新环境变量")
                fail_count += 1
    except Exception as e:
        print(f"⚠️ 网络请求异常: {str(e)}")
        fail_count += 1

print(f"\n📊 任务完成！")
print(f"总账号数量：{total_accounts}")
print(f"✅ 签到成功：{success_count}")
print(f"❌ 签到失败：{fail_count}")
