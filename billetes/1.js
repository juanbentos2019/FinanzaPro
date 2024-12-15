const paisSelect = document.getElementById('pais');
const billetesContainer = document.getElementById('billetes-container');
const billetesLista = document.getElementById('billetes-lista');
const imagenBillete = document.getElementById('imagen-billete');
const imagenBilleteFrente = document.getElementById('imagen-billete-frente');
const imagenBilleteDorso = document.getElementById('imagen-billete-dorso');
const denominacionElement = document.getElementById('denominacion');
const anioEmisionElement = document.getElementById('anio-emision');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.getElementsByClassName('close')[0];
const versionSelect = document.getElementById('version-select');

const paisesBilletes = {
    "Argentina": [
        {
            denominacion: '10 Pesos',
            versiones: [
                { anioEmision: '1998', imagenFrente: 'ruta/a/argentina/argentina_10pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_10pesos_anterior_dorso.jpg' },
                { anioEmision: '2016', imagenFrente: 'ruta/a/argentina/argentina_10pesos_nueva_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_10pesos_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '20 Pesos',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/argentina/argentina_20pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_20pesos_anterior_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/argentina/argentina_20pesos_nueva_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_20pesos_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '50 Pesos',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/argentina/argentina_50pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_50pesos_anterior_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/argentina/argentina_50pesos_malvinas_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_50pesos_malvinas_dorso.jpg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/argentina/argentina_50pesos_nueva_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_50pesos_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '100 Pesos',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/argentina/argentina_100pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_100pesos_anterior_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/argentina/argentina_100pesos_eva_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_50pesos_eva_dorso.jpg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/argentina/argentina_100pesos_nueva_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_100pesos_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '200 Pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/argentina/argentina_200pesos_actual_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_200pesos_actual_dorso.jpg' }
            ]
        },
        {
            denominacion: '500 Pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/argentina/argentina_500pesos_actual_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_500pesos_actual_dorso.jpg' }
            ]
        },
        {
            denominacion: '1000 Pesos',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/argentina/argentina_1000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_1000pesos_anterior_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/argentina/argentina_1000pesos_nuevo_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_1000pesos_nuevo_dorso.jpg' }
            ]
        },
        {
            denominacion: '2000 Pesos',
            versiones: [
                { anioEmision: '2022', imagenFrente: 'ruta/a/argentina/argentina_2000pesos_actual_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_2000pesos_actual_dorso.jpg' }
            ]
        },
        {
            denominacion: '10000 Pesos',
            versiones: [
                { anioEmision: '2024', imagenFrente: 'ruta/a/argentina/argentina_10000pesos_actual_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_10000pesos_actual_dorso.jpg' }
            ]
        },
        // ... (resto de las denominaciones con sus versiones)
    ]
}

function ocultarBilletes() {
    billetesContainer.style.display = 'none';
    imagenBillete.style.display = 'none';
}

function mostrarBilletes(pais) {
    const billetes = paisesBilletes[pais];
    billetesLista.innerHTML = '';
    
    billetes.forEach(billete => {
        const billeteItem = document.createElement('button');
        billeteItem.classList.add('billete-item');
        billeteItem.textContent = billete.denominacion;
        billeteItem.addEventListener('click', () => mostrarDetalleBillete(billete));
        billetesLista.appendChild(billeteItem);
    });

    billetesContainer.style.display = 'block';
    imagenBillete.style.display = 'none';
}

function mostrarDetalleBillete(billete) {
    denominacionElement.textContent = billete.denominacion;
    
    // Llenar el selector de versiones
    versionSelect.innerHTML = '';
    billete.versiones.forEach((version, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = version.anioEmision;
        versionSelect.appendChild(option);
    });

    // Mostrar la primera versión por defecto
    mostrarVersionBillete(billete, 0);
    
    imagenBillete.style.display = 'block';

    // Event listener para cambiar la versión del billete
    versionSelect.addEventListener('change', () => {
        mostrarVersionBillete(billete, versionSelect.value);
    });
}

function mostrarVersionBillete(billete, versionIndex) {
    const version = billete.versiones[versionIndex];
    anioEmisionElement.textContent = version.anioEmision;

    // Mostrar la imagen de frente
    imagenBilleteFrente.src = version.imagenFrente;
    
    // Remover cualquier listener anterior para evitar duplicados
    imagenBilleteFrente.removeEventListener('click', abrirModal);
    imagenBilleteDorso.removeEventListener('click', abrirModal);
    
    // Agregar listener para abrir el modal en la imagen de frente
    imagenBilleteFrente.addEventListener('click', () => abrirModal(version.imagenFrente));
    
    // Verificar si existe una imagen de dorso y actuar en consecuencia
    if (version.imagenDorso && version.imagenDorso !== "") {
        imagenBilleteDorso.src = version.imagenDorso;
        document.querySelector('.imagen-wrapper.dorso').style.display = 'block'; // Mostrar el contenedor
        imagenBilleteDorso.addEventListener('click', () => abrirModal(version.imagenDorso));
    } else {
        // Si no hay imagen de dorso, ocultamos el contenedor completamente
        imagenBilleteDorso.src = ''; // Limpia el src para evitar problemas con imágenes rotas
        document.querySelector('.imagen-wrapper.dorso').style.display = 'none'; // Ocultar el contenedor
    }

    // Asegurarse de mostrar el contenedor de imágenes si está oculto
    imagenBillete.style.display = 'block';
}



function abrirModal(imagenSrc) {
    modalImage.src = imagenSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Bloquear el scroll de la página
}

function cerrarModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar el scroll de la página
}

paisSelect.addEventListener('change', () => {
    const paisSeleccionado = paisSelect.value;
    if (paisSeleccionado) {
        mostrarBilletes(paisSeleccionado);
    } else {
        ocultarBilletes();
    }
});

// Event listener para cerrar el modal
closeBtn.addEventListener('click', cerrarModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        cerrarModal();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Llenar el select con las opciones de países
    Object.keys(paisesBilletes).forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais.charAt(0).toUpperCase() + pais.slice(1);
        paisSelect.appendChild(option);
    });

    // Ocultar billetes al cargar la página
    ocultarBilletes();
});