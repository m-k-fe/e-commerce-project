"use strict";
let productsDom = document.querySelector(".products-content");
let noProductsDom = document.querySelector(".no-products");
function drawProductsUi (allItems){
    if (allItems && allItems.length == 0){
        shoppingCartEmptyMsg.style.display = "block";
        viewAllProductsBtn.style.display = "none";
        cartProductsMenu.style.padding = "30px";
        noProductsDom.innerHTML = "There Is No Items!!";
    }
    let productsUi = allItems.map(item => {
        return `
            <div class="product-item">
                <div>
                    ${item.offre === "NEW" ? "<span class='new'>"+ item.offre +"</span>" : "<span class='solde'>"+ item.offre +"</span>"}
                    <img src="${item.imageUrl}" alt="">
                    <h6>${item.name}</h6>
                    <span class="new-price">${item.newPrice}</span>
                    ${item.oldPrice ? "<span class='old-price'>"+ item.oldPrice +"</span>" : ""}
                    <span class="qty">Quantity: ${item.qty}</span>
                </div>
                <button onclick="removeFromCart(${item.id})">REMOVE FROM CART</button>
            </div>
        `
    })
    productsDom.innerHTML = productsUi.join("");
};
drawProductsUi(JSON.parse(localStorage.getItem("products-in-cart")) || []);
function removeFromCart(id){
    let items = JSON.parse(localStorage.getItem("products-in-cart"));
    let filtredItems = items.filter(item => item.id != id);
    cartProductsDivDom.innerHTML = "";
    badge.innerHTML = filtredItems.length;
    filtredItems.forEach(item => {
        cartProductsDivDom.innerHTML += `
            <div>
                <img src="${item.imageUrl}">
                <div>
                    <p>${item.title}</p>
                    <span>${item.newPrice}</span>
                    <span>Qty:${item.qty}</span>
                </div>
            </div>`;
    })
    localStorage.setItem("products-in-cart",JSON.stringify(filtredItems));
    drawProductsUi(filtredItems);
}