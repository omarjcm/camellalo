document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/catalogo'); // Hacer una solicitud al servidor para obtener los datos
        if (response.ok) {
            const servicios = await response.json(); // Suponiendo que el servidor envía datos JSON
            const productosContainer = document.getElementById('productos-container');

            servicios.forEach(servicio => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');

                const nombreEmpDiv = document.createElement('div');
                nombreEmpDiv.classList.add('nombre-emp');
                nombreEmpDiv.textContent = servicio.nombre_emp;

                const logoEmp = document.createElement('img');
                logoEmp.src = `${servicio.logo_emp}`;
                logoEmp.alt = `${servicio.nombre_emp} Logo`;
                logoEmp.classList.add('logo-emp');
                nombreEmpDiv.appendChild(logoEmp);

                const detalleProductoDiv = document.createElement('div');
                detalleProductoDiv.classList.add('detalle-producto');
                const imgServ = document.createElement('img');
                imgServ.src = `${servicio.img_serv}`;
                imgServ.alt = `${servicio.nombre_serv} Imagen`;
                imgServ.classList.add('img-serv');
                detalleProductoDiv.innerHTML = `
                <div class="nombre_serv">
                    <p>${servicio.nombre_serv}</p>
                </div>
                <div class="descripcion">
                    <p>${servicio.descripcion}</p>
                </div>
                <div class="datos">
                    <p>Stock: ${servicio.stock}</p>
                    <p>Valor: $${servicio.valor}</p>
                </div>
                `;
                detalleProductoDiv.querySelector('div').insertAdjacentElement('afterbegin', imgServ);

                const stockValorDiv = document.createElement('div');
                stockValorDiv.classList.add('stock-valor');

                const cantidadInput = document.createElement('input');
                cantidadInput.setAttribute('type', 'number');
                cantidadInput.setAttribute('min', '1');
                cantidadInput.setAttribute('max', servicio.stock);
                cantidadInput.setAttribute('value', '1');
                cantidadInput.setAttribute('id', `cantidad-${servicio._id}`);

                const comprarButton = document.createElement('button');
                comprarButton.classList.add('comprar');
                comprarButton.textContent = 'Comprar';
                comprarButton.addEventListener('click', () => comprar(servicio._id));

                const editarButton = document.createElement('button');
                editarButton.classList.add('editar');
                editarButton.textContent = 'Editar';
                editarButton.addEventListener('click', () => editar(servicio));

                if (servicio.stock === 0) {
                    comprarButton.style.opacity = '0.5';
                    comprarButton.disabled = true;
                }

                stockValorDiv.appendChild(cantidadInput);
                stockValorDiv.appendChild(comprarButton);
                stockValorDiv.appendChild(editarButton);

                productoDiv.appendChild(nombreEmpDiv);
                productoDiv.appendChild(detalleProductoDiv);
                productoDiv.appendChild(stockValorDiv);

                productosContainer.appendChild(productoDiv);
            });
        } else {
            console.error('Error al obtener datos del catálogo');
        }
    } catch (error) {
        console.error(error);
    }
});

async function comprar(servicioId) {
    const cantidadInput = document.getElementById(`cantidad-${servicioId}`);
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad > 0 && cantidad <= parseInt(cantidadInput.max)) {
        try {
            const response = await fetch(`/comprar/${servicioId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cantidad })
            });

            if (response.ok) {
                // La compra se realizó con éxito en el servidor, actualiza el stock en el producto
                const stockDiv = document.querySelector(`#cantidad-${servicioId}`).closest('.producto').querySelector('.detalle-producto .datos p:nth-child(1)');
                const nuevoStock = parseInt(stockDiv.textContent.split(': ')[1]) - cantidad;
                stockDiv.textContent = `Stock: ${nuevoStock}`;

                // Verifica si el stock es cero y deshabilita el botón Comprar y tacha el producto
                if (nuevoStock === 0) {
                    const botonComprar = document.querySelector(`#cantidad-${servicioId}`).closest('.producto').querySelector('button.comprar');
                    botonComprar.style.opacity = '0.5';
                    botonComprar.disabled = true;
                    alert(`Producto con ID ${servicioId} está agotado.`);
                }
            } else {
                console.error('Error al procesar la compra en el servidor.');
            }
        } catch (error) {
            console.error('Error al procesar la compra:', error);
        }
    } else {
        console.error('La cantidad debe ser mayor que cero y no debe exceder el stock disponible.');
    }
}

function editar(servicio) {
    const editarForm = document.createElement('form');
    editarForm.id = 'editarForm';
    editarForm.innerHTML = `
        <label>Nombre Empresa: <input type="text" name="nombre_emp" value="${servicio.nombre_emp}"></label>
        <label>Logo Empresa: <input type="file" name="logo_emp" accept="image/*"></label>
        <label>Nombre Servicio: <input type="text" name="nombre_serv" value="${servicio.nombre_serv}"></label>
        <label>Imagen Producto: <input type="file" name="img_serv" accept="image/*"></label>
        <label>Descripción: <textarea name="descripcion">${servicio.descripcion}</textarea></label>
        <label>Stock: <input type="number" name="stock" min="0" value="${servicio.stock}"/></label>
        <label>Valor: <input type="number" name="valor" min="0" step=0.01 value="${servicio.valor}"/></label>
        <div>
            <button type="submit" id="guardar">Guardar</button>
            <button type="button" id="cancelar">Cancelar</button>
        </div>
    `;

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);
    editarForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(editarForm);
        let allFieldsFilled = true;
        
        for (let value of formData.values()) {
            if (typeof value === 'string' && value.trim() === '') {
                allFieldsFilled = false;
                break;
            }
            // Aquí agregamos la verificación para los campos de archivo
            if ((value instanceof Blob) && value.size === 0) {
                allFieldsFilled = false;
                break;
            }
        }

        if (!allFieldsFilled) {
            alert('Todos los campos deben ser llenados');
            return;
        }         

        const servicioEditado = {
            nombre_emp: formData.get('nombre_emp'),
            logo_emp: formData.get('logo_emp'),
            nombre_serv: formData.get('nombre_serv'),
            img_serv: formData.get('img_serv'),
            descripcion: formData.get('descripcion'),
            stock: formData.get('stock'),
            valor: formData.get('valor')
        };        

        try {
            const response = await fetch(`/editar/${servicio._id}`, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                // Actualizar los detalles del producto en la página
                // Asegúrate de seleccionar correctamente los elementos DOM que muestran estos detalles
                let productoDiv = document.querySelector(`#cantidad-${servicio._id}`).closest('.producto');

        let nombreEmpDiv = productoDiv.querySelector('.nombre-emp');
        nombreEmpDiv.innerHTML = '';
        nombreEmpDiv.textContent = servicioEditado.nombre_emp.toUpperCase();
        nombreEmpDiv.style.padding = '10px';
        nombreEmpDiv.style.borderBottom = '3px solid black';

        let logoEmp = document.createElement('img');
        logoEmp.classList.add('logo-emp');
        if (formData.get('logo_emp')) {
            logoEmp.src = URL.createObjectURL(formData.get('logo_emp'));
        } else {
            logoEmp.src = servicio.logo_emp;
        }
        nombreEmpDiv.appendChild(logoEmp);

        let detalleProductoDiv = productoDiv.querySelector('.detalle-producto');
        detalleProductoDiv.innerHTML = `
            <div class="nombre_serv">
                <p>${servicioEditado.nombre_serv}</p>
            </div>
            <div class="descripcion">
                <p>${servicioEditado.descripcion}</p>
            </div>
            <div class="datos">
                <p>Stock: ${servicioEditado.stock}</p>
                <p>Valor: $${servicioEditado.valor}</p>
            </div>
        `;

        let imgServ = document.createElement('img');
        imgServ.classList.add('img-serv');
        if (formData.get('img_serv')) {
            imgServ.src = URL.createObjectURL(formData.get('img_serv'));
        } else {
            imgServ.src = servicio.img_serv;
        }
        detalleProductoDiv.querySelector('.nombre_serv').insertAdjacentElement('beforebegin', imgServ);

                document.body.removeChild(editarForm);
                document.body.removeChild(overlay);

                alert('Producto editado exitosamente');
            } else {
                alert('Error editando el producto');
            }
        } catch (error) {
            console.error('Error editando el producto:', error);
        }
    });

    document.body.appendChild(editarForm);

    document.getElementById('cancelar').addEventListener('click', function(e) {
        document.body.removeChild(editarForm);
        document.body.removeChild(overlay);
        alert("Edición Cancelada")
    })
}