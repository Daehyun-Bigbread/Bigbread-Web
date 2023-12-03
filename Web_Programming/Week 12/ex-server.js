const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: false }));

const title = '<실습 9. Express 실습> 학번: 202000449 이름: 김대현'

// (1) 사칙연산 계산
app.get('/:op/:n1/:n2', (request, response) => {
    const { op, n1, n2 } = request.params;
    const number1 = parseFloat(n1);
    const number2 = parseFloat(n2);
    let result;
    let symbol;

    switch (op) {
        case 'add':
            result = number1 + number2;
            symbol = '+';
            break;
        case 'sub':
            result = number1 - number2;
            symbol = '-';
            break;
        case 'mul':
            result = number1 * number2;
            symbol = '*';
            break;
        case 'div':
            if (number2 === 0) {
                return response.status(400).send('0으로 나눌 수 없습니다.');
            }
            result = number1 / number2;
            symbol = '/';
            break;
        default:
            return response.status(400).send('잘못된 연산자입니다.');
    }

    response.send(`${title}<h2>(1) 사칙연산 계산</h2> <h3>연산 결과: ${n1} ${symbol} ${n2} = ${result}</h3>`);
});

// (2) 숫자 정렬하기
app.get('/sort', (request, response) => {
    // URL 매개변수에서 숫자를 받습니다.
    const numbers = [request.query.a, request.query.b, request.query.c].map(Number);
    // 숫자를 오름차순으로 정렬합니다.
    const sortedNumbers = numbers.sort((a, b) => a - b);
    response.send(`${title}<h2>(2) 숫자 정렬하기</h2> <h3> a = ${request.query.a}, b = ${request.query.b}, c = ${request.query.c}</h3> <h3>sorted : ${sortedNumbers.join(', ')}</h3>`);
});


// (3) 사각형 그리기
app.post('/rect', (request, response) => {
    const { width, height } = request.body;
    const w = parseInt(width);
    const h = parseInt(height);
    let drawing = '';

    for (let i = 0; i < h; i++) {
        let line = '';
        for (let j = 0; j < w; j++) {
            line += 'H';
        }
        drawing += line + '<br>';  // HTML에서 줄바꿈을 위해 <br> 사용
    }

    response.send(`<html>
                    <head><title>사각형 그리기</title></head>
                    <body style="background-color: white; color: black;">
                        <p>${title}</p>
                        <h2>(3) 사각형 그리기 (가로 ${w}, 세로 ${h})</h2>
                        <div>${drawing}</div> 
                    </body>
                   </html>`);
});

app.listen(54321, () => {
    console.log('Server running at http://localhost:54321');
});