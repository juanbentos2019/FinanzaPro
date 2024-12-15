document.addEventListener("DOMContentLoaded", function () {
    aplicarFadeIn();
    inicializarEventListeners();
    inicializarScrollToTop();
    inicializarAnimacionesScroll();
    fetchCryptoData();
});

const API_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const KLINES_URL = 'https://api.binance.com/api/v3/klines';
let chart;
let currentSymbol;

const cryptoNames = {
    BTC: "Bitcoin",
    ETH: "Ethereum",
    BNB: "Binance Coin",
    XRP: "Ripple",
    ADA: "Cardano",
    DOGE: "Dogecoin",
    MATIC: "Polygon",
    SOL: "Solana",
    DOT: "Polkadot",
    SHIB: "Shiba Inu",
    AVAX: "Avalanche",
    TRX: "TRON",
    UNI: "Uniswap",
    LINK: "Chainlink",
    ATOM: "Cosmos",
    XLM: "Stellar",
    ALGO: "Algorand",
    ETC: "Ethereum Classic",
    XMR: "Monero",
    FIL: "Filecoin"
};

const chartDescriptions = {
    price: "Este gráfico muestra la evolución del precio de la criptomoneda en los últimos 30 días.",
    performance: "Este gráfico ilustra el rendimiento porcentual de la criptomoneda desde el inicio del período.",
    volume: "Este gráfico representa el volumen de transacciones diarias de la criptomoneda en el último mes."
};

function aplicarFadeIn() {
    setTimeout(() => {
        document.body.classList.add('fade-in');
    }, 0);
}

function inicializarEventListeners() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        burger.classList.toggle('burger-active');
    });

    const modal = document.getElementById("chartModal");
    const closeButton = document.getElementsByClassName("close-button")[0];
    const tabButtons = document.querySelectorAll(".tab-button");

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            updateChart(button.dataset.tab);
        });
    });
}

function inicializarScrollToTop() {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function inicializarAnimacionesScroll() {
    const cryptoContainer = document.querySelector('.crypto-container');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cryptoContainer.style.opacity = '0';
    cryptoContainer.style.transform = 'translateY(50px)';
    cryptoContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(cryptoContainer);
}

async function fetchCryptoData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const filteredCryptos = data
            .filter(crypto => crypto.symbol.endsWith('USDT') && parseFloat(crypto.lastPrice) > 0)
            .slice(0, 20);
        
        if (filteredCryptos.length > 0) {
            displayCryptoData(filteredCryptos);
        } else {
            console.error('No se encontraron criptomonedas válidas');
        }
    } catch (error) {
        console.error('Error al obtener los datos de criptomonedas:', error);
    }
}

function displayCryptoData(cryptos) {
    const tableBody = document.querySelector('#cryptoTable tbody');
    tableBody.innerHTML = '';

    cryptos.forEach((crypto, index) => {
        const symbol = crypto.symbol.replace('USDT', '');
        const fullName = cryptoNames[symbol] || symbol;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${symbol} (${fullName})</td>
            <td>$${parseFloat(crypto.lastPrice).toLocaleString()}</td>
            <td class="${crypto.priceChangePercent >= 0 ? 'positive' : 'negative'}">
                ${parseFloat(crypto.priceChangePercent).toFixed(2)}%
            </td>
        `;
        row.addEventListener('click', () => openChartModal(crypto.symbol, fullName));
        tableBody.appendChild(row);
    });
}

async function fetchHistoricalData(symbol, interval = '1d', limit = 30) {
    const response = await fetch(`${KLINES_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`);
    const data = await response.json();
    return data.map(d => ({
        time: new Date(d[0]),
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
        volume: parseFloat(d[5])
    }));
}

async function openChartModal(symbol, name) {
    currentSymbol = symbol;
    const modal = document.getElementById("chartModal");
    modal.style.display = "block";
    document.getElementById("modalTitle").textContent = `${name} (${symbol})`;
    document.querySelector(".tab-button.active").click();
}

async function updateChart(chartType) {
    const historicalData = await fetchHistoricalData(currentSymbol);
    const ctx = document.getElementById('cryptoChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    const descriptionElement = document.getElementById('chartDescription');
    descriptionElement.textContent = chartDescriptions[chartType];

    switch (chartType) {
        case 'price':
            createPriceChart(ctx, historicalData);
            break;
        case 'performance':
            createPerformanceChart(ctx, historicalData);
            break;
        case 'volume':
            createVolumeChart(ctx, historicalData);
            break;
    }
}

function createPriceChart(ctx, data) {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.time.toLocaleDateString()),
            datasets: [{
                label: `Precio de ${currentSymbol}`,
                data: data.map(d => d.close),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Precio (USD)'
                    }
                }
            }
        }
    });
}

function createPerformanceChart(ctx, data) {
    const performanceData = data.map((d, i) => {
        if (i === 0) return 0;
        return ((d.close - data[0].close) / data[0].close) * 100;
    });

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.time.toLocaleDateString()),
            datasets: [{
                label: `Rendimiento de ${currentSymbol} (%)`,
                data: performanceData,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Rendimiento (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2) + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Rendimiento: ${context.parsed.y.toFixed(2)}%`;
                        }
                    }
                }
            }
        }
    });
}

function createVolumeChart(ctx, data) {
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.time.toLocaleDateString()),
            datasets: [{
                label: `Volumen de ${currentSymbol}`,
                data: data.map(d => d.volume),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Volumen'
                    }
                }
            }
        }
    });
}

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});