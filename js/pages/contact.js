import Swal from 'sweetalert2';

(function ($) {
  $("form#contact-form").validate({
        rules: {
            name: "required",
            phone: "required",
            message: "required",
            email: {
                required: true,
                email: true
            }
        },
        // Specify validation error messages
        messages: {
            name: "Please enter your name",
            phone: "Please enter your phone",
            email: "Please enter a valid email address",
            message: "Please enter your message"
        },

        submitHandler: function(form) {
            let emailMessage = {email: "", name: "", phone: "", desc: "", topic: ""};
            emailMessage.name =  $('#username').val() + "(" + $('#phone').val() + ")";
            emailMessage.email = $('#email').val();
            emailMessage.phone = $('#phone').val();
            emailMessage.desc = $('#message').val();
            emailMessage.topic = "MastermindCMS2 : You have received a new message!";
            let data = JSON.stringify(emailMessage);
            console.log(data);
            jQuery.ajax({
                url: '/saveContactForm',
                type: 'post',
                data: data,
                contentType: 'application/json',
                processData: true,
                success: function (response) {
                    if (response !== 0) {
                        Swal.fire({
                            title: 'Contact',
                            text: 'Your message successfully sent!',
                            icon: 'success'
                        }).then((result) => {
                            location.reload();
                        });
                    }
                },
            });

        }
    });
})(jQuery);