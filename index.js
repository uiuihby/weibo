var request = require('superagent')
var fs = require('fs');

var http = require('http');
var https = require('https');
const cheerio = require('cheerio');
let cookie="SINAGLOBAL=3133917307893.437.1584368319827; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFuxeZTWRm0rpHAzbvI359.5JpX5KMhUgL.Foqpeh.cehn7ShB2dJLoI7pHCHHiC2i91hncSo2t; ALF=1616157279; SSOLoginState=1584621283; SCF=AnfJOvYotmTdP0O3DQU7V1f05nx-lNSo06D3o2EYwxL0G9VcBFcMiZnlzeWX_Jd6JfVySxxbYybLOjxBldXWNgE.; SUB=_2A25zdxazDeRhGeBP61sX8CbMzziIHXVQBQ97rDV8PUNbmtAKLUrNkW9NRZNPoULm7OeNOaUgBked78ygEAmDUHBy; SUHB=0FQ7je8QJi2K-e; _s_tentry=login.sina.com.cn; Apache=4008640267094.8384.1584621277729; ULV=1584621277741:5:5:5:4008640267094.8384.1584621277729:1584535175313; UOR=www.baidu.com,weibo.com,www.baidu.com; Ugrow-G0=589da022062e21d675f389ce54f2eae7; TC-V5-G0=799b73639653e51a6d82fb007f218b2f; wb_view_log_6109608044=1920*10801; TC-Page-G0=b32a5183aa64e96302acd8febeb88ce4|1584621982|1584621924; webim_unReadCount=%7B%22time%22%3A1584622013600%2C%22dm_pub_total%22%3A1%2C%22chat_group_client%22%3A0%2C%22allcountNum%22%3A12%2C%22msgbox%22%3A0%7D"
const xlsx = require('node-xlsx');
var express = require("express");
const path = require('path')
var app = express();
// 各种依赖
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));





 app.post('/getData', function (req, res) {  //  新增
    var result = req.body
   console.log(result)
    let top=['内容','图片地址',]
    var msgs=[result.msg,result.pic]
    let data0=[top,msgs]

    const data = [{
      name: 'Sheet1',
      data: data0
    }]
    for(let i=0;i<result.arr.length;i++){
      top.push("评论"+i)
      msgs.push(result.arr[i].com)
    }


const resxlsx = xlsx.build(data)

fs.writeFile('demo.xlsx', resxlsx, err => {
    if (err) throw err;
    res.send("success");
    console.log('文件已保存')
})



})
// 终端打印如下信息   每次更新都要重新启动 快捷键cart+c   运行node xxx.js
console.log('Server running at http://127.0.0.1:8888/');
app.use(express.static("dist")).listen(8888);
return 


let htmlTop



  request
  .get("https://m.weibo.cn/statuses/show?id=EywUqmYFi")
  .set('Cookie', cookie)
  .then(res => {
     let pic  = "<div id='titlePic'>" +res.body.data.thumbnail_pic+ "</div>"
     let text = "<div id='titleMsg'>" +res.body.data.text+ "</div>"
     arr+=pic
     arr+=text
  })
  .catch(err => {
     console.log(err);
  });

   let arr=""
  function getFirstCom(url){
    request
    .get(url)
    .set('Cookie', cookie)
    .then(res => {
       arr+=res.body.data.html
    })
    .catch(err => {
       console.log(err);
    });
   
  }

  function getSecCom(url,url2){
    request
    .get(url)
    .set('Cookie', cookie)
    .then(res => {

        let totalpage=res.body.data.page.totalpage;
        allPage=totalpage
        for(let i=1; i<=totalpage;i++){
            getOtherCom(url2+i);
        }
    })
    .catch(err => {
       console.log(err);
    });
  }
  function getOtherCom(url){
   


        request
        .get(url)
        .set('Cookie', cookie)
        .then(res => {
           arr+=res.body.data.html          
        })
        .catch(err => {
           console.log(err);
        });
    
  }



  getFirstCom("https://weibo.com/aj/v6/comment/big?ajwvr=6&id=4082296585476416&from=singleWeiBo&__rnd=1584536343800")


  getSecCom("https://weibo.com/aj/v6/comment/big?ajwvr=6&id=4082296585476416&root_comment_max_id_type=0&root_comment_ext_param=&page=1","https://weibo.com/aj/v6/comment/big?ajwvr=6&id=4082296585476416&root_comment_max_id_type=0&root_comment_ext_param=&page=")

  setTimeout(function(){
    let html
    html+='<!DOCTYPE html><html lang="en"><body>'+arr+'</body></html>'
 
      // fs.writeFileSync('test3.html',html);

      


  },5000)









  