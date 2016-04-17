$(document).ready(function () {
    var toEailList=sessionStorage.getItem("ToEmails");
    $('#to').val(toEailList);
    $("#mailForm").validate({
        errorClass: "my-error-class",
        validClass: "my-valid-class",
        rules: {
            to: {
                required: true
                
            },
            subject:{
                required:true
                
            },
             messageBody: {
                required: true

            }

        },
        messages: {
            to: {
                required: "Please enter email",
               
            },
            subject:{
                required: "Please fill subject line"
            },
            messageBody: {
                required: "Please enter message body"

            }

        }
    });
    $("#mailForm").submit(function (event)
    {
        if ($("#mailForm").valid())
        {   //$("#txtStatus").val("false");
            var uinfo = new mailinfo($('#to').val(), $('#subject').val(),$('#messageBody').val());
            
            console.log("info");
             $('<i class="fa fa-spinner fa-pulse"/>').appendTo('body');
            var x=$.ajax({
                type: 'POST',
                url: 'mailinfoJSON',
                dataType: 'json',
                data: JSON.stringify(uinfo),
                contentType: "application/json"
                });
            x.fail(function (jqXHR, textStatus) {
                 $('.fa-pulse').remove();
                $('#statusAdminMailFail').css('visibility', 'visible'); 
              
            });
            x.done(function (msg) {
                 $('.fa-pulse').remove();
                $('#statusAdminMailSuccess').css('visibility', 'visible'); 
              
            });
          
                 return false;
        }
    });

});
function mailinfo(eMail,subject,body)
    {
        this.to = eMail;
        this.subject =subject;
        this.body=body;
       
    }

function signout(){
    sessionStorage.removeItem("admin");
    window.location.replace('adminWiseVacation.html');
}

