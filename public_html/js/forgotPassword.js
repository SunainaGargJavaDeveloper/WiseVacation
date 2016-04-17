/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    
    $("#forgotPasswdForm").validate({
        errorClass: "my-error-class",
        validClass: "my-valid-class",
        rules: {
            eMail: {
                required: true,
                email: true

            }
        },
        messages: {
            eMail: {
                required: "Please enter email",
                email: "Your email address must be in the format of name@domain.com"

            }
        }
    });
    $("#forgotPasswdForm").submit(function (event)
    {   $('#status6').css('visibility', 'hidden');
        $('#status7').css('visibility', 'hidden');
        if ($("#forgotPasswdForm").valid())
        {
           var einfo=new forgotPassEmail($("#eMail").val());
           var x=$.ajax({
                type: 'POST',
                url: 'passwordChangeJSON',
                dataType: 'json',
                data: JSON.stringify(einfo),
                contentType: "application/json"
                });
            x.fail(function (jqXHR, textStatus) {
                $('#status6').css('visibility', 'visible'); 
              
            });
            x.done(function (msg) {
                $('#status7').css('visibility', 'visible'); 
            });
            return false;
        }
    });
   
});
function forgotPassEmail(eMail)
    {
        this.eMail = eMail;
        
       
    }


