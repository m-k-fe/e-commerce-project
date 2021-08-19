"use strict";
//VARIABLES
let inputFile = document.querySelector(".section-form-create #input-img");
let inputUserName = document.querySelector(".section-form-create #input-username");
let inputEmail = document.querySelector(".section-form-create #input-email");
let inputPassword = document.querySelector(".section-form-create #input-password");
let editProductBtn = document.querySelector(".section-form-create #create-product-btn");
let showPasswordIcon = document.querySelector(".section-form-create #show-password-icon");
let productImage;
inputUserName.value = localStorage.getItem("username");
inputEmail.value = localStorage.getItem("email");
inputPassword.value = localStorage.getItem("password");
//EVENTS
inputFile.addEventListener("change",uploadImage);
showPasswordIcon.addEventListener("click",showHidePassword);
editProductBtn.addEventListener("click",editProfile);
//FUNCTIONS
function showHidePassword(){
    if (inputPassword.getAttribute("type") === "password"){
        inputPassword.setAttribute("type","text");
    }else{
        inputPassword.setAttribute("type","password");
    }
}
function editProfile(e){
    if (productImage === undefined){
        localStorage.setItem(("image-user"),"images/avatar.jpg");
    }else{
        localStorage.setItem(("image-user"),productImage);
    }
    localStorage.setItem(("username"),inputUserName.value);
    localStorage.setItem(("email"),inputEmail.value);
    localStorage.setItem(("password"),inputPassword.value);
    setTimeout(item => {
        window.location = "profile.html";
    },1500);
}
function uploadImage(){
    let file = this.files[0];
    getBase64(file);
    let types = ["image/jpeg","image/png"];
    if (types.indexOf(file.type) == -1){
        alert("Type Not Supported!!");
        return;
    }
    if (file.size > 2 * 1024 * 1024){
        alert("Image Not Exced 2MG");
        return;
    }
    productImage = URL.createObjectURL(file);
}
function getBase64(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load",function(){
        productImage = reader.result;
    })
    reader.addEventListener("error",function(){
        alert("Error!!");
    })
}