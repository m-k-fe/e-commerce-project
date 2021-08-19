"use strict";
let productsDom = document.querySelector(".products-content");
let noProductsDom = document.querySelector(".no-products");
function drawProductsUi (allItems){
    let myProducts = allItems.filter(item => item.isMe === "Y");
    if (myProducts && myProducts.length == 0){
        noProductsDom.innerHTML = "There Is No Items!!";
    }
    let productsUi = myProducts.map(item => {
        return `
            <div class="product-item">
                <div>
                    ${item.offre === "NEW" ? "<span class='new'>"+ item.offre +"</span>" : "<span class='solde'>"+ item.offre +"</span>"}
                    <img src="${item.imageUrl}" alt="">
                    <h6>${item.name}</h6>
                    <span class="new-price">${item.newPrice}</span>
                    ${item.oldPrice ? "<span class='old-price'>"+ item.oldPrice +"</span>" : ""}
                    <a id="edit-product" onclick=editProductFun(${item.id})>Edit Product</a>
                </div>
                <button onclick="removeFromCart(${item.id})">DELETE PRODUCT</button>
            </div>
        `
    })
    productsDom.innerHTML = productsUi.join("");
};
drawProductsUi(JSON.parse(localStorage.getItem("products")) || products);
function editProductFun(id){
    localStorage.setItem("my-product-id",id);
    window.location = "edit-product.html";
}
function removeFromCart(id){
    let items = JSON.parse(localStorage.getItem("products")) || products;
    let myProducts = items.filter(item => item.isMe === "Y");
    let filtredItems = myProducts.filter(item => item.id !== id);
    let choosenItem = items.find(item => item.id == id);
    items = items.filter(item => item.id !== choosenItem.id);
    localStorage.setItem("products",JSON.stringify(items));
    drawProductsUi(filtredItems);
    let favoriteItems = JSON.parse(localStorage.getItem("products-in-favorite")) || [];
    favoriteItems = favoriteItems.filter(item => item.id !== choosenItem.id);
    localStorage.setItem("products-in-favorite",JSON.stringify(favoriteItems));
    let productsViews = JSON.parse(localStorage.getItem("products-views")) || [];
    productsViews = productsViews.filter(item => item.id !== choosenItem.id);
    localStorage.setItem("products-views",JSON.stringify(productsViews));
    let cartItems = JSON.parse(localStorage.getItem("products-in-cart")) || [];
    cartItems = cartItems.filter(item => item.id !== choosenItem.id) ;
    badge.innerHTML = cartItems.length;
    cartProductsDivDom.innerHTML = "";
    cartItems.forEach(item => {
        cartProductsDivDom.innerHTML += `
            <div>
                <img src="${item.imageUrl}">
                <div>
                    <p>${item.title}</p>
                    <span>${item.newPrice}</span>
                    <span>Qty: ${item.qty}</span>
                </div>
            </div>`;
    });
    localStorage.setItem("products-in-cart",JSON.stringify(cartItems));
}