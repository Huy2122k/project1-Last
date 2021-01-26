 function   myTrim(x) {
     return x.replace('/result.json','').replace('/uploadFile.pdf','');
 }
     
function  validateForm() {
       console.log("IN");
       var x = document.forms["myForm"]["Pdf_url"].value;
       var y = document.forms["myForm"]["Json_url"].value;
       x = myTrim(x)
       y = myTrim(y)
       console.log(x);
       console.log(y);
       if(x===y){
           return true;
       }else{
           alert('pdf file và json file không thuộc cùng tài liệu');
           return false;
       }
 }