#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#cron: 0 9 * * *
"""
SteamTools 论坛自动签到脚本
环境变量名：steamtools
格式：username1&password1#username2&password2#...
"""

import os
import re
import random
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# —— 1. 读取环境变量 —— 
env = os.getenv("steamtools", "")
if not env:
    print("❌ 未设置环境变量 steamtools，格式：user1&pass1#user2&pass2")
    exit(1)
accounts = [x for x in env.split("#") if x]

# —— 2. 公共请求头 —— 
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

# —— 3. 登录函数 —— 
def login(session: requests.Session, username: str, password: str) -> bool:
    login_url = (
        "https://bbs.steamtools.net/member.php?"
        "mod=logging&action=login&loginsubmit=yes&infloat=yes&lssubmit=yes&inajax=1"
    )
    data = {
        "username": username,
        "password": password,
        "fastloginfield": "username",
        "quickforward": "yes",
        "handlekey": "ls",
    }
    resp = session.post(login_url, data=data, headers={**HEADERS, "Referer": login_url})
    if "欢迎您回来" in resp.text or "loginok" in resp.text:
        print(f"[{username}] 登录成功 ✅")
        return True
    else:
        print(f"[{username}] 登录失败 ❌")
        return False

# —— 4. 提取 CDATA 内容 —— 
def extract_cdata(text: str) -> str:
    m = re.search(r"<!\[CDATA\[(.*?)\]\]>", text, re.S)
    return m.group(1) if m else text

# —— 5. 签到函数 —— 
def sign_in(session: requests.Session, username: str):
    # 5.1 拉取签到表单（第一步 AJAX）
    sign_api_url = "https://bbs.steamtools.net/plugin.php?id=dc_signin:sign&inajax=1"
    resp = session.get(sign_api_url, headers={**HEADERS, "Referer": sign_api_url})
    resp.encoding = resp.apparent_encoding

    # 调试：打印获取到的页面内容
    #print(f"[{username}] 获取到的页面内容：\n{resp.text}\n")

    html = extract_cdata(resp.text)
    soup = BeautifulSoup(html, "html.parser")

    # 检查是否已经签到
    if "您今日已经签过到" in resp.text:
        print(f"[{username}] 今天已经签到，跳过签到 ✅")
        return

    form = soup.find("form", id="signform")
    if not form:
        print(f"[{username}] 无法获取签到表单字段 ❌")
        return

    # 5.2 组装隐藏字段
    data = {}
    for inp in form.find_all("input", {"type": "hidden"}):
        name = inp.get("name")
        if name:
            data[name] = inp.get("value", "")

    # 5.3 随机选一个心情表情 & 文案
    emot_map = {
        1: "记上一笔，hold住我的快乐！",
        2: "格式化自己，只为删除那些不愉快！",
        3: "为了维护宇宙和平，打起精神来！~~",
        4: "没有开心，哪来的幸福？要开心哦",
        5: "人生太多无奈，今天的事让我真是傻眼呀！",
        6: "人生太多事，今天就在这里大哭一次，希望在明天！",
        7: "还是继续慵懒下去吧~~",
        8: "每天萌萌哒~~",
        9: "不必转头就可以看的笑脸。或是一只可爱的小不点~~",
        10:"今日不说话啊不说话~"
    }
    emotid = random.choice(list(emot_map.keys()))
    data["emotid"]  = str(emotid)
    data["content"] = emot_map[emotid]

    # 5.4 提交签到（第二步 AJAX）
    action   = form.get("action")  # 一般是 "plugin.php?id=dc_signin:sign"
    post_url = urljoin(sign_api_url, action) + "&inajax=1"
    post_resp = session.post(post_url, data=data, headers={**HEADERS, "Referer": sign_api_url})
    post_resp.encoding = post_resp.apparent_encoding

    # 5.5 解析返回提示
    cdata = extract_cdata(post_resp.text)
    # 更健壮的正则：提取 succeedhandle_signin 调用里的第二个参数
    m = re.search(r"succeedhandle_signin\(\s*'[^']*'\s*,\s*'([^']*)'", cdata)
    if m:
        print(f"[{username}] {m.group(1)} ✅")
    elif "签到成功" in cdata:
        print(f"[{username}] 签到成功 ✅")
    elif "已经签到" in cdata:
        print(f"[{username}] 今天已签到 ☑️")
    else:
        snippet = cdata.strip().replace("\n", "")[:100]
        print(f"[{username}] 未知签到响应：{snippet}")

# —— 6. 主流程 —— 
def main():
    #print("## 开始执行...\n")
    for acct in accounts:
        if "&" not in acct:
            print(f"[格式错误] 跳过：{acct}")
            continue
        user, pwd = [x.strip() for x in acct.split("&", 1)]
        print(f"\n===[账号: {user}]===")
        sess = requests.Session()
        sess.headers.update(HEADERS)
        if login(sess, user, pwd):
            sign_in(sess, user)
    print("\n## 执行结束 ✅")

if __name__ == "__main__":
    main()
