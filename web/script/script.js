document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const usernamePlaceholder = document.getElementById("usernamePlace");
    const cupoDisponible = document.getElementById("cupoDisponible");
    const userSection = document.getElementById("userSection");
    const loginSection = document.getElementById("loginSection");

    
    const storedUsername = localStorage.getItem("username");
    let saldoCupo = parseFloat(localStorage.getItem("saldoCupo")) || 100.00;


    if (storedUsername) {
        userSection.style.display = "block";
        loginSection.style.display = "none";

        usernamePlaceholder.textContent = storedUsername;
        cupoDisponible.textContent = saldoCupo.toFixed(2);
    }

    loginButton.addEventListener("click", () => {
        const storedUsers = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
        const username = prompt("Ingrese su usuario:");
        
        if (username) {
            const user = storedUsers.find(user => user.username === username);
    
            if (user) {
                const password = prompt("Ingrese su contraseña:");
                
                if (password && user.password === password) {
                    localStorage.setItem("username", username);
                    userSection.style.display = "block";
                    loginSection.style.display = "none";
                    
                    usernamePlaceholder.textContent = username;
                    alert("Inicio de sesión exitoso.");
                } else {
                    alert("Contraseña incorrecta. Por favor, inténtelo nuevamente.");
                }
            } else {
                const confirmRegister = confirm("Usuario no encontrado. ¿Desea registrarse?");
                if (confirmRegister) {
                    window.location.href = "login.html";
                }
            }
        }
    });
    
    

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("username");
        userSection.style.display = "none";
        loginSection.style.display = "block";
        saldoCupo = 100.00;
        localStorage.setItem("saldoCupo", saldoCupo.toFixed(2));
        cupoDisponible.textContent = saldoCupo.toFixed(2);
        window.location.href = "login.html";
    });

    const catalogoComidas = document.querySelectorAll(".comida");
    catalogoComidas.forEach(comida => {
        const btnComprar = comida.querySelector(".btn-comprar");
        const precio = parseFloat(btnComprar.dataset.precio);

        btnComprar.addEventListener("click", () => {
            const confirmCompra = confirm("¿Estás de acuerdo en usar los cupos?");
            if (confirmCompra && precio <= saldoCupo) {
                saldoCupo -= precio;
                localStorage.setItem("saldoCupo", saldoCupo.toFixed(2));
                cupoDisponible.textContent = saldoCupo.toFixed(2);
                alert(`¡Has comprado ${comida.querySelector(".nombre").textContent} por $${precio.toFixed(2)}!\nCupo Disponible: $${saldoCupo.toFixed(2)}`);
            } else if (precio > saldoCupo) {
                alert("No tienes suficiente saldo para realizar esta compra.");
            }
        });
    });
});
