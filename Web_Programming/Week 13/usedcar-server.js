const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const title = '<실습 10. 중고차 검색> 학번: 202000449 이름: 김대현';

// Car 클래스 정의
class Car {
    constructor(id, model, year, mileage, color, price) {
        this.id = id;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.color = color;
        this.price = price;
    }
}

// 중고차 데이터베이스 (간단한 예시)
let usedcarDB = [
    // 차량 데이터
    // 예: { id: 'S-1', model: '소나타', year: 2016, mileage: 133033, color: 'black', price: 890 }
    //      등록번호,  차종,   연식, 주행거리, 색상,   가격
    new Car('S-1', '소나타', 2016, 133033, 'black', 890),
    new Car('S-2', '소나타', 2016, 104832, 'white', 1050),
    new Car('S-3', '소나타', 2022, 3900, 'green', 3090),
    new Car('S-4', '소나타', 2012, 167468, 'grey', 450),
    new Car('S-5', '소나타', 2018, 67640, 'black', 1820),
    new Car('G-1', '그랜저', 2018, 29893, 'black', 2830),
    new Car('G-2', '그랜저', 2011, 184298, 'black', 690),
    new Car('G-3', '그랜저', 2015, 130535, 'grey', 1050),
    new Car('G-4', '그랜저', 2013, 134647, 'grey', 740),
    new Car('A-1', '아반떼', 2018, 94379, 'grey', 960),
    new Car('A-2', '아반떼', 2018, 27955, 'blue', 1390),
    new Car('A-3', '아반떼', 2011, 55268, 'grey', 490),
    new Car('A-4', '아반떼', 2017, 60006, 'white', 1220),
    new Car('A-5', '아반떼', 2013, 73461, 'grey', 670),
    new Car('A-6', '아반떼', 2019, 56530, 'black', 1220),
    new Car('A-7', '아반떼', 2020, 26347, 'red', 2630)
];

// 차량 검색
app.get('/search.usedcar', (req, res) => {
    const { model, color, price } = req.query;

    // 검색 기준에 맞는 차량 필터링
    let filteredCars = usedcarDB.filter(car => {
        return (model === '전체' || car.model === model) &&
            (color === '전체' || car.color === color) &&
            (price === '전체' || car.price, price);
        withinPriceRange(car.price, price);
    });

    // 검색 결과 반환
    res.send(`
        ${title}
        <h2>중고차 검색 결과</h2>
        ${formatCarsAsHTML(filteredCars)}
    `);
});

// 가격 범위에 따른 필터링 함수
function withinPriceRange(carPrice, priceRange) {
    if (priceRange === '전체') return true;

    let [minPrice, maxPrice] = priceRange.split('~').map(p => parseInt(p.replace('만원', '').trim()));
    maxPrice = isNaN(maxPrice) ? Infinity : maxPrice;
    return carPrice >= minPrice && carPrice <= maxPrice;
}

// 차량 목록을 HTML 테이블 형식으로 변환
function formatCarsAsHTML(cars) {
    const headers = ['순서', '등록번호', '차종', '연식', '주행거리', '색상', '가격'];
    const headerRow = headers.map(header => `<th>${header}</th>`).join('');

    const carRows = cars.map((car, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${car.id}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td>${car.mileage.toLocaleString()}km</td>
            <td>${car.color}</td>
            <td>${car.price.toLocaleString()}만원</td>
        </tr>
    `).join('');

    return `
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
                border: 2px solid blue;
            }
            th, td {
                border: 1px solid black;
                text-align: left;
                padding: 8px;
            }
            th {
                background-color: #ffff00;
            }
        </style>
        <table>
            <colgroup>
                <col style="width: 5%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
                <col style="width: 10%;">
                <col style="width: 20%;">
                <col style="width: 10%;">
                <col style="width: 25%;">
            </colgroup>
            <thead>
                <tr>${headerRow}</tr>
            </thead>
            <tbody>
                ${carRows}
            </tbody>
        </table>
    `;
}


// 차량 검색 라우트
app.get('/search.usedcar', (req, res) => {
    const { model, color, price } = req.query;

    let filteredCars = usedcarDB.filter(car => {
        return (model === '전체' || car.model === model) &&
            (color === '전체' || car.color === color) &&
            withinPriceRange(car.price, price);
    });

    res.send(`${title}<h2>중고차 검색 결과</h2>${formatCarsAsHTML(filteredCars)}`);
});

app.listen(54321, () => {
    console.log('Server running at http://localhost:54321/search.usedcar');
});
