const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const title = '학번: 202000449 이름: 김대현';

// 환율 계산 함수
function convertCurrency(amount, currency) {
    console.log(`Amount: ${amount}, Currency: ${currency}`); // 입력값 로깅
    const exchangeRates = {
        usd: 1 / 1300, // 1USD = 1300KRW
        eur: 1 / 1420, // 1EUR = 1420KRW
        jpy: 100 / 920, // 100JPY = 920KRW
        krw: 1 // 기준 화폐 (KRW)
    };

    let convertedAmounts = {};
    const baseAmount = amount / exchangeRates[currency]; // KRW로 변환

    for (let key in exchangeRates) {
        convertedAmounts[key.toUpperCase()] = baseAmount * exchangeRates[key];
    }

    return convertedAmounts;
}

function formatConversionAsHTML(amounts) {
    const headers = ['금액', '통화'];
    const headerRow = headers.map(header => `<th>${header}</th>`).join('');

    const amountRows = Object.entries(amounts).map(([currency, amount]) => `
        <tr>
            <td style="text-align: right;">${new Intl.NumberFormat().format(Math.round(amount))}</td>
            <td style="text-align: center;">${currency}</td>
        </tr>
    `).join('');

    return `
        <style>
            table {
                border-collapse: collapse;
                width: 30%;
                border: 1px;
            }
            th, td {
                border: 1px solid black;
                text-align: left;
                padding: 1px;
            }
            th {
                background-color: #ffff00;
            }
        </style>
    
        <table>
            <thead>
                <tr>${headerRow}</tr>
            </thead>
            <tbody>
                ${amountRows}
            </tbody>
        </table>
    `;
}



// 환율 계산 라우트
app.get('/exchange.money', (req, res) => {
    const { amount, currency } = req.query;
    console.log(`Query Params - Amount: ${amount}, Currency: ${currency}`); // 쿼리 매개변수 로깅
    const convertedAmounts = convertCurrency(parseFloat(amount), currency);
    res.send(`
        ${title}
        <h2>환율 계산 결과</h2>
        ${formatConversionAsHTML(convertedAmounts)}
    `);
});

app.listen(54321, () => {
    console.log('Server running at http://localhost:54321/exchange.money');
});
