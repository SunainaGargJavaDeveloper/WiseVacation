
function storeKey(val, key) {
    sessionStorage.setItem("restaurantKey", key);
    sessionStorage.setItem("restaurantName", val);
    console.log(val + key);
}

$(document).ready(function () {
    $('<i class="fa fa-spinner fa-pulse"/>').appendTo('body');
    var city= sessionStorage.getItem("city");
var items = [];
        $.getJSON('http://tour-pedia.org/api/getPlaces?location='+city+'&category=restaurant', function (data) {
        $.each(data, function (key, val) {
        items.push({"id": val.id, "name": val.name,"address":val.address});
                console.log("item inserted");
        }); 
                
                var str = "<tbody>";
             
                for (i=0;i<items.length;i++) {
                    
                     var x = items[i]; console.log(x.name+x.id);
                     str += '<tr ><td><a href="restaurantsDetails.html" target="_blank" onclick="storeKey(\'' + x.name + '\',' + x.id + ')">' + x.name + '</a></td>\n\
<td>'+x.address+'</td></tr>';
        }    console.log(items.length);
        str += "</tbody>";
                   $('.fa-pulse').remove();
                $("#restaurantTable").after(str);
                
          //      $("#attTable").DataTable();
                
        }); 
         
    });




