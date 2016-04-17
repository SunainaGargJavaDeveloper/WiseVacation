/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    jQuery.validator.addMethod('isPasswordSame', function (value, element, params) {
        return this.optional(element) || value !== params[0];
    }, 'Please enter same password');
    $("#registerForm").validate({
        errorClass: "my-error-class",
        validClass: "my-valid-class",
        rules: {
            eMail: {
                required: true,
                email: true

            },
            
            passwd: {
                required: true

            },
            confpasswd: {
                required: true,
                isPasswordSame: [$('#passwd').val()]
            }

        },
        messages: {
            eMail: {
                required: "Please enter email",
                email: "Your email address must be in the format of name@domain.com"

            },
            
            passwd: {
                required: "Please enter passwd"

            },
            confpasswd: {
                required: "Please enter passwd"

            }


        }
    });
    $("#registerForm").submit(function (event)
    {
        $('#status1').css('visibility', 'hidden');
        $('#status2').css('visibility', 'hidden');
        if ($("#registerForm").valid())
        {
            var uinfo = new userinfo($('#eMail').val(), $('#passwd').val());
            console.log("info");

            var x = $.ajax({
                type: 'POST',
                url: "userinfoJSON",
                dataType: 'json',
                data: JSON.stringify(uinfo),
                contentType: "application/json"
            });
            x.fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);

                $('#status2').css('visibility', 'visible');
            });
            x.done(function (msg) {
                $('#status1').css('visibility', 'visible');
            });
       /*     if (!errorCode)
                $('#status1').css('visibility', 'visible');
            else
                $('#status2').css('visibility', 'false'); */
            $("#eMail").val('');
            $("#passwd").val('');
            $("#confpasswd").val('');
            return false;
        }

    });

});

function userinfo(eMail, passwd)
{
    this.eMail = eMail;
    this.passwd = CryptoJS.MD5(passwd).toString();

}


