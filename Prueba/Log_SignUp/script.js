const $btnSignIn= document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
});
/**************************************/

function validateForm(formType) {
    const form = document.querySelector(`.${formType} .formulario`);
    const inputs = form.querySelectorAll('input[required]');

    let allFieldsFilled = true;

    inputs.forEach(input => {
        if (!input.value) {
            allFieldsFilled = false;
            input.style.borderBottomColor = 'red';
        } else {
            input.style.borderBottomColor = 'white';
        }
    });

    if (allFieldsFilled) {
        form.submit();
    }
}


/****** */
document.getElementById("miBoton").addEventListener("click", function() {
    window.location.href = "index2.html";
});