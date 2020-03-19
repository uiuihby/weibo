<script>


$(document).ready(function () {
    let i=0
    let arr=[]
    let listMain=$("body").children();
    listMain.each(function(){
       let list=$(this).find(".list_li")
       list.each(function(){
         
       
                 let text=$(this).children().find(".WB_text").eq(0)
                 if(!text.parent().parent().parent().parent().hasClass("S_bg3")){
                      i+=1
                      let msg = text.text().replace(/\s*/g,"");
                    arr.push(msg)
                 }
           
          

       })

    //    
    });
    let data={
        msg:$("#titleMsg").text(),
        pic:$("#titlePic").text(),
        arr:null
    }
    let lastArr=[]
    var code = prompt("请输入关键字逗号分隔");
        var str = code;
         let keywords = str.split(",");
        arr.forEach(e => {
            keywords.forEach(e2 => {
                if(e.indexOf(e2)!=-1)
                    lastArr.push({com:e})
            });
        });
        data.arr=lastArr
  console.log(data)
});


</script>