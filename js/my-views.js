"use strict";
let productsDom = document.querySelector(".products-content");
let noProductsDom = document.querySelector(".no-products");
function drawProductsUi (allItems){
    if (allItems && allItems.length == 0){
        noProductsDom.innerHTML = "There Is No Items!!";
    }
    let productsUi = allItems.map(item => {
        return `
            <div class="product-item" id="my-views-item">
                <div>
                    ${item.offre === "NEW" ? "<span class='new'>"+ item.offre +"</span>" : "<span class='solde'>"+ item.offre +"</span>"}
                    <img src="${item.imageUrl}" alt="">
                    <h6>${item.name}</h6>
                    <span class="new-price">${item.newPrice}</span>
                    ${item.oldPrice ? "<span class='old-price'>"+ item.oldPrice +"</span>" : ""}
                    <span class="qty">Quantity: ${item.qty}</span>
                </div>
                <button id="edit-btn" onclick="editProductFun(${item.id})" style="display:${item.isMe === "Y" ? 'block' : 'none'}">Edit Product</button>
            </div>
        `
    })
    productsDom.innerHTML = productsUi.join("");
};
drawProductsUi(JSON.parse(localStorage.getItem("products-views")) || []);
function editProductFun(id){
    localStorage.setItem("my-product-id",id);
    window.location = "edit-product.html";
}