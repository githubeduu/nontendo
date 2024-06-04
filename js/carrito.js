let carrito = [];
let productos = [
    { id: 1, nombre: "2K Drive", precio: 45990 },
    { id: 2, nombre: "Battlefield 2042", precio: 29990 },
    { id: 3, nombre: "Grand Theft Auto: San Andreas", precio: 24990 }
];

document.addEventListener('DOMContentLoaded', function () {
    function actualizarContadorCarrito() {
        const carritoCount = document.getElementById('carritoCount');
        if (carritoCount) {
            carritoCount.textContent = carrito.length.toString();
        }
    }

    actualizarContadorCarrito();

    document.getElementById('verCarritoBtn').addEventListener('click', () => {
        const url = window.location.href;
        let path = 'carrito.html';
        if (url.includes('Xbox') || url.includes('playstation') || url.includes('nintendo')) {
            path = '../carrito.html';
        }
        window.location.href = `${path}?productos=${JSON.stringify(carrito)}`;
    });

    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            const producto = productos.find(p => p.id === id);
            if (producto) {
                carrito.push(producto);
                actualizarContadorCarrito();
            }
        });
    });

    const params = new URLSearchParams(window.location.search);
    const productosEnCarrito = JSON.parse(params.get('productos'));

    const itemsContainer = document.getElementById('items');
    const footerRow = document.getElementById('footer');

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        footerRow.style.display = 'none'; 

        productosEnCarrito.forEach((producto, index) => {
            const template = document.getElementById('template-carrito');
            const clone = template.content.cloneNode(true);

            const cells = clone.querySelectorAll('td');
            if (cells.length >= 5) {
                cells[0].textContent = index + 1;
                cells[1].textContent = producto.nombre;
                cells[2].textContent = 1;
                cells[4].textContent = '$ ' + producto.precio;

                itemsContainer.appendChild(clone);
            } else {
                console.error('El template de la fila del carrito no tiene suficientes celdas');
            }
        });
    } else {
        if (footerRow) {
            footerRow.style.display = 'table-row'; 
        } 
    }
});
