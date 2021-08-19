"use strict";
let allProducts = JSON.parse(localStorage.getItem("products")) || products;
let productId = localStorage.getItem("id");
let itemInDb = allProducts.find(item => item.id == productId);
let productsDom = document.querySelector(".product-details");
productsDom.innerHTML = `
    <div class="item-details">
        <div class="item-details-img">
            <img src="${itemInDb.imageUrl}">
        </div>
        <div class="item-details-desc">
            <h3 class="title">${itemInDb.title}</h3>
            <div>
                <span class="span-name">Name</span> <span class="span-line">${itemInDb.name}</span>
            </div>
            <div>
                <span class="span-name">Category</span> <span class="span-line">${itemInDb.category}</span>
            </div>
            <div>
                <span class="span-name">Size</span> <span class="span-line">${itemInDb.size}</span>
            </div>
            <div>
                <span class="span-name">Offre</span> <span class="span-line">${itemInDb.offre}</span>
            </div>
            <div>
                <span class="span-name">Price</span> <span class="span-line">${itemInDb.newPrice}</span>
                ${itemInDb.oldPrice ? "<span class='span-line' id='old-price'>" + itemInDb.oldPrice + "</span>" : ""}
            </div>
            <div>
                <span class="span-name">Description</span> <span class="span-line" id="desc">${itemInDb.desc}</span>
            </div>
        </div>
    </div>
`
let productsViews = localStorage.getItem("products-views") ?
            JSON.parse(localStorage.getItem("products-views")) :
            [];
let isProductInViews = productsViews.some(item => item.id === itemInDb.id);
if (isProductInViews){

}else{
    productsViews.push(itemInDb);
}
localStorage.setItem("products-views",JSON.stringify(productsViews));