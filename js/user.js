"use strict";
let links = document.querySelector("#links");
let userInfo = document.querySelector("#user-info");
let userDom = document.querySelector("#user");
let logOutBtn = document.querySelector("#log-out");
let getUser = localStorage.getItem("username");
if (getUser){
    links.remove();
    userInfo.style.display = "block";
    userDom.innerHTML += getUser.toUpperCase(); 
}else{
    links.classList.add("no-login");
    Array.from(links.children).forEach(element => {
        element.style.marginBottom = "0";
    });
}
logOutBtn.addEventListener("click",function(e){
    e.preventDefault();
    localStorage.clear();
    setTimeout(() => {
        window.location = "register.html";
    },1500)
})