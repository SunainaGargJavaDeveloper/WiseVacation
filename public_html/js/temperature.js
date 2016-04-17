/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
   var city= sessionStorage.getItem("city");

   $.getJSON("http://api.openweathermap.org/data/2.5/find?q="+city+"&units=metric&appid=5e9e1f9e46783577c8fd801670e9a149",
   function(data){
      
       var temp=data.list[0].main.temp;
       $(".CityTitle").append("("+temp);
       console.log(temp);
   });
});