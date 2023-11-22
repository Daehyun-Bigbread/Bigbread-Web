const request = require('request');
const cheerio = require('cheerio');

console.log('<실습 8. 시리즈 도서 목록> 학번:202000449 이름:김대현');

const url = 'https://www.hanbit.co.kr/store/books/series_list.html';
request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
        $('dd').each((index, element) => {
            let fullTitle = $(element).prev('dt').text().trim();
            // book_count 클래스의 텍스트를 추출
            const countText = $(element).prev('dt').find('.book_count').text();
            // book_count 텍스트를 전체 제목 텍스트에서 제거
            fullTitle = fullTitle.replace(countText, '').trim();
            const description = $(element).text().trim();
            console.log(`차례 : ${index + 1}`);
            console.log(`제목 : ${fullTitle}`);
            console.log(`설명 : ${description}`);
            console.log('\n');
        });
    } else {
        console.log('Error:', error);
    }
});
