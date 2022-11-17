

// check id, pwd


// login button
function enterUrl() {
    // id, pw correct/wrong check
    if (true) {
        // mentor/mentee check
        if (true) {
            location.href = 'application_mentee.html'
        } else {
            location.href = 'application_mentor.html'
        }

    } else {
        alert('Wrong id or pwd')
    }
}
loginBtn.addEventListener('click', enterUrl)

// login with enter button
document.onkeyup = function (command) {
    let key = command.keyCode
    if (key === 13) {
        enterUrl()
    }
}
