
//********用户配置区域开始*****************************************
// 版本号：1.4
// 1.2版本：集成wxpusher推送，修复某些情况读写历史记录出错
// 1.3版本：集成微信公众号息知推送，继续修复读写历史记录出错
// 1.4版本：修复读写历史记录出错

//定义推送的线报酷域名，支持的域名有 http://new.ixbk.net，http://new.xianbao.fun, http://new.ixbk.fun 
const domin = 'http://new.ixbk.net';

//下方newUrl是请求线报酷最新10条文章
const newUrl = domin + '/plus/json/push.json';

// 获取线报酷最新内容：请求限制：最快5秒请求一次，频繁获取封IP
// 最新10条文章：const newUrl = domin + '/plus/json/push.json';

// 获取线报酷排行榜内容：请求限制：最快300秒请求一次，频繁获取封IP
// 一小时：const newUrl = domin + '/plus/json/rank/yixiaoshi.json';
// 三小时：const newUrl = domin + '/plus/json/rank/sanxiaoshi.json';
// 六小时：const newUrl = domin + '/plus/json/rank/liuxiaoshi.json';


//分类屏蔽
//网站所有的分类有：赚客吧|赚客吧热帖|新赚吧|新赚吧热帖|微博线报|线报活动|食品饮料|个护美妆|服饰鞋帽|居家生活|母婴儿童|数码电子|运动户外|宠物天地|医疗保健|更多好物|豆瓣线报|豆瓣买组|豆瓣拼组|豆瓣发组|豆瓣狗组|爱猫生活|爱猫澡盆|小嘀咕|酷安|葫芦侠三楼|小刀娱乐网|3K8资讯网|技术QQ网|YYOK大全|活动资讯网|免费赚钱中心
//微博所有的分类有：线报活动|食品饮料|个护美妆|服饰鞋帽|居家生活|母婴儿童|数码电子|运动户外|宠物天地|医疗保健|更多好物
//豆瓣所有的分类有：买组|拼组|发组|狗组|爱猫生活|爱猫澡盆
const pingbifenlei = '';

//以下筛选设置同线报酷用户中心一模一样
//线报酷用户中心学习文档：http://new.xianbao.fun/wendang.html

//全局列表筛选详细教程：http://new.ixbk.net/jiaocheng/587024.html
//不同分类列表筛选设置：http://new.ixbk.net/jiaocheng/1015278.html

//全局标题屏蔽
const pingbibiaoti = '';
//全部标题强制展现
const zhanxianbiaoti = 'e卡|话费|红包|立减金|现金|支付金|优酷|steam|招行|新闻|支付宝|支付券|云闪付|翼支付|京豆|实物|快递|免费|会员|q币|白条|下载|可领|零钱|滴滴|腾讯|流量|掌上生活|必中|(新|老)用户|快去|秒到|饿了么|美团|招商银行|百度|爱奇艺|京东|淘宝|天猫|苏宁|app|速度|下载|登(陆|录)|秒杀|(有|水|大|小)(了|水|包|毛|红包)|关注|活动|(招|建|中|农|工|银)行|自测|亲测|还有|放水|福利|神价|冲好价|撸神券|bug|抽奖|(\\d+)元|刚中|黑推|凡客|小包|tb|jd|实测|无门槛|和包|缴费|支付|抓紧|电费|首发|招商|还可以|白得|顺丰|补货|赶紧|好用|加果|优惠券';
//全部标题强制屏蔽(强化)
const pingbibiaotiplus = '如何|哪(儿|里|位|个|来)|吗|求|怎么|才能|么|呢|帮我|(是|行|会)不(是|行|会)|有没|找不到|什么|对吗|在哪|咋|啥|玩不起|谁|没收到|(请|有|问)问|问(题|个事|下)|了了|多少|疑问';

//全局内容屏蔽
const pingbineirong = '';
//全部内容强制展现
const zhanxianneirong = 'e卡|话费|红包|立减金|现金|支付金|优酷|steam|招行|新闻|支付宝|支付券|云闪付|翼支付|京豆|实物|快递|免费|会员|q币|白条|下载|可领|零钱|滴滴|腾讯|流量|掌上生活|必中|(新|老)用户|快去|秒到|饿了么|美团|招商银行|百度|爱奇艺|京东|淘宝|天猫|苏宁|app|速度|下载|登(陆|录)|秒杀|(有|水|大|小)(了|水|包|毛|红包)|关注|活动|(招|建|中|农|工|银)行|自测|亲测|还有|放水|福利|神价|冲好价|撸神券|bug|抽奖|(\\d+)元|刚中|黑推|凡客|小包|tb|jd|实测|无门槛|和包|缴费|支付|抓紧|电费|首发|招商|还可以|白得|顺丰|补货|赶紧|好用|加果|优惠券';
//全部内容强制屏蔽(强化)
const pingbineirongplus = '如何|哪(儿|里|位|个|来)|吗|求|怎么|才能|么|呢|帮我|(是|行|会)不(是|行|会)|有没|找不到|什么|对吗|在哪|咋|啥|玩不起|谁|没收到|(请|有|问)问|问(题|个事|下)|了了|多少|疑问';

//全部楼主屏蔽
const pingbilouzhu = '';
//全部楼主强制展现
const zhanxianlouzhu = '';
//全部楼主强制屏蔽(强化)
const pingbilouzhuplus = '';

//赚客吧/新赚吧楼主注册日期屏蔽
const pingbitime = "5";


//****以下代码不懂代码请勿修改*****用户还需要拉到底部修改最后的推送设置**************
//****以下代码不懂代码请勿修改*****用户还需要拉到底部修改最后的推送设置**************
//****以下代码不懂代码请勿修改*****用户还需要拉到底部修改最后的推送设置**************
//****以下代码不懂代码请勿修改*****用户还需要拉到底部修改最后的推送设置**************
//****以下代码不懂代码请勿修改*****用户还需要拉到底部修改最后的推送设置**************
function daysComputed(time) { var oldTimeFormat = new Date(time.replace(/-/g, '/')); var nowDate = new Date(); if (nowDate.getTime() - oldTimeFormat.getTime() > 0) { var times = nowDate.getTime() - oldTimeFormat.getTime(); var days = parseInt(times / (60 * 60 * 24 * 1000)); return days } else { return 0 } }
function listfilter(group, pingbifenlei, pingbilouzhu, zhanxianlouzhu, pingbilouzhuplus, pingbibiaoti, zhanxianbiaoti, pingbibiaotiplus, pingbineirong, zhanxianneirong, pingbineirongplus, pingbitime) { var louzhubaoliu, biaotibaoliu, neirongbaoliu, louzhupingbi, louzhupingbiplus, biaotipingbi, biaotipingbiplus, neirongpingbi, neirongpingbiplus; if (pingbitime && group.louzhuregtime) { if (pingbitime.match(new RegExp(/###/), "g")) { pingbitimearr = pingbitime.split(/<br>|\n\n|\r\n/); for (j = 0; j < pingbitimearr.length; j++) { xiaopingbitimearr = pingbitimearr[j].split("###"); if (group.catename.match(new RegExp(xiaopingbitimearr[0], "i")) && xiaopingbitimearr[1] > daysComputed(group.louzhuregtime)) { return false } } } else { if (pingbitime > daysComputed(group.louzhuregtime)) { return false } } } if (pingbifenlei && group.catename) { if (group.catename.match(new RegExp(pingbifenlei, "i"))) { return false } } if (zhanxianlouzhu && group.louzhu) { if (zhanxianlouzhu.match(new RegExp(/###/), "g")) { zhanxianlouzhuarr = zhanxianlouzhu.split(/<br>|\n\n|\r\n/); for (j = 0; j < zhanxianlouzhuarr.length; j++) { xiaozhanxianlouzhuarr = zhanxianlouzhuarr[j].split("###"); if (group.catename.match(new RegExp(xiaozhanxianlouzhuarr[0], "i")) && group.louzhu.match(new RegExp(xiaozhanxianlouzhuarr[1], "i"))) { louzhubaoliu = 1 } } } else { if (group.louzhu.match(new RegExp(zhanxianlouzhu, "i"))) { louzhubaoliu = 1 } } } if (pingbilouzhu && group.louzhu && louzhubaoliu != 1) { if (pingbilouzhu.match(new RegExp(/###/), "g")) { pingbilouzhuarr = pingbilouzhu.split(/<br>|\n\n|\r\n/); for (j = 0; j < pingbilouzhuarr.length; j++) { xiaopingbilouzhuarr = pingbilouzhuarr[j].split("###"); if (group.catename.match(new RegExp(xiaopingbilouzhuarr[0], "i")) && group.louzhu.match(new RegExp(xiaopingbilouzhuarr[1], "i"))) { louzhupingbi = 1 } } } else { if (group.louzhu.match(new RegExp(pingbilouzhu, "i"))) { louzhupingbi = 1 } } } if (pingbilouzhuplus && group.louzhu && louzhupingbi != 1) { if (pingbilouzhuplus.match(new RegExp(/###/), "g")) { pingbilouzhuplusarr = pingbilouzhuplus.split(/<br>|\n\n|\r\n/); for (j = 0; j < pingbilouzhuplusarr.length; j++) { xiaopingbilouzhuplusarr = pingbilouzhuplusarr[j].split("###"); if (group.catename.match(new RegExp(xiaopingbilouzhuplusarr[0], "i")) && group.louzhu.match(new RegExp(xiaopingbilouzhuplusarr[1], "i"))) { louzhupingbiplus = 1; louzhubaoliu = 0 } } } else { if (group.louzhu.match(new RegExp(pingbilouzhuplus, "i"))) { louzhupingbiplus = 1; louzhubaoliu = 0 } } } if (louzhupingbi == 1 || louzhupingbiplus == 1) { return false } if (zhanxianbiaoti && group.title) { if (zhanxianbiaoti.match(new RegExp(/###/), "g")) { zhanxianbiaotiarr = zhanxianbiaoti.split(/<br>|\n\n|\r\n/); for (j = 0; j < zhanxianbiaotiarr.length; j++) { xiaozhanxianbiaotiarr = zhanxianbiaotiarr[j].split("###"); if (group.catename.match(new RegExp(xiaozhanxianbiaotiarr[0], "i")) && group.title.match(new RegExp(xiaozhanxianbiaotiarr[1], "i"))) { biaotibaoliu = 1 } } } else { if (group.title.match(new RegExp(zhanxianbiaoti, "i"))) { biaotibaoliu = 1 } } } if (pingbibiaoti && group.title && louzhubaoliu != 1 && biaotibaoliu != 1) { if (pingbibiaoti.match(new RegExp(/###/), "g")) { pingbibiaotiarr = pingbibiaoti.split(/<br>|\n\n|\r\n/); for (j = 0; j < pingbibiaotiarr.length; j++) { xiaopingbibiaotiarr = pingbibiaotiarr[j].split("###"); if (group.catename.match(new RegExp(xiaopingbibiaotiarr[0], "i")) && group.title.match(new RegExp(xiaopingbibiaotiarr[1], "i"))) { biaotipingbi = 1 } } } else { if (group.title.match(new RegExp(pingbibiaoti, "i"))) { biaotipingbi = 1 } } } if (pingbibiaotiplus && group.title && louzhubaoliu != 1 && biaotipingbi != 1) { if (pingbibiaotiplus.match(new RegExp(/###/), "g")) { pingbibiaotiplusarr = pingbibiaotiplus.split(/<br>|\n\n|\r\n/); for (j = 0; j < pingbibiaotiplusarr.length; j++) { xiaopingbibiaotiplusarr = pingbibiaotiplusarr[j].split("###"); if (group.catename.match(new RegExp(xiaopingbibiaotiplusarr[0], "i")) && group.title.match(new RegExp(xiaopingbibiaotiplusarr[1], "i"))) { biaotipingbiplus = 1; biaotibaoliu = 0 } } } else { if (group.title.match(new RegExp(pingbibiaotiplus, "i"))) { biaotipingbiplus = 1; biaotibaoliu = 0 } } } if (biaotipingbi == 1 || biaotipingbiplus == 1) { return false } if (zhanxianneirong && group.content) { if (zhanxianneirong.match(new RegExp(/###/), "g")) { zhanxianneirongarr = zhanxianneirong.split(/<br>|\n\n|\r\n/); for (j = 0; j < zhanxianneirongarr.length; j++) { xiaozhanxianneirongarr = zhanxianneirongarr[j].split("###"); if (group.catename.match(new RegExp(xiaozhanxianneirongarr[0], "i")) && group.content.match(new RegExp(xiaozhanxianneirongarr[1], "i"))) { neirongbaoliu = 1 } } } else { if (group.content.match(new RegExp(zhanxianneirong, "i"))) { neirongbaoliu = 1 } } } if (pingbineirong && group.content && louzhubaoliu != 1 && biaotibaoliu != 1 && neirongbaoliu != 1) { if (pingbineirong.match(new RegExp(/###/), "g")) { pingbineirongarr = pingbineirong.split(/<br>|\n\n|\r\n/); for (j = 0; j < pingbineirongarr.length; j++) { xiaopingbineirongarr = pingbineirongarr[j].split("###"); if (group.catename.match(new RegExp(xiaopingbineirongarr[0], "i")) && group.content.match(new RegExp(xiaopingbineirongarr[1], "i"))) { neirongpingbi = 1 } } } else { if (group.content.match(new RegExp(pingbineirong, "i"))) { neirongpingbi = 1 } } } if (pingbineirongplus && group.content && louzhubaoliu != 1 && biaotibaoliu != 1 && neirongpingbi != 1) { if (pingbineirongplus.match(new RegExp(/###/), "g")) { pingbineirongplusarr = pingbineirongplus.split(/<br>|\n\n|\r\n/); for (j = 0; j < pingbineirongplusarr.length; j++) { xiaopingbineirongplusarr = pingbineirongplusarr[j].split("###"); if (group.catename.match(new RegExp(xiaopingbineirongplusarr[0], "i")) && group.content.match(new RegExp(xiaopingbineirongplusarr[1], "i"))) { neirongpingbiplus = 1; neirongbaoliu = 0 } } } else { if (group.content.match(new RegExp(pingbineirongplus, "i"))) { neirongpingbiplus = 1; neirongbaoliu = 0 } } } if (neirongpingbi == 1 || neirongpingbiplus == 1) { return false } return true }
function ensureFileExists(filePath) { if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '[]') } }
function fixJsonFile(filePath) { ensureFileExists(filePath); try { JSON.parse(fs.readFileSync(filePath, 'utf8')) } catch (error) { console.error(`JSON解析错误，重置文件${filePath}：`, error); fs.writeFileSync(filePath, '[]') } }
function readMessages(filePath) { fixJsonFile(filePath); const data = fs.readFileSync(filePath, 'utf8'); return JSON.parse(data || '[]') }
function isMessageInFile(message, filePath) { const messages = readMessages(filePath); return messages.some(existingMessage => existingMessage.id === message.id) }
function stringifySafe(obj) { try { return JSON.stringify(obj) } catch (error) { console.error('无法序列化对象：', error); return '[]' } }
function appendMessageToFile(message, filePath) { ensureFileExists(filePath); const messages = readMessages(filePath); messages.push({ id: message.id }); if (messages.length > 100) { messages.splice(0, messages.length - 100) } fs.writeFileSync(filePath, stringifySafe(messages), 'utf8') }
function getFileName(url){const parts=url.split('/');return parts[parts.length-1]}

const notify = require('./xianbao_send');
const fs = require('fs');
const request = require('request');



console.debug('开始获取线报酷数据...');


new Promise((resolve) => {
    request(newUrl, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            resolve(JSON.parse(body));
            // console.log(JSON.parse(body));
        } else {
            resolve([]);
        }
    });
})
    .then((xbkdata) => {
        let items = [];
        xbkdata.forEach(item => {
            //这里判断之前有没有获取过本文章
            if (!isMessageInFile(item, getFileName(newUrl))) {
                appendMessageToFile(item, getFileName(newUrl));
                //进行全部屏蔽判断
                if (listfilter(item, pingbifenlei, pingbilouzhu, zhanxianlouzhu, pingbilouzhuplus, pingbibiaoti, zhanxianbiaoti, pingbibiaotiplus, pingbineirong, zhanxianneirong, pingbineirongplus, pingbitime)) {
                    items.push(item);
                } else {
                    //console.log("-----------------------------");
                    //console.log("数据因你的设置被全局屏蔽："+item.title+"【"+item.catename+"】"+domin+item.url);
                }
            }

        })

        //进行只看它判断过滤 开始--------------
        // 只看它推送设置
        let zkt_gjc = '';
        // 只看它推送设置
        let filteredItems = [];
        items.forEach(item => {
            if (listfilter(item, "", "", "", "", "(.*)", zkt_gjc ? zkt_gjc : "(.*)", "", "", "", "", "")) {
                //提示会写代码的，这里可以插入推送代码，可以实现不同只看它推送不同通道
                filteredItems.push(item);
            } else {
                // console.log("-----------------------------");
                // console.log("数据不符合只看它被屏蔽："+item.title+"【"+item.catename+"】"+domin+item.url);
            }
        });
        items = filteredItems;




        //这里是最后的推送设置，用户可以修改部分推送格式******************
        //这里是最后的推送设置，用户可以修改部分推送格式******************
        let hebingdata = "";
        items.forEach(item => {
            //这里是分离发布(一个信息发一次)推送

            //推送的内容格式需要自己修改
            //推送的内容格式需要自己修改
            //推送的内容格式需要自己修改

            // item 包含了信息很多参数，字段说明：item.title标题，item.content文字内容，item.datetime日期，item.shorttime时间，item.shijianchuo时间戳，item.cateid分类id，item.catename分类名，item.louzhu楼主名字，item.louzhuregtime楼主注册日期，item.url线报酷文章相对路径

            //         {
            //          id: 3617548,
            //          title: 'CAVID KARRIE纯棉抑菌裆 19.9',
            //          content: 'CAVID KARRIE纯棉抑菌裆4件，19.9 -服饰鞋帽-拼多多线报',
            //          datetime: '2024-09-15',
            //          shorttime: '20:38',
            //          shijianchuo: 1726403880,
            //          cateid: '10',
            //          catename: '微博线报-服饰鞋帽-拼多多线报',
            //          comments: 1,
            //          louzhu: '拼夕夕捡漏bot',
            //          louzhuregtime: null,
            //          url: '/weibo/3617548.html'
            // }

            //通过判断item的参数，可以自己写代码写别的筛选等别的东西

            const text = item.title + "【" + item.catename + "】"; //得到： CAVID KARRIE纯棉抑菌裆 19.9【微博线报-服饰鞋帽-拼多多线报】
            const desp = `[${domin}${item.url}](${domin}${item.url})`; //线报酷文章访问链接  得到：http://new.ixbk.net/weibo/3617548.html

            //例如访问链接加<a>标签可点击： const desp = `<a href="${domin}${item.url}">${domin}${item.url}</a>`;
            //例如息知/pushme需要加markdown链接可点击： const desp = `[${domin}${item.url}](${domin}${item.url})`;

            notify.sendNotify(text, desp);
            //----------------------------------------
            // notify.sendNotify(text, desp) 是 xianbao_send.js 填写了参数的全部推送
            //以上意思就是 全部推送(部分推送可能要调换text, desp的顺序)

            //也可以设置单独推送某一个推送通道
            //----------------------------------------
            //notify.serverNotify(text, desp); 微信server酱
            //notify.pushPlusNotify(text, desp); pushplus
            //notify.wePlusBotNotify(text, desp); 微加机器人
            //notify.wxPusherNotify(text, desp); wxpusher推送
            //notify.wxXiZhiNotify(text, desp); 息知推送
            //notify.barkNotify(text, desp, params); iOS Bark APP
            //notify.barkNotify(text, desp, {url: domin + item.url}); 在这里"{url: domin + item.url}"将新的 文章URL 作为 params 对象的一部分传入。
            //notify.ddBotNotify(text, desp); 钉钉机器人
            //notify.qywxBotNotify(text, desp); 企业微信机器人
            //notify.qywxamNotify(text, desp); 企业微信应用消息推送
            //notify.iGotNotify(text, desp, params); iGot
            //notify.gobotNotify(text, desp); go-cqhttp
            //notify.gotifyNotify(text, desp); gotify
            //notify.chatNotify(text, desp); synolog chat
            //notify.pushDeerNotify(text, desp); PushDeer
            //notify.aibotkNotify(text, desp); 智能微秘书
            //notify.fsBotNotify(text, desp); 飞书机器人
            //notify.smtpNotify(text, desp); SMTP 邮件
            //notify.pushMeNotify(text, desp, params); PushMe
            //notify.chronocatNotify(text, desp); Chronocat
            //notify.webhookNotify(text, desp); 自定义通知
            //notify.qmsgNotify(text, desp); 自定义通知
            console.log("-----------------------------");
            console.log("发现到新数据：" + item.title + "【" + item.catename + "】" + domin + item.url);


            //定义合并推送内容格式
            if (hebingdata) {
                //合并换行符
                hebingdata += "\n\n";
            }

            //合并推送格式： CAVID KARRIE纯棉抑菌裆 19.9【微博线报-服饰鞋帽-拼多多线报】http://new.ixbk.net/weibo/3617548.html
            hebingdata += item.title + "【" + item.catename + "】" + domin + item.url;

        })
        //-----------------------------------------------
        //-----------------------------------------------
        //-----------------------------------------------
        //-----------------------------------------------

        //这里是合并发布内容(多条信息合并起来发送)，自己把下面//注释解除，然后把上面单条信息的notify.sendNotify 加上//注释

        //if(hebingdata){
        //notify.sendNotify(hebingdata, "线报酷来新活动了");
        //}

        console.log("\n\n\n\n*******************************************");
        console.log("*******************************************");
        console.debug(`获取到${xbkdata.length}条数据，筛选后的新数据${items.length}条，本次任务结束`);

    })
    .catch(error => {
        console.error('获取和解析线报酷时发生错误:', error);
    });
