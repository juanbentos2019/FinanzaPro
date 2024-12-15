'use strict';

const apiUrl = 'https://open.er-api.com/v6/latest/USD';
let tasasCambio = {};

async function obtenerMonedas() {
    try {
        const respuesta = await fetch(apiUrl);
        const datos = await respuesta.json();
        tasasCambio = datos.rates;
        
        const selectOrigen = document.getElementById('monedaOrigen');
        const selectDestino = document.getElementById('monedaDestino');
        
        const monedasComunes = obtenerMonedasComunes();
        const monedasOrdenadas = ordenarMonedasPorNombre(monedasComunes);

        for (const [codigo, nombre] of monedasOrdenadas) {
            if (codigo in tasasCambio) {
                const opcion1 = new Option(`${codigo} - ${nombre}`, codigo);
                const opcion2 = new Option(`${codigo} - ${nombre}`, codigo);
                selectOrigen.add(opcion1);
                selectDestino.add(opcion2);
            }
        }

        const otrasMonedasOrdenadas = ordenarMonedasPorNombre(obtenerNombreCompletoMoneda());

        for (const [moneda, nombreCompleto] of otrasMonedasOrdenadas) {
            if (moneda in tasasCambio && !(moneda in monedasComunes)) {
                const opcion1 = new Option(`${moneda} - ${nombreCompleto}`, moneda);
                const opcion2 = new Option(`${moneda} - ${nombreCompleto}`, moneda);
                selectOrigen.add(opcion1);
                selectDestino.add(opcion2);
            }
        }

        selectOrigen.value = 'USD';
        selectDestino.value = 'EUR';
        actualizarBandera('monedaOrigen', 'banderaOrigen');
        actualizarBandera('monedaDestino', 'banderaDestino');
        selectOrigen.addEventListener('change', () => actualizarBandera('monedaOrigen', 'banderaOrigen'));
        selectDestino.addEventListener('change', () => actualizarBandera('monedaDestino', 'banderaDestino'));

    } catch (error) {
        console.error('Error al cargar las monedas:', error);
    }
}

function ordenarMonedasPorNombre(monedas) {
    return Object.entries(monedas).sort((a, b) => a[1].localeCompare(b[1]));
}

function obtenerMonedasComunes() {
    return {
        USD: "Dólar estadounidense",
        EUR: "Euro",
        JPY: "Yen japonés",
        GBP: "Libra esterlina",
        AUD: "Dólar australiano",
        CAD: "Dólar canadiense",
        CHF: "Franco suizo",
        CNY: "Yuan chino",
        SEK: "Corona sueca",
        NZD: "Dólar neozelandés",
        MXN: "Peso mexicano",
        SGD: "Dólar de Singapur",
        HKD: "Dólar de Hong Kong",
        NOK: "Corona noruega",
        KRW: "Won surcoreano",
        TRY: "Lira turca",
        RUB: "Rublo ruso",
        INR: "Rupia india",
        BRL: "Real brasileño",
        ZAR: "Rand sudafricano"
    };
}

function obtenerNombreCompletoMoneda() {
    return {
        AFA: "Afgani afgano",
        ALL: "Lek albanés",
        DZD: "Dinar argelino",
        AOA: "Kwanza angoleño",
        ARS: "Peso argentino",
        AMD: "Dram armenio",
        AWG: "Florín arubeño",
        AZN: "Manat azerbaiyano",
        BSD: "Dólar bahameño",
        BHD: "Dinar bahreiní",
        BDT: "Taka bangladesí",
        BBD: "Dólar barbadense",
        BYN: "Rublo bielorruso",
        BZD: "Dólar beliceño",
        BMD: "Dólar bermudeño",
        BTN: "Ngultrum butanés",
        BOB: "Boliviano",
        BAM: "Marco convertible",
        BWP: "Pula botsuano",
        BND: "Dólar de Brunéi",
        BGN: "Lev búlgaro",
        BIF: "Franco burundés",
        KHR: "Riel camboyano",
        CVE: "Escudo caboverdiano",
        KYD: "Dólar de las Islas Caimán",
        XAF: "Franco CFA de África Central",
        XPF: "Franco CFP",
        CRC: "Colón costarricense",
        HRK: "Kuna croata",
        CUP: "Peso cubano",
        CUC: "Peso cubano convertible",
        DJF: "Franco yibutiano",
        DOP: "Peso dominicano",
        XCD: "Dólar del Caribe Oriental",
        EGP: "Libra egipcia",
        ERN: "Nakfa eritreo",
        ETB: "Birr etíope",
        FJD: "Dólar fiyiano",
        GMD: "Dalasi gambiano",
        GEL: "Lari georgiano",
        GHS: "Cedi ghanés",
        GIP: "Libra gibraltareña",
        GTQ: "Quetzal guatemalteco",
        GNF: "Franco guineano",
        GYD: "Dólar guyanés",
        HTG: "Gourde haitiano",
        HNL: "Lempira hondureño",
        ISK: "Corona islandesa",
        IRR: "Rial  iraní",
        IQD: "Dinar iraquí",
        JMD: "Dólar jamaiquino",
        JOD: "Dinar jordano",
        KZT: "Tenge kazajo",
        KES: "Chelín keniano",
        KWD: "Dinar kuwaití",
        KGS: "Som kirguís",
        LAK: "Kip laosiano",
        LBP: "Libra libanesa",
        LSL: "Loti lesotense",
        LRD: "Dólar liberiano",
        LYD: "Dinar libio",
        MOP: "Pataca macaense",
        MKD: "Denar macedonio",
        MGA: "Ariary malgache",
        MWK: "Kwacha malauí",
        MVR: "Rufiyaa maldiva",
        MRU: "Uguiya mauritano",
        MUR: "Rupia mauriciana",
        MDL: "Leu moldavo",
        MNT: "Tugrik mongol",
        MAD: "Dírham marroquí",
        MZN: "Metical mozambiqueño",
        MMK: "Kyat birmano",
        NAD: "Dólar namibio",
        NPR: "Rupia nepalí",
        NIO: "Córdoba nicaragüense",
        NGN: "Naira nigeriano",
        OMR: "Rial omaní",
        PKR: "Rupia pakistaní",
        PAB: "Balboa panameño",
        PGK: "Kina papú",
        PYG: "Guaraní paraguayo",
        PEN: "Sol peruano",
        QAR: "Riyal qatarí",
        RSD: "Dinar serbio",
        SCR: "Rupia seychellense",
        SLL: "Leone sierraleonés",
        SBD: "Dólar de las Islas Salomón",
        SOS: "Chelín somalí",
        LKR: "Rupia de Sri Lanka",
        SDG: "Libra sudanesa",
        SRD: "Dólar surinamés",
        SZL: "Lilangeni suazi",
        SYP: "Libra siria",
        TJS: "Somoni tayiko",
        TZS: "Chelín tanzano",
        TOP: "Paʻanga tongano",
        TTD: "Dólar de Trinidad y Tobago",
        TND: "Dinar tunecino",
        TMT: "Manat turcomano",
        UGX: "Chelín ugandés",
        UAH: "Grivna ucraniana",
        UZS: "Som uzbeko",
        VUV: "Vatu vanuatuense",
        VES: "Bolívar soberano venezolano",
        VND: "Dong vietnamita",
        YER: "Rial yemení",
        ZMW: "Kwacha zambiano",
        ZWL: "Dólar zimbabuense"
    };
}

function actualizarBandera(selectId, flagId) {
    const select = document.getElementById(selectId);
    const bandera = document.getElementById(flagId);
    const codigoMoneda = select.value.slice(0, 2).toLowerCase();
    bandera.src = `https://flagcdn.com/w40/${codigoMoneda}.png`;
    bandera.alt = `Bandera de ${select.options[select.selectedIndex].text}`;
}

async function convertirMoneda() {
    const cantidad = document.getElementById('cantidad').value;
    const monedaOrigen = document.getElementById('monedaOrigen').value;
    const monedaDestino = document.getElementById('monedaDestino').value;
    const divResultado = document.getElementById('resultado');
    const divTasaCambio = document.getElementById('tasaCambio');

    if (!cantidad || !monedaOrigen || !monedaDestino) {
        divResultado.textContent = 'Por favor, complete todos los campos.';
        divTasaCambio.textContent = '';
        return;
    }

    divResultado.innerHTML = '<div class="cargando"></div>';
    divTasaCambio.textContent = '';

    try {
        const tasaOrigen = tasasCambio[monedaOrigen];
        const tasaDestino = tasasCambio[monedaDestino];
        const cantidadConvertida = (cantidad / tasaOrigen) * tasaDestino;
        const tasaCambioDirecta = tasaDestino / tasaOrigen;
        const tasaCambioInversa = tasaOrigen / tasaDestino;
        
        divResultado.textContent = `${cantidad} ${monedaOrigen} = ${cantidadConvertida.toFixed(2)} ${monedaDestino}`;
        divTasaCambio.innerHTML = `Tasas de cambio:<br>
            1 ${monedaOrigen} = ${tasaCambioDirecta.toFixed(6)} ${monedaDestino}<br>
            1 ${monedaDestino} = ${tasaCambioInversa.toFixed(6)} ${monedaOrigen}`;
    } catch (error) {
        console.error('Error en la conversión:', error);
        divResultado.textContent = 'Ocurrió un error en la conversión. Por favor, intente nuevamente.';
        divTasaCambio.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerMonedas();

    // Agregar efecto de fade-in
    document.body.classList.add('fade-in');

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Alternar nav
        nav.classList.toggle('nav-active');
        
        // Animar enlaces
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animación burger
        burger.classList.toggle('burger-active');
    });

    // Cerrar el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('burger-active');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
});