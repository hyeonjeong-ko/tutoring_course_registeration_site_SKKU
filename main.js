

// check id, pwd


// login button
function enterUrl() {
    // id, pw correct/wrong check
    const id = "2020315791"; //Correct example
    const name = "Ko"; //Correct example

    // const id = "2020312141"; //Wrong example
    // const name = "Jun"; //Wrong example 
    const check = logincheck(id, name); //아래 logincheck 함수를 확인하세요. return 형식은 Promise입니다.
    //Promise를 parsing하는 대신 아래처럼 사용하세요. allcourse 함수 말고는 return값이 data.success가 true/false로만 나올 것입니다.(당연히 그래야하고요)
    check.then(
        (data) => {
            if (data.success) {
                location.href = 'application.html' //로그인 성공

            }
            else {
                alert('Wrong id or pwd') //로그인 실패
            }
        }
    )
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
