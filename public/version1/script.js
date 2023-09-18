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

/******miboton boton ingresar manda al index2 */
document.getElementById("miBoton").addEventListener("click", function() {
    window.location.href = "index2.html";
});

/******miboton2 boton ingresar manda al index3 */
/**********aqui podrían agregarse que solo si todos los campos estan bien puede avanzar  */

document.getElementById("miBoton2").addEventListener("click", function() {
    window.location.href = "index3.html";
});
