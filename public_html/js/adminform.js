/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    var str = "<tbody>";
    var i = 1;
    $.ajax({
        type: "GET",
        url: "getVisitorLists",
        cache: false,
        timeout: 10000,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $.each(data, function () {
                $.each(this, function (key, value) {
                    str += "<tr><td><input type='checkbox' name='checkOptions' id='check" + i + "' value='" + value.email + "' onclick='setCheckBoxes2(this);'>" + value.email + "</td></tr>";
                    i++;
                });  //each function
            });  // data function
            sessionStorage.setItem("NumberOfUsers", i - 1);
            str += "</tbody>";
            console.log(str);

            $("#userTable").after(str);
        }
    });  //ajax
});
function setCheckBoxes2(cb) {
    var flag = true;
    var j = sessionStorage.getItem("NumberOfUsers");
    if (cb.checked) {
        $("#btnSendEmail").prop('disabled', false);
    }
    else {
        for (i = 0; i <= parseInt(j); i++) {
            if ($("#check" + i).is(":checked"))
            {
                flag = false;
                break;
            }
        }
        if (flag)
            $("#btnSendEmail").prop('disabled', true);
    }
}
function setCheckBoxes(cb) {
    var j = sessionStorage.getItem("NumberOfUsers");
    if (cb.checked) {
        for (i = 0; i <= parseInt(j); i++) {
            $("#check" + i).prop('checked', true);
        }

        $("#btnSendEmail").prop('disabled', false);
    }
    else {
        for (i = 0; i <= parseInt(j); i++) {
            $("#check" + i).prop('checked', false);
        }
        $("#btnSendEmail").prop('disabled', true);
    }
}
function sMail(){
var j = sessionStorage.getItem("NumberOfUsers");

var favorite = [];
        $.each($("input[name='checkOptions']:checked"), function(){
        favorite.push($(this).val());
        });
        sessionStorage.setItem("ToEmails", favorite);
        window.location.replace('sendMail.html');
        }
        
function signout(){
    sessionStorage.removeItem("admin");
    window.location.replace('adminWiseVacation.html');
}
    