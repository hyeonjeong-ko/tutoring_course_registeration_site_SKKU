

// check id, pwd


// login button
function enterUrl() {
    // id, pw correct/wrong check
    const id = "2020312141"; //Correct example
    const name = "Jung"; //Correct example

    // const id = "2020312141"; //Wrong example
    // const name = "Jun"; //Wrong example 
    const check = logincheck(id, name); //아래 logincheck 함수를 확인하세요. return 형식은 Promise입니다.
    //Promise를 parsing하는 대신 아래처럼 사용하세요. allcourse 함수 말고는 return값이 data.success가 true/false로만 나올 것입니다.(당연히 그래야하고요)
    check.then(
        (data) => {
            if(data.success){
                location.href = 'application_mentee.html' //로그인 성공
            }
            else{
                alert('Wrong id or pwd') //로그인 실패
            }
        }
    )

    // if (true) {
    //     // mentor/mentee check
    //     if (true) {
    //         location.href = 'application_mentee.html'
    //     } else {
    //         location.href = 'application_mentor.html' //요건 mentee html에 과목을 추가하는 버튼을 만드는게 좋아보입니다.
    //     }

    // } else {
    //     alert('Wrong id or pwd')
    // }
}
loginBtn.addEventListener('click', enterUrl)

// login with enter button
document.onkeyup = function (command) {
    let key = command.keyCode
    if (key === 13) {
        enterUrl()
    }
}

//https 
const serverURL = "https://rpyy83l3r1.execute-api.ap-northeast-2.amazonaws.com/dev"

//get all courses
async function allcourses(){
    return await fetch(serverURL + "/getallcourse", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        })
        .then((response) => response.json());
}

const courses = allcourses();
console.log(courses);
//promise를 parsing하는건 너무 어렵고요..(찾아봤는데 불가능한거 같습니다.) 따라서 다음 방법을 권장합니다.
courses.then(function(result){
    //해당 항목은 application_mentee.html에 과목 목록을 만드는 데에 필요할 것이라 생각합니다. 
});

//login function
//return is true/false

async function logincheck(id, name){
    let data = {
        "id" : id,
        "name" : name,
    }

    return await fetch(serverURL + "/login",{
            method: "POST",
            headers : {
              "Content-Type": "application/json",
            },
            body : JSON.stringify(data)
        })
        .then((response) => response.json());
}

//튜터링 수강 신청 - 튜티
//return is true/false
async function tuteeApplication(tutee_id, course_id){
    return await fetch(serverURL + "/addtutee",{
        method : "POST",
        headers : {
            "Content-Type": "application/json",
        }, 
        body : {
            "id" : course_id,
            "tutee" : tutee_id,
        }
    })
    .then((response) => response.json());
}

//튜터링 과목 등록 - 튜터
//return is true/false
//name : 과목명, professor : 교수 이름, tutor_id : 튜터 학번, tutees : 튜티들 학번, 튜티가 여러명이면 학번을 ","로 구분
async function tutorApplicatoin(id, name, professor, tutor_id, tutees){
    return await fetch(serverURL + "addcourse",{
        method : "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body : {
            "id" : id,
            "name" : name,
            "professor" : professor,
            "tutor" : tutor_id,
            "tutee" : tutees
        }
    })
    .then((response) => response.json());
}