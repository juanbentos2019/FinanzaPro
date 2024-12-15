document.addEventListener('DOMContentLoaded', () => {
    inicializarEventListeners();
    cargarPaisesEnOrden();
});

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
const paisInfo = document.getElementById('pais-info');

let paisActual = '';

const billetesEuro = [
    {
        denominacion: '5 Euros',
        versiones: [
            { anioEmision: '2002', imagenFrente: 'ruta/a/euro/euro_5euros_anterior_frente.jpg', imagenDorso: 'ruta/a/euro/euro_5euros_anterior_dorso.jpg' },
            { anioEmision: '2013', imagenFrente: 'ruta/a/euro/euro_5euros_medio_frente.png', imagenDorso: 'ruta/a/euro/euro_5euros_medio_dorso.png' }
            
        ]
    },
    {
        denominacion: '10 Euros',
        versiones: [
            { anioEmision: '2002', imagenFrente: 'ruta/a/euro/euro_10euros_anterior_frente.jpg', imagenDorso: 'ruta/a/euro/euro_10euros_anterior_dorso.jpg' },
            { anioEmision: '2014', imagenFrente: 'ruta/a/euro/euro_10euros_medio_frente.png', imagenDorso: 'ruta/a/euro/euro_10euros_medio_dorso.png' }
            
        ]
    },
    {
        denominacion: '20 Euros',
        versiones: [
            { anioEmision: '2002', imagenFrente: 'ruta/a/euro/euro_20euros_anterior_frente.jpg', imagenDorso: 'ruta/a/euro/euro_20euros_anterior_dorso.jpg' },
            { anioEmision: '2015', imagenFrente: 'ruta/a/euro/euro_20euros_medio_frente.jpg', imagenDorso: 'ruta/a/euro/euro_20euros_medio_dorso.jpg' }
            
        ]
    },
    {
        denominacion: '50 Euros',
        versiones: [
            { anioEmision: '2002', imagenFrente: 'ruta/a/euro/euro_50euros_anterior_frente.jpg', imagenDorso: 'ruta/a/euro/euro_50euros_anterior_dorso.jpg' },
            { anioEmision: '2017', imagenFrente: 'ruta/a/euro/euro_50euros_medio_frente.png', imagenDorso: 'ruta/a/euro/euro_50euros_medio_dorso.png' }
            
        ]
    },
    {
        denominacion: '100 Euros',
        versiones: [
            { anioEmision: '2002', imagenFrente: 'ruta/a/euro/euro_100euros_anterior_frente.jpg', imagenDorso: 'ruta/a/euro/euro_100euros_anterior_dorso.jpg' },
            { anioEmision: '2019', imagenFrente: 'ruta/a/euro/euro_100euros_medio_frente.jpg', imagenDorso: 'ruta/a/euro/euro_100euros_medio_dorso.jpg' }
            
        ]
    },
    {
        denominacion: '200 Euros',
        versiones: [
            { anioEmision: '2002', imagenFrente: 'ruta/a/euro/euro_200euros_anterior_frente.jpg', imagenDorso: 'ruta/a/euro/euro_200euros_anterior_dorso.jpg' },
            { anioEmision: '2019', imagenFrente: 'ruta/a/euro/euro_200euros_medio_frente.jpg', imagenDorso: 'ruta/a/euro/euro_200euros_medio_dorso.jpg' }
            
        ]
    },
    {
        denominacion: '500 Euros',
        versiones: [
            { anioEmision: '2002', imagenFrente: 'ruta/a/euro/euro_500euros_anterior_frente.jpg', imagenDorso: 'ruta/a/euro/euro_500euros_anterior_dorso.jpg' }
            
            
        ]
    }
];

const paisesBilletes = {
    "Alemania": billetesEuro,
    "Austria": billetesEuro,
    "Bélgica": billetesEuro,
    "Chipre": billetesEuro,
    "Croacia": billetesEuro,
    "Eslovaquia": billetesEuro,
    "Eslovenia": billetesEuro,
    "España": billetesEuro,
    "Estonia": billetesEuro,
    "Finlandia": billetesEuro,
    "Francia": billetesEuro,
    "Grecia": billetesEuro,
    "Irlanda": billetesEuro,
    "Italia": billetesEuro,
    "Letonia": billetesEuro,
    "Lituania": billetesEuro,
    "Luxemburgo": billetesEuro,
    "Malta": billetesEuro,
    "Países Bajos": billetesEuro,
    "Portugal": billetesEuro,
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
        {
            denominacion: '20000 Pesos',
            versiones: [
                { anioEmision: '2024', imagenFrente: 'ruta/a/argentina/argentina_20000pesos_actual_frente.jpg', imagenDorso: 'ruta/a/argentina/argentina_20000pesos_actual_dorso.jpg' }
            ]
        }
        // ... (resto de las denominaciones con sus versiones)
    ],
    "Brasil": [
        {
            denominacion: '2 reales',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/brasil/brasil_2reales_anterior_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_2reales_anterior_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/brasil/brasil_2reales_nueva_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_2reales_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '5 reales',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/brasil/brasil_5reales_anterior_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_5reales_anterior_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/brasil/brasil_5reales_nueva_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_5reales_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '10 reales',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/brasil/brasil_10reales_anterior_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_10reales_anterior_dorso.jpg' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/brasil/brasil_10reales_nueva_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_10reales_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '20 reales',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/brasil/brasil_20reales_anterior_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_20reales_anterior_dorso.jpg' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/brasil/brasil_20reales_nueva_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_20reales_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '50 reales',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/brasil/brasil_50reales_anterior_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_50reales_anterior_dorso.jpg' },
                { anioEmision: '2010', imagenFrente: 'ruta/a/brasil/brasil_50reales_nueva_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_50reales_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '100 reales',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/brasil/brasil_100reales_anterior_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_100reales_anterior_dorso.jpg' },
                { anioEmision: '2010', imagenFrente: 'ruta/a/brasil/brasil_100reales_nueva_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_100reales_nueva_dorso.jpg' }
            ]
        },
        {
            denominacion: '200 reales',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/brasil/brasil_200reales_anterior_frente.jpg', imagenDorso: 'ruta/a/brasil/brasil_200reales_anterior_dorso.jpg' }
                
            ]
        },
    ],
    "Estados Unidos": [
        {
            denominacion: '1 dolar',
            versiones: [
                { anioEmision: '1935', imagenFrente: 'ruta/a/usa/usa_1dolar_anterior_frente.jpg', imagenDorso: 'ruta/a/usa/usa_1dolar_anterior_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '5 dolares',
            versiones: [
                { anioEmision: '1914', imagenFrente: 'ruta/a/usa/usa_5dolar_anterior_frente.jpg', imagenDorso: 'ruta/a/usa/usa_5dolar_anterior_dorso.jpg' },
                { anioEmision: '1990', imagenFrente: 'ruta/a/usa/usa_5dolar_medio_frente.jpg', imagenDorso: 'ruta/a/usa/usa_5dolar_medio_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/usa/usa_5dolar_nuevo_frente.jpg', imagenDorso: 'ruta/a/usa/usa_5dolar_nuevo_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '10 dolares',
            versiones: [
                { anioEmision: '1914', imagenFrente: 'ruta/a/usa/usa_10dolar_anterior_frente.jpg', imagenDorso: 'ruta/a/usa/usa_10dolar_anterior_dorso.jpg' },
                { anioEmision: '1990', imagenFrente: 'ruta/a/usa/usa_10dolar_medio_frente.jpg', imagenDorso: 'ruta/a/usa/usa_10dolar_medio_dorso.jpg' },
                { anioEmision: '2004', imagenFrente: 'ruta/a/usa/usa_10dolar_nuevo_frente.jpg', imagenDorso: 'ruta/a/usa/usa_10dolar_nuevo_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '20 dolares',
            versiones: [
                { anioEmision: '1935', imagenFrente: 'ruta/a/usa/usa_20dolar_anterior_frente.jpg', imagenDorso: 'ruta/a/usa/usa_20dolar_anterior_dorso.jpg' },
                { anioEmision: '1990', imagenFrente: 'ruta/a/usa/usa_20dolar_medio_frente.jpg', imagenDorso: 'ruta/a/usa/usa_20dolar_medio_dorso.jpg' },
                { anioEmision: '2004', imagenFrente: 'ruta/a/usa/usa_20dolar_nuevo_frente.jpg', imagenDorso: 'ruta/a/usa/usa_20dolar_nuevo_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '50 dolares',
            versiones: [
                { anioEmision: '1935', imagenFrente: 'ruta/a/usa/usa_50dolar_anterior_frente.jpg', imagenDorso: 'ruta/a/usa/usa_50dolar_anterior_dorso.jpg' },
                { anioEmision: '1996', imagenFrente: 'ruta/a/usa/usa_50dolar_medio_frente.jpg', imagenDorso: 'ruta/a/usa/usa_50dolar_medio_dorso.jpg' },
                { anioEmision: '2006', imagenFrente: 'ruta/a/usa/usa_50dolar_nuevo_frente.jpg', imagenDorso: 'ruta/a/usa/usa_50dolar_nuevo_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '100 dolares',
            versiones: [
                { anioEmision: '1935', imagenFrente: 'ruta/a/usa/usa_100dolar_anterior_frente.jpg', imagenDorso: 'ruta/a/usa/usa_100dolar_anterior_dorso.jpg' },
                { anioEmision: '1996', imagenFrente: 'ruta/a/usa/usa_100dolar_medio_frente.jpg', imagenDorso: 'ruta/a/usa/usa_100dolar_medio_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/usa/usa_100dolar_nuevo_frente.jpg', imagenDorso: 'ruta/a/usa/usa_100dolar_nuevo_dorso.jpg' }
                
            ]
        },
    ],
    "Inglaterra": [
        {
            denominacion: '5 Libras',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/inglaterra/inglaterra_5libras_anterior_frente.jpg', imagenDorso: 'ruta/a/inglaterra/inglaterra_5libras_anterior_dorso.jpg' },
                { anioEmision: '2024', imagenFrente: 'ruta/a/inglaterra/inglaterra_5libras_medio_frente.jpg', imagenDorso: 'ruta/a/inglaterra/inglaterra_5libras_medio_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '10 Libras',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/inglaterra/inglaterra_10libras_anterior_frente.jpg', imagenDorso: 'ruta/a/inglaterra/inglaterra_10libras_anterior_dorso.jpg' },
                { anioEmision: '2024', imagenFrente: 'ruta/a/inglaterra/inglaterra_10libras_medio_frente.jpg', imagenDorso: 'ruta/a/inglaterra/inglaterra_10libras_medio_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '20 Libras',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/inglaterra/inglaterra_20libras_anterior_frente.jpg', imagenDorso: 'ruta/a/inglaterra/inglaterra_20libras_anterior_dorso.jpg' },
                { anioEmision: '2024', imagenFrente: 'ruta/a/inglaterra/inglaterra_20libras_medio_frente.jpg', imagenDorso: 'ruta/a/inglaterra/inglaterra_20libras_medio_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '50 Libras',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/inglaterra/inglaterra_50libras_anterior_frente.jpg', imagenDorso: 'ruta/a/inglaterra/inglaterra_50libras_anterior_dorso.jpg' },
                { anioEmision: '2024', imagenFrente: 'ruta/a/inglaterra/inglaterra_50libras_medio_frente.jpg', imagenDorso: 'ruta/a/inglaterra/inglaterra_50libras_medio_dorso.jpg' }
                
            ]
        },
    ],
    "Canada": [
        {
            denominacion: '5 dolares',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/canada/canada_5dolares_anterior_frente.png', imagenDorso: 'ruta/a/canada/canada_5dolares_anterior_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '10 dolares',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/canada/canada_10dolares_anterior_frente.png', imagenDorso: 'ruta/a/canada/canada_10dolares_anterior_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '20 dolares',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/canada/canada_20dolares_anterior_frente.png', imagenDorso: 'ruta/a/canada/canada_20dolares_anterior_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '50 dolares',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/canada/canada_50dolares_anterior_frente.png', imagenDorso: 'ruta/a/canada/canada_50dolares_anterior_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '100 dolares',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/canada/canada_100dolares_anterior_frente.png', imagenDorso: 'ruta/a/canada/canada_100dolares_anterior_dorso.png' }
                
                
            ]
        },
    ],
    "Australia": [
        {
            denominacion: '5 dolares',
            versiones: [
                //{ anioEmision: '1992', imagenFrente: 'ruta/a/australia/australia_5dolares_anterior_frente.png', imagenDorso: 'ruta/a/australia/australia_5dolares_anterior_dorso.png' },
                { anioEmision: '2016', imagenFrente: 'ruta/a/australia/australia_5dolares_nueva_frente.png', imagenDorso: 'ruta/a/australia/australia_5dolares_nueva_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '10 dolares',
            versiones: [
               // { anioEmision: '1993', imagenFrente: 'ruta/a/australia/australia_10dolares_anterior_frente.png', imagenDorso: 'ruta/a/australia/australia_10dolares_anterior_dorso.png' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/australia/australia_10dolares_nueva_frente.png', imagenDorso: 'ruta/a/australia/australia_10dolares_nueva_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '20 dolares',
            versiones: [
                //{ anioEmision: '1994', imagenFrente: 'ruta/a/australia/australia_20dolares_anterior_frente.png', imagenDorso: 'ruta/a/australia/australia_20dolares_anterior_dorso.png' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/australia/australia_20dolares_nueva_frente.png', imagenDorso: 'ruta/a/australia/australia_20dolares_nueva_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '50 dolares',
            versiones: [
                //{ anioEmision: '1995', imagenFrente: 'ruta/a/australia/australia_50dolares_anterior_frente.png', imagenDorso: 'ruta/a/australia/australia_50dolares_anterior_dorso.png' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/australia/australia_50dolares_nueva_frente.png', imagenDorso: 'ruta/a/australia/australia_50dolares_nueva_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '100 dolares',
            versiones: [
                //{ anioEmision: '1996', imagenFrente: 'ruta/a/australia/australia_100dolares_anterior_frente.png', imagenDorso: 'ruta/a/australia/australia_100dolares_anterior_dorso.png' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/australia/australia_100dolares_nueva_frente.png', imagenDorso: 'ruta/a/australia/australia_100dolares_nueva_dorso.png' }
                
                
            ]
        }

    ],
    "Chile": [
        {
            denominacion: '1000 pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/chile/chile_1000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/chile/chile_1000pesos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '2000 pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/chile/chile_2000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/chile/chile_2000pesos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '5000 pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/chile/chile_5000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/chile/chile_5000pesos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '10000 pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/chile/chile_10000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/chile/chile_10000pesos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '20000 pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/chile/chile_20000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/chile/chile_20000pesos_anterior_dorso.jpg' }
                
                
            ]
        },
    ],
    "Mexico": [
        {
            denominacion: '20 pesos',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/mexico/mexico_20pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/mexico/mexico_20pesos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '50 pesos',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/mexico/mexico_50pesos_anterior_frente.png', imagenDorso: 'ruta/a/mexico/mexico_50pesos_anterior_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '100 pesos',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/mexico/mexico_100pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/mexico/mexico_100pesos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '200 pesos',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/mexico/mexico_200pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/mexico/mexico_200pesos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '500 pesos',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/mexico/mexico_500pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/mexico/mexico_500pesos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '1000 pesos',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/mexico/mexico_1000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/mexico/mexico_1000pesos_anterior_dorso.jpg' }
                
                
            ]
        }
    ],
    "China": [
        {
            denominacion: '10 yuanes',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/china/china_10yuanes_anterior_frente.jpg', imagenDorso: 'ruta/a/china/china_10yuanes_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '20 yuanes',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/china/china_20yuanes_anterior_frente.jpg', imagenDorso: 'ruta/a/china/china_20yuanes_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '50 yuanes',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/china/china_50yuanes_anterior_frente.jpg', imagenDorso: 'ruta/a/china/china_50yuanes_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '100 yuanes',
            versiones: [
                { anioEmision: '2020', imagenFrente: 'ruta/a/china/china_100yuanes_anterior_frente.jpg', imagenDorso: 'ruta/a/china/china_1000yuanes_anterior_dorso.jpg' }
                
                
            ]
        }
    ],
    "Peru": [
        {
            denominacion: '10 soles',
            versiones: [
                { anioEmision: '1991', imagenFrente: 'ruta/a/peru/peru_10soles_anterior_frente.jpg', imagenDorso: 'ruta/a/peru/peru_10soles_anterior_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/peru/peru_10soles_medio_frente.jpg', imagenDorso: 'ruta/a/peru/peru_10soles_medio_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/peru/peru_10soles_ultimo_frente.jpg', imagenDorso: 'ruta/a/peru/peru_10soles_ultimo_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '20 soles',
            versiones: [
                { anioEmision: '1991', imagenFrente: 'ruta/a/peru/peru_20soles_anterior_frente.jpg', imagenDorso: 'ruta/a/peru/peru_20soles_anterior_dorso.jpg' },
                { anioEmision: '2009', imagenFrente: 'ruta/a/peru/peru_20soles_medio_frente.jpg', imagenDorso: 'ruta/a/peru/peru_20soles_medio_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/peru/peru_20soles_ultimo_frente.jpg', imagenDorso: 'ruta/a/peru/peru_20soles_ultimo_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '50 soles',
            versiones: [
                { anioEmision: '1991', imagenFrente: 'ruta/a/peru/peru_50soles_anterior_frente.jpg', imagenDorso: 'ruta/a/peru/peru_50soles_anterior_dorso.jpg' },
                { anioEmision: '2009', imagenFrente: 'ruta/a/peru/peru_50soles_medio_frente.jpg', imagenDorso: 'ruta/a/peru/peru_50soles_medio_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/peru/peru_50soles_ultimo_frente.jpg', imagenDorso: 'ruta/a/peru/peru_50soles_ultimo_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '100 soles',
            versiones: [
                { anioEmision: '1991', imagenFrente: 'ruta/a/peru/peru_100soles_anterior_frente.jpg', imagenDorso: 'ruta/a/peru/peru_100soles_anterior_dorso.jpg' },
                { anioEmision: '2009', imagenFrente: 'ruta/a/peru/peru_100soles_medio_frente.jpg', imagenDorso: 'ruta/a/peru/peru_100soles_medio_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/peru/peru_100soles_ultimo_frente.jpg', imagenDorso: 'ruta/a/peru/peru_100soles_ultimo_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '200 soles',
            versiones: [
                { anioEmision: '1991', imagenFrente: 'ruta/a/peru/peru_200soles_anterior_frente.jpg', imagenDorso: 'ruta/a/peru/peru_200soles_anterior_dorso.jpg' },
                { anioEmision: '2009', imagenFrente: 'ruta/a/peru/peru_200soles_medio_frente.jpg', imagenDorso: 'ruta/a/peru/peru_200soles_medio_dorso.jpg' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/peru/peru_200soles_ultimo_frente.jpg', imagenDorso: 'ruta/a/peru/peru_200soles_ultimo_dorso.jpg' }
                
                
            ]
        }
        
    ],
    "Suiza": [
        {
            denominacion: '10 Francos Suizos',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/suiza/suiza_10francos_anterior_frente.jpg', imagenDorso: 'ruta/a/suiza/suiza_10francos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '20 Francos Suizos',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/suiza/suiza_20francos_anterior_frente.jpg', imagenDorso: 'ruta/a/suiza/suiza_20francos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '50 Francos Suizos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/suiza/suiza_50francos_anterior_frente.jpg', imagenDorso: 'ruta/a/suiza/suiza_50francos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '100 Francos Suizos',
            versiones: [
                { anioEmision: '2019', imagenFrente: 'ruta/a/suiza/suiza_100francos_anterior_frente.jpg', imagenDorso: 'ruta/a/suiza/suiza_100francos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '200 Francos Suizos',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/suiza/suiza_200francos_anterior_frente.jpg', imagenDorso: 'ruta/a/suiza/suiza_200francos_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '1000 Francos Suizos',
            versiones: [
                { anioEmision: '2019', imagenFrente: 'ruta/a/suiza/suiza_1000francos_anterior_frente.jpg', imagenDorso: 'ruta/a/suiza/suiza_1000francos_anterior_dorso.jpg' }
                
                
            ]
        }
    ],
    "Suecia": [
        
        {
            denominacion: '20 Coronas suecas',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/suecia/suecia_20coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/suecia/suecia_20coronas_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '50 Coronas suecas',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/suecia/suecia_50coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/suecia/suecia_50coronas_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '100 Coronas suecas',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/suecia/suecia_100coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/suecia/suecia_100coronas_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '200 Coronas suecas',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/suecia/suecia_200coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/suecia/suecia_200coronas_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '500 Coronas suecas',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/suecia/suecia_500coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/suecia/suecia_500coronas_anterior_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '1000 Coronas suecas',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/suecia/suecia_1000coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/suecia/suecia_1000coronas_anterior_dorso.jpg' }
                
                
            ]
        }
    ],
    "Nueva Zelanda": [
        
        {
            denominacion: '5 dolar neozelandes',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/zelanda/zelanda_5dolarneozelanes_anterior_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_5dolarneozelanes_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/zelanda/zelanda_5dolarneozelanes_nuevo_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_5dolarneozelanes_nuevo_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '10 dolar neozelandes',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/zelanda/zelanda_10dolarneozelanes_anterior_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_10dolarneozelanes_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/zelanda/zelanda_10dolarneozelanes_nuevo_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_10dolarneozelanes_nuevo_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '20 dolar neozelandes',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/zelanda/zelanda_20dolarneozelanes_anterior_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_20dolarneozelanes_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/zelanda/zelanda_20dolarneozelanes_nuevo_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_20dolarneozelanes_nuevo_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '50 dolar neozelandes',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/zelanda/zelanda_50dolarneozelanes_anterior_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_50dolarneozelanes_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/zelanda/zelanda_50dolarneozelanes_nuevo_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_50dolarneozelanes_nuevo_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '100 dolar neozelandes',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/zelanda/zelanda_100dolarneozelanes_anterior_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_100dolarneozelanes_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/zelanda/zelanda_100dolarneozelanes_nuevo_frente.jpg', imagenDorso: 'ruta/a/zelanda/zelanda_100dolarneozelanes_nuevo_dorso.jpg' }
                
                
            ]
        }
    ],
    "Rusia": [
        
        {
            denominacion: '5 Rublos',
            versiones: [
                { anioEmision: '1997', imagenFrente: 'ruta/a/rusia/rusia_5rublos_anterior_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_5rublos_anterior_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '10 Rublos',
            versiones: [
                { anioEmision: '1997', imagenFrente: 'ruta/a/rusia/rusia_10rublos_anterior_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_10rublos_anterior_dorso.jpg' },
                { anioEmision: '2001', imagenFrente: 'ruta/a/rusia/rusia_10rublos_medio_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_10rublos_medio_dorso.jpg' },
                { anioEmision: '2004', imagenFrente: 'ruta/a/rusia/rusia_10rublos_nuevo_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_10rublos_nuevo_dorso.jpg' }
            ]  

        },
        {
            denominacion: '50 Rublos',
            versiones: [
                { anioEmision: '1997', imagenFrente: 'ruta/a/rusia/rusia_50rublos_anterior_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_50rublos_anterior_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '100 Rublos',
            versiones: [
                { anioEmision: '2004', imagenFrente: 'ruta/a/rusia/rusia_100rublos_anterior_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_100rublos_anterior_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/rusia/rusia_100rublos_nuevo_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_100rublos_nuevo_dorso.jpg' }                


            ]  

        },
        {
            denominacion: '200 Rublos',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/rusia/rusia_200rublos_anterior_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_200rublos_anterior_dorso.jpg' }                
            ]  

        },
        {
            denominacion: '500 Rublos',
            versiones: [
                { anioEmision: '1997', imagenFrente: 'ruta/a/rusia/rusia_500rublos_anterior_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_500rublos_anterior_dorso.jpg' },
                { anioEmision: '2001', imagenFrente: 'ruta/a/rusia/rusia_500rublos_anterior2001_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_500rublos_anterior2001_dorso.jpg' },
                { anioEmision: '2004', imagenFrente: 'ruta/a/rusia/rusia_500rublos_anterior2004_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_500rublos_anterior2004_dorso.jpg' },
                { anioEmision: '2010', imagenFrente: 'ruta/a/rusia/rusia_500rublos_nuevo_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_500rublos_nuevo_dorso.jpg' }
            ]  

        },
        {
            denominacion: '1000 Rublos',
            versiones: [
                { anioEmision: '1997', imagenFrente: 'ruta/a/rusia/rusia_1000rublos_1_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_1000rublos_1_dorso.jpg' },
                { anioEmision: '2004', imagenFrente: 'ruta/a/rusia/rusia_1000rublos_2_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_1000rublos_2_dorso.jpg' },
                { anioEmision: '2010', imagenFrente: 'ruta/a/rusia/rusia_1000rublos_3_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_1000rublos_3_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/rusia/rusia_1000rublos_4_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_1000rublos_4_dorso.jpg' }
            ]  

        },
        {
            denominacion: '2000 Rublos',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/rusia/rusia_2000rublos_anterior_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_2000rublos_anterior_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '5000 Rublos',
            versiones: [
                { anioEmision: '1997', imagenFrente: 'ruta/a/rusia/rusia_5000rublos_anterior_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_5000rublos_anterior_dorso.jpg' },
                { anioEmision: '2010', imagenFrente: 'ruta/a/rusia/rusia_5000rublos_medio_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_5000rublos_medio_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/rusia/rusia_5000rublos_nuevo_frente.jpg', imagenDorso: 'ruta/a/rusia/rusia_5000rublos_nuevo_dorso.jpg' }
            ]  

        }
        
    ],
    "India": [
        
        {
            denominacion: '10 Rupias',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/india/india_10rupias_anterior_frente.jpg', imagenDorso: 'ruta/a/india/india_10rupias_anterior_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '20 Rupias',
            versiones: [
                { anioEmision: '2019', imagenFrente: 'ruta/a/india/india_20rupias_anterior_frente.jpg', imagenDorso: 'ruta/a/india/india_20rupias_anterior_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '50 Rupias',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/india/india_50rupias_anterior_frente.jpg', imagenDorso: 'ruta/a/india/india_50rupias_anterior_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '100 Rupias',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/india/india_100rupias_anterior_frente.jpg', imagenDorso: 'ruta/a/india/india_100rupias_anterior_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '500 y 2000 Rupias',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/india/india_500rupias_anterior_frente.jpg', imagenDorso: 'ruta/a/india/india_2000rupias_anterior_frente.jpg' }
                
            ]  

        }
    ],
    "Sudafrica": [
        
        {
            denominacion: '10 Rand',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/sudafrica/sudafrica_10rand_anterior_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_10rand_anterior_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/sudafrica/sudafrica_10rand_nuevo_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_10rand_nuevo_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '20 Rand',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/sudafrica/sudafrica_20rand_anterior_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_20rand_anterior_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/sudafrica/sudafrica_20rand_nuevo_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_20rand_nuevo_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '50 Rand',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/sudafrica/sudafrica_50rand_anterior_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_50rand_anterior_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/sudafrica/sudafrica_50rand_nuevo_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_50rand_nuevo_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '100 Rand',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/sudafrica/sudafrica_100rand_anterior_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_100rand_anterior_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/sudafrica/sudafrica_100rand_nuevo_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_100rand_nuevo_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '200 Rand',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/sudafrica/sudafrica_200rand_anterior_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_200rand_anterior_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/sudafrica/sudafrica_200rand_nuevo_frente.jpg', imagenDorso: 'ruta/a/sudafrica/sudafrica_200rand_nuevo_dorso.jpg' }
                
            ]  

        }
    ] , 
    "Dinamarca": [
        
        {
            denominacion: '50 Coronas',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/dinamarca/dinamarca_50coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/dinamarca/dinamarca_50coronas_anterior_dorso.jpg' }
                
                
            ]  

        },
        {
            denominacion: '100 Coronas',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/dinamarca/dinamarca_100coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/dinamarca/dinamarca_100coronas_anterior_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/dinamarca/dinamarca_100coronas_nuevo_frente.jpg', imagenDorso: 'ruta/a/dinamarca/dinamarca_100coronas_nuevo_dorso.jpg' }
                
            ]  

        },  
        {
            denominacion: '200 Coronas',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/dinamarca/dinamarca_200coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/dinamarca/dinamarca_200coronas_anterior_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/dinamarca/dinamarca_200coronas_nuevo_frente.jpg', imagenDorso: 'ruta/a/dinamarca/dinamarca_200coronas_nuevo_dorso.jpg' }
                
            ]  

        },  
        {
            denominacion: '500 Coronas',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/dinamarca/dinamarca_500coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/dinamarca/dinamarca_500coronas_anterior_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/dinamarca/dinamarca_500coronas_nuevo_frente.jpg', imagenDorso: 'ruta/a/dinamarca/dinamarca_500coronas_nuevo_dorso.jpg' }
                
            ]  

        },
        {
            denominacion: '1000 Coronas',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/dinamarca/dinamarca_1000coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/dinamarca/dinamarca_1000coronas_anterior_dorso.jpg' }
                
                
                
            ]  

        } 
    ],
    "Polonia": [
        
        {
            denominacion: '10 Zloty',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/polonia/polonia_10Zloty_anterior0_frente.png', imagenDorso: 'ruta/a/polonia/polonia_10Zloty_anterior0_dorso.png' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/polonia/polonia_10Zloty_anterior_frente.jpg', imagenDorso: 'ruta/a/polonia/polonia_10Zloty_anterior_dorso.jpg' }
                
                
            ]  

        }, 
        {
            denominacion: '20 Zloty',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/polonia/polonia_20Zloty_anterior0_frente.png', imagenDorso: 'ruta/a/polonia/polonia_20Zloty_anterior0_dorso.png' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/polonia/polonia_20Zloty_anterior_frente.jpg', imagenDorso: 'ruta/a/polonia/polonia_20Zloty_anterior_dorso.jpg' }
                
                
            ]  

        }, 
        {
            denominacion: '50 Zloty',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/polonia/polonia_50Zloty_anterior0_frente.png', imagenDorso: 'ruta/a/polonia/polonia_50Zloty_anterior0_dorso.png' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/polonia/polonia_50Zloty_anterior_frente.jpg', imagenDorso: 'ruta/a/polonia/polonia_50Zloty_anterior_dorso.jpg' }
                
                
            ]  

        }, 
        {
            denominacion: '100 Zloty',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/polonia/polonia_100Zloty_anterior0_frente.png', imagenDorso: 'ruta/a/polonia/polonia_100Zloty_anterior0_dorso.png' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/polonia/polonia_100Zloty_anterior_frente.jpg', imagenDorso: 'ruta/a/polonia/polonia_100Zloty_anterior_dorso.jpg' }
                
                
            ]  

        }, 
        {
            denominacion: '200 Zloty',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/polonia/polonia_200Zloty_anterior0_frente.png', imagenDorso: 'ruta/a/polonia/polonia_200Zloty_anterior0_dorso.png' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/polonia/polonia_200Zloty_anterior_frente.jpg', imagenDorso: 'ruta/a/polonia/polonia_200Zloty_anterior_dorso.jpg' }
                
                
            ]  

        }, 
        {
            denominacion: '500 Zloty',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/polonia/polonia_500Zloty_anterior_frente.jpg', imagenDorso: 'ruta/a/polonia/polonia_500Zloty_anterior_dorso.jpg' }
                
                
            ]  

        }
    ],
    "Republica Checa": [
        
        {
            denominacion: '100 Coronas',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/repcheca/repcheca_100coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/repcheca/repcheca_100coronas_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '200 Coronas',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/repcheca/repcheca_200coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/repcheca/repcheca_200coronas_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '500 Coronas',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/repcheca/repcheca_500coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/repcheca/repcheca_500coronas_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '1000 Coronas',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/repcheca/repcheca_1000coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/repcheca/repcheca_coronas_1000anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '2000 Coronas',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/repcheca/repcheca_2000coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/repcheca/repcheca_2000coronas_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '5000 Coronas',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/repcheca/repcheca_5000coronas_anterior_frente.jpg', imagenDorso: 'ruta/a/repcheca/repcheca_5000coronas_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        
    ],
    "Turquia": [
        
        {
            denominacion: '5 Liras',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/turquia/turquia_5liras_serie1_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_5liras_serie1_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/turquia/turquia_5liras_serie2_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_5liras_serie2_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/turquia/turquia_5liras_serie3_frente.jpeg', imagenDorso: 'ruta/a/turquia/turquia_5liras_serie3_dorso.jpeg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/turquia/turquia_5liras_serie4_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_5liras_serie4_dorso.jpg' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/turquia/turquia_5liras_serie5_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_5liras_serie5_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/turquia/turquia_5liras_serie6_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_5liras_serie6_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '10 Liras',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/turquia/turquia_10liras_serie1_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_10liras_serie1_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/turquia/turquia_10liras_serie2_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_10liras_serie2_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/turquia/turquia_10liras_serie3_frente.jpeg', imagenDorso: 'ruta/a/turquia/turquia_10liras_serie3_dorso.jpeg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/turquia/turquia_10liras_serie4_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_10liras_serie4_dorso.jpg' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/turquia/turquia_10liras_serie5_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_10liras_serie5_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/turquia/turquia_10liras_serie6_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_10liras_serie6_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '20 Liras',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/turquia/turquia_20liras_serie1_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_20liras_serie1_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/turquia/turquia_20liras_serie2_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_20liras_serie2_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/turquia/turquia_20liras_serie3_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_20liras_serie3_dorso.jpg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/turquia/turquia_20liras_serie4_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_20liras_serie4_dorso.jpg' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/turquia/turquia_20liras_serie5_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_20liras_serie5_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/turquia/turquia_20liras_serie6_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_20liras_serie6_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '50 Liras',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/turquia/turquia_50liras_serie1_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_50liras_serie1_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/turquia/turquia_50liras_serie2_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_50liras_serie2_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/turquia/turquia_50liras_serie3_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_50liras_serie3_dorso.jpg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/turquia/turquia_50liras_serie4_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_50liras_serie4_dorso.jpg' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/turquia/turquia_50liras_serie5_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_50liras_serie5_dorso.jpg' },
                { anioEmision: '2024', imagenFrente: 'ruta/a/turquia/turquia_50liras_serie6_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_50liras_serie6_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '100 Liras',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/turquia/turquia_100liras_serie1_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_100liras_serie1_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/turquia/turquia_100liras_serie2_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_100liras_serie2_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/turquia/turquia_100liras_serie3_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_100liras_serie3_dorso.jpg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/turquia/turquia_100liras_serie4_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_100liras_serie4_dorso.jpg' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/turquia/turquia_100liras_serie5_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_100liras_serie5_dorso.jpg' }
                
                
                
                
            ]  

        },
        {
            denominacion: '200 Liras',
            versiones: [
                { anioEmision: '2013', imagenFrente: 'ruta/a/turquia/turquia_200liras_serie1_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_200liras_serie1_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/turquia/turquia_200liras_serie2_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_200liras_serie2_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/turquia/turquia_200liras_serie3_frente.jpeg', imagenDorso: 'ruta/a/turquia/turquia_200liras_serie3_dorso.jpeg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/turquia/turquia_200liras_serie4_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_200liras_serie4_dorso.jpg' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/turquia/turquia_200liras_serie5_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_200liras_serie5_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/turquia/turquia_200liras_serie7_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_200liras_serie7_dorso.jpg' },
                { anioEmision: '2024', imagenFrente: 'ruta/a/turquia/turquia_200liras_serie8_frente.jpg', imagenDorso: 'ruta/a/turquia/turquia_200liras_serie8_dorso.jpg' }
                
                
                
            ]  

        }
    ],
    "Corea del Sur": [
        
        {
            denominacion: '1000 wons',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/coreadelsur/coreadelsur_1000wons_anterior_frente.jpg', imagenDorso: 'ruta/a/coreadelsur/coreadelsur_1000wons_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '5000 wons',
            versiones: [
                { anioEmision: '2006', imagenFrente: 'ruta/a/coreadelsur/coreadelsur_5000wons_anterior_frente.jpg', imagenDorso: 'ruta/a/coreadelsur/coreadelsur_5000wons_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '10000 wons',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/coreadelsur/coreadelsur_10000wons_anterior_frente.jpg', imagenDorso: 'ruta/a/coreadelsur/coreadelsur_10000wons_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '50000 wons',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/coreadelsur/coreadelsur_50000wons_anterior_frente.jpg', imagenDorso: 'ruta/a/coreadelsur/coreadelsur_50000wons_anterior_dorso.jpg' }
                
                
                
            ]  

        }
    ],
    "Israel": [
        
        {
            denominacion: '20 nuevos Sequel',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/israel/israel_20sequel_anterior_frente.jpg', imagenDorso: 'ruta/a/israel/israel_20sequel_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '50 nuevos Sequel',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/israel/israel_50sequel_anterior_frente.jpg', imagenDorso: 'ruta/a/israel/israel_50sequel_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '100 nuevos Sequel',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/israel/israel_100sequel_anterior_frente.jpg', imagenDorso: 'ruta/a/israel/israel_100sequel_anterior_dorso.jpg' }
                
                
                
            ]  

        },
        {
            denominacion: '200 nuevos Sequel',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/israel/israel_200sequel_anterior_frente.jpg', imagenDorso: 'ruta/a/israel/israel_200sequel_anterior_dorso.jpg' }
                
                
                
            ]  

        }
    ],
    "Uruguay": [
        
        {
            denominacion: '20 Pesos',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/uruguay/uruguay_20pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_20pesos_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/uruguay/uruguay_20pesos_medio_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_20pesos_medio_dorso.jpg'},
                { anioEmision: '2020', imagenFrente: 'ruta/a/uruguay/uruguay_20pesos_polimero_frente.jpeg', imagenDorso: 'ruta/a/uruguay/uruguay_20pesos_polimero_dorso.jpeg'}
                
                
                
            ]  

        },
        {
            denominacion: '50 Pesos',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/uruguay/uruguay_50pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_50pesos_anterior_dorso.jpg' },
                { anioEmision: '2008', imagenFrente: 'ruta/a/uruguay/uruguay_50pesos_medio_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_50pesos_medio_dorso.jpg'},
                { anioEmision: '2017', imagenFrente: 'ruta/a/uruguay/uruguay_50pesos_polimeroazul_frente.jpeg', imagenDorso: 'ruta/a/uruguay/uruguay_50pesos_polimeroazul_dorso.jpeg'},
                { anioEmision: '2020', imagenFrente: 'ruta/a/uruguay/uruguay_50pesos_polimero_frente.jpeg', imagenDorso: 'ruta/a/uruguay/uruguay_50pesos_polimero_dorso.jpeg'}
                
                
                
                
            ]  

        },
        {
            denominacion: '100 Pesos',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/uruguay/uruguay_100pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_100pesos_anterior_dorso.jpg'},
                { anioEmision: '2003', imagenFrente: 'ruta/a/uruguay/uruguay_100pesos_medio_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_100pesos_medio_dorso.jpg'},
                { anioEmision: '2008', imagenFrente: 'ruta/a/uruguay/uruguay_100pesos_medio1_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_100pesos_medio1_dorso.jpg'},
                { anioEmision: '2015', imagenFrente: 'ruta/a/uruguay/uruguay_100pesos_medio2_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_100pesos_medio2_dorso.jpg'}
                
                
                
                
            ]  

        },
        {
            denominacion: '200 Pesos',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/uruguay/uruguay_200pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_200pesos_anterior_dorso.jpg'},
                { anioEmision: '2003', imagenFrente: 'ruta/a/uruguay/uruguay_200pesos_medio_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_200pesos_medio_dorso.jpg'},
                { anioEmision: '2008', imagenFrente: 'ruta/a/uruguay/uruguay_200pesos_medio1_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_200pesos_medio1_dorso.jpg'},
                { anioEmision: '2015', imagenFrente: 'ruta/a/uruguay/uruguay_200pesos_medio2_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_200pesos_medio2_dorso.jpg'}
                
                
                
                
            ]  

        },
        {
            denominacion: '500 Pesos',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/uruguay/uruguay_500pesos_anterior_frente.jpg',imagenDorso: 'ruta/a/uruguay/uruguay_500pesos_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/uruguay/uruguay_500pesos_medio_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_500pesos_medio_dorso.jpeg'},
                { anioEmision: '2015', imagenFrente: 'ruta/a/uruguay/uruguay_500pesos_medio1_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_500pesos_medio1_dorso.jpg'}          
                
                
                
            ]  

        },
        {
            denominacion: '1000 Pesos',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/uruguay/uruguay_1000pesos_anterior_frente.jpg',imagenDorso: 'ruta/a/uruguay/uruguay_1000pesos_anterior_dorso.jpg' },
                { anioEmision: '2008', imagenFrente: 'ruta/a/uruguay/uruguay_1000pesos_medio_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_1000pesos_medio_dorso.jpeg'},
                { anioEmision: '2015', imagenFrente: 'ruta/a/uruguay/uruguay_1000pesos_medio1_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_1000pesos_medio1_dorso.jpg'}
                
                
                
                
            ]  

        },
        {
            denominacion: '2000 Pesos',
            versiones: [
                { anioEmision: '2003', imagenFrente: 'ruta/a/uruguay/uruguay_2000pesos_anterior_frente.jpg',imagenDorso: 'ruta/a/uruguay/uruguay_2000pesos_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/uruguay/uruguay_2000pesos_medio_frente.jpg', imagenDorso: 'ruta/a/uruguay/uruguay_2000pesos_medio_dorso.jpg'}
               
                
                
                
                
            ]  

        },
    ],
    "Tailandia": [
        
        {
            denominacion: '20 Baht',
            versiones: [
                { anioEmision: '2013', imagenFrente: 'ruta/a/tailandia/tailandia_20baht_anterior_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_20baht_anterior_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/tailandia/tailandia_20baht_medio_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_20baht_medio_dorso.jpg'},
                { anioEmision: '2022', imagenFrente: 'ruta/a/tailandia/tailandia_20baht_nuevo_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_20baht_nuevo_dorso.jpg'}          
            ]
        },
        {
            denominacion: '50 Baht',
            versiones: [
                { anioEmision: '2012', imagenFrente: 'ruta/a/tailandia/tailandia_50baht_anterior_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_50baht_anterior_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/tailandia/tailandia_50baht_medio_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_50baht_medio_dorso.jpg'}             
            ]
        },
        {
            denominacion: '100 Baht',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/tailandia/tailandia_100baht_anterior_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_100baht_anterior_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/tailandia/tailandia_100baht_medio_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_100baht_medio_dorso.jpg'}              
            ]  

        },
        {
            denominacion: '500 Baht',
            versiones: [
                { anioEmision: '2014', imagenFrente: 'ruta/a/tailandia/tailandia_500baht_anterior_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_500baht_anterior_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/tailandia/tailandia_500baht_medio_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_500baht_medio_dorso.jpg'}            
            ]
        },
        {
            denominacion: '1000 Baht',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/tailandia/tailandia_1000baht_anterior_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_1000baht_anterior_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/tailandia/tailandia_1000baht_medio_frente.jpg', imagenDorso: 'ruta/a/tailandia/tailandia_1000baht_medio_dorso.jpg'}          
            ]
        },
    ],
    "Emiratos Arabes Unidos": [
        
        {
            denominacion: '5 dirham',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_5dirham_anterior_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_5dirham_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_5dirham_medio_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_5dirham_medio_dorso.jpg'},
                { anioEmision: '2022', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_5dirham_nuevo_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_5dirham_nuevo_dorso.jpg'}          
            ]
        },
        {
            denominacion: '10 dirham',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_10dirham_anterior_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_10dirham_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_10dirham_medio_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_10dirham_medio_dorso.jpg'},
                { anioEmision: '2022', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_10dirham_nuevo_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_10dirham_nuevo_dorso.jpg'}          
            ]
        },
        {
            denominacion: '20 dirham',
            versiones: [
                { anioEmision: '1997', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_20dirham_anterior_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_20dirham_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_20dirham_medio_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_20dirham_medio_dorso.jpg'}
                          
            ]
        },
        {
            denominacion: '50 dirham',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_50dirham_anterior_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_50dirham_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_50dirham_medio_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_50dirham_medio_dorso.jpg'},
                { anioEmision: '2022', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_50dirham_nuevo_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_50dirham_nuevo_dorso.jpg'}          
            ]
        },
        {
            denominacion: '100 dirham',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_100dirham_anterior_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_100dirham_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_100dirham_medio_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_100dirham_medio_dorso.jpg'}
                          
            ]
        },
        {
            denominacion: '200 dirham',
            versiones: [
                { anioEmision: '1989', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_200dirham_anterior_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_200dirham_anterior_dorso.jpg' },
                { anioEmision: '2004', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_200dirham_medio_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_200dirham_medio_dorso.jpg'},
                { anioEmision: '2016', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_200dirham_nuevo_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_200dirham_nuevo_dorso.jpg'}          
            ]
        },
        {
            denominacion: '500 dirham',
            versiones: [
                { anioEmision: '2015a', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_500dirham_anterior_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_500dirham_anterior_dorso.jpg' },
                { anioEmision: '2015b', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_500dirham_medio_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_500dirham_medio_dorso.jpg'},
                { anioEmision: '2023(polimero)', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_500dirham_nuevo_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_500dirham_nuevo_dorso.jpg'}          
            ]
        },
        {
            denominacion: '1000 dirham',
            versiones: [
                { anioEmision: '1998', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_1000dirham_anterior_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_1000dirham_anterior_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_1000dirham_medio_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_1000dirham_medio_dorso.jpg'},
                { anioEmision: '2022(polimero)', imagenFrente: 'ruta/a/emiratosarabes/emiratosarabes_1000dirham_nuevo_frente.jpg', imagenDorso: 'ruta/a/emiratosarabes/emiratosarabes_1000dirham_nuevo_dorso.jpg'}          
            ]
        }

    ],
    "Hungria": [
        
        {
            denominacion: '500 forinto(florin)',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/hungria/hungria_500forinto_anterior_frente.jpg', imagenDorso: 'ruta/a/hungria/hungria_500forinto_anterior_dorso.jpg' }                          
            ]
        },
        {
            denominacion: '1000 forinto(florin)',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/hungria/hungria_1000forinto_anterior_frente.jpg', imagenDorso: 'ruta/a/hungria/hungria_1000forinto_anterior_dorso.jpg' }                          
            ]
        },
        {
            denominacion: '2000 forinto(florin)',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/hungria/hungria_2000forinto_anterior_frente.jpg', imagenDorso: 'ruta/a/hungria/hungria_2000forinto_anterior_dorso.jpg' }                          
            ]
        },
        {
            denominacion: '5000 forinto(florin)',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/hungria/hungria_5000forinto_anterior_frente.jpg', imagenDorso: 'ruta/a/hungria/hungria_5000forinto_anterior_dorso.jpg' }                          
            ]
        },
        {
            denominacion: '10000 forinto(florin)',
            versiones: [
                { anioEmision: '2014', imagenFrente: 'ruta/a/hungria/hungria_10000forinto_anterior_frente.jpg', imagenDorso: 'ruta/a/hungria/hungria_10000forinto_anterior_dorso.jpg' }                          
            ]
        },
        {
            denominacion: '20000 forinto(florin)',
            versiones: [
                { anioEmision: '2015', imagenFrente: 'ruta/a/hungria/hungria_20000forinto_anterior_frente.jpg', imagenDorso: 'ruta/a/hungria/hungria_20000forinto_anterior_dorso.jpg' }                          
            ]
        }
    ],
    "Colombia": [
        
        {
            denominacion: '1000 Pesos(conmemorativo)',
            versiones: [
                { anioEmision: '2005', imagenFrente: 'ruta/a/colombia/colombia_1000pesos_anterior_frente.png', imagenDorso: 'ruta/a/colombia/colombia_1000pesos_anterior_dorso.png'}                          
            ]
        },
        {
            denominacion: '2000 Pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/colombia/colombia_2000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/colombia/colombia_2000pesos_anterior_dorso.jpg' },
                { anioEmision: '2006-Conmemorativo', imagenFrente: 'ruta/a/colombia/colombia_2000pesos_conmemorativo_frente.png', imagenDorso: 'ruta/a/colombia/colombia_2000pesos_conmemorativo_dorso.png'}                          
            ]
        },
        {
            denominacion: '5000 Pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/colombia/colombia_5000pesos_anterior_frente.png', imagenDorso: 'ruta/a/colombia/colombia_5000pesos_anterior_dorso.png' },
                { anioEmision: '1995-Conmemorativo', imagenFrente: 'ruta/a/colombia/colombia_5000pesos_conmemorativo_frente.png', imagenDorso: 'ruta/a/colombia/colombia_5000pesos_conmemorativo_dorso.png'}                          
            ]
        },
        {
            denominacion: '10000 Pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/colombia/colombia_10000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/colombia/colombia_10000pesos_anterior_dorso.jpg' },
                { anioEmision: '1995-Conmemorativo', imagenFrente: 'ruta/a/colombia/colombia_10000pesos_conmemorativo_frente.png', imagenDorso: 'ruta/a/colombia/colombia_10000pesos_conmemorativo_dorso.png'}                          
            ]
        },
        {
            denominacion: '20000 Pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/colombia/colombia_20000pesos_anterior_frente.png', imagenDorso: 'ruta/a/colombia/colombia_20000pesos_anterior_dorso.png' },
                { anioEmision: '1996-Conmemorativo', imagenFrente: 'ruta/a/colombia/colombia_20000pesos_conmemorativo_frente.png', imagenDorso: 'ruta/a/colombia/colombia_20000pesos_conmemorativo_dorso.png'}                          
            ]
        },
        {
            denominacion: '50000 Pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/colombia/colombia_50000pesos_anterior_frente.png', imagenDorso: 'ruta/a/colombia/colombia_50000pesos_anterior_dorso.png'},
                { anioEmision: '1996-Conmemorativo', imagenFrente: 'ruta/a/colombia/colombia_50000pesos_conmemorativo_frente.png', imagenDorso: 'ruta/a/colombia/colombia_50000pesos_conmemorativo_dorso.png'}                          
            ]
        },
        {
            denominacion: '100000 Pesos',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/colombia/colombia_100000pesos_anterior_frente.jpg', imagenDorso: 'ruta/a/colombia/colombia_100000pesos_anterior_dorso.jpg'}                          
            ]
        }
    ],
    "Paraguay": [
        
        {
            denominacion: '2000 guaranies',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/paraguay/paraguay_2000guaranies_anterior_frente.jpg', imagenDorso: 'ruta/a/paraguay/paraguay_2000guaranies_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '5000 guaranies',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/paraguay/paraguay_5000guaranies_anterior_frente.jpg', imagenDorso: 'ruta/a/paraguay/paraguay_5000guaranies_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '10000 guaranies',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/paraguay/paraguay_10000guaranies_anterior_frente.jpg', imagenDorso: 'ruta/a/paraguay/paraguay_10000guaranies_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '20000 guaranies',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/paraguay/paraguay_20000guaranies_anterior_frente.jpg', imagenDorso: 'ruta/a/paraguay/paraguay_20000guaranies_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '50000 guaranies',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/paraguay/paraguay_50000guaranies_anterior_frente.jpg', imagenDorso: 'ruta/a/paraguay/paraguay_50000guaranies_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '100000 guaranies',
            versiones: [
                { anioEmision: '2017', imagenFrente: 'ruta/a/paraguay/paraguay_100000guaranies_anterior_frente.jpg', imagenDorso: 'ruta/a/paraguay/paraguay_100000guaranies_anterior_dorso.jpg'}                          
            ]
        }
    ],
    "Venezuela": [
        
        {
            denominacion: '5 bolivares',
            versiones: [
                { anioEmision: '2021', imagenFrente: 'ruta/a/venezuela/venezuela_5bolivares_anterior_frente.jpeg'}                          
            ]
        },
        {
            denominacion: '10 bolivares',
            versiones: [
                { anioEmision: '2021', imagenFrente: 'ruta/a/venezuela/venezuela_10bolivares_anterior_frente.jpeg'}                          
            ]
        },
        {
            denominacion: '20 bolivares',
            versiones: [
                { anioEmision: '2021', imagenFrente: 'ruta/a/venezuela/venezuela_20bolivares_anterior_frente.jpeg'}                          
            ]
        },
        {
            denominacion: '50 bolivares',
            versiones: [
                { anioEmision: '2021', imagenFrente: 'ruta/a/venezuela/venezuela_50bolivares_anterior_frente.jpeg'}                          
            ]
        },
        {
            denominacion: '100 bolivares',
            versiones: [
                { anioEmision: '2021', imagenFrente: 'ruta/a/venezuela/venezuela_100bolivares_anterior_frente.jpeg'}                          
            ]
        },
        {
            denominacion: '200 bolivares',
            versiones: [
                { anioEmision: '2021', imagenFrente: 'ruta/a/venezuela/venezuela_200bolivares_anterior_frente.jpg'}                          
            ]
        },
        {
            denominacion: '500 bolivares',
            versiones: [
                { anioEmision: '2021', imagenFrente: 'ruta/a/venezuela/venezuela_500bolivares_anterior_frente.jpg'}                          
            ]
        },
    ],
    "Vietnam": [
        
        {
            denominacion: '100 Dong',
            versiones: [
                { anioEmision: '1992', imagenFrente: 'ruta/a/vietnam/vietnam_100dong_anterior_frente.jpg',imagenDorso: 'ruta/a/vietnam/vietnam_100dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '200 Dong',
            versiones: [
                { anioEmision: '1987', imagenFrente: 'ruta/a/vietnam/vietnam_200dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_200dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '500 Dong',
            versiones: [
                { anioEmision: '1989', imagenFrente: 'ruta/a/vietnam/vietnam_500dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_500dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '1000 Dong',
            versiones: [
                { anioEmision: '1989', imagenFrente: 'ruta/a/vietnam/vietnam_1000dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_1000dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '2000 Dong',
            versiones: [
                { anioEmision: '1989', imagenFrente: 'ruta/a/vietnam/vietnam_2000dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_2000dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '5000 Dong',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/vietnam/vietnam_5000dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_5000dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '10000 Dong',
            versiones: [
                { anioEmision: '2006', imagenFrente: 'ruta/a/vietnam/vietnam_10000dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_10000dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '20000 Dong',
            versiones: [
                { anioEmision: '2006', imagenFrente: 'ruta/a/vietnam/vietnam_20000dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_20000dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '50000 Dong',
            versiones: [
                { anioEmision: '2003', imagenFrente: 'ruta/a/vietnam/vietnam_50000dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_50000dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '100000 Dong',
            versiones: [
                { anioEmision: '2004', imagenFrente: 'ruta/a/vietnam/vietnam_100000dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_100000dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '200000 Dong',
            versiones: [
                { anioEmision: '2006', imagenFrente: 'ruta/a/vietnam/vietnam_200000dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_200000dong_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '500000 Dong',
            versiones: [
                { anioEmision: '2003', imagenFrente: 'ruta/a/vietnam/vietnam_500000dong_anterior_frente.jpg', imagenDorso: 'ruta/a/vietnam/vietnam_500000dong_anterior_dorso.jpg'}                          
            ]
        },
        
    ],
     "Iran": [
        
        {
            denominacion: '100 Rial',
            versiones: [
                { anioEmision: '1985', imagenFrente: 'ruta/a/iran/iran_100rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_100rial_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '200 Rial',
            versiones: [
                { anioEmision: '1982', imagenFrente: 'ruta/a/iran/iran_200rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_200rial_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '500 Rial',
            versiones: [
                { anioEmision: '1989', imagenFrente: 'ruta/a/iran/iran_500rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_500rial_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '1000 Rial',
            versiones: [
                { anioEmision: '1992', imagenFrente: 'ruta/a/iran/iran_1000rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_1000rial_anterior_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '2000 Rial',
            versiones: [
                { anioEmision: '1986', imagenFrente: 'ruta/a/iran/iran_2000rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_2000rial_anterior_dorso.jpg'},
                { anioEmision: '2005', imagenFrente: 'ruta/a/iran/iran_2000rial_nuevo_frente.jpg',imagenDorso: 'ruta/a/iran/iran_2000rial_nuevo_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '5000 Rial',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/iran/iran_5000rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_5000rial_anterior_dorso.jpg'},
                { anioEmision: '2009', imagenFrente: 'ruta/a/iran/iran_5000rial_medio_frente.jpg',imagenDorso: 'ruta/a/iran/iran_5000rial_medio_dorso.jpg'},
                { anioEmision: '2013', imagenFrente: 'ruta/a/iran/iran_5000rial_nuevo_frente.jpg',imagenDorso: 'ruta/a/iran/iran_5000rial_nuevo_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '10000 Rial',
            versiones: [
                { anioEmision: '1992', imagenFrente: 'ruta/a/iran/iran_10000rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_10000rial_anterior_dorso.jpg'},
                { anioEmision: '2017', imagenFrente: 'ruta/a/iran/iran_10000rial_medio_frente.jpg',imagenDorso: 'ruta/a/iran/iran_10000rial_medio_dorso.jpg'},
                { anioEmision: '2022', imagenFrente: 'ruta/a/iran/iran_10000rial_nuevo_frente.jpg',imagenDorso: 'ruta/a/iran/iran_10000rial_nuevo_dorso.jpg'}                          
            ]
        },
        
        {
            denominacion: '20000 Rial',
            versiones: [
                { anioEmision: '2004', imagenFrente: 'ruta/a/iran/iran_20000rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_20000rial_anterior_dorso.jpg'},
                { anioEmision: '2005', imagenFrente: 'ruta/a/iran/iran_20000rial_medio_frente.jpg',imagenDorso: 'ruta/a/iran/iran_20000rial_medio_dorso.jpg'},
                { anioEmision: '2014', imagenFrente: 'ruta/a/iran/iran_20000rial_nuevo_frente.jpg',imagenDorso: 'ruta/a/iran/iran_20000rial_nuevo_dorso.jpg'},
                { anioEmision: '2022', imagenFrente: 'ruta/a/iran/iran_20000rial_nuevo1_frente.jpg',imagenDorso: 'ruta/a/iran/iran_20000rial_nuevo1_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '50000 Rial',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/iran/iran_50000rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_50000rial_anterior_dorso.jpg'},
                { anioEmision: '2015', imagenFrente: 'ruta/a/iran/iran_50000rial_medio_frente.jpg',imagenDorso: 'ruta/a/iran/iran_50000rial_medio_dorso.jpg'},
                { anioEmision: '2021', imagenFrente: 'ruta/a/iran/iran_50000rial_nuevo_frente.jpg',imagenDorso: 'ruta/a/iran/iran_50000rial_nuevo_dorso.jpg'}                          
            ]
        },
        {
            denominacion: '100000 Rial',
            versiones: [
                { anioEmision: '2010', imagenFrente: 'ruta/a/iran/iran_100000rial_anterior_frente.jpg',imagenDorso: 'ruta/a/iran/iran_100000rial_anterior_dorso.jpg'},
                { anioEmision: '2021', imagenFrente: 'ruta/a/iran/iran_100000rial_medio_frente.jpg',imagenDorso: 'ruta/a/iran/iran_100000rial_medio_dorso.jpg'}
                                          
            ]
        }
    ],
    "Bolivia": [
        {
            denominacion: '10 Bolivianos',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/bolivia/bolivia_10boliviano_anterior_frente.jpg', imagenDorso: 'ruta/a/bolivia/bolivia_1boliviano_anterior_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '20 Bolivianos',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/bolivia/bolivia_20boliviano_anterior_frente.jpg', imagenDorso: 'ruta/a/bolivia/bolivia_20boliviano_anterior_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '50 Bolivianos',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/bolivia/bolivia_50boliviano_anterior_frente.jpg', imagenDorso: 'ruta/a/bolivia/bolivia_50boliviano_anterior_dorso.jpg' }
                
            ]
        },{
            denominacion: '100 Bolivianos',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/bolivia/bolivia_100boliviano_anterior_frente.jpg', imagenDorso: 'ruta/a/bolivia/bolivia_100boliviano_anterior_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '200 Bolivianos',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/bolivia/bolivia_200boliviano_anterior_frente.jpg', imagenDorso: 'ruta/a/bolivia/bolivia_200boliviano_anterior_dorso.jpg' }
                
            ]
        },
    ],
    "Armenia": [
        {
            denominacion: '500 Dram',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/armenia/armenia_500dram_anterior_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_500dram_anterior_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/armenia/armenia_500dram_nuevo_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_500dram_nuevo_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '1000 Dram',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/armenia/armenia_1000dram_anterior_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_1000dram_anterior_dorso.jpg' },
                { anioEmision: '2001', imagenFrente: 'ruta/a/armenia/armenia_1000dram_2001_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_1000dram_2001_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/armenia/armenia_1000dram_2011_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_1000dram_2011_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/armenia/armenia_1000dram_2018_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_1000dram_2018_dorso.jpg' }

                
            ]
        },
        {
            denominacion: '5000 Dram',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/armenia/armenia_5000dram_1999_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_5000dram_1999_dorso.jpg' },
                { anioEmision: '2003', imagenFrente: 'ruta/a/armenia/armenia_5000dram_2003_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_5000dram_2003_dorso.jpg' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/armenia/armenia_5000dram_2012_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_5000dram_2012_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/armenia/armenia_5000dram_2018_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_5000dram_2018_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '10000 Dram',
            versiones: [
                { anioEmision: '2003', imagenFrente: 'ruta/a/armenia/armenia_10000dram_2003_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_10000dram_2003_dorso.jpg' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/armenia/armenia_10000dram_2012_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_10000dram_2012_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/armenia/armenia_10000dram_2018_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_10000dram_2018_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '20000 Dram',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/armenia/armenia_20000dram_1999_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_20000dram_1999_dorso.jpg' },
                { anioEmision: '2007', imagenFrente: 'ruta/a/armenia/armenia_20000dram_2007_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_20000dram_2007_dorso.jpg' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/armenia/armenia_20000dram_2012_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_20000dram_2012_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/armenia/armenia_20000dram_2018_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_20000dram_2018_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '50000 Dram',
            versiones: [
                { anioEmision: '2001', imagenFrente: 'ruta/a/armenia/armenia_50000dram_2001_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_50000dram_2001_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/armenia/armenia_50000dram_2018_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_50000dram_2018_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '100000 Dram',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/armenia/armenia_100000dram_2009_frente.jpg', imagenDorso: 'ruta/a/armenia/armenia_100000dram_2009_dorso.jpg' }
                
                
            ]
        }


    ],
    "Costa Rica": [
        {
            denominacion: '1000 colones',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/costarica/costarica_1000colon_2009_frente.jpg', imagenDorso: 'ruta/a/costarica/costarica_1000colon_2009_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/costarica/costarica_1000colon_2013_frente.jpg', imagenDorso: 'ruta/a/costarica/costarica_1000colon_2013_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/costarica/costarica_1000colon_2019_frente.jpg', imagenDorso: 'ruta/a/costarica/costarica_1000colon_2019_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '2000 colones',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/costarica/costarica_2000colon_2018_frente.jpg', imagenDorso: 'ruta/a/costarica/costarica_2000colon_2018_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '5000 colones',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/costarica/costarica_5000colon_2018_frente.jpg', imagenDorso: 'ruta/a/costarica/costarica_5000colon_2018_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '10000 colones',
            versiones: [
                { anioEmision: '2021', imagenFrente: 'ruta/a/costarica/costarica_10000colon_2021_frente.png', imagenDorso: 'ruta/a/costarica/costarica_10000colon_2021_dorso.png' }
                
                
            ]
        },
        {
            denominacion: '20000 colones',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/costarica/costarica_20000colon_2018_frente.jpg', imagenDorso: 'ruta/a/costarica/costarica_20000colon_2018_dorso.jpg' }
                
                
            ]
        }
    ],
    "Egipto": [
        {
            denominacion: '25 (centavos) libra',
            versiones: [
                { anioEmision: '1917', imagenFrente: 'ruta/a/egipto/egipto_25piastres_1917_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_25piastres_1917_dorso.jpg' },
                { anioEmision: '1952', imagenFrente: 'ruta/a/egipto/egipto_25piastres_1952_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_25piastres_1952_dorso.jpg' },
                { anioEmision: '1961', imagenFrente: 'ruta/a/egipto/egipto_25piastres_1961_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_25piastres_1961_dorso.jpg' },
                { anioEmision: '1976', imagenFrente: 'ruta/a/egipto/egipto_25piastres_1976_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_25piastres_1976_dorso.jpg' },
                { anioEmision: '2001', imagenFrente: 'ruta/a/egipto/egipto_25piastres_2001_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_25piastres_2001_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '50 (centavos) libra',
            versiones: [
                { anioEmision: '1899', imagenFrente: 'ruta/a/egipto/egipto_50piastres_1899_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50piastres_1899_dorso.jpg' },
                { anioEmision: '1914', imagenFrente: 'ruta/a/egipto/egipto_50piastres_1914_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50piastres_1914_dorso.jpg' },
                { anioEmision: '1935', imagenFrente: 'ruta/a/egipto/egipto_50piastres_1935_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50piastres_1935_dorso.jpg' },
                { anioEmision: '1952', imagenFrente: 'ruta/a/egipto/egipto_50piastres_1952_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50piastres_1952_dorso.jpg' },
                { anioEmision: '1961', imagenFrente: 'ruta/a/egipto/egipto_50piastres_1961_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50piastres_1961_dorso.jpg' },
                { anioEmision: '1967', imagenFrente: 'ruta/a/egipto/egipto_50piastres_1967_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50piastres_1967_dorso.jpg' },
                { anioEmision: '1981', imagenFrente: 'ruta/a/egipto/egipto_50piastres_1981_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50piastres_1981_dorso.jpg' },
                { anioEmision: '2016', imagenFrente: 'ruta/a/egipto/egipto_50piastres_2016_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50piastres_2016_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '1 libra',
            versiones: [
                { anioEmision: '1899', imagenFrente: 'ruta/a/egipto/egipto_1libra_1899_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_1libra_1899_dorso.jpg' },
                { anioEmision: '1930', imagenFrente: 'ruta/a/egipto/egipto_1libra_1930_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_1libra_1930_dorso.jpg' },
                { anioEmision: '1952', imagenFrente: 'ruta/a/egipto/egipto_1libra_1952_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_1libra_1952_dorso.jpg' },
                { anioEmision: '1978', imagenFrente: 'ruta/a/egipto/egipto_1libra_1978_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_1libra_1978_dorso.jpg' },
                { anioEmision: '2016', imagenFrente: 'ruta/a/egipto/egipto_1libra_2016_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_1libra_2016_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '5 libras',
            versiones: [
                { anioEmision: '1964', imagenFrente: 'ruta/a/egipto/egipto_5libra_1964_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_5libra_1964_dorso.jpg' },
                { anioEmision: '1969', imagenFrente: 'ruta/a/egipto/egipto_5libra_1969_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_5libra_1969_dorso.jpg' },
                { anioEmision: '1970', imagenFrente: 'ruta/a/egipto/egipto_5libra_1970_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_5libra_1970_dorso.jpg' },
                { anioEmision: '1981', imagenFrente: 'ruta/a/egipto/egipto_5libra_1981_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_5libra_1981_dorso.jpg' },
                { anioEmision: '2002', imagenFrente: 'ruta/a/egipto/egipto_5libra_2002_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_5libra_2002_dorso.jpg' },
                { anioEmision: '2008', imagenFrente: 'ruta/a/egipto/egipto_5libra_2008_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_5libra_2008_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/egipto/egipto_5libra_2015_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_5libra_2015_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '10 libras',
            versiones: [
                { anioEmision: '1931', imagenFrente: 'ruta/a/egipto/egipto_10libra_1931_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_10libra_1931_dorso.jpg' },
                { anioEmision: '1952', imagenFrente: 'ruta/a/egipto/egipto_10libra_1952_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_10libra_1952_dorso.jpg' },
                { anioEmision: '1961', imagenFrente: 'ruta/a/egipto/egipto_10libra_1961_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_10libra_1961_dorso.jpg' },
                { anioEmision: '1969', imagenFrente: 'ruta/a/egipto/egipto_10libra_1969_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_10libra_1969_dorso.jpg' },
                { anioEmision: '1978', imagenFrente: 'ruta/a/egipto/egipto_10libra_1978_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_10libra_1978_dorso.jpg' },
                { anioEmision: '2003', imagenFrente: 'ruta/a/egipto/egipto_10libra_2003_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_10libra_2003_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/egipto/egipto_10libra_2015_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_10libra_2015_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/egipto/egipto_10libra_2022_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_10libra_2022_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '20 libras',
            versiones: [
                { anioEmision: '1976', imagenFrente: 'ruta/a/egipto/egipto_20libra_1976_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_20libra_1976_dorso.jpg' },
                { anioEmision: '1979', imagenFrente: 'ruta/a/egipto/egipto_20libra_1979_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_20libra_1979_dorso.jpg' },
                { anioEmision: '2001', imagenFrente: 'ruta/a/egipto/egipto_20libra_2001_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_20libra_2001_dorso.jpg' },
                { anioEmision: '2008', imagenFrente: 'ruta/a/egipto/egipto_20libra_2008_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_20libra_2008_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/egipto/egipto_20libra_2015_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_20libra_2015_dorso.jpg' },
                { anioEmision: '2016', imagenFrente: 'ruta/a/egipto/egipto_20libra_2016_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_20libra_2016_dorso.jpg' },
                { anioEmision: '2023', imagenFrente: 'ruta/a/egipto/egipto_20libra_2023_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_20libra_2023_dorso.jpg' }
               
                
            ]
        },
        {
            denominacion: '50 libras',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/egipto/egipto_50libra_1993_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50libra_1993_dorso.jpg' },
                { anioEmision: '2001', imagenFrente: 'ruta/a/egipto/egipto_50libra_2001_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50libra_2001_dorso.jpg' },
                { anioEmision: '2007', imagenFrente: 'ruta/a/egipto/egipto_50libra_2007_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50libra_2007_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/egipto/egipto_50libra_2015_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_50libra_2015_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '100 libras',
            versiones: [
                { anioEmision: '1978', imagenFrente: 'ruta/a/egipto/egipto_100libra_1978_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_100libra_1978_dorso.jpg' },
                { anioEmision: '1994', imagenFrente: 'ruta/a/egipto/egipto_100libra_1994_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_100libra_1994_dorso.jpg' },
                { anioEmision: '2000', imagenFrente: 'ruta/a/egipto/egipto_100libra_2000_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_100libra_2000_dorso.jpg' },
                { anioEmision: '2009', imagenFrente: 'ruta/a/egipto/egipto_100libra_2009_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_100libra_2009_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/egipto/egipto_100libra_2015_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_100libra_2015_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '200 libras',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/egipto/egipto_200libra_2007_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_200libra_2007_dorso.jpg' },
                { anioEmision: '2009', imagenFrente: 'ruta/a/egipto/egipto_200libra_2009_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_200libra_2009_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/egipto/egipto_200libra_2015_frente.jpg', imagenDorso: 'ruta/a/egipto/egipto_200libra_2015_dorso.jpg' }                             
                
            ]
        }
    ],
    "Argelia": [
        {
            denominacion: '100 dinares',
            versiones: [
                { anioEmision: '1996', imagenFrente: 'ruta/a/argelia/argelia_100dinares_1996_frente.webp', imagenDorso: 'ruta/a/argelia/argelia_100dinares_1996_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '200 dinares',
            versiones: [
                { anioEmision: '1996', imagenFrente: 'ruta/a/argelia/argelia_200dinares_1996_frente.jpg', imagenDorso: 'ruta/a/argelia/argelia_200dinares_1996_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '500 dinares',
            versiones: [
                { anioEmision: '1996(conmemorativo)', imagenFrente: 'ruta/a/argelia/argelia_500dinares_1996_frente.jpg', imagenDorso: 'ruta/a/argelia/argelia_500dinares_1996_dorso.jpg' },
                { anioEmision: '1998(conmemorativo)', imagenFrente: 'ruta/a/argelia/argelia_500dinares_1998_frente.jpg', imagenDorso: 'ruta/a/argelia/argelia_500dinares_1998_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/argelia/argelia_500dinares_2018_frente.jpg', imagenDorso: 'ruta/a/argelia/argelia_500dinares_2018_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '1000 dinares',
            versiones: [
                { anioEmision: '1995(conmemorativo)', imagenFrente: 'ruta/a/argelia/argelia_1000dinares_1995_frente.jpg', imagenDorso: 'ruta/a/argelia/argelia_1000dinares_1995_dorso.jpg' },
                { anioEmision: '1998(conmemorativo)', imagenFrente: 'ruta/a/argelia/argelia_1000dinares_1998_frente.jpg', imagenDorso: 'ruta/a/argelia/argelia_1000dinares_1998_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/argelia/argelia_1000dinares_2018_frente.jpg', imagenDorso: 'ruta/a/argelia/argelia_1000dinares_2018_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '2000 dinares',
            versiones: [
                { anioEmision: '2011', imagenFrente: 'ruta/a/argelia/argelia_2000dinares_2011_frente.jpg', imagenDorso: 'ruta/a/argelia/argelia_2000dinares_2011_dorso.jpg' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/argelia/argelia_2000dinares_2021_frente.jpg', imagenDorso: 'ruta/a/argelia/argelia_2000dinares_2021_dorso.jpg' },
                                
             
            ]
        }

    ],
    "Guatemala": [
        {
            denominacion: '1 Quetzal',
            versiones: [
                { anioEmision: '2024', imagenFrente: 'ruta/a/guatemala/guatemala_1quetzal_2024_frente.jpg', imagenDorso: 'ruta/a/guatemala/guatemala_1quetzal_2024_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '5 Quetzal',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/guatemala/guatemala_5quetzal_2018_frente.jpg', imagenDorso: 'ruta/a/guatemala/guatemala_5quetzal_2018_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '10 Quetzal',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/guatemala/guatemala_10quetzal_2018_frente.jpg', imagenDorso: 'ruta/a/guatemala/guatemala_10quetzal_2018_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '20 Quetzal',
            versiones: [
                { anioEmision: '2018', imagenFrente: 'ruta/a/guatemala/guatemala_20quetzal_2018_frente.jpg', imagenDorso: 'ruta/a/guatemala/guatemala_20quetzal_2018_dorso.jpg' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/guatemala/guatemala_20quetzal_2021_frente.jpg', imagenDorso: 'ruta/a/guatemala/guatemala_20quetzal_2021_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '50 Quetzal',
            versiones: [
                { anioEmision: '2024', imagenFrente: 'ruta/a/guatemala/guatemala_50quetzal_2024_frente.jpg', imagenDorso: 'ruta/a/guatemala/guatemala_50quetzal_2024_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '100 Quetzal',
            versiones: [
                { anioEmision: '2024', imagenFrente: 'ruta/a/guatemala/guatemala_100quetzal_2024_frente.jpg', imagenDorso: 'ruta/a/guatemala/guatemala_100quetzal_2024_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '200 Quetzal',
            versiones: [
                { anioEmision: '2024', imagenFrente: 'ruta/a/guatemala/guatemala_200quetzal_2024_frente.jpg', imagenDorso: 'ruta/a/guatemala/guatemala_200quetzal_2024_dorso.jpg' }                
             
            ]
        },
        
        
    ],
    "Guyana": [
        {
            denominacion: '20 dolares',
            versiones: [
                { anioEmision: '1965', imagenFrente: 'ruta/a/guyana/guyana_20dolar_1965_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_20dolar_1965_dorso.jpg' },
                { anioEmision: '1988', imagenFrente: 'ruta/a/guyana/guyana_20dolar_1988_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_20dolar_1988_dorso.jpg' },
                { anioEmision: '1996', imagenFrente: 'ruta/a/guyana/guyana_20dolar_1996_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_20dolar_1996_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '50 dolares',
            versiones: [
                { anioEmision: '2016', imagenFrente: 'ruta/a/guyana/guyana_50dolar_2016_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_50dolar_2016_dorso.jpg' }
                                
             
            ]
        },
        {
            denominacion: '100 dolares',
            versiones: [
                { anioEmision: '1988', imagenFrente: 'ruta/a/guyana/guyana_100dolar_1988_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_100dolar_1988_dorso.jpg' },
                { anioEmision: '1998', imagenFrente: 'ruta/a/guyana/guyana_100dolar_1998_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_100dolar_1998_dorso.jpg' },
                { anioEmision: '2006', imagenFrente: 'ruta/a/guyana/guyana_100dolar_2006_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_100dolar_2006_dorso.jpg' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/guyana/guyana_100dolar_2012_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_100dolar_2012_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '500 dolares',
            versiones: [
                { anioEmision: '1992', imagenFrente: 'ruta/a/guyana/guyana_500dolar_1992_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_500dolar_1992_dorso.jpg' },
                { anioEmision: '1996', imagenFrente: 'ruta/a/guyana/guyana_500dolar_1996_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_500dolar_1996_dorso.jpg' },
                { anioEmision: '2000', imagenFrente: 'ruta/a/guyana/guyana_500dolar_2000_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_500dolar_2000_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/guyana/guyana_500dolar_2011_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_500dolar_2011_dorso.jpg' },
                { anioEmision: '2024', imagenFrente: 'ruta/a/guyana/guyana_500dolar_2024_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_500dolar_2024_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '1000 dolares',
            versiones: [
                { anioEmision: '1996', imagenFrente: 'ruta/a/guyana/guyana_1000dolar_1996_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_1000dolar_1996_dorso.jpg' },
                { anioEmision: '1999', imagenFrente: 'ruta/a/guyana/guyana_1000dolar_1999_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_1000dolar_1999_dorso.jpg' },
                { anioEmision: '2006', imagenFrente: 'ruta/a/guyana/guyana_1000dolar_2006_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_1000dolar_2006_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/guyana/guyana_1000dolar_2011_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_1000dolar_2011_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/guyana/guyana_1000dolar_2019_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_1000dolar_2019_dorso.jpg' },
                { anioEmision: '2024', imagenFrente: 'ruta/a/guyana/guyana_1000dolar_2024_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_1000dolar_2024_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '2000 dolares',
            versiones: [
                { anioEmision: '2022', imagenFrente: 'ruta/a/guyana/guyana_2000dolar_2022_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_2000dolar_2022_dorso.jpg' }
                                
             
            ]
        },
        {
            denominacion: '5000 dolares',
            versiones: [
                { anioEmision: '2013', imagenFrente: 'ruta/a/guyana/guyana_50dolar_2013_frente.jpg', imagenDorso: 'ruta/a/guyana/guyana_50dolar_2013_dorso.jpg' }
                                
             
            ]
        }
    ],
    "Singapur": [
        {
            denominacion: '1 Dolar',
            versiones: [
                { anioEmision: '1967', imagenFrente: 'ruta/a/singapur/singapur_1dolar_1967_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_1dolar_1967_dorso.jpg' },
                { anioEmision: '1976', imagenFrente: 'ruta/a/singapur/singapur_1dolar_1976_frente.jpeg', imagenDorso: 'ruta/a/singapur/singapur_1dolar_1976_dorso.jpeg' },
                { anioEmision: '1987', imagenFrente: 'ruta/a/singapur/singapur_1dolar_1987_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_1dolar_1987_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '2 Dolares',
            versiones: [
                { anioEmision: '1991', imagenFrente: 'ruta/a/singapur/singapur_2dolar_1991_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_2dolar_1991_dorso.jpg' },
                { anioEmision: '1999', imagenFrente: 'ruta/a/singapur/singapur_2dolar_1999_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_2dolar_1999_dorso.jpg' }               
             
            ]
        },
        {
            denominacion: '5 Dolares',
            versiones: [
                { anioEmision: '1967', imagenFrente: 'ruta/a/singapur/singapur_5dolar_1967_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_5dolar_1967_dorso.jpg' },
                { anioEmision: '1976', imagenFrente: 'ruta/a/singapur/singapur_5dolar_1976_frente.jpeg', imagenDorso: 'ruta/a/singapur/singapur_5dolar_1976_dorso.jpeg'},
                { anioEmision: '1989', imagenFrente: 'ruta/a/singapur/singapur_5dolar_1989_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_5dolar_1989_dorso.jpg' },
                { anioEmision: '1999', imagenFrente: 'ruta/a/singapur/singapur_5dolar_1999_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_5dolar_1999_dorso.jpg' }               
             
            ]
        },
        {
            denominacion: '10 Dolares',
            versiones: [
                { anioEmision: '1967', imagenFrente: 'ruta/a/singapur/singapur_10dolar_1967_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_10dolar_1967_dorso.jpg' },
                { anioEmision: '1976', imagenFrente: 'ruta/a/singapur/singapur_10dolar_1976_frente.jpeg', imagenDorso: 'ruta/a/singapur/singapur_10dolar_1976_dorso.jpeg'},
                { anioEmision: '1988', imagenFrente: 'ruta/a/singapur/singapur_10dolar_1988_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_10dolar_1988_dorso.jpg' },
                { anioEmision: '1999', imagenFrente: 'ruta/a/singapur/singapur_10dolar_1999_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_10dolar_1999_dorso.jpg' }               
             
            ]
        },
        {
            denominacion: '20 Dolares',
            versiones: [
                { anioEmision: '1979', imagenFrente: 'ruta/a/singapur/singapur_20dolar_1979_frente.jpeg', imagenDorso: 'ruta/a/singapur/singapur_20dolar_1979_dorso.jpeg' }                             
             
            ]
        },
        {
            denominacion: '25 Dolares',
            versiones: [
                { anioEmision: '1967', imagenFrente: 'ruta/a/singapur/singapur_25dolar_1967_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_25dolar_1967_dorso.jpg' }                             
             
            ]
        },
        {
            denominacion: '50 Dolares',
            versiones: [
                { anioEmision: '1967', imagenFrente: 'ruta/a/singapur/singapur_50dolar_1967_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_50dolar_1967_dorso.jpg' },
                { anioEmision: '1976', imagenFrente: 'ruta/a/singapur/singapur_50dolar_1976_frente.jpeg', imagenDorso: 'ruta/a/singapur/singapur_50dolar_1976_dorso.jpeg'},
                { anioEmision: '1987', imagenFrente: 'ruta/a/singapur/singapur_50dolar_1987_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_50dolar_1987_dorso.jpg' },
                { anioEmision: '1999', imagenFrente: 'ruta/a/singapur/singapur_50dolar_1999_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_50dolar_1999_dorso.jpg' }               
             
            ]
        },
        {
            denominacion: '100 Dolares',
            versiones: [
                { anioEmision: '1967', imagenFrente: 'ruta/a/singapur/singapur_100dolar_1967_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_100dolar_1967_dorso.jpg' },
                { anioEmision: '1977', imagenFrente: 'ruta/a/singapur/singapur_100dolar_1976_frente.jpeg', imagenDorso: 'ruta/a/singapur/singapur_100dolar_1976_dorso.jpeg'},
                { anioEmision: '1985', imagenFrente: 'ruta/a/singapur/singapur_100dolar_1985_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_100dolar_1985_dorso.jpg' },
                { anioEmision: '1999', imagenFrente: 'ruta/a/singapur/singapur_100dolar_1999_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_100dolar_1999_dorso.jpg' }               
             
            ]
        },
        {
            denominacion: '500 Dolares',
            versiones: [
                { anioEmision: '1967', imagenFrente: 'ruta/a/singapur/singapur_500dolar_1967_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_500dolar_1967_dorso.jpg' },
                { anioEmision: '1977', imagenFrente: 'ruta/a/singapur/singapur_500dolar_1977_frente.jpeg', imagenDorso: 'ruta/a/singapur/singapur_500dolar_1977_dorso.jpeg'},
                { anioEmision: '1988', imagenFrente: 'ruta/a/singapur/singapur_500dolar_1988_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_500dolar_1988_dorso.jpg' }
                               
             
            ]
        },
        {
            denominacion: '1000 Dolares',
            versiones: [
                { anioEmision: '1967', imagenFrente: 'ruta/a/singapur/singapur_1000dolar_1967_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_1000dolar_1967_dorso.jpg' },
                { anioEmision: '1978', imagenFrente: 'ruta/a/singapur/singapur_1000dolar_1978_frente.jpeg', imagenDorso: 'ruta/a/singapur/singapur_1000dolar_1978_dorso.jpeg'},
                { anioEmision: '1984', imagenFrente: 'ruta/a/singapur/singapur_1000dolar_1984_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_1000dolar_1984_dorso.jpg' },
                { anioEmision: '1999', imagenFrente: 'ruta/a/singapur/singapur_1000dolar_1999_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_1000dolar_1999_dorso.jpg' }               
             
            ]
        },
        {
            denominacion: '10000 Dolares',
            versiones: [
                { anioEmision: '1973', imagenFrente: 'ruta/a/singapur/singapur_10000dolar_1973_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_10000dolar_1973_dorso.jpg' },
                { anioEmision: '1980', imagenFrente: 'ruta/a/singapur/singapur_10000dolar_1980_frente.jpeg', imagenDorso: 'ruta/a/singapur/singapur_10000dolar_1980_dorso.jpeg'},
                { anioEmision: '1989', imagenFrente: 'ruta/a/singapur/singapur_10000dolar_1989_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_10000dolar_1989_dorso.jpg' },
                { anioEmision: '1999', imagenFrente: 'ruta/a/singapur/singapur_10000dolar_1999_frente.jpg', imagenDorso: 'ruta/a/singapur/singapur_10000dolar_1999_dorso.jpg' }               
             
            ]
        }
    ],
    "Islandia": [
        {
            denominacion: '500 Coronas',
            versiones: [
                { anioEmision: '2005', imagenFrente: 'ruta/a/islandia/islandia_500coronas_2005_frente.jpg', imagenDorso: 'ruta/a/islandia/islandia_500coronas_2005_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '1000 Coronas',
            versiones: [
                { anioEmision: '2004', imagenFrente: 'ruta/a/islandia/islandia_1000coronas_2004_frente.webp', imagenDorso: 'ruta/a/islandia/islandia_1000coronas_2004_dorso.webp' }                
             
            ]
        },
        {
            denominacion: '2000 Coronas',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/islandia/islandia_2000coronas_1995_frente.webp', imagenDorso: 'ruta/a/islandia/islandia_2000coronas_1995_dorso.webp' }                
             
            ]
        },
        
        {
            denominacion: '5000 Coronas',
            versiones: [
                { anioEmision: '2003', imagenFrente: 'ruta/a/islandia/islandia_5000coronas_2003_frente.webp', imagenDorso: 'ruta/a/islandia/islandia_5000coronas_2003_dorso.webp' }                
             
            ]
        },
        {
            denominacion: '10000 Coronas',
            versiones: [
                { anioEmision: '2013', imagenFrente: 'ruta/a/islandia/islandia_10000coronas_2013_frente.jpg', imagenDorso: 'ruta/a/islandia/islandia_10000coronas_2013_dorso.jpg' }                
             
            ]
        }
        
        
        
    ],
    "Bulgaria": [
        {
            denominacion: '5 Levs',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/bulgaria/bulgaria_5levs_1999_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_5levs_1999_dorso.jpg' },
                { anioEmision: '2009', imagenFrente: 'ruta/a/bulgaria/bulgaria_5levs_2009_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_5levs_2009_dorso.jpg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/bulgaria/bulgaria_5levs_2020_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_5levs_2020_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '10 Levs',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/bulgaria/bulgaria_10levs_1999_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_10levs_1999_dorso.jpg' },
                { anioEmision: '2008', imagenFrente: 'ruta/a/bulgaria/bulgaria_10levs_2008_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_10levs_2008_dorso.jpg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/bulgaria/bulgaria_10levs_2020_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_10levs_2020_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '20 Levs',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/bulgaria/bulgaria_20levs_1999_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_20levs_1999_dorso.jpg' },
                { anioEmision: '2005(conmemorativo)', imagenFrente: 'ruta/a/bulgaria/bulgaria_20levs_2005_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_20levs_2005_dorso.jpg' },
                { anioEmision: '2007', imagenFrente: 'ruta/a/bulgaria/bulgaria_20levs_2007_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_20levs_2007_dorso.jpg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/bulgaria/bulgaria_20levs_2020_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_20levs_2020_dorso.jpg' }                
             
            ]
        },
        
        {
            denominacion: '50 Levs',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/bulgaria/bulgarialevs_1999_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgarialevs_1999_dorso.jpg' },
                { anioEmision: '2006', imagenFrente: 'ruta/a/bulgaria/bulgarialevs_2006_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgarialevs_2006_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/bulgaria/bulgarialevs_2019_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgarialevs_2019_dorso.jpg' }               
             
            ]
        },
        {
            denominacion: '100 Levs',
            versiones: [
                { anioEmision: '2003', imagenFrente: 'ruta/a/bulgaria/bulgaria_100levs_2003_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_100levs_2003_dorso.jpg' },
                { anioEmision: '2018', imagenFrente: 'ruta/a/bulgaria/bulgaria_100levs_2018_frente.jpg', imagenDorso: 'ruta/a/bulgaria/bulgaria_100levs_2018_dorso.jpg' }              
             
            ]
        }
        
        
        
    ],
    "Albania": [
        {
            denominacion: '200 leks',
            versiones: [
                { anioEmision: '1996', imagenFrente: 'ruta/a/albania/albania_200leks_1996_frente.jpg', imagenDorso: 'ruta/a/albania/albania_1996leks_1996_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/albania/albania_200leks_2019_frente.jpg', imagenDorso: 'ruta/a/albania/albania_200leks_2019_dorso.jpg' }                 
             
            ]
        },
        {
            denominacion: '500 leks',
            versiones: [
                { anioEmision: '1996', imagenFrente: 'ruta/a/albania/albania_500leks_1996_frente.jpg', imagenDorso: 'ruta/a/albania/albania_500leks_1996_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/albania/albania_500leks_2022_frente.jpg', imagenDorso: 'ruta/a/albania/albania_500leks_2022_dorso.jpg' }              
             
            ]
        },
        {
            denominacion: '1000 leks',
            versiones: [
                { anioEmision: '1996', imagenFrente: 'ruta/a/albania/albania_1000leks_1996_frente.png', imagenDorso: 'ruta/a/albania/albania_1000leks_1996_dorso.png' },
                { anioEmision: '2021', imagenFrente: 'ruta/a/albania/albania_1000leks_2021_frente.jpg', imagenDorso: 'ruta/a/albania/albania_1000leks_2021_dorso.jpg' }                
             
            ]
        },
        
        {
            denominacion: '2000 leks',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/albania/albania_2000leks_2007_frente.jpg', imagenDorso: 'ruta/a/albania/albania_2000leks_2007_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/albania/albania2000leks_2022_frente.jpg', imagenDorso: 'ruta/a/albania/albania2000leks_2022_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '5000 leks',
            versiones: [
                { anioEmision: '1999', imagenFrente: 'ruta/a/albania/albania_5000leks_1999_frente.jpg', imagenDorso: 'ruta/a/albania/albania_5000leks_1999_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/albania/albania_5000leks_2019_frente.jpg', imagenDorso: 'ruta/a/albania/albania_5000leks_2019_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '10000 leks',
            versiones: [
                { anioEmision: '2021', imagenFrente: 'ruta/a/albania/albania_10000leks_2021_frente.jpg', imagenDorso: 'ruta/a/albania/albania_10000leks_2021_dorso.jpg' }                
             
            ]
        }
        
        
        
    ],
    "Hong Kong": [
        
        {
            denominacion: '20 dolares',
            versiones: [
                { anioEmision: '1993 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie1993/20frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/20dorsobochk.jpg' },
                { anioEmision: '1993 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie1993/20frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/20dorsoscbhk.jpg'},
                { anioEmision: '1993 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie1993/20frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/20dorsohsbchk.jpg'},
                { anioEmision: '2003 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2003/20frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/20dorsobochk.jpg' },
                { anioEmision: '2003 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2003/20frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/20dorsoscbhk.jpg'},
                { anioEmision: '2003 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2003/20frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/20dorsohsbchk.jpg'},
                { anioEmision: '2010 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2010/20frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/20dorsobochk.jpg' },
                { anioEmision: '2010 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2010/20frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/20dorsoscbhk.jpg'},
                { anioEmision: '2010 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2010/20frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/20dorsohsbchk.jpg'},
                { anioEmision: '2018 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2018/20frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/20dorsobochk.jpg' },
                { anioEmision: '2018 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2018/20frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/20dorsoscbhk.jpg'},
                { anioEmision: '2018 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2018/20frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/20dorsohsbchk.jpg'}
                
            ]  

        },
        {
            denominacion: '50 dolares',
            versiones: [
                { anioEmision: '1993 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie1993/50frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/50dorsobochk.jpg' },
                { anioEmision: '1993 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie1993/50frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/50dorsoscbhk.jpg'},
                { anioEmision: '1993 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie1993/50frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/50dorsohsbchk.jpg'},
                { anioEmision: '2003 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2003/50frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/50dorsobochk.jpg' },
                { anioEmision: '2003 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2003/50frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/50dorsoscbhk.jpg'},
                { anioEmision: '2003 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2003/50frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/50dorsohsbchk.jpg'},
                { anioEmision: '2010 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2010/50frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/50dorsobochk.jpg' },
                { anioEmision: '2010 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2010/50frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/50dorsoscbhk.jpg'},
                { anioEmision: '2010 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2010/50frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/50dorsohsbchk.jpg'},
                { anioEmision: '2018 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2018/50frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/50dorsobochk.jpg' },
                { anioEmision: '2018 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2018/50frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/50dorsoscbhk.jpg'},
                { anioEmision: '2018 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2018/50frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/50dorsohsbchk.jpg'}
                
            ]  

        },
        {
            denominacion: '100 dolares',
            versiones: [
                { anioEmision: '1993 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie1993/100frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/100dorsobochk.jpg' },
                { anioEmision: '1993 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie1993/100frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/100dorsoscbhk.jpg'},
                { anioEmision: '1993 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie1993/100frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/100dorsohsbchk.jpg'},
                { anioEmision: '2003 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2003/100frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/100dorsobochk.jpg' },
                { anioEmision: '2003 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2003/100frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/100dorsoscbhk.jpg'},
                { anioEmision: '2003 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2003/100frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/100dorsohsbchk.jpg'},
                { anioEmision: '2010 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2010/100frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/100dorsobochk.jpg' },
                { anioEmision: '2010 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2010/100frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/100dorsoscbhk.jpg'},
                { anioEmision: '2010 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2010/100frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/100dorsohsbchk.jpg'},
                { anioEmision: '2018 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2018/100frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/100dorsobochk.jpg' },
                { anioEmision: '2018 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2018/100frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/100dorsoscbhk.jpg'},
                { anioEmision: '2018 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2018/100frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/100dorsohsbchk.jpg'}
                
            ]  

        },
        {
            denominacion: '500 dolares',
            versiones: [
                { anioEmision: '1993 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie1993/500frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/500dorsobochk.jpg' },
                { anioEmision: '1993 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie1993/500frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/500dorsoscbhk.jpg'},
                { anioEmision: '1993 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie1993/500frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/500dorsohsbchk.jpg'},
                { anioEmision: '2003 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2003/500frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/500dorsobochk.jpg' },
                { anioEmision: '2003 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2003/500frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/500dorsoscbhk.jpg'},
                { anioEmision: '2003 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2003/500frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/500dorsohsbchk.jpg'},
                { anioEmision: '2010 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2010/500frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/500dorsobochk.jpg' },
                { anioEmision: '2010 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2010/500frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/500dorsoscbhk.jpg'},
                { anioEmision: '2010 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2010/500frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/500dorsohsbchk.jpg'},
                { anioEmision: '2018 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2018/500frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/500dorsobochk.jpg' },
                { anioEmision: '2018 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2018/500frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/500dorsoscbhk.jpg'},
                { anioEmision: '2018 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2018/500frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/500dorsohsbchk.jpg'}
                
            ]  

        },
        {
            denominacion: '1000 dolares',
            versiones: [
                { anioEmision: '1993 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie1993/1000frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/1000dorsobochk.jpg' },
                { anioEmision: '1993 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie1993/1000frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie1993/1000dorsoscbhk.jpg'},                
                { anioEmision: '2003 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2003/1000frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/1000dorsobochk.jpg' },
                { anioEmision: '2003 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2003/1000frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/1000dorsoscbhk.jpg'},
                { anioEmision: '2003 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2003/1000frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2003/1000dorsohsbchk.jpg'},
                { anioEmision: '2010 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2010/1000frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/1000dorsobochk.jpg' },
                { anioEmision: '2010 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2010/1000frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/1000dorsoscbhk.jpg'},
                { anioEmision: '2010 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2010/1000frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2010/1000dorsohsbchk.jpg'},
                { anioEmision: '2018 - Bank of China', imagenFrente: 'ruta/a/hongkong/serie2018/1000frentebochk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/1000dorsobochk.jpg' },
                { anioEmision: '2018 - Standard Chartered Bank', imagenFrente: 'ruta/a/hongkong/serie2018/1000frentescbhk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/1000dorsoscbhk.jpg'},
                { anioEmision: '2018 - HSBC(The Hongkong and Shanghai Banking Corporation Limited)', imagenFrente: 'ruta/a/hongkong/serie2018/1000frentehsbchk.jpg', imagenDorso: 'ruta/a/hongkong/serie2018/1000dorsohsbchk.jpg'}
                
            ]  

        }
        
        
    ],
    "Ghana": [
        {
            denominacion: '1 Cedi',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/ghana/ghana_1Cedi_2007_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_1Cedi_2007_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '2 Cedi',
            versiones: [
                { anioEmision: '2010', imagenFrente: 'ruta/a/ghana/ghana_2Cedi_2010_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_2Cedi_2010_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '5 Cedi',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/ghana/ghana_5Cedi_2007_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_5Cedi_2007_dorso.jpg' }                
             
            ]
        },
        
        {
            denominacion: '10 Cedi',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/ghana/ghana_10Cedi_2007_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_10Cedi_2007_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/ghana/ghana_10Cedi_2019_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_10Cedi_2019_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '20 Cedi',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/ghana/ghana_20Cedi_2007_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_20Cedi_2007_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/ghana/ghana_20Cedi_2019_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_20Cedi_2019_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '50 Cedi',
            versiones: [
                { anioEmision: '2007', imagenFrente: 'ruta/a/ghana/ghana_50Cedi_2007_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_50Cedi_2007_dorso.jpg' },
                { anioEmision: '2012', imagenFrente: 'ruta/a/ghana/ghana_50Cedi_2012_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_50Cedi_2012_dorso.jpg' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/ghana/ghana_50Cedi_2019_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_50Cedi_2019_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '100 Cedi',
            versiones: [
                { anioEmision: '2019', imagenFrente: 'ruta/a/ghana/ghana_100Cedi_2019_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_100Cedi_2019_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '200 Cedi',
            versiones: [
                { anioEmision: '2019', imagenFrente: 'ruta/a/ghana/ghana_200Cedi_2019_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_200Cedi_2019_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '10000 Cedi',
            versiones: [
                { anioEmision: '2002', imagenFrente: 'ruta/a/ghana/ghana_10000Cedi_2002_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_10000Cedi_2002_dorso.jpg' }                
             
            ]
        },
        {
            denominacion: '20000 Cedi',
            versiones: [
                { anioEmision: '2002', imagenFrente: 'ruta/a/ghana/ghana_20000Cedi_2002_frente.jpg', imagenDorso: 'ruta/a/ghana/ghana_20000Cedi_2002_dorso.jpg' }                
             
            ]
        }
        
        
        
    ],
    "Etiopia": [
        {
            denominacion: '10 Birr',
            versiones: [
                { anioEmision: '2012(2020)', imagenFrente: 'ruta/a/etiopia/etiopia_10Birr_2012_frente.jpg', imagenDorso: 'ruta/a/etiopia/etiopia_1Birr_2012_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '50 Birr',
            versiones: [
                { anioEmision: '2012(2020)', imagenFrente: 'ruta/a/etiopia/etiopia_50Birr_anterior_frente.jpg', imagenDorso: 'ruta/a/etiopia/etiopia_50Birr_anterior_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '100 Birr',
            versiones: [
                { anioEmision: '2012(2020)', imagenFrente: 'ruta/a/etiopia/etiopia_100Birr_anterior_frente.jpg', imagenDorso: 'ruta/a/etiopia/etiopia_100Birr_anterior_dorso.jpg' }
                
            ]
        },{
            denominacion: '200 Birr',
            versiones: [
                { anioEmision: '2012(2020)', imagenFrente: 'ruta/a/etiopia/etiopia_200Birr_anterior_frente.jpg', imagenDorso: 'ruta/a/etiopia/etiopia_200Birr_anterior_dorso.jpg' }
                
            ]
        },
        
    ],
    "Libano": [
        
        {
            denominacion: '1000 libras',
            versiones: [
                { anioEmision: '1988', imagenFrente: 'ruta/a/libano/libano_1000libras_1988_frente.jpg', imagenDorso: 'ruta/a/libano/libano_1000libras_1988_dorso.jpg' },
                { anioEmision: '2004', imagenFrente: 'ruta/a/libano/libano_1000libras_2004_frente.jpg', imagenDorso: 'ruta/a/libano/libano_1000libras_2004_dorso.jpg'},
                { anioEmision: '2011', imagenFrente: 'ruta/a/libano/libano_1000libras_2011_frente.jpg', imagenDorso: 'ruta/a/libano/libano_1000libras_2011_dorso.jpg'}          
            ]
        },
        {
            denominacion: '5000 libras',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/libano/libano_5000libras_1994_frente.jpg', imagenDorso: 'ruta/a/libano/libano_5000libras_1994_dorso.jpg' },
                { anioEmision: '1999', imagenFrente: 'ruta/a/libano/libano_5000libras_1999_frente.jpg', imagenDorso: 'ruta/a/libano/libano_5000libras_1999_dorso.jpg'},
                { anioEmision: '2004', imagenFrente: 'ruta/a/libano/libano_5000libras_2004_frente.jpg', imagenDorso: 'ruta/a/libano/libano_5000libras_2004_dorso.jpg'},
                { anioEmision: '2012', imagenFrente: 'ruta/a/libano/libano_5000libras_2012_frente.jpg', imagenDorso: 'ruta/a/libano/libano_5000libras_2012_dorso.jpg'}         
            ]
        },
        {
            denominacion: '10000 libras',
            versiones: [
                { anioEmision: '2004', imagenFrente: 'ruta/a/libano/libano_10000libras_2004_frente.jpg', imagenDorso: 'ruta/a/libano/libano_10000libras_2004_dorso.jpg'},
                { anioEmision: '2012', imagenFrente: 'ruta/a/libano/libano_10000libras_2012_frente.jpg', imagenDorso: 'ruta/a/libano/libano_10000libras_2012_dorso.jpg'}
                          
            ]
        },
        {
            denominacion: '20000 libras',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/libano/libano_20000libras_1994_frente.jpg', imagenDorso: 'ruta/a/libano/libano_20000libras_1994_dorso.jpg'},
                { anioEmision: '2004', imagenFrente: 'ruta/a/libano/libano_20000libras_2004_frente.jpg', imagenDorso: 'ruta/a/libano/libano_20000libras_2004_dorso.jpg'},
                { anioEmision: '2012', imagenFrente: 'ruta/a/libano/libano_20000libras_2012_frente.jpg', imagenDorso: 'ruta/a/libano/libano_20000libras_2012_dorso.jpg'}          
            ]
        },
        {
            denominacion: '50000 libras',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/libano/libano_50000libras_1994_frente.jpg', imagenDorso: 'ruta/a/libano/libano_50000libras_1994_dorso.jpg'},
                { anioEmision: '2004', imagenFrente: 'ruta/a/libano/libano_50000libras_2004_frente.jpg', imagenDorso: 'ruta/a/libano/libano_50000libras_2004_dorso.jpg'},
                { anioEmision: '2011', imagenFrente: 'ruta/a/libano/libano_50000libras_2011_frente.jpg', imagenDorso: 'ruta/a/libano/libano_50000libras_2011_dorso.jpg'}          
            ]
        },
        {
            denominacion: '100000 libras',
            versiones: [
                { anioEmision: '1994', imagenFrente: 'ruta/a/libano/libano_100000libras_1994_frente.jpg', imagenDorso: 'ruta/a/libano/libano_100000libras_1994_dorso.jpg'},
                { anioEmision: '2004', imagenFrente: 'ruta/a/libano/libano_100000libras_2004_frente.jpg', imagenDorso: 'ruta/a/libano/libano_100000libras_2004_dorso.jpg'},
                { anioEmision: '2011', imagenFrente: 'ruta/a/libano/libano_100000libras_2011_frente.jpg', imagenDorso: 'ruta/a/libano/libano_100000libras_2011_dorso.jpg'}          
            ]
        }





    ],
    "Mongolia": [
        {
            denominacion: '1 Tugrik',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_1Tugrik_1993_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_1Tugrik_1993_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '5 Tugrik',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_5Tugrik_1993_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_5Tugrik_1993_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '10 Tugrik',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_10Tugrik_1993_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_10Tugrik_1993_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '20 Tugrik',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_20Tugrik_1993_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_20Tugrik_1993_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '50 Tugrik',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_50Tugrik_1993_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_50Tugrik_1993_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '100 Tugrik',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_100Tugrik_1993_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_100Tugrik_1993_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '500 Tugrik',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_500Tugrik_1993_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_500Tugrik_1993_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '1000 Tugrik',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_1000Tugrik_1993_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_1000Tugrik_1993_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '5000 Tugrik',
            versiones: [
                
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_5000Tugrik_2004_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_5000Tugrik_2004_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '10000 Tugrik',
            versiones: [
                { anioEmision: '1995', imagenFrente: 'ruta/a/mongolia/mongolia_10000Tugrik_1995_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_10000Tugrik_1995_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '20000 Tugrik',
            versiones: [
                { anioEmision: '1993', imagenFrente: 'ruta/a/mongolia/mongolia_20000Tugrik_1993_frente.jpg', imagenDorso: 'ruta/a/mongolia/mongolia_20000Tugrik_1993_dorso.jpg' }
                
            ]
        }
   
    ],
    "Serbia": [
        {
            denominacion: '10 Dinar',
            versiones: [
                { anioEmision: '2006', imagenFrente: 'ruta/a/serbia/serbia_10dinar_2006_frente.jpg', imagenDorso: 'ruta/a/serbia/serbia_10dinar_2006_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '20 Dinar',
            versiones: [
                { anioEmision: '2006', imagenFrente: 'ruta/a/serbia/serbia_20dinar_2006_frente.jpg', imagenDorso: 'ruta/a/serbia/serbia_20dinar_2006_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '50 Dinar',
            versiones: [
                { anioEmision: '2005', imagenFrente: 'ruta/a/serbia/serbia_50dinar_2005_frente.jpg', imagenDorso: 'ruta/a/serbia/serbia_50dinar_2005_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '100 Dinar',
            versiones: [
                { anioEmision: '2003', imagenFrente: 'ruta/a/serbia/serbia_100dinar_2003_frente.jpg', imagenDorso: 'ruta/a/serbia/serbia_100dinar_2003_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '200 Dinar',
            versiones: [
                { anioEmision: '2005', imagenFrente: 'ruta/a/serbia/serbia_200dinar_2005_frente.jpg', imagenDorso: 'ruta/a/serbia/serbia_200dinar_2005_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '500 Dinar',
            versiones: [
                { anioEmision: '2004', imagenFrente: 'ruta/a/serbia/serbia_500dinar_2004_frente.jpg', imagenDorso: 'ruta/a/serbia/serbia_500dinar_2004_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '1000 Dinar',
            versiones: [
                { anioEmision: '2003', imagenFrente: 'ruta/a/serbia/serbia_1000dinar_2003_frente.jpg', imagenDorso: 'ruta/a/serbia/serbia_1000dinar_2003_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '2000 Dinar',
            versiones: [
                { anioEmision: '2011', imagenFrente: 'ruta/a/serbia/serbia_2000dinar_2011_frente.jpg', imagenDorso: 'ruta/a/serbia/serbia_2000dinar_2011_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '5000 Dinar',
            versiones: [
                { anioEmision: '2003', imagenFrente: 'ruta/a/serbia/serbia_5000dinar_2003_frente.jpg', imagenDorso: 'ruta/a/serbia/serbia_5000dinar_2003_dorso.jpg' }
                
            ]
        }
    
    ],
    "Nicaragua": [
        {
            denominacion: '10 Cordoba',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/nicaragua/2009/nicaragua_10cordoba_2009_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2009/nicaragua_10cordoba_2009_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/nicaragua/2011/nicaragua_10cordoba_2011_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2011/nicaragua_10cordoba_2011_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/nicaragua/2015/nicaragua_10cordoba_2015_frente.png', imagenDorso: 'ruta/a/nicaragua/2015/nicaragua_10cordoba_2015_dorso.png' }
                
            ]
        },
        {
            denominacion: '20 Cordoba',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/nicaragua/2009/nicaragua_20cordoba_2009_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2009/nicaragua_20cordoba_2009_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/nicaragua/2011/nicaragua_20cordoba_2011_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2011/nicaragua_20cordoba_2011_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/nicaragua/2015/nicaragua_20cordoba_2015_frente.png', imagenDorso: 'ruta/a/nicaragua/2015/nicaragua_20cordoba_2015_dorso.png' }
                
            ]
        },
        {
            denominacion: '50 Cordoba',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/nicaragua/2009/nicaragua_50cordoba_2009_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2009/nicaragua_50cordoba_2009_dorso.jpg' },
                { anioEmision: '2009', imagenFrente: 'ruta/a/nicaragua/2009/nicaragua_50cordoba_2009_frenteconmemorativo.jpg', imagenDorso: 'ruta/a/nicaragua/2009/nicaragua_50cordoba_2009_dorsoconmemorativo.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/nicaragua/2015/nicaragua_50cordoba_2015_frente.png', imagenDorso: 'ruta/a/nicaragua/2015/nicaragua_50cordoba_2015_dorso.png' }
                
            ]
        },
        {
            denominacion: '100 Cordoba',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/nicaragua/2009/nicaragua_100cordoba_2009_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2009/nicaragua_100cordoba_2009_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/nicaragua/2011/nicaragua_100cordoba_2011_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2011/nicaragua_100cordoba_2011_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/nicaragua/2015/nicaragua_100cordoba_2015_frente.png', imagenDorso: 'ruta/a/nicaragua/2015/nicaragua_100cordoba_2015_dorso.png' }
                
            ]
        },
        {
            denominacion: '200 Cordoba',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/nicaragua/2009/nicaragua_200cordoba_2009_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2009/nicaragua_200cordoba_2009_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/nicaragua/2011/nicaragua_200cordoba_2011_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2011/nicaragua_200cordoba_2011_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/nicaragua/2015/nicaragua_200cordoba_2015_frente.png', imagenDorso: 'ruta/a/nicaragua/2015/nicaragua_200cordoba_2015_dorso.png' }
                
            ]
        },
        {
            denominacion: '500 Cordoba',
            versiones: [
                { anioEmision: '2009', imagenFrente: 'ruta/a/nicaragua/2009/nicaragua_500cordoba_2009_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2009/nicaragua_500cordoba_2009_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/nicaragua/2011/nicaragua_500cordoba_2011_frente.jpg', imagenDorso: 'ruta/a/nicaragua/2011/nicaragua_500cordoba_2011_dorso.jpg' },
                { anioEmision: '2015', imagenFrente: 'ruta/a/nicaragua/2015/nicaragua_500cordoba_2015_frente.png', imagenDorso: 'ruta/a/nicaragua/2015/nicaragua_500cordoba_2015_dorso.png' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/nicaragua/2019/nicaragua_500cordoba_2019_frente.png', imagenDorso: 'ruta/a/nicaragua/2019/nicaragua_500cordoba_2019_dorso.png' }
                
            ]
        },
        {
            denominacion: '1000 Cordoba',
            versiones: [
                
                { anioEmision: '2015', imagenFrente: 'ruta/a/nicaragua/2015/nicaragua_1000cordoba_2015_frente.png', imagenDorso: 'ruta/a/nicaragua/2015/nicaragua_1000cordoba_2015_dorso.png' },
                { anioEmision: '2016', imagenFrente: 'ruta/a/nicaragua/2016/nicaragua_1000cordoba_2016_frente.png', imagenDorso: 'ruta/a/nicaragua/2016/nicaragua_1000cordoba_2016_dorso.png' },
                { anioEmision: '2019', imagenFrente: 'ruta/a/nicaragua/2019/nicaragua_1000cordoba_2019_frente.png', imagenDorso: 'ruta/a/nicaragua/2019/nicaragua_1000cordoba_2019_dorso.png' }
                
            ]
        },
    ],
    "Tunez": [
        {
            denominacion: '5 dinares',
            versiones: [
                { anioEmision: '2008', imagenFrente: 'ruta/a/tunez/tunez_5dinares_2008_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_5dinares_2008_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/tunez/tunez_5dinares_2013_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_5dinares_2013_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/tunez/tunez_5dinares_2022_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_5dinares_2022_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '10 dinares',
            versiones:
            [
                { anioEmision: '1994', imagenFrente: 'ruta/a/tunez/tunez_10dinares_1994_frente_azul.jpg', imagenDorso: 'ruta/a/tunez/tunez_10dinares_1994_dorso_azul.jpg' },
                { anioEmision: '1994', imagenFrente: 'ruta/a/tunez/tunez_10dinares_1994_frente_marron.jpg', imagenDorso: 'ruta/a/tunez/tunez_10dinares_1994_dorso_marron.jpg' },
                { anioEmision: '2005', imagenFrente: 'ruta/a/tunez/tunez_10dinares_2005_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_10dinares_2005_dorso.jpg' },
                { anioEmision: '2013', imagenFrente: 'ruta/a/tunez/tunez_10dinares_2013_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_10dinares_2013_dorso.jpg' },
                { anioEmision: '2020', imagenFrente: 'ruta/a/tunez/tunez_10dinares_2020_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_10dinares_2020_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '20 dinares',
            versiones: [
                { anioEmision: '1992', imagenFrente: 'ruta/a/tunez/tunez_20dinares_1992_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_20dinares_1992_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/tunez/tunez_20dinares_2011_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_20dinares_2011_dorso.jpg' },
                { anioEmision: '2017', imagenFrente: 'ruta/a/tunez/tunez_20dinares_2017_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_20dinares_2017_dorso.jpg' }
                
            ]
        },
        {
            denominacion: '30 dinares',
            versiones: [
                { anioEmision: '1997', imagenFrente: 'ruta/a/tunez/tunez_30dinares_1997_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_30dinares_1997_dorso.jpg' }
                
                
            ]
        },
        {
            denominacion: '50 dinares',
            versiones: [
                { anioEmision: '2008', imagenFrente: 'ruta/a/tunez/tunez_50dinares_2008_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_50dinares_2008_dorso.jpg' },
                { anioEmision: '2011', imagenFrente: 'ruta/a/tunez/tunez_50dinares_2011_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_50dinares_2011_dorso.jpg' },
                { anioEmision: '2022', imagenFrente: 'ruta/a/tunez/tunez_50dinares_2022_frente.jpg', imagenDorso: 'ruta/a/tunez/tunez_50dinares_2022_dorso.jpg' }
                
            ]
        }
    ],
    "Uganda": [
        {
            denominacion: '1000 Shillings',
            versiones: [
                { anioEmision: '2010', imagenFrente: 'ruta/a/uganda/uganda_1000shillings_2010_frente.webp', imagenDorso: 'ruta/a/uganda/uganda_1000shillings_2010_dorso.webp' }
                
            ]
        },
        {
            denominacion: '2000 Shillings',
            versiones: [
                { anioEmision: '2010', imagenFrente: 'ruta/a/uganda/uganda_2000shillings_2010_frente.webp', imagenDorso: 'ruta/a/uganda/uganda_2000shillings_2010_dorso.webp' }
                
            ]
        },
        {
            denominacion: '5000 Shillings',
            versiones: [
                { anioEmision: '2010', imagenFrente: 'ruta/a/uganda/uganda_5000shillings_2010_frente.webp', imagenDorso: 'ruta/a/uganda/uganda_5000shillings_2010_dorso.webp' }
                
            ]
        },
        {
            denominacion: '10000 Shillings',
            versiones: [
                { anioEmision: '2010', imagenFrente: 'ruta/a/uganda/uganda_10000shillings_2010_frente.webp', imagenDorso: 'ruta/a/uganda/uganda_10000shillings_2010_dorso.webp' }
                
            ]
        },
        {
            denominacion: '20000 Shillings',
            versiones: [
                { anioEmision: '2010', imagenFrente: 'ruta/a/uganda/uganda_20000shillings_2010_frente.webp', imagenDorso: 'ruta/a/uganda/uganda_20000shillings_2010_dorso.webp' }
                
            ]
        },
        {
            denominacion: '50000 Shillings',
            versiones: [
                { anioEmision: '2010', imagenFrente: 'ruta/a/uganda/uganda_50000shillings_2010_frente.webp', imagenDorso: 'ruta/a/uganda/uganda_50000shillings_2010_dorso.webp' }
                
            ]
        }
        
    
    ]
};

function inicializarEventListeners() {
    paisSelect.addEventListener('change', (e) => {
        const paisSeleccionado = e.target.value;
        if (paisSeleccionado) {
            mostrarBilletes(paisSeleccionado);
        } else {
            ocultarBilletes();
        }
    });

    closeBtn.addEventListener('click', cerrarModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burgerMenu.classList.toggle('burger-active');
        animarNavLinks();
    });

    imagenBilleteFrente.addEventListener('click', () => abrirModal(imagenBilleteFrente.src, imagenBilleteFrente.alt));
    imagenBilleteDorso.addEventListener('click', () => abrirModal(imagenBilleteDorso.src, imagenBilleteDorso.alt));
}

function animarNavLinks() {
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

function cargarPaisesEnOrden() {
    const paises = Object.keys(paisesBilletes).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        paisSelect.appendChild(option);
    });
}

function ocultarBilletes() {
    billetesContainer.style.display = 'none';
    imagenBillete.style.display = 'none';
    paisInfo.innerHTML = '';
    paisActual = '';
}

function mostrarBilletes(pais) {
    paisActual = pais;
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

    actualizarInfoPais(pais);
}

function actualizarInfoPais(pais) {
    paisInfo.innerHTML = `
        <h2 class="fade-in">${pais}</h2>
        <img class="fade-in" src="https://flagcdn.com/w320/${obtenerCodigoPais(pais).toLowerCase()}.png" alt="Bandera de ${pais}">
    `;

    void paisInfo.offsetWidth;

    const elementosAnimados = paisInfo.querySelectorAll('.fade-in');
    elementosAnimados.forEach(elemento => {
        elemento.style.animation = 'none';
        void elemento.offsetWidth;
        elemento.style.animation = null;
    });
}

function obtenerCodigoPais(pais) {
    const codigosPais = {
        "Argentina": "ar", "Brasil": "br", "Estados Unidos": "us", "Zona Euro": "eu",
        "Inglaterra": "gb", "Canada": "ca", "Australia": "au", "Chile": "cl",
        "Mexico": "mx", "China": "cn", "Peru": "pe", "Suiza": "ch",
        "Suecia": "se", "Nueva Zelanda": "nz", "Rusia": "ru", "India": "in",
        "Sudafrica": "za", "Dinamarca": "dk", "Polonia": "pl", "Republica Checa": "cz",
        "Turquia": "tr", "Corea del Sur": "kr", "Israel": "il", "Uruguay": "uy",
        "Tailandia": "th", "Emiratos Arabes Unidos": "ae", "Hungria": "hu", "Colombia": "co",
        "Paraguay": "py", "Venezuela": "ve", "Vietnam": "vn", "Iran": "ir",
        "Bolivia": "bo", "Armenia": "am", "Costa Rica": "cr", "Egipto": "eg",
        "Argelia": "dz", "Guatemala": "gt", "Guyana": "gy", "Singapur": "sg",
        "Islandia": "is", "Bulgaria": "bg", "Albania": "al", "Hong Kong": "hk",
        "Ghana": "gh", "Etiopia": "et", "Libano": "lb", "Mongolia": "mn",
        "Serbia": "rs", "Nicaragua": "ni", "Tunez": "tn", "Uganda": "ug", 
        "Italia": "it", "Alemania": "de", "España": "es", "Francia": "fr", 
        "Austria": "at", "Bélgica": "be", "Chipre": "cy", "Croacia": "hr",
        "Eslovaquia": "sk", "Eslovenia": "sl", "Estonia": "ee", "Finlandia": "fi",
        "Grecia": "gr", "Irlanda": "ie", "Letonia": "lv", "Lituania": "lt",
        "Luxemburgo": "lu", "Malta": "mt", "Países Bajos": "nl", "Portugal": "pt"

    };
    return codigosPais[pais] || "";
}

function mostrarDetalleBillete(billete) {
    versionSelect.innerHTML = '';
    if (billete.versiones && billete.versiones.length > 0) {
        billete.versiones.forEach((version, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Versión ${index + 1} (${version.anioEmision})`;
            versionSelect.appendChild(option);
        });

        versionSelect.addEventListener('change', (e) => {
            const versionIndex = parseInt(e.target.value);
            mostrarVersionBillete(billete, versionIndex);
        });

        mostrarVersionBillete(billete, 0);
        imagenBillete.style.display = 'block';
    } else {
        imagenBillete.style.display = 'none';
        denominacionElement.textContent = billete.denominacion;
        anioEmisionElement.textContent = 'N/A';
    }
}

function mostrarVersionBillete(billete, versionIndex) {
    if (billete.versiones && billete.versiones[versionIndex]) {
        const version = billete.versiones[versionIndex];
        
        cargarImagenConDelay(imagenBilleteFrente, version.imagenFrente, `Anverso del billete de ${billete.denominacion} de ${paisActual} (${version.anioEmision})`);
        cargarImagenConDelay(imagenBilleteDorso, version.imagenDorso, `Reverso del billete de ${billete.denominacion} de ${paisActual} (${version.anioEmision})`);

        denominacionElement.textContent = billete.denominacion;
        anioEmisionElement.textContent = version.anioEmision;
    }
}

function cargarImagenConDelay(imgElement, src, alt) {
    imgElement.style.opacity = 0;
    setTimeout(() => {
        imgElement.src = src || '';
        imgElement.alt = alt;
        imgElement.onload = () => {
            imgElement.style.transition = 'opacity .5s';
            imgElement.style.opacity = 1;
        };
        imgElement.onerror = () => {
            imgElement.src = 'ruta/a/imagen/por/defecto.jpg';
        };
    }, 250);
}

function abrirModal(imagenSrc, altText) {
    modal.style.display = "block";
    modalImage.src = imagenSrc;
    modalImage.alt = altText;
}

function cerrarModal() {
    modal.style.display = "none";
}

let indiceImagenActual = 0;
const imagenesModal = [];

function abrirModalConImagenes(imagenes, indice) {
    imagenesModal.length = 0;
    imagenesModal.push(...imagenes);
    indiceImagenActual = indice;
    actualizarModal();
    modal.style.display = "block";
}

function actualizarModal() {
    modalImage.src = imagenesModal[indiceImagenActual];
    modalImage.alt = `Imagen ${indiceImagenActual + 1} de ${imagenesModal.length}`;
}

function navegarModal(direccion) {
    indiceImagenActual += direccion;
    if (indiceImagenActual < 0) {
        indiceImagenActual = imagenesModal.length - 1;
    } else if (indiceImagenActual >= imagenesModal.length) {
        indiceImagenActual = 0;
    }
    actualizarModal();
}

document.getElementById('flecha-izquierda').addEventListener('click', () => navegarModal(-1));
document.getElementById('flecha-derecha').addEventListener('click', () => navegarModal(1));

document.querySelectorAll('.contenedor-imagenes img').forEach((img, index) => {
    img.addEventListener('click', () => {
        const imagenes = Array.from(document.querySelectorAll('.contenedor-imagenes img')).map(i => i.src);
        abrirModalConImagenes(imagenes, index);
    });
});

console.log("Script actualizado con éxito. Se ha optimizado la estructura de datos para los billetes del euro y se ha agregado un retraso de 1 segundo con efecto de fade-in al cargar las imágenes de los billetes.");

