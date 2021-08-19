"use strict";
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#sign-up");
registerBtn.addEventListener("click",register);
function register(e){
    e.preventDefault();
    if (username.value === "" || email.value === "" || password.value === ""){
        alert("Please Fill Data");
    }else{
        localStorage.setItem("username",username.value);
        localStorage.setItem("email",email.value);
        localStorage.setItem("password",password.value);
        setTimeout(() => {
            window.location = "login.html";
        },1500)
    }
}
let bars = document.querySelector(".bars");
let nav = document.querySelector("nav");
bars.addEventListener("click",function(){
    nav.classList.toggle("show");
})