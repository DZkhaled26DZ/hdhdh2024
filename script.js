// Binance API configuration
const API_KEY = 'nc3cvP0d3LZzL9AIIgQQsjU6MKN8g5oanFkiAo4BdykbaOlce3HsTbWB3mPCoL8z';
const BINANCE_API_URL = 'https://api.binance.com/api/v3';

// Global state
let isAnalyzing = false;
let cryptoData = [];
let notificationSound = new Audio('data:audio/wav;base64,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');

// DOM Elements
const timeframeSelect = document.getElementById('timeframe');
const toggleAnalysisBtn = document.getElementById('toggleAnalysis');
const resetSettingsBtn = document.getElementById('resetSettings');
const refreshDataBtn = document.getElementById('refreshData');
const soundToggle = document.getElementById('soundToggle');
const volumeControl = document.getElementById('volumeControl');
const resultsGrid = document.getElementById('results');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Initialize Algerian time
function updateAlgerianTime() {
    const options = {
        timeZone: 'Africa/Algiers',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('algerian-time').textContent = 
        new Date().toLocaleTimeString('ar-DZ', options);
}

// Update time every second
setInterval(updateAlgerianTime, 1000);
updateAlgerianTime();

// Fetch candles data from Binance
async function fetchCandles(symbol, interval) {
    try {
        const response = await fetch(`${BINANCE_API_URL}/klines?symbol=${symbol}&interval=${interval}&limit=6`);
        const data = await response.json();
        return data.map(candle => ({
            openTime: candle[0],
            open: parseFloat(candle[1]),
            high: parseFloat(candle[2]),
            low: parseFloat(candle[3]),
            close: parseFloat(candle[4])
        }));
    } catch (error) {
        console.error(`Error fetching candles for ${symbol}:`, error);
        return null;
    }
}

// Get all trading pairs
async function getTradingPairs() {
    try {
        const response = await fetch(`${BINANCE_API_URL}/exchangeInfo`);
        const data = await response.json();
        return data.symbols
            .filter(symbol => symbol.quoteAsset === 'USDT' && symbol.status === 'TRADING')
            .map(symbol => symbol.symbol);
    } catch (error) {
        console.error('Error fetching trading pairs:', error);
        return [];
    }
}

// Check for pattern
function checkPattern(candles) {
    if (!candles || candles.length < 5) return false;
    
    // Check for 4 or more consecutive red candles
    let redCount = 0;
    for (let i = 0; i < candles.length - 1; i++) {
        if (candles[i].close < candles[i].open) {
            redCount++;
        } else {
            redCount = 0;
        }
    }
    
    // Check last candle for green with long lower wick
    const lastCandle = candles[candles.length - 1];
    const isGreen = lastCandle.close > lastCandle.open;
    const wickLength = (lastCandle.open - lastCandle.low) / lastCandle.open;
    
    return redCount >= 4 && isGreen && wickLength > 0.005; // 0.5% minimum wick length
}

// Calculate technical indicators
function calculateIndicators(candles) {
    // Simple calculations for demonstration
    const prices = candles.map(c => c.close);
    
    // RSI (simplified)
    const gains = prices.slice(1).map((p, i) => Math.max(p - prices[i], 0));
    const losses = prices.slice(1).map((p, i) => Math.max(prices[i] - p, 0));
    const avgGain = gains.reduce((a, b) => a + b) / gains.length;
    const avgLoss = losses.reduce((a, b) => a + b) / losses.length;
    const rs = avgGain / (avgLoss || 1);
    const rsi = 100 - (100 / (1 + rs));
    
    // MACD (simplified)
    const ema12 = prices.reduce((a, b) => a + b) / prices.length;
    const ema26 = prices.slice(-26).reduce((a, b) => a + b) / Math.min(26, prices.length);
    const macd = ema12 - ema26;
    
    return {
        rsi: Math.round(rsi * 100) / 100,
        macd: Math.round(macd * 100000) / 100000,
        ema: Math.round(ema12 * 100000) / 100000
    };
}

// Calculate target prices
function calculateTargets(currentPrice, indicators) {
    const targets = [];
    const multipliers = [1.02, 1.035, 1.05]; // 2%, 3.5%, 5% targets
    
    multipliers.forEach((mult, i) => {
        targets.push({
            price: Math.round(currentPrice * mult * 100000) / 100000,
            confidence: Math.round((100 - i * 10) * (indicators.rsi < 30 ? 1.2 : 1))
        });
    });
    
    return targets;
}

// Update UI with crypto data
function updateUI(cryptoData) {
    resultsGrid.innerHTML = '';
    
    cryptoData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        
        const lastCandle = data.candles[data.candles.length - 1];
        const currentPrice = lastCandle.close;
        
        card.innerHTML = `
            <div class="crypto-symbol">${data.symbol}</div>
            <div class="crypto-price">${currentPrice.toFixed(8)}</div>
            <button class="btn" onclick="showDetails('${data.symbol}')">التفاصيل</button>
        `;
        
        resultsGrid.appendChild(card);
    });
}

// Show details modal
window.showDetails = function(symbol) {
    const data = cryptoData.find(d => d.symbol === symbol);
    if (!data) return;
    
    const indicators = calculateIndicators(data.candles);
    const targets = calculateTargets(data.candles[data.candles.length - 1].close, indicators);
    
    modalContent.innerHTML = `
        <h2>${symbol} تحليل</h2>
        <div class="stats-container">
            <div class="stat-item">
                <div>RSI</div>
                <div>${indicators.rsi.toFixed(2)}</div>
            </div>
            <div class="stat-item">
                <div>MACD</div>
                <div>${indicators.macd.toFixed(5)}</div>
            </div>
        </div>
        <h3>أهداف البيع</h3>
        ${targets.map((target, i) => `
            <div class="target-price">
                <span>الهدف ${i + 1}</span>
                <span>${target.price.toFixed(8)}</span>
                <span>الثقة: ${target.confidence}%</span>
            </div>
        `).join('')}
        <button class="btn" onclick="window.open('https://www.binance.com/en/trade/${symbol}?type=spot', '_blank')">
            فتح في Binance
        </button>
    `;
    
    modal.style.display = 'block';
};

// Close modal
closeModal.onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Start analysis
async function startAnalysis() {
    if (!isAnalyzing) return;
    
    const pairs = await getTradingPairs();
    const interval = timeframeSelect.value;
    
    for (const symbol of pairs) {
        const candles = await fetchCandles(symbol, interval);
        if (candles && checkPattern(candles)) {
            const existingIndex = cryptoData.findIndex(d => d.symbol === symbol);
            
            if (existingIndex === -1) {
                cryptoData.push({ symbol, candles });
                if (soundToggle.checked) {
                    notificationSound.volume = volumeControl.value / 100;
                    notificationSound.play();
                }
            } else {
                cryptoData[existingIndex].candles = candles;
            }
            
            updateUI(cryptoData);
        }
    }
    
    if (isAnalyzing) {
        setTimeout(startAnalysis, 10000); // Check every 10 seconds
    }
}

// Event Listeners
toggleAnalysisBtn.addEventListener('click', function() {
    isAnalyzing = !isAnalyzing;
    this.textContent = isAnalyzing ? 'إيقاف التحليل' : 'بدء التحليل';
    this.classList.toggle('active', isAnalyzing);
    if (isAnalyzing) startAnalysis();
});

resetSettingsBtn.addEventListener('click', function() {
    timeframeSelect.value = '1h';
    soundToggle.checked = true;
    volumeControl.value = 50;
    cryptoData = [];
    updateUI(cryptoData);
});

refreshDataBtn.addEventListener('click', function() {
    if (isAnalyzing) {
        cryptoData = [];
        updateUI(cryptoData);
        startAnalysis();
    }
});

// Sort controls
document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const sortType = this.dataset.sort;
        
        cryptoData.sort((a, b) => {
            switch (sortType) {
                case 'time':
                    return b.candles[5].openTime - a.candles[5].openTime;
                case 'tail':
                    const getTailLength = (data) => {
                        const lastCandle = data.candles[5];
                        return (lastCandle.open - lastCandle.low) / lastCandle.open;
                    };
                    return getTailLength(b) - getTailLength(a);
                case 'price':
                    return a.candles[5].close - b.candles[5].close;
                default:
                    return 0;
            }
        });
        
        updateUI(cryptoData);
    });
});