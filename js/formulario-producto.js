import { API_BASE_URL } from './constants.js';


const STORAGE_KEY = 'etech_productos';

// Vista previa de image
document.getElementById('urlImagen').addEventListener('input', function () {
    const url = this.value.trim();
    const preview = document.getElementById('imagenPreview');
    const container = document.getElementById('previewContainer');
    if (url) {
        preview.src = url;
        container.style.display = 'block';
        preview.onerror = () => { container.style.display = 'none'; };
    } else {
        container.style.display = 'none';
    }
});

// Limpiar formularios
document.getElementById('btnLimpiar').addEventListener('click', () => {
    document.getElementById('productoForm').reset();
    document.getElementById('previewContainer').style.display = 'none';
    document.getElementById('formAlerta').innerHTML = '';
    document.getElementById('productoForm').classList.remove('was-validated');
});

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

function handleAuthError(response) {
    if (response.status === 500) {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
        return true;
    }
    return false;
}

async function crearProducto(e){
    e.preventDefault();
    const form = e.target;
    const alerta = document.getElementById('formAlerta');

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    // // Leer productos existentes
    // const productosExistentes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    // Crear nuevo producto con el mismo formato que productosMock
    const nuevoProducto = {
        nombre: document.getElementById('nombreProducto').value.trim(),
        descripcion: document.getElementById('descripcion').value.trim(),
        precio: parseFloat(document.getElementById('precio').value),
        categoria: document.getElementById('categoria').value,
        urlImagen: document.getElementById('urlImagen').value.trim(),
        stock: parseInt(document.getElementById('stock').value),
        fechaCreacion: new Date()
    };

    try {
        const response = await fetch(`${API_BASE_URL}/productos/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(nuevoProducto)
        });

        console.log(getAuthHeaders())

        if (handleAuthError(response)) return;

        if (!response.ok) {
            Swal.fire({
                title: 'Error de creación',
                text: 'No se pudo crear el producto. Revisa los campos.',
                icon: 'error',
                confirmButtonText: 'Ok',
                customClass: {
                    confirmButton: 'swtalert-confirm-btn'
                }
            });
            return;
        }

        alerta.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    ✅ <strong>${nuevoProducto.nombre}</strong> guardado correctamente.
                    <a href="./catalogo.html" class="alert-link ms-2">Ver catálogo →</a>
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>`;

        form.reset();
        form.classList.remove('was-validated');
        document.getElementById('previewContainer').style.display = 'none';

    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error de creación',
            text: 'No se puede conectar con el servidor, por favor, intenta mas tarde.',
            icon: 'error',
            confirmButtonText: 'Ok',
            customClass: {
                confirmButton: 'swtalert-confirm-btn'
            }
        });
    }
}

// Guardar producto 
document.getElementById('productoForm').addEventListener('submit', crearProducto);

// // Borrar  todos los productos del localStorage 
// document.getElementById('btnBorrarTodos').addEventListener('click', () => {
//     if (confirm('¿Seguro que quieres borrar todos los productos agregados?')) {
//         localStorage.removeItem(STORAGE_KEY);
//         renderListaGuardados();
//     }
// });

// Mostrar listaa de productos guardados 
// function renderListaGuardados() {
//     const productos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
//     const section = document.getElementById('productosGuardadosSection');
//     const lista = document.getElementById('listaProductosGuardados');

//     if (productos.length === 0) {
//         section.style.display = 'none';
//         return;
//     }

//     section.style.display = 'block';
//     lista.innerHTML = productos.map(p => `
//                 <li class="list-group-item d-flex justify-content-between align-items-center">
//                     <div class="d-flex align-items-center gap-2">
//                         <img src="${p.image}" alt="${p.title}"
//                             style="width:40px; height:40px; object-fit:contain;"
//                             onerror="this.src='https://via.placeholder.com/40'">
//                         <div>
//                             <strong>${p.title}</strong>
//                             <span class="text-muted small d-block">$${p.price.toFixed(2)} MXN · Stock: ${p.stock}</span>
//                         </div>
//                     </div>
//                     <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${p.id})">✕</button>
//                 </li>
//             `).join('');
// }

// //  Eliminar producto individual 
// function eliminarProducto(id) {
//     const productos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
//     const filtrados = productos.filter(p => p.id !== id);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
//     renderListaGuardados();
// }

// // Cargar lista al iniciar
// renderListaGuardados();