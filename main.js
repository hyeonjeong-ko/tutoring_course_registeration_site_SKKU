






// check id, pwd


// login button
function enterUrl() {
    location.href = 'application.html'
}
loginBtn.addEventListener('click', enterUrl)

// login with enter button
document.onkeyup = function (command) {
    let key = command.keyCode
    if (key === 13) {
        enterUrl()
    }
}
