
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);


var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");



var usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

function anchoPage() {
    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
    }
}

anchoPage();

function iniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
       
    }
    validarRegistro();
}

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

function validarInicioSesion() {
    const username = document.getElementById("username1").value;
    const password = document.getElementById("password1").value;

 
    const usuario = usuariosRegistrados.find(user => user.username === username);

    if (usuario && usuario.password === password) {
        alert("Inicio de sesión exitoso.");
        console.log("Antes del redireccionamiento");
        window.location.href = "index.html"; 
        console.log("Después del redireccionamiento");
        return true;
    } else {
        alert("Nombre de usuario o contraseña incorrectos");
        return false;
    }
}


function validarRegistro() {
    const nombrecompleto = document.getElementById("nombrecompleto").value;
    const correo = document.getElementById("correo").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (nombrecompleto && correo && username && password) {
        if (usuariosRegistrados.some(user => user.username === username)) {
            alert("Usuario ya registrado");
            return false;
        } else {
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            usuariosRegistrados.push({ nombrecompleto, correo, username, password });
            
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
            iniciarSesionAutomatizado(username, password);
            window.location.href = "index.html";
            return true;
        }
    } else {
        alert("Por favor, completa todos los campos.");
        return false;
    }
}

function iniciarSesionAutomatizado(username, password) {
    document.getElementById("username1").value = username;
    document.getElementById("password1").value = password;
    iniciarSesion();
}