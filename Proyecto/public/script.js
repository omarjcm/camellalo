document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    
    registrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(registrationForm);
        
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                alert('Registro exitoso');
                registrationForm.reset();
            } else {
                alert('Error en el registro');
            }
        } catch (error) {
            console.error(error);
            alert('Error en el registro');
        }
    });
});