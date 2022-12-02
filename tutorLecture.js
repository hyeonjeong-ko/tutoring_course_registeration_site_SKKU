const tutorLectureURL = "https://rpyy83l3r1.execute-api.ap-northeast-2.amazonaws.com/dev"

let temp1 = location.href.split("?");
let data1 = temp1[1].split(":");
const Name = data1[0]; 
const tutor_id = data1[1]; // 필요함

//그룹지원버튼 토글
let btntoggle = document.getElementById("btn_toggle");
let btntoggle2 = document.getElementById("Toggle")

// console.log(btntoggle2)
btntoggle.addEventListener("click",function(){
    btntoggle2.style.display = ((btntoggle2.style.display!='none') ? 'none' : 'block');
    btntoggle.innerText = ((btntoggle2.style.display!='none') ? '그룹지원 취소' : '그룹 지원');

})


let check = false;
let course_id, course_name, professor_name; //필요함



//2. 튜터링과목등록페이지 체크버튼눌렀을때 수업명/교수명해당수업있는지조회=================================================
//튜터링과목등록-신청과목정보확인 
let ckbtn = document.getElementById("check_btn");
ckbtn.addEventListener('click', function(){

    let lec = document.getElementById("lecNam");
    let prof = document.getElementById("profName");
    let checkbtn = document.getElementsByClassName("check_btn");

    // 사용자의 인풋값
    let lec_val= lec.value;
    let prof_val= prof.value;

    console.log(lec_val);
    console.log(prof_val);

    //만약 과목명과 교수명이같다면...
    //확인후 mycourse DB에 넣습니다.
    const allLectures = allLecture();
    allLectures.then((result) => {
        Object.keys(result.lectures)
            .forEach(element => {
                
                let lecture_id = result["lectures"][element]["lecture_id"];
                let lecture_name = result["lectures"][element]["name"];
                let professor  = result["lectures"][element]["professor"];

                if(lecture_name === lec_val && professor ===prof_val){
                    ckbtn.style.border="1px solid white";
                    course_id = lecture_id;
                    course_name = lecture_name;
                    professor_name = professor;
                    check = true;
                    console.log("아악 으아악");

                }
    
            });
            if(!check){
                alert("wrong info.correct info please");
                ckbtn.style.border="1px solid red";
        
            }
        });

});

async function allLecture() {
    return await fetch(tutorLectureURL + "/getallLecture", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json());
}



//3.과목등록 mycourse등록=================================================
//취득성적변수
let confirm_a;

document.getElementById("a+").addEventListener("click",function(){
    confirm_a="a+";
})
document.getElementById("a").addEventListener("click",function(){
    confirm_a="a";
})


// 튜터링과목등록-신청과목정보확인 
let tutorsubmit = document.getElementById("tutor_enroll_btn");
tutorsubmit.addEventListener('click', function(){

    //elements
    // let lec = document.getElementById("lecNam");
    // let prof = document.getElementById("profName");
    let syllabus = document.getElementById("syllabus");
    let usertext = document.getElementById("motivation");
    let grouptxt = document.getElementById("grouptxt");
    let grouptxt_val;


    if(grouptxt.value!=""){ //그룹지원 txt_value
        grouptxt_val = grouptxt.value;
    }

    let start_t = document.getElementById("starttime").value;
    let end_t = document.getElementById("endtime").value;
    let syllabus_val = syllabus.value;
    let usertext_val = usertext.value;

    if(start_t===""||end_t===""||syllabus_val===""||usertext_val===""){
        alert("please fill form.")
    }
    else if(!check){
        alert("Please check whether the lecture exists.")
    }
    else{
        //값이 모두 입력되었다면 DB에서 정보를 확인후 추가
        //튜터링 수업정보
        var timeinfo = start_t + "~" + end_t;

        //사용자의 인풋값
        //(취득성적은 'confirm_a'변수확인)
        // lec_val= lec.value;
        // prof_val= prof.value;
        // syllabus_val = syllabus.value;
        // usertext_val = usertext.value;

        // console.log(course_id);
        // console.log(course_name);
        // console.log(professor_name);
        // console.log(syllabus_val);
        // console.log(usertext_val);
        // console.log(grouptxt_val);
        // console.log(timeinfo);

        if(grouptxt_val === undefined) {
            console.log("text 넣기");
            grouptxt_val="";
            console.log(grouptxt_val);
        }

        const courseadd = tutorApplicatoin(course_id, course_name, professor_name, tutor_id, grouptxt_val, usertext_val, syllabus_val, timeinfo);

        courseadd.then(
            (result) => {
                if(result.success){
                    alert("Tutoring Course Added!");
                    window.close();
                }
                else{
                    alert("Adding Failed");
                }
            }
        )
}

async function tutorApplicatoin(course_id, course_name, professor_name, user_id, grouptxt_val, usertext_val,syllabus_val, timeinfo) {
    let data = {
        "id": course_id,
        "name": course_name,
        "professor": professor_name,
        "tutor": user_id,
        "tutee": grouptxt_val,
        "motivation": usertext_val,
        "syllabus": syllabus_val,
        "schedule": timeinfo
    };
    return await fetch(tutorLectureURL + "/addcourse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data) 
    })
        .then((response) => response.json());
}


});