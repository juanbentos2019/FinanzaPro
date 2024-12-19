document.addEventListener('DOMContentLoaded', () => {
    inicializarEventListeners();
    inicializarSelect();
    ocultarImagenYDatos();
    actualizarPlaceholderSpot();
    aplicarFadeIn();
});

const itemSelect = document.getElementById('item');
const spotInput = document.getElementById('spot');
const porcentajeInput = document.getElementById('porcentaje');
const valorCompraElement = document.getElementById('valor_compra');
const valorVentaElement = document.getElementById('valor_venta');
const imagenItem = document.getElementById('imagen-item');
const imagenMoneda = document.getElementById('imagen-moneda');
const pesoOroElement = document.getElementById('peso-oro');
const pesoBrutoElement = document.getElementById('peso-bruto');
const pesoOnzasElement = document.getElementById('peso-onzas');
const diametroElement = document.getElementById('diametro');
const modal = document.getElementById('modal');
const modalImagen = document.getElementById('modal-imagen');
const cerrarModal = document.getElementsByClassName('cerrar')[0];
const spotValueElement = document.getElementById('spot-value');
const gramValueElement = document.getElementById('gram-value');
const itemSpecificInfo = document.querySelector('.item-specific-info');
const PLACEHOLDER_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const API_URL = 'https://data-asg.goldprice.org/dbXRates/USD';
const GRAMOS_POR_ONZA_TROY = 31.1035;

let imageCache = new Map();
let observer;

function inicializarEventListeners() {
    const burger = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    const closeMenu = document.getElementById('close-menu');

    spotInput.addEventListener('input', () => {
        calcularPrecioGramo();
        calcular();
    });

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    closeMenu.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });

    // Cerrar el menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnBurger = burger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnBurger && navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                const src = lazyImage.dataset.src;
                if (src) {
                    lazyImage.src = src;
                    lazyImage.classList.remove("lazy-load");
                    observer.unobserve(lazyImage);
                }
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });

    document.addEventListener('click', (event) => {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnBurger = burger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnBurger && navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });

    itemSelect.addEventListener('change', () => {
        actualizarImagen();
        calcular();
    });

    spotInput.addEventListener('input', calcular);
    porcentajeInput.addEventListener('input', manejarInputPorcentaje);
    porcentajeInput.addEventListener('blur', validarPorcentaje);
    
    imagenMoneda.addEventListener('click', mostrarModal);
    cerrarModal.addEventListener('click', cerrarModalFunc);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            cerrarModalFunc();
        }
    });

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove("lazy-load");
                observer.unobserve(lazyImage);
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" });

    console.log('Event listeners inicializados correctamente');
}

function manejarInputPorcentaje(e) {
    let valor = e.target.value;
    
    valor = valor.replace(/[^\d.,]/g, '');
    valor = valor.replace('.', ',');
    
    let partes = valor.split(',');
    if (partes.length > 2) {
        valor = partes[0] + ',' + partes.slice(1).join('');
    }
    
    if (partes.length > 1) {
        partes[1] = partes[1].slice(0, 2);
    }
    
    let numeroCompleto = parseFloat(partes[0] + '.' + (partes[1] || '0'));
    if (numeroCompleto > 100) {
        partes[0] = '100';
        partes[1] = '00';
    }
    
    if (partes[0].length > 3) {
        partes[0] = partes[0].slice(0, 3);
    }
    
    valor = partes.length > 1 ? partes[0] + ',' + partes[1] : partes[0];
    
    e.target.value = valor;
    calcular();
}

function validarPorcentaje(e) {
    let valor = e.target.value.replace(',', '.');
    valor = parseFloat(valor);
    
    if (isNaN(valor)) {
        e.target.value = '';
    } else {
        valor = Math.min(Math.max(valor, 0), 100);
        e.target.value = valor.toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }
    calcular();
}

function updateValue(elementId, value) {
    const valueElement = document.getElementById(elementId);
    const valueBar = document.getElementById(`${elementId}-bar`);
  
    if (valueElement && valueBar) {
        valueElement.textContent = `U$S ${value.toFixed(2)}`;
        valueElement.classList.add('show');
  
        setTimeout(() => {
            valueBar.style.width = '100%';
        }, 100);
    }
}
  
function resetValueAnimation(elementId) {
    const valueElement = document.getElementById(elementId);
    const valueBar = document.getElementById(`${elementId}-bar`);
  
    if (valueElement && valueBar) {
        valueElement.classList.remove('show');
        valueBar.style.width = '0';
    }
}
  
function calcularPrecioGramo() {
    const spot = parseFloat(spotInput.value);
    if (isNaN(spot)) {
        resetValueAnimation('gram-value');
        return;
    }
    const gramValue = spot / GRAMOS_POR_ONZA_TROY;
    updateValue('gram-value', gramValue);
}
  
function calcularSpotValue() {
    const item = itemSelect.value;
    const spot = parseFloat(spotInput.value);
  
    if (item === "" || isNaN(spot)) {
        resetValueAnimation('spot-value');
        if (itemSpecificInfo) {
            itemSpecificInfo.style.display = 'none';
        }
        return;
    }
  
    const itemData = itemsData[item];
    if (!itemData) {
        console.error('Datos del ítem no encontrados:', item);
        return;
    }

    const pesoOro = parseFloat(itemData.pesoOro.split(' ')[0]);
    const spotValue = (pesoOro / GRAMOS_POR_ONZA_TROY) * spot;
    
    updateValue('spot-value', spotValue);
    if (itemSpecificInfo) {
        itemSpecificInfo.style.display = 'block';
    }
}

function calcular() {
    const item = itemSelect.value;
    const spot = parseFloat(spotInput.value);
    const porcentaje = parseFloat(porcentajeInput.value.replace(',', '.')) || 0;
    
    console.log('Calculando con porcentaje:', porcentaje);

    if (item === "" || isNaN(spot) || isNaN(porcentaje)) {
        valorCompraElement.textContent = "U$S 0.00";
        valorVentaElement.textContent = "U$S 0.00";
        return;
    }

    const itemData = itemsData[item];
    if (!itemData) {
        console.error('Datos del ítem no encontrados:', item);
        return;
    }

    const pesoOro = parseFloat(itemData.pesoOro.replace(',', '.'));
    
    const precioGramo = spot / GRAMOS_POR_ONZA_TROY;
    const resultado = pesoOro * precioGramo;
    
    const valorCompra = resultado - (porcentaje / 100 * resultado);
    const valorVenta = resultado + (porcentaje / 100 * resultado);

    valorCompraElement.textContent = `U$S ${valorCompra.toFixed(2)}`;
    valorVentaElement.textContent = `U$S ${valorVenta.toFixed(2)}`;

    calcularPrecioGramo();
    calcularSpotValue();
}

function actualizarImagen() {
    const item = itemSelect.value;
    if (item === "") {
        ocultarImagenYDatos();
        return;
    }

    const itemData = itemsData[item];
    if (!itemData) {
        console.error('Datos del ítem no encontrados:', item);
        return;
    }

    imagenItem.classList.add('visible');
    cargarImagen(itemData.imagen);
    pesoOroElement.textContent = itemData.pesoOro;
    pesoBrutoElement.textContent = itemData.pesoBruto;
    diametroElement.textContent = itemData.diametro;
    
    const pesoOroGramos = parseFloat(itemData.pesoOro.split(' ')[0]);
    actualizarPesoOnzas(pesoOroGramos);
    calcularSpotValue();
}

function cargarImagen(src) {
    if (imageCache.has(src)) {
        imagenMoneda.src = imageCache.get(src);
        imagenMoneda.classList.remove("lazy-load");
    } else {
        imagenMoneda.classList.add('lazy-load');
        imagenMoneda.src = PLACEHOLDER_IMAGE;
        imagenMoneda.dataset.src = src;
        observer.observe(imagenMoneda);

        const img = new Image();
        img.onload = () => {
            imageCache.set(src, src);
            if (imagenMoneda.dataset.src === src) {
                imagenMoneda.src = src;
                imagenMoneda.classList.remove("lazy-load");
            }
        };
        img.onerror = () => {
            console.error(`Error al cargar la imagen: ${src}`);
            imagenMoneda.src = PLACEHOLDER_IMAGE;
            imagenMoneda.classList.remove("lazy-load");
        };
        img.src = src;
    }
}

function ocultarImagenYDatos() {
    imagenItem.classList.remove('visible');
    pesoOroElement.textContent = '';
    pesoBrutoElement.textContent = '';
    pesoOnzasElement.textContent = '';
    diametroElement.textContent = '';
    spotValueElement.textContent = 'U$S 0.00';
}

function actualizarResultados(valorCompra, valorVenta) {
    const valorCompraElement = document.getElementById('valor_compra');
    const valorVentaElement = document.getElementById('valor_venta');
    const barraCompra = document.getElementById('barra_compra');
    const barraVenta = document.getElementById('barra_venta');

    valorCompraElement.textContent = `U$S ${valorCompra.toFixed(2)}`;
    valorVentaElement.textContent = `U$S ${valorVenta.toFixed(2)}`;

    // Animación de las barras
    const maxValor = Math.max(valorCompra, valorVenta);
    const anchoBarraCompra = (valorCompra / maxValor) * 100;
    const anchoBarraVenta = (valorVenta / maxValor) * 100;

    barraCompra.style.width = `${anchoBarraCompra}%`;
    barraVenta.style.width = `${anchoBarraVenta}%`;

    // Efecto de aparición
    valorCompraElement.style.opacity = '0';
    valorVentaElement.style.opacity = '0';
    setTimeout(() => {
        valorCompraElement.style.opacity = '1';
        valorVentaElement.style.opacity = '1';
    }, 50);
}

function actualizarPesoOnzas(pesoGramos) {
    const pesoOnzas = (pesoGramos / GRAMOS_POR_ONZA_TROY).toFixed(4);
    pesoOnzasElement.textContent = `${pesoOnzas} oz`;
}

async function obtenerPrecioOro() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.items || !data.items[0] || !data.items[0].xauPrice) {
            throw new Error('Formato de datos inesperado');
        }
        return data.items[0].xauPrice.toFixed(2);
    } catch (error) {
        console.error('Error al obtener el precio del oro:', error);
        return null;
    }
}

async function actualizarPlaceholderSpot() {
    const precioOro = await obtenerPrecioOro();
    if (precioOro !== null) {
        spotInput.placeholder = `Valor del spot a confirmar (${precioOro})`;
        spotInput.value = precioOro;
        calcularPrecioGramo();
        calcular();
    } else {
        spotInput.placeholder = 'Valor del spot a confirmar';
        resetValueAnimation('gram-value');
    }
}

function mostrarModal() {
    modal.style.display = "block";
    modalImagen.src = imagenMoneda.src;
}

function cerrarModalFunc() {
    modal.style.display = "none";
}

function formatearNombreMoneda(key) {
    let nombre = key.replace(/_/g, ' ');
    
    nombre = nombre
        .replace(/(\d+) (\d+)/, '$1/$2')
        .replace(/(\d+) (\d+) oz/, '$1/$2 oz')
        .replace(/(\d+) (\d+) pesos/, '$1/$2 pesos')
        .replace(/(\d+) (\d+) soles/, '$1/$2 soles')
        .replace(/lingote (\d+)g/, 'Lingote $1 g')
        .replace(/lingote (\d+)oz/, 'Lingote $1 oz');

    return nombre;
}

function ordenarItemsAlfabeticamente(items) {
    return Object.entries(items).sort((a, b) => {
        const nombreA = formatearNombreMoneda(a[0]).toLowerCase();
        const nombreB = formatearNombreMoneda(b[0]).toLowerCase();
        return nombreA.localeCompare(nombreB, 'es', { sensitivity: 'base' });
    });
}

function inicializarSelect() {
    itemSelect.innerHTML = '<option value="">Seleccione la moneda</option>';

    const sortedItems = ordenarItemsAlfabeticamente(itemsData);
    
    sortedItems.forEach(([key, value]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = formatearNombreMoneda(key);
        itemSelect.appendChild(option);
    });
}

function aplicarFadeIn() {
    setTimeout(function() {
        document.body.classList.add('fade-in');
    }, 100);
}

function animateNavLinks() {
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

setInterval(async () => {
    const precioOro = await obtenerPrecioOro();
    if (precioOro !== null) {
        spotInput.value = precioOro;
        calcular();
    }
}, 5000);

const itemsData = {
    Alemania_10_marcos: {
        imagen: 'ruta/a/10marcos.png',
        pesoOro: '3.58 g',
        pesoBruto: '3.98 g',
        diametro: '19.5 mm'
    },
    Alemania_20_marcos: {
        imagen: 'ruta/a/imagen_alemania_20_marcos.png',
        pesoOro: '7.16 g',
        pesoBruto: '7.96 g',
        diametro: '22.5 mm'
    },
    Austria_1_ducado: {
        imagen: 'ruta/a/imagen_austria_1_ducado.png',
        pesoOro: '3.451 g',
        pesoBruto: '3.50 g',
        diametro: '20 mm'
    },
    Austria_4_ducados_1612_1830: {
        imagen: 'ruta/a/imagen_austria_4_ducados_1612_1830.jpg',
        pesoOro: '13.804 g',
        pesoBruto: '14.00 g',
        diametro: '39.5 mm'
    },
    Austria_4_ducados_1830: {
        imagen: 'ruta/a/imagen_austria_4_ducados_1830.png',
        pesoOro: '13.1824 g',
        pesoBruto: '13.3696 g',
        diametro: '39.5 mm'
    },
    Austria_100_coronas: {
        imagen: 'ruta/a/imagen_austria_100_coronas.png',
        pesoOro: '30.4878 g',
        pesoBruto: '33.8753 g',
        diametro: '37 mm'
    },
    Austria_20_coronas: {
        imagen: 'ruta/a/imagen_austria_20_coronas.jpg',
        pesoOro: '6.102 g',
        pesoBruto: '6.78 g',
        diametro: '21 mm'
    },
    Austria_100_chelines: {
        imagen: 'ruta/a/imagen_austria_100_chelines.jpg',
        pesoOro: '12.15 g',
        pesoBruto: '13.5 g',
        diametro: '33 mm'
    },
    Belgica_20_francos: {
        imagen: 'ruta/a/imagen_belgica_20_francos.jpg',
        pesoOro: '5.80 g',
        pesoBruto: '6.45 g',
        diametro: '21 mm'
    },
    Canada_maple_leaf_1_10_oz: {
        imagen: 'ruta/a/imagen_canada_maple_leaf_1_10_oz.jpg',
        pesoOro: '3.11 g',
        pesoBruto: '3.12 g',
        diametro: '16 mm'
    },
    Canada_maple_leaf_1_4_oz: {
        imagen: 'ruta/a/imagen_canada_maple_leaf_1_4_oz.jpg',
        pesoOro: '7.78 g',
        pesoBruto: '7.785 g',
        diametro: '20 mm'
    },
    Canada_maple_leaf_1_2_oz: {
        imagen: 'ruta/a/imagen_canada_maple_leaf_1_2_oz.jpg',
        pesoOro: '15.55 g',
        pesoBruto: '15.5515 g',
        diametro: '25 mm'
    },
    Canada_maple_leaf_1_oz: {
        imagen: 'ruta/a/imagen_canada_maple_leaf_1_oz.jpg',
        pesoOro: '31.10 g',
        pesoBruto: '31.1030 g',
        diametro: '30 mm'
    },
    Chile_50_pesos: {
        imagen: 'ruta/a/imagen_chile_50_pesos.jpg',
        pesoOro: '9.15282 g',
        pesoBruto: '101698 g',
        diametro: '24.5 mm'
    },
    Chile_100_pesos: {
        imagen: 'ruta/a/imagen_chile_100_pesos.jpg',
        pesoOro: '18.30573 g',
        pesoBruto: '20.3400 g',
        diametro: '30.5 mm'
    },
    China_panda_1_oz_pre_2016: {
        imagen: 'ruta/a/imagen_china_panda_1_oz_pre_2016.jpg',
        pesoOro: '31.10 g',
        pesoBruto: '31.1036 g',
        diametro: '32.05 mm'
    },
    China_panda_1_oz_desde_2016: {
        imagen: 'ruta/a/imagen_china_panda_1_oz_desde_2016.jpg',
        pesoOro: '30.00 g',
        pesoBruto: '30.00 g',
        diametro: '32 mm'
    },
    USA_5_usd: {
        imagen: 'ruta/a/imagen_eeuu_5_usd.jpg',
        pesoOro: '7.52328 g',
        pesoBruto: '8.36 g',
        diametro: '21.6 mm'
    },
    USA_10_usd: {
        imagen: 'ruta/a/imagen_eeuu_10_usd.jpg',
        pesoOro: '15.04665 g',
        pesoBruto: '16.7180 g',
        diametro: '27 mm'
    },
    USA_20_usd: {
        imagen: 'ruta/a/imagen_eeuu_20_usd.jpg',
        pesoOro: '30.0933 g',
        pesoBruto: '33.436 g',
        diametro: '34 mm'
    },
    USA_aguila_1_10_oz: {
        imagen: 'ruta/a/imagen_eeuu_aguila_1_10_oz.jpg',
        pesoOro: '3.11035 g',
        pesoBruto: '3.93 g',
        diametro: '16.5 mm'
    },
    USA_aguila_1_4_oz: {
        imagen: 'ruta/a/imagen_eeuu_aguila_1_4_oz.jpg',
        pesoOro: '7.77587 g',
        pesoBruto: '8.483 g',
        diametro: '22 mm'
    },
    USA_aguila_1_2_oz: {
        imagen: 'ruta/a/imagen_eeuu_aguila_1_2_oz.jpg',
        pesoOro: '15.55174 g',
        pesoBruto: '16.966 g',
        diametro: '27 mm'
    },
    USA_aguila_1_oz: {
        imagen: 'ruta/a/imagen_eeuu_aguila_1_oz.jpg',
        pesoOro: '31.10 g',
        pesoBruto: '33.93 g',
        diametro: '32.7 mm'
    },
    USA_Buffalo_1_10_oz: {
        imagen: 'ruta/a/imagen_eeuu_buffalo.jpg',
        pesoOro: '3.11035 g',
        pesoBruto: '3.93 g',
        diametro: '16.5 mm'
    },
    USA_Buffalo_1_4_oz: {
        imagen: 'ruta/a/imagen_eeuu_buffalo.jpg',
        pesoOro: '7.77587 g',
        pesoBruto: '8.483 g',
        diametro: '22 mm'
    },
    USA_Buffalo_1_2_oz: {
        imagen: 'ruta/a/imagen_eeuu_buffalo.jpg',
        pesoOro: '15.55174 g',
        pesoBruto: '16.966 g',
        diametro: '27 mm'
    },
    USA_Buffalo_1_oz: {
        imagen: 'ruta/a/imagen_eeuu_buffalo.jpg',
        pesoOro: '31.10 g',
        pesoBruto: '33.93 g',
        diametro: '32.7 mm'
    },
    Francia_10_francos: {
        imagen: 'ruta/a/imagen_francia_10_francos.jpg',
        pesoOro: '2.90 g',
        pesoBruto: '3.22 g',
        diametro: '19 mm'
    },
    Francia_20_francos: {
        imagen: 'ruta/a/imagen_francia_20_francos.jpg',
        pesoOro: '5.80 g',
        pesoBruto: '6.45 g',
        diametro: '21 mm'
    },
    "Inglaterra 1/2 libra": {
        imagen: 'ruta/a/imagen_inglaterra_1_2_libra.jpg',
        pesoOro: '3.66 g',
        pesoBruto: '3.99 g',
        diametro: '19.3 mm'
    },
    "Sudafrica 1 Krugerrand": {
        imagen: 'ruta/a/imagen_krugerrand_oro.jpeg',
        pesoOro: '31.10 g',
        pesoBruto: '33.93 g',
        diametro: '32.77 mm'
    },
    "Inglaterra 1 libra": {
        imagen: 'ruta/a/imagen_libra_oro.png',
        pesoOro: '7.32 g',
        pesoBruto: '7.98 g',
        diametro: '22.05 mm'
    },
    "Mexico 2 Pesos": {
        imagen: 'ruta/a/imagen_mejico_2_pesos.jpg',
        pesoOro: '1.50 g',
        pesoBruto: '1.67 g',
        diametro: '13 mm'
    },
    "Mexico 2.5 Pesos": {
        imagen: 'ruta/a/imagen_mejico_2_50_pesos.jpg',
        pesoOro: '1.87 g',
        pesoBruto: '2.08 g',
        diametro: '14 mm'
    },
    "Mexico 5 Pesos": {
        imagen: 'ruta/a/imagen_mejico_5_pesos.jpg',
        pesoOro: '3.75 g',
        pesoBruto: '4.17 g',
        diametro: '18 mm'
    },
    "Mexico 10 Pesos": {
        imagen: 'ruta/a/imagen_mejico_10_pesos.jpg',
        pesoOro: '7.50 g',
        pesoBruto: '8.33 g',
        diametro: '22 mm'
    },
    "Mexico 20 Pesos": {
        imagen: 'ruta/a/imagen_mejico_20_pesos.jpg',
        pesoOro: '15.00 g',
        pesoBruto: '16.67 g',
        diametro: '27 mm'
    },
    "Mexico 1 onza": {
        imagen: 'ruta/a/imagen_mejico_1_oz.jpg',
        pesoOro: '31.10 g',
        pesoBruto: '31.10 g',
        diametro: '32.7 mm'
    },
    "Mexico 50 Pesos": {
        imagen: 'ruta/a/imagen_mexicana50_oro.jpg',
        pesoOro: '37.5 g',
        pesoBruto: '41.67 g',
        diametro: '37 mm'
    },
    "Peru 5 Soles": {
        imagen: 'ruta/a/imagen_peru_5_soles.jpg',
        pesoOro: '2.106 g',
        pesoBruto: '2.3404 g',
        diametro: '18 mm'
    },
    "Peru 10 Soles 1950-1969": {
        imagen: 'ruta/a/imagen_peru_10_soles.jpg',
        pesoOro: '4.2123 g',
        pesoBruto: '4.68 g',
        diametro: '22 mm'
    },
    "Peru 20 Soles": {
        imagen: 'ruta/a/imagen_peru_20_soles.jpg',
        pesoOro: '8.4246 g',
        pesoBruto: '9.3614 g',
        diametro: '23 mm'
    },
    "Peru 50 Soles": {
        imagen: 'ruta/a/imagen_peru_50_soles.jpg',
        pesoOro: '21.06 g',
        pesoBruto: '23.40 g',
        diametro: '30 mm'
    },
    "Peru 100 Soles": {
        imagen: 'ruta/a/imagen_peru_100_soles.jpg',
        pesoOro: '42.12 g',
        pesoBruto: '46.80 g',
        diametro: '36 mm'
    },
    "Sudafrica 1/10 Krugerrand": {
        imagen: 'ruta/a/imagen_sudafrica_kruger_1_10_oz.jpg',
        pesoOro: '3.11 g',
        pesoBruto: '3.39 g',
        diametro: '16.5 mm'
    },
    "Sudafrica 1/4 Krugerrand": {
        imagen: 'ruta/a/imagen_sudafrica_kruger_1_4_oz.jpg',
        pesoOro: '7.78 g',
        pesoBruto: '8.48 g',
        diametro: '22 mm'
    },
    "Sudafrica 1/2 Krugerrand": {
        imagen: 'ruta/a/imagen_sudafrica_kruger_1_2_oz.jpg',
        pesoOro: '15.55 g',
        pesoBruto: '16.97 g',
        diametro: '27 mm'
    },
    "Suiza 10 Francos": {
        imagen: 'ruta/a/imagen_suiza_10_francos.jpg',
        pesoOro: '2.90 g',
        pesoBruto: '3.22 g',
        diametro: '19 mm'
    },
    "Suiza 20 Francos": {
        imagen: 'ruta/a/imagen_suiza_20_francos.jpg',
        pesoOro: '5.80 g',
        pesoBruto: '6.45 g',
        diametro: '21 mm'
    },
    lingote_1g: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '1 g',
        pesoBruto: '1 g',
        diametro: 'N/A'
    },
    lingote_5g: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '5 g',
        pesoBruto: '5 g',
        diametro: 'N/A'
    },
    lingote_10g: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '10 g',
        pesoBruto: '10 g',
        diametro: 'N/A'
    },
    lingote_20g: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '20 g',
        pesoBruto: '20 g',
        diametro: 'N/A'
    },
    lingote_50g: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '50 g',
        pesoBruto: '50 g',
        diametro: 'N/A'
    },
    lingote_100g: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '100 g',
        pesoBruto: '100 g',
        diametro: 'N/A'
    },
    lingote_250g: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '250 g',
        pesoBruto: '250 g',
        diametro: 'N/A'
    },
    lingote_500g: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '500 g',
        pesoBruto: '500 g',
        diametro: 'N/A'
    },
    lingote_1000g: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '1000 g',
        pesoBruto: '1000 g',
        diametro: 'N/A'
    },

    // Agregar lingotes de oro en onzas
    lingote_1oz: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '31.1035 g',
        pesoBruto: '31.1035 g',
        diametro: 'N/A'
    },
    lingote_5oz: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '155.5175 g',
        pesoBruto: '155.5175 g',
        diametro: 'N/A'
    },
    lingote_10oz: {
        imagen: 'ruta/a/lingote.jpg',
        pesoOro: '311.035 g',
        pesoBruto: '311.035 g',
        diametro: 'N/A'
    }
};

