var request = require('superagent')
var fs = require('fs');
const cheerio = require('cheerio');
let cookie="SINAGLOBAL=3133917307893.437.1584368319827; UOR=www.baidu.com,weibo.com,login.sina.com.cn; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFuxeZTWRm0rpHAzbvI359.5JpX5KMhUgL.Foqpeh.cehn7ShB2dJLoI7pHCHHiC2i91hncSo2t; ALF=1616071175; SSOLoginState=1584535176; SCF=AnfJOvYotmTdP0O3DQU7V1f05nx-lNSo06D3o2EYwxL0lhs9jOtisGPer1Ea0wB0JvFDlnLKI-hIu4O55rD6obs.; SUB=_2A25zdmbYDeRhGeBP61sX8CbMzziIHXVQAt8QrDV8PUNbmtAKLVCtkW9NRZNPoaDRnLRJZMazXcYQk9LcopAkTxYD; SUHB=0wnlQDj84w5tMA; Ugrow-G0=5c7144e56a57a456abed1d1511ad79e8; wb_view_log_6109608044=1920*10801; _s_tentry=login.sina.com.cn; Apache=6102895483411.044.1584535175292; ULV=1584535175313:4:4:4:6102895483411.044.1584535175292:1584448653010; TC-V5-G0=595b7637c272b28fccec3e9d529f251a; webim_unReadCount=%7B%22time%22%3A1584535361056%2C%22dm_pub_total%22%3A1%2C%22chat_group_client%22%3A0%2C%22allcountNum%22%3A6%2C%22msgbox%22%3A0%7D; TC-Page-G0=2f200ef68557e15c78db077758a88e1f|1584535385|1584535174"

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
    let html='<!DOCTYPE html><html lang="en"><body>'+arr+'</body></html>'
    
    //  fs.writeFileSync('test.html',html);
      html = html.toString();

     let $ = cheerio.load(html);

     $('body').find('.list_box').text()

  },5000)