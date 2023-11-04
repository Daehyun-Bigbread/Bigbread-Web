const data = ['홍길동', 173, 48, '임꺽정', 180, 78,
              '전우치', 165, 92, '부채도사', 145, 68];

const fig0 = "----+----+----+----+----+----+----+----+----+----+";
const fig1 = "####+####+####+####+####+####+####+####+####+####+";
const fig2 = "    5   10   15   20   25   30   35   40   45   50";
        
// 학생 정보
console.log();
console.log('<실습5. 비만도 판정>  학번: 202000449  이름: 김대현');
console.log();

// 이곳에 프로그램을 작성하시오.

function calculate(height, weight) {
    const heightInMeter = height / 100;
    return weight / (heightInMeter * heightInMeter);
}

function judgeBmi(bmi) {
    if (bmi < 18.5) {
        return "저체중";
    }

    else if (bmi < 25) {
        return "정상";
    }

    else if (bmi < 30) {
        return "과체중";
    }

    else {
        return "비만"
    }

}

function Graph(bmi) {
    const position = Math.round(bmi);
    let graph = "";
    for (let i = 0; i < 50; i++) {
        if (i < position) {
            graph += fig1[i];
        } else {
            graph += fig0[i];
        }
    }
    return graph;
}


for (let i = 0; i < data.length; i+=3) {
    const name = data[i];
    const height = data[i+1];
    const weight = data[i+2];
    const bmi = calculate(height, weight);
    const result = judgeBmi(bmi);

    console.log("이름:", name);
    console.log("신장:", height, "cm");
    console.log("몸무게:", weight, "kg");
    console.log("판정:", result, "(bmi=",bmi,")");

    console.log(Graph(bmi));

    console.log(fig2);
}