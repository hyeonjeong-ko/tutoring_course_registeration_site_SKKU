const URL = "https://rpyy83l3r1.execute-api.ap-northeast-2.amazonaws.com/dev"

//get all courses
async function allcourses() {
    return await fetch(URL + "/getallcourse", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json());
}

//get all lectures
async function allLecture() {
    return await fetch(URL + "/getallLecture", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json());
}

//수강신청한 튜터링 과목을 받아옵니다. user_id : 로그인 한 후의 유저의 id(학번)을 받아옵니다. 현재의 경우 2020315791
async function allmycourses(user_id) {
    let data = {
        "id" : user_id
    };
    return await fetch(URL + "/getallmycourse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json());
}


//튜터링 수강 신청 - 튜티
//return is true/false
async function tuteeApplication(tutee_id, course_id) {
    let data = {
        "id": course_id,
        "tutee": tutee_id,
    };
    return await fetch(URL + "/addtutee", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json());
}

//튜터링 과목 등록 - 튜터
//return is true/false
//name : 과목명, professor : 교수 이름, tutor_id : 튜터 학번, tutees : 튜티들 학번, 튜티가 여러명이면 학번을 ","로 구분
async function tutorApplicatoin(id, name, professor, tutor_id, tutees) {
    let data = {
        "id": id,
        "name": name,
        "professor": professor,
        "tutor": tutor_id,
        "tutee": tutees
    };
    return await fetch(URL + "/addcourse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data) 
    })
        .then((response) => response.json());
}

const response = allcourses();
// let courses;
//promise를 parsing하는건 너무 어렵고요..(찾아봤는데 불가능한거 같습니다.) 따라서 다음 방법을 권장합니다.
response.then( (result) => {
    let contents = document.querySelector("#contents");

    Object.keys(result.courses)
        .forEach(element => {
            let temp = {

            };
            temp.id         = result["courses"][element]["id"];
            temp.name       = result["courses"][element]["name"];
            temp.professor  = result["courses"][element]["professor"];
            temp.tutor      = result["courses"][element]["tutor"];
            temp.tutee      = result["courses"][element]["tutee"];
            temp.tuteeNum   = result["courses"][element]["tuteeNum"];

            //요런식으로 추가하시면 될 것 같습니다.
            let new_course = document.createElement("b");
            new_course.textContent = temp.name;
            contents.appendChild(new_course);
            console.log(temp);
            // courses.push(courses_name[element]) -> 요렇게 해서 밖에서 console.log(courses)라고 해도 작동하지 않습니다. undefined가 나와요.
        });
    //해당 항목은 application_mentee.html에 과목 목록을 만드는 데에 필요할 것이라 생각합니다. 
    });

let user_id = "2020315791"; // 요건 로그인 후에 받아오시죠.
const mycourses = allmycourses(user_id);
const allLectures = allLecture();

mycourses.then( (result) => {
    let curApplication_form = document.querySelector("#curApplication_form");

    Object.keys(result.courses)
        .forEach(element => {
            let temp = {

            };
            temp.id         = result["courses"][element]["id"];
            temp.name       = result["courses"][element]["name"];
            temp.professor  = result["courses"][element]["professor"];
            temp.tutor      = result["courses"][element]["tutor"];
            temp.tutee      = result["courses"][element]["tutee"];
            

            //요런식으로 추가하시면 될 것 같습니다.
            let new_course = document.createElement("b");
            new_course.textContent = temp.name;
            curApplication_form.appendChild(new_course);
            console.log(temp);
            // courses.push(courses_name[element]) -> 요렇게 해서 밖에서 console.log(courses)라고 해도 작동하지 않습니다. undefined가 나와요.
        });
    //해당 항목은 application_mentee.html에 과목 목록을 만드는 데에 필요할 것이라 생각합니다. 
    });

    allLectures.then((result) => {
    Object.keys(result.lectures)
        .forEach(element => {
            let temp = {

            };
            temp.college    = result["courses"][element]["college"];
            temp.department = result["courses"][element]["department"];
            temp.lecture_id = result["courses"][element]["lecture_id"];
            temp.name       = result["courses"][element]["name"];
            temp.professor  = result["courses"][element]["professor"];

            console.log(temp);
        });
    });
