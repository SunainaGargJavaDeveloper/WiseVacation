/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    $("#adminsignInForm").validate({
        errorClass: "my-error-class",
        validClass: "my-valid-class",
        rules: {
            userid: {
                required: true
       
            },
            passwd: {
                required: true

            }

        },
        messages: {
            userid: {
                required: "Please enter email"
                
            },
            passwd: {
                required: "Please enter passwd"

            }

        }
    });
    $("#adminsignInForm").submit(function (event)
    {
        if ($("#adminsignInForm").valid())
        {   
            var uinfo = new userinfo($('#userid').val(), $('#passwd').val());
            
            console.log("info");
            var x=$.ajax({
                type: 'POST',
                url: 'adminsigninJSON',
                dataType: 'json',
                data: JSON.stringify(uinfo),
                contentType: "application/json"
                });
            x.fail(function (jqXHR, textStatus) {
                $('#adminstatus1').css('visibility', 'visible'); 
              
            });
            x.done(function (msg) {
                sessionStorage.setItem("admin",$("#userid").val());
                window.location.replace("adminform.html");
            });
           
                 return false;
        }
    });

});
function userinfo(id,passwd)
    {
        this.id = id;
        this.passwd = passwd;
       
    }


