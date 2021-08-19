"use strict";
let productsDom = document.querySelector(".products-content");
function drawProductsUi(products){
    let productsUi = products.map(item => {
        return `
            <div class="product-item">
                <div>
                    ${item.offre === "NEW" ? "<span class='new'>"+ item.offre +"</span>" : "<span class='solde'>"+ item.offre +"</span>"}
                    <i class="fa fa-heart-o" style="color:${item.liked === true ? 'red' : ''}" onclick="addToFavorite(${item.id})"></i>
                    <img src="${item.imageUrl}" alt="">
                    <h6 onclick=saveItem(${item.id})>${item.name}</h6>
                    <span class="new-price">${item.newPrice}</span>
                    ${item.oldPrice ? "<span class='old-price'>"+ item.oldPrice +"</span>" : ""}
                </div>
                <button onclick="addToCart(${item.id})">ADD TO CART</button>
            </div>
        `
    })
    productsDom.innerHTML = productsUi.join("");
}
drawProductsUi(JSON.parse(localStorage.getItem("products")) || products);
//UL PRODUCTS
let listItems = Array.from(document.querySelectorAll(".products ul li"));
listItems[0].classList.add("active");
listItems.forEach(item => {
    item.addEventListener("click",function(e){
        let arr = JSON.parse(localStorage.getItem("products")) || products;
        let listItemActive = listItems.find(item => item.className === "active");
        listItemActive.classList.remove("active");
        e.target.classList.add("active");
        if (e.target.getAttribute("value") === "ALL"){
            drawProductsUi(arr);
        }else{
            let filtredItems = arr.filter(item => item.category === e.target.getAttribute("value"));
            drawProductsUi(filtredItems);
        }
    })
})
//ADD TO CART
function addToCart(id){
    if (localStorage.getItem("username")){
        shoppingCartEmptyMsg.style.display = "none";
        cartProductsMenu.style.padding = "10px";
        viewAllProductsBtn.style.display = "block";
        let allProducts = JSON.parse(localStorage.getItem("products")) || products;
        let choosenItem = allProducts.find(item => item.id === id);
        let isProductExist = productsInCart.some(item => item.id == choosenItem.id);
        if (isProductExist){
            productsInCart = productsInCart.map(item => {
                if (item.id === choosenItem.id) item.qty += 1;
                return item;
            })
        }else{
            productsInCart.push(choosenItem);
        }
        cartProductsDivDom.innerHTML = "";
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
        localStorage.setItem("products-in-cart",JSON.stringify(productsInCart));
        let cartProductsItems = document.querySelectorAll(".cart-products-div-dom > div");
        badge.innerHTML = cartProductsItems.length;
    }else{
        window.location = "register.html";
    }
}
//DEAL OF THE WEEK
let daysDom = document.querySelector(".day h3");
let hoursDom = document.querySelector(".hours h3");
let minutesDom = document.querySelector(".minutes h3");
let secondsDom = document.querySelector(".secondes h3");

let days = 2;
let hours = 23;
let minutes = 59;
let seconds = 59;
setInterval(() => {
    daysDom.innerHTML = days;
    hoursDom.innerHTML = hours;
    minutesDom.innerHTML = minutes;
    secondsDom.innerHTML = seconds;
    seconds--;
    if (seconds == 0){
        minutes--;
        seconds = 59;
        if (minutes == 0){
            hours--;
            minutes = 59;
        }
        if (hours == 0){
            days--;
            hours = 23;
        }
    }
}, 1000);
//SELLERS
let sellersDivDom = document.querySelector(".sellers-content");
function drawProductsInUi(products){
    let productsUi = products.map(item => {
        return `
            <div class="product-item sellers-item">
                <div>
                    ${item.offre === "NEW" ? "<span class='new'>"+ item.offre +"</span>" : "<span class='solde'>"+ item.offre +"</span>"}
                    <img src="${item.imageUrl}" alt="">
                    <h6>${item.name}</h6>
                    <span class="new-price">${item.newPrice}</span>
                    ${item.oldPrice ? "<span class='old-price'>"+ item.oldPrice +"</span>" : ""}
                </div>
            </div>
        `
    })
    sellersDivDom.innerHTML += productsUi.join("");
}
drawProductsInUi(products);
let sellersItems = document.querySelectorAll(".sellers-item");
let btnNext = document.querySelector(".sellers-content .next");
let btnPrev = document.querySelector(".sellers-content .prev");
let i = 0;
let j = window.getComputedStyle(sellersItems[0]).getPropertyValue("min-width").indexOf("%");
let k = 10 - 100 / window.getComputedStyle(sellersItems[0]).getPropertyValue("min-width").substring(0,j);
btnNext.addEventListener("click",function(){
    if (i < k){
        i++;
        translateElements(i * -100);
    }
})
btnPrev.addEventListener("click",function(){
    if (i > 0){
        i--;
        translateElements(-i * 100);
    }
})
function translateElements(val){
    sellersItems.forEach(item => {
        item.style.transform = `translateX(${val}%)`;
    })
}
//CATEGORY SECTION
let sectionItemBtns = document.querySelectorAll(".section-item p");
categoryProducts("WOMEN'S","womens");
categoryProducts("ACCESSORIES","accessoriess");
categoryProducts("MEN'S","mens");
sectionItemBtns[0].addEventListener("click",function(){
    window.location = "womens-products.html";
})
sectionItemBtns[1].addEventListener("click",function(){
    window.location = "accessoriess-products.html";
})
sectionItemBtns[2].addEventListener("click",function(){
    window.location = "mens-products.html";
})
function categoryProducts(cat,str){
    let allItems = JSON.parse(localStorage.getItem("products")) || products;
    let filtredProductsByCat = allItems.filter(item => item.category === cat);
    localStorage.setItem(`${str}-products`,JSON.stringify(filtredProductsByCat));
}
//ADD TO FAVORITE
let productsInFavorite = localStorage.getItem("products-in-favorite") ?
                JSON.parse(localStorage.getItem("products-in-favorite")) : 
                [];
function addToFavorite(id){
    if (localStorage.getItem("username")){
        let arr = JSON.parse(localStorage.getItem("products")) || products;
        let choosenItem = arr.find(item => item.id === id);
        let isProductExist = productsInFavorite.some(item => item.id == choosenItem.id);
        choosenItem.liked = true;
        if (isProductExist){
            
        }else{
            productsInFavorite.push(choosenItem);
        }
        arr.map(item => {
            if (item.id === choosenItem.id){
                item.liked = true;
            }
        })
        localStorage.setItem("products",JSON.stringify(arr));
        localStorage.setItem("products-in-favorite",JSON.stringify(productsInFavorite));
        drawProductsUi(arr);
    }else{
        window.location = "register.html";
    }
}
//SAVE ITEM IN LOCAL STORAGE 
function saveItem(id){
    localStorage.setItem("id",id);
    window.location = "product-details.html";
}