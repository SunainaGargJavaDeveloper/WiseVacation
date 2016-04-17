/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    $("#signInForm").validate({
        errorClass: "my-error-class",
        validClass: "my-valid-class",
        rules: {
            eMail: {
                required: true,
                email: true

            },
            passwd: {
                required: true

            }

        },
        messages: {
            eMail: {
                required: "Please enter email",
                email: "Your email address must be in the format of name@domain.com"

            },
            passwd: {
                required: "Please enter passwd"

            }

        }
    });
    $("#signInForm").submit(function (event)
    {
        if ($("#signInForm").valid())
        {   //$("#txtStatus").val("false");
            var uinfo = new userinfo($('#eMail').val(), $('#passwd').val());
            
            console.log("info");
            var x=$.ajax({
                type: 'POST',
                url: 'usersigninJSON',
                dataType: 'json',
                data: JSON.stringify(uinfo),
                contentType: "application/json"
                });
            x.fail(function (jqXHR, textStatus) {
                $('#status3').css('visibility', 'visible'); 
              
            });
            x.done(function (msg) {
                sessionStorage.setItem("user",$("#eMail").val());
                window.location.replace("index.html");
            });
           // if($("#txtStatus").val()==='false')
                 return false;
        }
    });

});
function userinfo(eMail,passwd)
    {
        this.eMail = eMail;
        this.passwd = CryptoJS.MD5(passwd).toString();
       
    }


