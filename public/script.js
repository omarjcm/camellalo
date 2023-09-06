const $btnSignIn = document.querySelector(".sign-in-btn"),
  $btnSignUp = document.querySelector(".sign-up-btn"),
  $signUp = document.querySelector(".sign-up"),
  $signIn = document.querySelector(".sign-in");

document.addEventListener("click", (e) => {
  if (e.target === $btnSignIn || e.target === $btnSignUp) {
    $signIn.classList.toggle("active");
    $signUp.classList.toggle("active");
  }
});

/******miboton boton ingresar manda al index2 */
document.getElementById("miBoton").addEventListener("click", function () {
  window.location.href = "index2.html";
});

/******miboton2 boton ingresar manda al index3 */
/**********aqui podrían agregarse que solo si todos los campos estan bien puede avanzar
 * este codigo le puse como ultimo if directo en el html

document.getElementById("miBoton2").addEventListener("click", function() {
    window.location.href = "index3.html";
});
  */

/***------nuevo codigo
 * CODIGO DE LAS EXPRESIONES REGULARES QUE MUESTRAN UN POPUP PARA VALIDAR
 * -----*/ //

function validateForm() {
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const celularInput = document.getElementById("celular");
  const usuarioInput = document.getElementById("usuario");
  const contrasenaInput = document.getElementById("contraseña");

  // Define regex patterns for validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const celularPattern = /^\d{10}$/;
  const usuarioPattern = /^[A-Za-z0-9_]+$/;

  if (!emailPattern.test(emailInput.value)) {
    alert("Ingrese una dirección de correo electrónico válida.");
    return;
  }

  if (!celularPattern.test(celularInput.value)) {
    alert("Ingrese un número de celular válido (10 dígitos numéricos).");
    return;
  }

  if (!usuarioPattern.test(usuarioInput.value)) {
    alert("El usuario solo puede contener letras, números y guiones bajos.");
    return;
  }

  // Si valida todos los campos, entonces te manda al index que dice 'se ha registrado con exito'

  document.getElementById("miBoton2").addEventListener("click", function () {
    window.location.href = "/intento1/index3.html";
  });
}
