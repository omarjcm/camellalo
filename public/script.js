  document.getElementById('formulario1').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que la página se recargue al enviar el formulario

  // Obtén el valor del campo de entrada
  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('email').value;
  var celular = document.getElementById('celular').value;
  var usuario = document.getElementById('usuario').value;
  var contraseña = document.getElementById('contraseña').value;

  // Realiza una solicitud AJAX para enviar el dato
  validateForm(nombre,email,celular,usuario,contraseña);
});


function validateForm(nombre,email,celular,usuario,contraseña) {
  
$.ajax({
    url:'http://localhost:3000/usuario',
    method:'POST',
    data:{
         nombre: nombre,
         email: email,
         celular:celular,
         usuari:usuario,
         contraseña:contraseña,
    },
    dataType:'json'
  })
  .then(function(data){
    console.log('info ingresada')
    console.log(data)
    })
  .catch(function(error){
    console.log('error');
    console.log(error);
  });

  window.location.href = "index3.html";
}



