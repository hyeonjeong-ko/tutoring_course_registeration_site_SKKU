

// check id, pwd

const loginBtn = document.getElementById("loginBtn");


//로그인 버튼을 클릭했을때
loginBtn.addEventListener('click', function(event){
    let id = document.getElementById('idval').value;
    let pwd = document.getElementById('pwd').value;

    console.log(logincheck(id,pwd))

    if(id.length==0 || pwd.length==0){
        alert("Please Enter your ID and Password.");
    }else{
        enterUrl(id,pwd);
    }


});


// login button
function enterUrl(id,pwd) {
    // id, pw correct/wrong check
    //const id = "2020315791"; //Correct example
    //const name = "Ko"; //Correct examp

    //location.href = 'application.html'
    // const id = "2020312141"; //Wrong example
    // const name = "Jun"; //Wrong example 
    
  

    const check = logincheck(id, pwd); //아래 logincheck 함수를 확인하세요. return 형식은 Promise입니다.
    //Promise를 parsing하는 대신 아래처럼 사용하세요. allcourse 함수 말고는 return값이 data.success가 true/false로만 나올 것입니다.(당연히 그래야하고요)

    console.log(check);

    check.then(
        (data) => {
            if (data.success) {
                alert("successs");

                

                location.href = 'application.html?'+id+":"+pwd //로그인 성공

            }
            else {
                alert('Wrong ID password.'); //로그인 실패
            }
        }
    )
}

// login with enter button
/*
document.onkeyup = function (command) {
    let key = command.keyCode
    if (key === 13) {
        enterUrl()
    }
}
*/

//임시주석
//const loginBtn = document.getElementById("loginBtn")

//loginBtn.addEventListener('click', enterUrl)


// tutoring lecture application
function tutorLecture(name, id) {
    window.open("tutorLecture.html?"+name+":"+id, "tutor Lecture Application", "width=800, height=600, left=300, top=200")
}


//https 
const serverURL = "https://rpyy83l3r1.execute-api.ap-northeast-2.amazonaws.com/dev"



//login function
//return is true/false

async function logincheck(id, name) {
    let data = {
        "id": id,
        "name": name,
    }

    

    return await fetch(serverURL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json());
}