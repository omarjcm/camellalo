const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Servicios = require('./models/servicios');
const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
})
  
const upload = multer({ storage: storage });
  
mongoose.connect('mongodb+srv://jordy:JALMpc1234@cluster0.rfbfysg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
mongoose.connection.once('open', () => {
    console.log('Conexión a MongoDB establecida');
});

app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post('/register', upload.fields([{ name: 'logo_emp', maxCount: 1 }, { name: 'img_serv', maxCount: 1 }]), async (req, res) => {
    try {
        const { nombre_emp, nombre_serv, descripcion, stock, valor } = req.body;
        const logo_emp = req.files.logo_emp[0].path;
        const img_serv = req.files.img_serv[0].path;
        const serv = new Servicios({ nombre_emp, logo_emp, nombre_serv, img_serv, descripcion, stock, valor });
        await serv.save();
        res.status(200).send('Registro Guardado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el registro');
    }
});

app.get('/catalogo', async (req, res) => {
    try {
        const mostrar = await Servicios.find();
        res.json( mostrar )
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los datos')
    }
});

app.post('/comprar/:id', async (req, res) => {
    try {
        const servicioId = req.params.id;
        const { cantidad } = req.body;

        const servicio = await Servicios.findById(servicioId);

        if (!servicio) {
            return res.status(404).send('Servicio no encontrado');
        }

        if (cantidad <= servicio.stock) {
            servicio.stock -= cantidad;
            await servicio.save();
            res.status(200).send('Compra realizada con éxito');
        } else {
            res.status(400).send('No hay suficiente stock disponible');
        }
    } catch (error) {
        console.error('Error al procesar la compra:', error);
        res.status(500).send('Error al procesar la compra');
    }
});

app.post('/editar/:id', upload.fields([{ name: 'logo_emp' }, { name: 'img_serv' }]), async (req, res) => {
    try {
        const id = req.params.id;
        const servicioEditado = req.body;

        // Añade las imágenes a servicioEditado, si están presentes
        if (req.files.logo_emp) {
            servicioEditado.logo_emp = req.files.logo_emp[0].path;
        }
        
        if (req.files.img_serv) {
            servicioEditado.img_serv = req.files.img_serv[0].path;
        }
        
        await Servicios.findByIdAndUpdate(id, servicioEditado);
        
        res.status(200).send();
    } catch (error) {
        console.error('Error editando el producto:', error);
        res.status(500).send();
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});