"use strict";
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign-in");
let getUserName = localStorage.getItem("username");
let getPassWord = localStorage.getItem("password");
loginBtn.addEventListener("click",login);
function login(e){
    e.preventDefault();
    if (username.value === "" || password.value === ""){
        alert("Please Fill Data");
    }else{
        if ((getUserName && getUserName === username.value) && (getPassWord && getPassWord === password.value)){
            setTimeout(() => {
                window.location = "index.html";
            },1500)
        }else{
            alert("Username Or Password Is Wrong");
        }
    }
}
let bars = document.querySelector(".bars");
let nav = document.querySelector("nav");
bars.addEventListener("click",function(){
    nav.classList.toggle("show");
})