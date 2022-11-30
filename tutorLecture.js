let btntoggle = document.getElementById("btn_toggle");
let btntoggle2 = document.getElementById("Toggle")

console.log(btntoggle2)
btntoggle.addEventListener("click",function(){
    btntoggle2.style.display = ((btntoggle2.style.display!='none') ? 'none' : 'block');
    btntoggle.innerText = ((btntoggle2.style.display!='none') ? '그룹지원 취소' : '그룹 지원');
    
})