/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function uinfo(user) {
    this.user = user;
}
function setSessionVariables(category, catkey, catName, city) {
    sessionStorage.setItem("city", city);
    switch (category) {
        case'attraction':
            sessionStorage.setItem("attractionKey", catkey);
            sessionStorage.setItem("attractionName",catName);
            break;
        case 'hotel':
            sessionStorage.setItem("hotelKey", catkey);
            sessionStorage.setItem("hotelName",catName);
            break;
        case 'restaurant':
            sessionStorage.setItem("restaurantKey", catkey);
            sessionStorage.setItem("restaurantName",catName);
            break;
    }

}
function setcity(city){
    sessionStorage.setItem("city",city);
}

$(document).ready(function () {
    console.log("inside getsavedInfo()");
    var listitem = '<ul>';
    var userinfo = new uinfo(sessionStorage.getItem("user"));
    console.log(userinfo.user);
    $.ajax({
        type: "GET",
        url: "getSavedTrips",
        cache: false,
        timeout: 10000,
        dataType: "json",
        data: JSON.stringify(userinfo),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function () {
                $.each(this, function (key, value) {
                    var str = value.category;
                    var city = value.city;

                    if (str == 'about') {
                        listitem += "<li><a onclick='setcity("+city+");' href='destination/" + city + ".html'>About page of " + city + " city</a></li>";

                    }
                    else if (str === 'airport')
                    {
                        listitem += "<li><a href='destination/" + city + "/airport.html'>Airport page of " + city + " city</a></li>";
                    }
                    else if (str === 'whentogo')
                        listitem += "<li><a href='destination/" + city + "/whentogo.html'>when to go page of " + city + " city</a></li>";
                    else if (str === 'Getting_Around')
                        listitem += "<li><a href='destination/" + city + "/Getting_Around.html'>getting_around page of " + city + " city</a></li>";
                    else {
                        var catName = value.categoryName;
                        var catKey = value.categorykey;
                        if (str === 'attraction') {

                            listitem += "<li><a href='destination/" + city + "/attraction/1.html' onclick='setSessionVariables(" + str + "," + catName + "," + catKey + "," + city + ");'>" + catName + " attraction of " + city + " city</a></li>";
                        }
                        else if (str === 'hotel') {
                            listitem += "<li><a href='destination/" + city + "/hotelDetails.html' onclick='setSessionVariables(" + str + "," + catName + "," + catKey + "," + city + ");'>" + catName + " hotel of " + city + " city</a></li>";
                        }

                        else if (str === 'restaurant') {
                            listitem += "<li><a href='destination/" + city + "/restaurantsDetails.html' onclick='setSessionVariables(" + str + "," + catName + "," + catKey + "," + city + ");'>" + catName + " restaurant of " + city + " city</a></li>";
                        }
                    }
                });  //each function
            });  // data function
            console.log(listitem);
            listitem += "</ul>";
            $("#savedSearch").after(listitem);
        }
    });  //ajax


});
       