// const URL = "https://rpyy83l3r1.execute-api.ap-northeast-2.amazonaws.com/dev"

//그룹지원버튼 토글
let btntoggle = document.getElementById("btn_toggle");
let btntoggle2 = document.getElementById("Toggle")

// console.log(btntoggle2)
// btntoggle.addEventListener("click",function(){
//     btntoggle2.style.display = ((btntoggle2.style.display!='none') ? 'none' : 'block');
//     btntoggle.innerText = ((btntoggle2.style.display!='none') ? '그룹지원 취소' : '그룹 지원');
    
// })




//2. 튜터링과목등록페이지 체크버튼눌렀을때 수업명/교수명해당수업있는지조회=================================================
//튜터링과목등록-신청과목정보확인 
// let ckbtn = document.getElementsByClassName("check_btn");
// ckbtn.addEventListener('click', function(){

// let lec = document.getElementById("lecNam");
// let prof = document.getElementById("profName");
// let checkbtn = document.getElementsByClassName("check_btn");

// //사용자의 인풋값
// lec_val= lec.value;
// prof_val= prof.value;

// //만약 과목명과 교수명이같다면...
// //확인후 mycourse DB에 넣습니다.
// // if(){
// //     ckbtn.style.border="1px solid white";

// // }else{
// //     alert("wrong info.correct info please");
// //     ckbtn.style.border="1px solid red";

// // }


// });



//3.과목등록 mycourse등록=================================================
//취득성적변수
let confirm_a;

// document.getElementById("a+").addEventListener("click",function(){
//     confirm_a="a+";
// })
// document.getElementById("a").addEventListener("click",function(){
//     confirm_a="a";
// })


//튜터링과목등록-신청과목정보확인 
// let tutorsubmit = document.getElementById("tutor_enroll_btn");
// tutorsubmit.addEventListener('click', function(){

// //elements
// let lec = document.getElementById("lecNam");
// let prof = document.getElementById("profName");
// let syllabus = document.getElementsByClassName("syllabustxt1");
// let usertext = document.getElementsByClassName("usertext");
// let grouptxt = document.getElementById("grouptxt");
// let grouptxt_val;


// if(grouptxt.value!=""){ //그룹지원 txt_value
//     grouptxt_val = grouptxt.value;

// }

// var start_t = document.getElementById("starttime").value;
// var end_t = document.getElementById("endtime").value;

// if(start_t==""||end_t==""||lec_val==""||prof_val==""||syllabus_val==""||usertext_val==""){
//     alert("please fill form.")
// }else{
//     //값이 모두 입력되었다면 DB에서 정보를 확인후 추가
//     //튜터링 수업정보
//     var timeinfo = start_t + "~" + end_t;

//     //사용자의 인풋값
//     //(취득성적은 'confirm_a'변수확인)
//     lec_val= lec.value;
//     prof_val= prof.value;
//     syllabus_val = syllabus.value;
//     usertext_val = usertext.value;



// }





// });