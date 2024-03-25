/* jshint esversion: 11, jquery: true */
// Implemented from my(Mikaela)'s project https://github.com/mikavir/rx-decoder/blob/main/assets/scripts/email.js from email js.


/** Function to send mail once validated using emailjs */
function sendMail(contactForm){
    if (validateForm(this)) {
        emailjs.send("service_vgja348","template_v31o78s",{
            from_name: contactForm.name.value,
            message: contactForm.enquiry.value,
            reply_to: contactForm.email.value
            }).then(
                (response) => {
                    //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
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
        console.log("ERROR: Unable to send form as the required fields have not been completed");
    }
 }

/**Function to validate the form */
function validateForm() {
    let nameInput = document.forms.contactForm.name;
    let emailInput = document.forms.contactForm.email;
    let enquiryInput = document.forms.contactForm.enquiry;
    if (nameInput.value === "") {
        nameInput.classList.add("is-invalid");
        return false;
    } else if (emailInput.value === "") {
        emailInput.classList.add("is-invalid");
        return false;
    } else if (enquiryInput.value === "") {
        enquiryInput.classList.add("is-invalid");
        return false;
    } else {
        return true;
    }
}