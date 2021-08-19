"use strict";
let header = document.querySelector(".header");
let searchIcon = document.querySelector(".search-icon a");
let userIcon = document.querySelector(".user-icon a");
let userList = document.querySelectorAll(".dropdown-user");
let shoppingCartIcon = document.querySelector(".shopping-cart-icon a")
let cartProductsMenu = document.querySelector(".cart-products");
let viewAllProductsBtn = document.querySelector(".cart-products button");
let dropDownMenu = document.querySelector(".drop-down-menu");
let dropDownUserNoLogin = document.querySelector(".dropdown-user.no-login");
userList.forEach(item => {
    toggleElement(userIcon,item);
})
toggleElement(shoppingCartIcon,cartProductsMenu);
function toggleElement(icon,element){
    icon.addEventListener("click",function(e){
        e.preventDefault();
        element.classList.toggle("toggle");
    })
}
window.addEventListener("scroll",function(){
    if (window.scrollY > 200){
        header.classList.add("fixed");
    }else{
        header.classList.remove("fixed");
    }
})
let bars = document.querySelector(".bars");
let nav = document.querySelector("nav");
let close = document.querySelector(".close");
bars.addEventListener("click",function(){
    nav.classList.add("show");
})
close.addEventListener("click",function(){
    nav.classList.remove("show");
})
viewAllProductsBtn.addEventListener("click",function(){
    window.location = "cart.html";
})
if (!localStorage.getItem("username")){
    dropDownMenu.style.display = "none";
}else{
    dropDownMenu.style.display = "block";
}