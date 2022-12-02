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


// const mycourses = allmycourses(user_id);
const allLectures = allLecture();

// mycourses.then( (result) => {
//     let curApplication_form = document.querySelector("#curApplication_form");

//     Object.keys(result.courses)
//         .forEach(element => {
//             let temp = {

//             };
//             temp.id         = result["courses"][element]["id"];
//             temp.name       = result["courses"][element]["name"];
//             temp.professor  = result["courses"][element]["professor"];
//             temp.tutor      = result["courses"][element]["tutor"];
//             temp.tutee      = result["courses"][element]["tutee"];

//             //요런식으로 추가하시면 될 것 같습니다.
// /*
//             let new_course = document.createElement("b");
//             new_course.textContent = temp.name;
//             curApplication_form.appendChild(new_course);
//             console.log(temp);
//   */                      
//             // courses.push(courses_name[element]) -> 요렇게 해서 밖에서 console.log(courses)라고 해도 작동하지 않습니다. undefined가 나와요.
//         });
//     //해당 항목은 application_mentee.html에 과목 목록을 만드는 데에 필요할 것이라 생각합니다. 
//     });

    allLectures.then((result) => {
    Object.keys(result.lectures)
        .forEach(element => {
            let temp = {

            };
            temp.college    = result["lectures"][element]["college"];
            temp.department = result["lectures"][element]["department"];
            temp.lecture_id = result["lectures"][element]["lecture_id"];
            temp.name       = result["lectures"][element]["name"];
            temp.professor  = result["lectures"][element]["professor"];
            temp.isInCourse = result["lectures"][element]["isInCourse"];

            //console.log(temp);

            let contents = document.querySelector("#contents_all");
            
        });
    });

    //학수번호로 과목 찾아 등록하는기능
    /*
    bar_enrollbtn.addEventListener("click",function() {
        let intext1 = document.getElementById("gwamok").value;
        let intext2 = document.getElementById("ban").value;

        let table = document.getElementsByTagName("table");
        
    })*/


    

    // table function
    var result = '';
    function createTable(p1,p2,p3,p4,p5,p6,i){
        var tbl = '<table class="enroll_table">';
        var tbl2 = '</table>';
        var th = '<thead>' + '<tr>' + 
        '<th>' + '더보기' + '</th>' +
        '<th>' + '신청' + '</th>' + 
        '<th>' + '학수번호 - 분반' + '</th>' +
        '<th>' + '교과목명' + '</th>' +
        '<th>' + '교강사' + '</th>' +
        '<th>' + 'Tutor' + '</th>' +
        '<th>' + '수강인원' + '</th>' +
        '<th>' + '수업시간/온오프' + '</th>'
        +'</tr>' + '</thead>';

                result += '<tr>' + '<td>' + '<div class="plus_btn">'+ '+' + '</div>' + '</td>' +
                '<td>' + '<div class="enroll_btn">' + '신청' + '</div>' + '</td>' +
                 '<td id= course_id' +i+'>' + p1 + '</td>' + 
                '<td>' + p2 + '</td>' +
                '<td>' + p3 + '</td>' + 
                '<td>' + p4 + '</td>' + 
                '<td>' + p5 + '/5' + '</td>' + 
                '<td>' + p6 + '</td>' +                 
                '</tr>'

    return tbl + th + result + tbl2 ;
    }



let j =0;

var tablebox = document.getElementById("contents")
response.then( (result) => {
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
            temp.schedule   = result["courses"][element]["schedule"];


            tablebox.innerHTML = createTable(temp.id,temp.name,temp.professor,temp.tutor,temp.tuteeNum, temp.schedule, j);
            j++;
            
            tmp = tablebox.innerHTML;
            tabletext = tmp.replace('NaN','');
            tablebox.innerHTML = tabletext;

    
      
            
            let enroll_btn = document.getElementsByClassName('enroll_btn');
            let plus_btn = document.getElementsByClassName('plus_btn');
            

            let usertable = document.getElementsByClassName('usertable');

            for(let i = 0; i<enroll_btn.length;i++){
                enroll_btn[i].addEventListener('click',function(){
                    console.log("hi");
                    console.log(i) //row index
                    
                    //신청등록버튼이벤트구현중
                    let enroll_table = document.getElementsByClassName('.enroll_table');
                    var arr = Array.prototype.slice.call( enroll_table )
                    console.log(arr.length)
                    
                    var rowList = enroll_table.rows;
                    console.log(rowList);
                    let classnumber = rowList[i].cells[2].InnerHTML; 
                    let classname = rowList[i].cells[3].InnerHTML;
                    let prof = rowList[i].cells[4].InnerHTML;
                    let tutor = rowList[i].cells[5].InnerHTML;
                    let tuteenum = rowList[i].cells[6].InnerHTML;
                    let schedule = rowList[i].cells[7].InnerHTML;

                    str = 
                    '<tr>' +
                        '<td>' + classnumber + '</td>' + 
                       '<td>' + classname + '</td>' +
                       '<td>' + prof + '</td>' + 
                       '<td>' + tutor+ '</td>' + 
                       '<td>' + tuteenum +'/5'+ '</td>' + 
                       '<td>' + schedule + '</td>' +                 
                       '</tr>'
                       
                })

            //더보기
            plus_btn[i].addEventListener('click',function() {
                console.log(i); // click한 +버튼인덱스

                //DB에서 인덱스에 해당하는 tutor명/취득성적/메시지를받아온다
                //modal.html 를가져옴(파일확인부탁)
                // let tutor_name = document.getElementsByClassName('.plus_tutorname');
                // let tutor_score = document.getElementsByClassName('.plus_tutorscore');
                // let tutor_msg = document.getElementsByClassName('.plus_tutormsg');
                
                let course_id = document.getElementById("course_id" + i).innerText;
                console.log(course_id)

                // EX_ tutor_name.innerText=DB에서끌어온값
                // console.log(tutor_name);
                // console.log(tutor_score);
                // console.log(tutor_msg);

                //=============================================================
                const courseURL =
                "https://rpyy83l3r1.execute-api.ap-northeast-2.amazonaws.com/dev";
            let temp = location.href.split("?");
        

                function modal(id,course_id) {
                    var zIndex = 9999;
                    var modal = document.getElementById(id);
                
                    const infos = getDetailInfo(course_id);
                    // console.log(infos);
                    infos.then(
                        (result) => {
                            let syllabus = document.getElementById("tutor syllabus");
                            let message = document.getElementById("tutor message");
                            let tutor = document.getElementById("tutor");

                            console.log(syllabus);
                            console.log(message);

                            syllabus.textContent = result.syllabus;
                            message.textContent = result.motivation;
                            tutor.textContent = result.tutor;
                
                            
                        });
                
                    // 모달 div 뒤에 희끄무레한 레이어
                    var bg = document.createElement("div");
                    bg.setStyle({
                        position: "fixed",
                        zIndex: zIndex,
                        left: "0px",
                        top: "0px",
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                        // 레이어 색갈은 여기서 바꾸면 됨
                        backgroundColor: "rgba(0,0,0,0.4)",
                    });
                    document.body.append(bg);
                
                    // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
                    modal
                        .querySelector(".modal_close_btn")
                        .addEventListener("click", function () {
                            bg.remove();
                            modal.style.display = "none";
                        });
                
                    modal.setStyle({
                        position: "fixed",
                        display: "block",
                        boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                
                        // 시꺼먼 레이어 보다 한칸 위에 보이기
                        zIndex: zIndex + 1,
                
                        // div center 정렬
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        msTransform: "translate(-50%, -50%)",
                        webkitTransform: "translate(-50%, -50%)",
                    });
                }
                
                // Element 에 style 한번에 오브젝트로 설정하는 함수 추가
                Element.prototype.setStyle = function (styles) {
                    for (var k in styles) this.style[k] = styles[k];
                    return this;
                };
                
                async function getDetailInfo(id) {
                    let data = {
                        "id": id
                    }
                    return await fetch(courseURL + "/getcourse", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data)
                    })
                        .then((response) => response.json());
                }


                //=============================================================
                modal("my_modal", "SWE2015-41");
                
            })

            

                
            }


            

            // course select
            var course_select = document.getElementById("course_select");
            var option=document.createElement("option");
            option.text=temp.name;
            option.value=temp.id ;
            course_select.add(option);
            
        });

    });



    
//모든 전공 과목들
var all_result = '';
function createTable_all(p1,p2,p3,p4,p5,p0){
    var tbl = '<table>';
    var tbl2 = '</table>';
    var th = '<thead>' + '<tr>' + 
        '<th>' + '신청가능 여부' + '</th>' + 
    '<th>' + '대학구분' + '</th>' +
    '<th>' + '학과' + '</th>' +
    '<th>' + '대학번호/분반' + '</th>' +
    '<th>' + '과목명' + '</th>' +
    '<th>' + '교수' + '</th>' +
    +'</tr>' + '</thead>';

           all_result += '<tr>' +
                '<td>' + '<div class="enroll_btn  view_enrollbtn okclass">' + p0 + '</div>' + '</td>' +
             '<td>' + p1 + '</td>' + 
            '<td>' + p2 + '</td>' +
            '<td>' + p3 + '</td>' + 
            '<td>' + p4 + '</td>' + 
            '<td>' + p5 + '</td>' +              
            '</tr>'

return tbl + th + all_result + tbl2 ;
}

//모든 전공 과목 업로드
allLectures.then((result) => {
    var tablebox_all = document.getElementById("contents_all")
    Object.keys(result.lectures)
        .forEach(element => {
            let temp = {

            };
            temp.college    = result["lectures"][element]["college"];
            temp.department = result["lectures"][element]["department"];
            temp.lecture_id = result["lectures"][element]["lecture_id"];
            temp.name       = result["lectures"][element]["name"];
            temp.professor  = result["lectures"][element]["professor"];
            temp.isInCourse = result["lectures"][element]["isInCourse"];
            
            let check;
            if(temp.isInCourse) check = "신청";
            else check = "불가"; 

            //table 생성
            //console.log(temp);
            tablebox_all.innerHTML = createTable_all(temp.college,temp.department,temp.lecture_id,temp.name,temp.professor, check);
            tmp = tablebox_all.innerHTML;
            tabletext = tmp.replace('NaN','');
            tablebox_all.innerHTML = tabletext;
           
            okclass =document.getElementsByClassName("okclass");

            console.log(okclass[0].textContent);
            for(let i=0;i<okclass.length;i++){
                if(okclass[i].textContent=="불가"){
                    okclass[i].style.backgroundColor="red";
                    
                    okclass[i].addEventListener("click",function() {
                        alert("개설되지 않은 과목입니다.");
                    })
                }
            }
         

        });
    });


//유저 테이블 만들기
var user_result = '';
function createUserTable(p1,p2,p3,p4,p5, p6){
    var tbl = '<table class="usertable">';
    var tbl2 = '</table>';
    var th = '<thead>' + '<tr>' + 
    '<th>' + '학수번호 - 분반' + '</th>' +
    '<th>' + '교과목명' + '</th>' +
    '<th>' + '교강사' + '</th>' +
    '<th>' + 'Tutor' + '</th>' +
    '<th>' + '수강인원' + '</th>' +
    '<th>' + '수업시간/온오프' + '</th>'
    +'</tr>' + '</thead>';

            user_result += '<tr>' +
            '<td>' + p1 + '</td>' + 
            '<td>' + p2 + '</td>' +
            '<td>' + p3 + '</td>' + 
            '<td>' + p4 + '</td>' + 
            '<td>' + p5 +'/5'+ '</td>' + 
            '<td>' + p6 + '</td>' +                 
            '</tr>'

return tbl + th  ;
}


// create the table row data
function insertdata(p1,p2,p3,p4,p5) {
    let user_row;
    user_row += '<tr>' +
    '<td>' + p1 + '</td>' + 
   '<td>' + p2 + '</td>' +
   '<td>' + p3 + '</td>' + 
   '<td>' + p4 + '</td>' + 
   '<td>' + p5 +'/5'+ '</td>' + 
   '<td>' + '11:00~12:00/offline' + '</td>' +                 
   '</tr>'

    return user_row ;
};











