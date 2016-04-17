/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var city = ['Amsterdam', 'Barcelona', 'Berlin', 'Dubai', 'London', 'Paris', 'Rome', 'Tuscany'];
 function   funString(str){
     var temp="";
     for( i=0;i<str.length;i++){
         if(str[i]!=="'")
             temp+=str[i];
         else 
             temp+="\'";
     return temp;    
     }
}
function funAttraction(){
   var items = [];
   
       alert('http://tour-pedia.org/api/getPlaces?location=Amsterdam &category=attraction');
       $.getJSON('http://tour-pedia.org/api/getPlaces?location=Tuscany&category=attraction', function (data) {
        $.each(data, function (key, val) {
       
        items.push({"id": val.id, "name": val.name});
        console.log("item inserted");
        }); //end function(data)
        }); 
     alert(items.length);
     var dataValue=JSON.stringify(items);
     alert(dataValue);
      var x=$.ajax({
                type: 'POST',
                url: 'attractionInfoJSON',
                dataType: 'json',
                data: dataValue,
                contentType: "application/json"
                });
            x.fail(function (jqXHR, textStatus) {
                alert("fail"); 
              
            });
            x.done(function (msg) {
                alert('done');
              
            });

}

        $(document).ready(function(){

        });