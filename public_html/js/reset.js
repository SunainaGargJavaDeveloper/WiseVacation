/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $.getJSON("getEmail", function (data) {
                    $("#eMail").val(data.email);
                   });
    jQuery.validator.addMethod('isPasswordSame', function (value, element, params) {
        return this.optional(element) || value !== params[0];
    }, 'Please enter same password');
    $("#ResetPasswordForm").validate({
        errorClass: "my-error-class",
        validClass: "my-valid-class",
        rules: {
             
            passwd: {
                required: true

            },
            confpasswd: {
                required: true,
                isPasswordSame: [$('#passwd').val()]
            }

        },
        messages: {
            
            passwd: {
                required: "Please enter passwd"

            },
            confpasswd: {
                required: "Please enter passwd"

            }


        }
    });
    $("#ResetPasswordForm").submit(function (event)
    {
        $('#status8').css('visibility', 'hidden');
        $('#status9').css('visibility', 'hidden');
        if ($("#ResetPasswordForm").valid())
        {
            var uinfo = new userinfo($('#eMail').val(), $('#passwd').val());
            console.log("info");

            var x = $.ajax({
                type: 'POST',
                url: "resetPassinfoJSON",
                dataType: 'json',
                data: JSON.stringify(uinfo),
                contentType: "application/json"
            });
            x.fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);

                $('#status8').css('visibility', 'visible');
            });
            x.done(function (msg) {
                $('#status9').css('visibility', 'visible');
                $("#eMail").val('');
            });
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


