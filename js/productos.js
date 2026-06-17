const productosMock = [
    {
        id: 1,
        title: "Mini Bocina Bluetooth",
        price: 499,
        description: "Bocina portátil con conexión Bluetooth y sonido potente.",
        category: "gadgets",
        image: "https://sounds.mx/cdn/shop/files/KTS-1678.jpg?v=1752160842&width=1800",
        rating: {
            rate: 4.5,
            count: 80
        }
    },
    {
        id: 2,
        title: "Lámpara LED RGB",
        price: 349,
        description: "Lámpara inteligente con múltiples colores para decorar tu espacio.",
        category: "gadgets",
        image: "https://www.steren.com.mx/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/20766c2ac/foco-led-rgb-decorativo-5-w.jpg",
        rating: {
            rate: 4.4,
            count: 60
        }
    },
    {
        id: 3,
        title: "Apple AirPods Pro 2",
        price: 249.99,
        description: "Audífonos inalámbricos con cancelación de ruido activa, chip H2 y estuche MagSafe.",
        category: "gadgets",
        image: "https://images.unsplash.com/photo-1580477371194-4593e3c7c6cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: {
            rate: 4.8,
            count: 512
        }
    },
    {
        id: 4,
        title: "Samsung Galaxy Watch 6",
        price: 299.99,
        description: "Smartwatch con monitor cardíaco, GPS, pantalla Super AMOLED y batería de 40 horas.",
        category: "gadgets",
        image: "https://images.unsplash.com/photo-1680113727062-8a118574b782?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: {
            rate: 4.5,
            count: 389
        }
    },
    {
        id: 5,
        title: "Soporte Magnético para Celular",
        price: 249,
        description: "Soporte ajustable para smartphones compatible con cualquier dispositivo.",
        category: "gadgets",
        image: "https://m.media-amazon.com/images/I/41Ldi-FVziL._AC_.jpg",
        rating: {
            rate: 4.7,
            count: 110
        }
    },
    {
        id: 6,
        title: "Audífonos Bluetooth",
        price: 799,
        description: "Audífonos inalámbricos con sonido envolvente y batería de larga duración.",
        category: "gadgets",
        image: "https://sounds.mx/cdn/shop/files/7503058305972.jpg?v=1776192102&width=1800",
        rating: {
            rate: 4.7,
            count: 210
        }
    },
    {
        id: 7,
        title: "GameBoy Color",
        price: 99.99,
        description: "Consola de videojuegos portátil retro de la compañoa Nintendo",
        category: "Gadgets",
        image: "https://images.unsplash.com/photo-1623990672451-13d0fd9780e0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: {
            rate: 4.9,
            count: 15,
        }
    },
    {
        id: 8,
        title: "Mousepad Gamer",
        price: 350,
        description: "El gaming mousepad Abysmal Arena es el complemento perfecto que no puede faltar en tu campo de batalla gamer.",
        category: "Gadgets",
        image: "https://www.stuffactory.mx/cdn/shop/products/STG-A16901_AA_MousePad-1.jpg?v=1655997652",
        rating: {
            rate: 4.5,
            count: 100,
        }
    },
    {
        id: 9,
        title: "MacBook Air M3",
        price: 1099,
        description: "Laptop ultradelgada con chip M3 de Apple, pantalla Liquid Retina de 13.6 pulgadas y hasta 18 horas de batería.",
        category: "laptops",
        image: "https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: {
            rate: 4.9,
            count: 850
        }
    },
    {
        id: 10,
        title: "Sony WH-1000XM5",
        price: 349.99,
        description: "Audífonos inalámbricos con cancelación de ruido líder en la industria, 30 horas de batería y micrófono optimizado para llamadas.",
        category: "gadgets",
        image: "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: {
            rate: 4.8,
            count: 1250
        }
    },
    {
        id: 11,
        title: "Lampara de lava",
        price: 59.50,
        description: "Lampara decorativa para cuarto habitación",
        category: "Gadgets",
        image: "https://images.unsplash.com/photo-1574882225022-5f45b99d4966?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: {
            rate: 4.2,
            count: 10
        }
    }
]

document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("productos-container");
    productosMock.forEach(producto => {
        const productoCard = document.createElement("div");
        productoCard.classList.add("col");
        productoCard.innerHTML = `
                        <div class="card h-100 border-0 shadow-sm custom-card">
                            <div class="img-container">
                                <img src="${producto.image}" class="card-img-top p-3 rounded"
                                    alt="${producto.title}">
                            </div>
                            <div class="card-body d-flex flex-column text-center">
                                <h5 class="card-title fw-bold text-dark mb-2">${producto.title}</h5>
                                <p class="card-text text-muted small flex-grow-1">${producto.description}</p>
                                <div class="mt-3">
                                    <span class="d-block mb-2 fs-5 fw-bold text-dark">$${producto.price.toFixed(2)} MXN</span>
                                    <a href="#"
                                        class="btn btn-dark w-100 rounded-pill fw-semibold shadow-sm custom-btn">Agregar
                                        al
                                        carrito</a>
                                </div>
                            </div>
                        </div>
        `;
        productosContainer.appendChild(productoCard);
    });
});

