"use strict";
let imageUser = document.querySelector(".user-avatar");
let usernameDom = document.querySelector(".username-dom");
let emailDom = document.querySelector(".email-dom");
let myProductsLength = document.querySelector(".my-products-length span");
let myFavoriteLength = document.querySelector(".my-products-length.favorite span");
let myViewsLength = document.querySelector(".my-products-length.views span");
let allProducts = JSON.parse(localStorage.getItem("products")) || products;
let myProducts = allProducts.filter(item => item.isMe === "Y");
let myFavoriteProducts = JSON.parse(localStorage.getItem("products-in-favorite")) || [];
let myViewsProducts = JSON.parse(localStorage.getItem("products-views")) || [];
usernameDom.innerHTML = localStorage.getItem("username").toUpperCase();
emailDom.innerHTML = localStorage.getItem("email");
imageUser.src = localStorage.getItem("image-user") ? 
        localStorage.getItem("image-user") : 
        "images/avatar.jpg";
myProductsLength.innerHTML = myProducts.length;
myFavoriteLength.innerHTML = myFavoriteProducts.length;
myViewsLength.innerHTML = myViewsProducts.length;