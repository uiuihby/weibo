var request = require('superagent')
var fs = require('fs');

var http = require('http');
var https = require('https');
const cheerio = require('cheerio');
let cookie="_s_tentry=passport.weibo.com; Apache=5224858063877.46.1584494116830; SINAGLOBAL=5224858063877.46.1584494116830; ULV=1584494116876:1:1:1:5224858063877.46.1584494116830:; Ugrow-G0=cf25a00b541269674d0feadd72dce35f; YF-V5-G0=7a7738669dbd9095bf06898e71d6256d; login_sid_t=52656bd53ade8d385a1024c4e19b59d9; cross_origin_proto=SSL; wb_view_log_6109608044=1680*10502; wb_view_log=1680*10502; SCF=AgLq5M_0lfbCOcfNSrcoUDTcrPsEsmaKDqwNrRicfpOg9qXUzUtQbTHCBArypV8JlMQ4bxBZtWnbelWXBEdXOeY.; SUHB=0h1Z1pO9G2cKpB; SUBP=0033WrSXqPxfM72wWs9jqgMF55529P9D9WFuxeZTWRm0rpHAzbvI359.; SUB=_2AkMpKOeudcPxrAVQmPETzGPiaIlH-jya_Y5YAn7uJhMyAxhu7l8dqSVutBF-XMK5RjVSGExkcOsFt-XA-B7dkV1c; UOR=www.techweb.com.cn,widget.weibo.com,login.sina.com.cn; webim_unReadCount=%7B%22time%22%3A1584687286779%2C%22dm_pub_total%22%3A0%2C%22chat_group_client%22%3A0%2C%22allcountNum%22%3A0%2C%22msgbox%22%3A0%7D; YF-Page-G0=b42a840754430b0247f3ebe5bc09c461|1584691801|1584691791"

const xlsx = require('node-xlsx');
var express = require("express");
const path = require('path')
var app = express();
// 各种依赖
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

let timeOut=100



 app.post('/getData', function (req, res) {  //  新增
    var result = req.body
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

fs.writeFile('./dist/demo.xlsx', resxlsx, err => {
    if (err) throw err;
    res.send("success");
    console.log('文件已保存')
})



})




let htmlTop


setTimeout(function(){
   request
   .get("https://m.weibo.cn/statuses/show?id=HpqQz9omS")
   .set('Cookie', cookie)
   .then(res => {
      let pic  
      if(res.body.data.thumbnail_pic){
       pic="<div id='titlePic'>" +res.body.data.thumbnail_pic+ "</div>"
      }
      let text = "<div id='titleMsg'>" +res.body.data.text+ "</div>"
      arr+=pic
      arr+=text
   })
   .catch(err => {
      console.log(err);
   });
},timeOut+300)


   let arr=""
  function getFirstCom(url){
   setTimeout(function(){
          request
    .get(url)
    .set('Cookie', cookie)
    .then(res => {
       arr+=res.body.data.html
    })
    .catch(err => {
       console.log(err);
    });
   },400)

   
  }

  function getSecCom(url,url2){
   timeOut+=100
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
   console.log(timeOut)
   setTimeout(() => {
   

        request
        .get(url)
        .set('Cookie', cookie)
        .then(res => {
           arr+=res.body.data.html        
           let html='<!DOCTYPE html><html lang="en"><body>'+arr+'</body></html>'
 
           fs.writeFileSync('./dist/index.html',html);  
        })
        .catch(err => {
           console.log(err);
        });
      }, timeOut);

 
    
  }



  getFirstCom("https://weibo.com/aj/v6/comment/big?ajwvr=6&id=4360614032238626&from=singleWeiBo&__rnd=1584691803050")


  getSecCom("https://weibo.com/aj/v6/comment/big?ajwvr=6&id=4360614032238626&root_comment_max_id=176905334494622&root_comment_max_id_type=0&root_comment_ext_param=&page=1","https://weibo.com/aj/v6/comment/big?ajwvr=6&id=4360614032238626&root_comment_max_id=176905334494622&root_comment_max_id_type=0&root_comment_ext_param=&page=")



   console.log('Server running at http://127.0.0.1:8888/');
   app.use(express.static("dist")).listen(8888);









  