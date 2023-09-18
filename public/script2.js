document.getElementById('formulario2').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    var usuario = document.getElementById('usuario').value;
    var contraseña = document.getElementById('contraseña').value;
  
    // Realiza una solicitud AJAX para enviar el dato
    acceso(usuario,contraseña);
  });
  
  
  function acceso(usuario,contraseña) {
    
  $.ajax({
      url:'http://localhost:3000/usuario/login',
      method:'POST',
      data:{
           usuari:usuario,
           contraseña:contraseña,
      },
      dataType:'json'
    })
    .then(function(data){
      console.log('usuario accedio')
      console.log(data)
      })
    .catch(function(error){
      console.log('error');
      console.log(error);
    });
  }