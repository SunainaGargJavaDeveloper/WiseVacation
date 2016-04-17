/* 
 * To change this license header, choose License Header */
$(document).ready(function () {
    if (sessionStorage.getItem('user') === null)
        $("#userArea").css('visibility', 'hidden');
    else
        $("#userArea").css('visibility', 'visible');

});

function signout() {
    sessionStorage.removeItem("user");
    $("#userArea").css('visibility', 'hidden');
}
function storeCity(cat) {
    var email = sessionStorage.getItem("user");
    var city = sessionStorage.getItem("city");
    var cityI = new cityInfo(email, city, cat);
    var x = $.ajax({
        type: 'POST',
        url: 'cityInfoJSON',
        dataType: 'json',
        data: JSON.stringify(cityI),
        contentType: "application/json"
    });
    x.fail(function (jqXHR, textStatus) {
       
    });
    x.done(function (msg) {
       alert("saved");
    });
  
}
function cityInfo(email, city, category) {
    this.email = email;
    this.city = city;
    this.category = category;
}

function storeDetail(cat) {
    var email = sessionStorage.getItem("user");
    var city = sessionStorage.getItem("city");
    var key, name;
    switch (cat) {
        case 'attraction':
            key = sessionStorage.getItem("attractionKey");
            name = sessionStorage.getItem("attractionName");
            break;
        case 'hotel' :
            key = sessionStorage.getItem("hotelKey");
            name = sessionStorage.getItem("hotelName");
            break;
        case 'restaurant':
            key = sessionStorage.getItem("restaurantKey");
            name = sessionStorage.getItem("restaurantName");
            break;
    }
    var sinfo = new saveInfo(email, city, cat, key, name);
    var x = $.ajax({
        type: 'POST',
        url: 'saveInfoJSON',
        dataType: 'json',
        data: JSON.stringify(sinfo),
        contentType: "application/json"
    });
    x.fail(function (jqXHR, textStatus) {
       
    });
    x.done(function (msg) {
       
        alert("saved");
    });

}
function saveInfo(email, city, category, key, name) {
    this.email = email;
    this.city = city;
    this.category = category;
    this.key = key;
    this.name = name;
}

