
let currentImage = 0;
const productImages = document.querySelectorAll('.productImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');


document.getElementById('scanButton').addEventListener('click', () => {
    const buyerData = {
        username: 'Disintonio',
        cupo: '1'
    };

   
    document.getElementById('buyerUsername').textContent = buyerData.username;
    document.getElementById('buyerCupo').textContent = buyerData.cupo;

   
    document.getElementById('myName').textContent = vendedorNombre;
});


prevButton.addEventListener('click', () => {
    currentImage = (currentImage - 1 + productImages.length) % productImages.length;
    updateGallery();
});

nextButton.addEventListener('click', () => {
    currentImage = (currentImage + 1) % productImages.length;
    updateGallery();
});

function updateGallery() {
    productImages.forEach((image, index) => {
        if (index === currentImage) {
            image.style.display = 'block';
        } else {
            image.style.display = 'none';
        }
    });
}


updateGallery();


document.getElementById('sellButton').addEventListener('click', () => {
    const selectedProduct = productImages[currentImage].getAttribute('data-product');
    const buyerUsername = document.getElementById('buyerUsername').textContent;
    const buyerCupo = document.getElementById('buyerCupo').textContent;
    

   
    const message = `Hola ${buyerUsername},\n\n` +
        `¡Has realizado una compra!\n\n` +
        `Detalles de la compra:\n` +
        `-------------------------\n` +
        `Producto: ${selectedProduct}\n` +
        `Comprador: ${buyerUsername}\n` +
        `Cupo del comprador: ${buyerCupo}\n` +
        `-------------------------\n` +
        `Gracias por tu compra. Esperamos que disfrutes de tu producto.`;

    alert(message);
});

