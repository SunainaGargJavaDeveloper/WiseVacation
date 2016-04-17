$(document).ready(function () {
    
    $("#verificationForm").validate({
        errorClass: "my-error-class",
        validClass: "my-valid-class",
        rules: {
            vCode: {
                required: true,
                digits: true

            }
       
        },
        messages: {
            vCode: {
                required: "Please enter verification code",
                digits: "Wrong Code"

            }
           
        }
    });
    $("#verificationForm").submit(function (event)
    {
        $('#status4').css('visibility', 'hidden');
        $('#status5').css('visibility', 'hidden');
        if ($("#verificationForm").valid())
        {
           var vinfo=new vCode($("#vCode").val());
           var x=$.ajax({
                type: 'POST',
                url: 'verificationJSON',
                dataType: 'json',
                data: JSON.stringify(vinfo),
                contentType: "application/json"
                });
            x.fail(function (jqXHR, textStatus) {
                $('#status4').css('visibility', 'visible'); 
              
            });
            x.done(function (msg) {
                $('#status5').css('visibility', 'visible'); 
            });
            return false;
        }
    });
   
});
function vCode(verificationCode)
    {
        this.vcode = verificationCode;
        
       
    }




