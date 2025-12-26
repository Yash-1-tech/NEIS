const auth = firebase.auth();

function sendOTP() {
    const phoneNumber = document.getElementById("phone").value;
    const status = document.getElementById("status");

    if (!phoneNumber) {
        status.innerText = "Please enter a valid phone number.";
        return;
    }

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'status',
        { size: 'invisible' }
    );

    auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            const otp = prompt("Enter OTP");
            return confirmationResult.confirm(otp);
        })
        .then(() => {
            window.location.href = "upload.html";
        })
        .catch((error) => {
            status.innerText = error.message;
        });
}
