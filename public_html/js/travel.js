/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function storeKey(val, key) {
    sessionStorage.setItem("attractionKey", key);
    sessionStorage.setItem("attractionName", val);
    console.log(val + key);
}

$(document).ready(function () {
    $('<i class="fa fa-spinner fa-pulse"/>').appendTo('body');
    var city= sessionStorage.getItem("city");
var items = [];
        $.getJSON('http://tour-pedia.org/api/getPlaces?location='+city+'&category=attraction', function (data) {
        $.each(data, function (key, val) {
        items.push({"id": val.id, "name": val.name});
                console.log("item inserted");
        }); 
                
                var str = "<tbody>";
             
                for (i=0;i<items.length;i++) {
                    
                     var x = items[i]; console.log(x.name+x.id);
                     str += '<tr ><td><a href="attraction/1.html" target="_blank" onclick="storeKey(\'' + x.name + '\',' + x.id + ')">' + x.name + '</a></td>\n\
</tr>';
        }    console.log(items.length);
        str += "</tbody>";
                   $('.fa-pulse').remove();
                $("#attractionTable").after(str);
                
          //      $("#attTable").DataTable();
                
        }); 
         
    });



