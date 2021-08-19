"use strict";
let shoppingCartEmptyMsg = document.querySelector(".cart-products p");
let cartProductsDivDom = document.querySelector(".cart-products-div-dom");
let badge = document.querySelector(".badge");
let productsInCart = localStorage.getItem("products-in-cart") ? 
                JSON.parse(localStorage.getItem("products-in-cart")) :
                [];
if (productsInCart.length != 0){
    shoppingCartEmptyMsg.style.display = "none";    
    viewAllProductsBtn.style.display = "block";
    cartProductsMenu.style.padding = "10px";
    productsInCart.forEach(item => {
        cartProductsDivDom.innerHTML += `
            <div>
                <img src="${item.imageUrl}">
                <div>
                    <p>${item.title}</p>
                    <span>${item.newPrice}</span>
                    <span>Qty: ${item.qty}</span>
                </div>
            </div>`;
    })
    badge.innerHTML = productsInCart.length;
}