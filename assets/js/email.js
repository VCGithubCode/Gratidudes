
// Implemented from my( Mikaela)'s project https://github.com/mikavir/rx-decoder/blob/main/assets/scripts/email.js from email js.
let emailFeedBack = document.getElementById("email-feedback");
let contactForm = document.getElementById("contactForm");


function sendMail(contactForm){
    if (validateForm(this)) {
        emailjs.send("service_vgja348","template_v31o78s",{
            from_name: contactForm.name.value,
            message: contactForm.enquiry.value,
            reply_to: contactForm.email.value
            }).then(
                (response) => {
                    console.log(response);
                    window.location.href = "thank-you.html";
                },
                (error) => {
                    console.log("FAILED", error);
                }
            );
        return false;
    } else {
        this.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        console.log("unable to send form");
    }
 }


function validateForm() {
    let nameInput = document.forms["contactForm"]["name"];
    let emailInput = document.forms["contactForm"]["email"];
    let enquiryInput = document.forms["contactForm"]["enquiry"];
    if (nameInput.value === "") {
        emailFeedBack.innerText = "Please input name";
        return false;
    } else if (emailInput.value === "") {
        emailFeedBack.innerText = "Please input email";
        return false;
    } else if (enquiryInput.value === "") {
        emailFeedBack.innerText = "Please input your message";
        return false;
    } else {
        return true;
    }
}