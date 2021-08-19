"use strict";
let productsDom = document.querySelector(".products-content");
let getAccessoriesProducts = JSON.parse(localStorage.getItem("accessoriess-products"));
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
    productsDom.innerHTML += productsUi.join("");
}
drawProductsInUi(getAccessoriesProducts);
let select = document.querySelector("#select");
select.addEventListener("change",function(e){
    if (e.target.value === "name"){
        let myArr = getAccessoriesProducts.map(item => item.name).sort();
        let arr = [];
        myArr.forEach(item => {
            let obj = getAccessoriesProducts.find(el => el.name === item);
            arr.push(obj);
        })
        productsDom.innerHTML = "";
        drawProductsInUi(arr);
    }else if (e.target.value === "price"){
        let arr = getAccessoriesProducts.sort((a,b) => +a.newPrice.slice(1) - +b.newPrice.slice(1));
        productsDom.innerHTML = "";
        drawProductsInUi(arr);
    }else{
        productsDom.innerHTML = "";
        drawProductsInUi(JSON.parse(localStorage.getItem("accessoriess-products")));
    }
})
let inputsRadio = document.querySelectorAll("input[type=radio]");
inputsRadio.forEach(item => {
    item.addEventListener("change",function(e){
        if (e.target.id === "large"){
            getProductsBySize("accessoriess","large");
        }else if (e.target.id === "medium"){
            getProductsBySize("accessoriess","medium");
        }else if (e.target.id === "small"){
            getProductsBySize("accessoriess","small");
        }else{
            productsDom.innerHTML = "";
            drawProductsInUi(JSON.parse(localStorage.getItem("accessoriess-products")));
        }
    })
})
function getProductsBySize(str1,str2){
    let arr = JSON.parse(localStorage.getItem(`${str1}-products`)).filter(item => item.size === str2);
    if (arr.length !== 0){
        productsDom.innerHTML = "";
        drawProductsInUi(arr);
    }else{
        productsDom.innerHTML = "There Is No Items";
    }
}
let inputSearch = document.querySelector("#input-search");
inputSearch.addEventListener("keyup",function(e){
    searchByName(JSON.parse(localStorage.getItem("accessoriess-products")),e.target.value);
    if (e.target.value === ""){
        productsDom.innerHTML = "";
        drawProductsInUi(JSON.parse(localStorage.getItem("accessoriess-products")));
    }
})
function searchByName(arr,str){
    let myArr = arr.filter(item => item.name.toLowerCase().indexOf(str.toLowerCase()) != -1);
    productsDom.innerHTML = "";
    drawProductsInUi(myArr);
}