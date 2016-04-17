/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    var name, keyID,review="<h4>Review:</h4>",language,subCategory;
    keyID = sessionStorage.getItem("hotelKey");
    name = sessionStorage.getItem("hotelName");
    console.log(keyID + name);
    var str="";
      $('<i class="fa fa-spinner fa-pulse"/>').appendTo('body');
    $.getJSON('http://tour-pedia.org/api/getReviewsByPlaceId?placeId=' + keyID, function (data) {
      var i=1;  
      $.each(data,function(key,value){
       language=value.language;
       subCategory=value.subCategory;
       review+="<p>"+i+". "+value.text;
    
       i++;});
   $.getJSON('http://tour-pedia.org/api/getPlaceDetails?id=' + keyID, function (data) {  
        str+='<ul class="list-group"><li class="list-group-item"><span class="badge">'+data.address+'</span>Address </li><li class="list-group-item"><span class="badge">'+data.phone_number+'</span>Phone_number\n\
       </li><li class="list-group-item"><span class="badge">'+data.international_phone_number+'</span>International_phone_number </li><li class="list-group-item"><span class="badge">'+data.website+'</span>Web_site\n\
        </li>\n\
        <li class="list-group-item"><span class="badge">'+subCategory+'</span>Category </li></ul>';
        str+=review;     
         $('.fa-pulse').remove();
        $("h3").after(str);
    });
   
    });
    
});




