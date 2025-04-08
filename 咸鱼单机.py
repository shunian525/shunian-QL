# 2025.2.8
# syyyh
# cron: 0 8 * * *
# 咸鱼单机签到
# https://www.xianyudanji.net/
# 环境变量名:xydj ,账号1&密码1#账号2&密码2#账号3&密码3......
import requests
import json
import os

env_preffix = os.getenv("xydj")
def login():
    url = "https://www.xianyudanji.ai/wp-admin/admin-ajax.php"
    head = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0"
    }
    data = {
            'action' : 'user_login',
            'username' : username,
            'password' : password
        }
    response = requests.post(url,headers=head,data=data)
    print(json.loads(response.content.decode('utf-8')))
    wordpress_logged_in_cookie = None
    for cookie in response.cookies:
        if cookie.name.startswith("wordpress_logged_in_"):
            wordpress_logged_in_cookie = f"{cookie.name}={cookie.value}"
            break
    return wordpress_logged_in_cookie
    print(wordpress_logged_in_cookie)
def qiandao():
    wordpress_logged_in_cookie = login()
    url = "https://www.xianyudanji.ai/wp-admin/admin-ajax.php"
    head = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0",
        "Cookie": wordpress_logged_in_cookie
    }
    data = {
            'action' : 'user_qiandao',
    }
    response = requests.post(url,headers=head,data=data)
    print(json.loads(response.content.decode('utf-8')))
if __name__ == '__main__':
    accounts = env_preffix.split("#")
    for account in accounts:
        parts = account.split("&")
        if len(parts) == 2:
            username = parts[0]
            password = parts[1]
            print(f"账号: {username}")
            qiandao()
        else:
            print(f"无效的账号密码组合: {account}")
