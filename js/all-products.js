"use strict";
let productsDom = document.querySelector(".products-content");
let getAllProducts = JSON.parse(localStorage.getItem("products")) || products;
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
drawProductsInUi(getAllProducts);
let select = document.querySelector("#select");
select.addEventListener("change",function(e){
    if (e.target.value === "name"){
        let myArr = getAllProducts.map(item => item.name).sort();
        let arr = [];
        myArr.forEach(item => {
            let obj = getAllProducts.find(el => el.name === item);
            arr.push(obj);
        })
        productsDom.innerHTML = "";
        drawProductsInUi(arr);
    }else if (e.target.value === "default"){
        productsDom.innerHTML = "";
        drawProductsInUi(JSON.parse(localStorage.getItem("products")) || products);
    }else{
        let arr = getAllProducts.sort((a,b) => +a.newPrice.slice(1) - +b.newPrice.slice(1));
        productsDom.innerHTML = "";
        drawProductsInUi(arr);
    }
})
let inputsRadio = document.querySelectorAll("input[type=radio]");
inputsRadio.forEach(item => {
    item.addEventListener("change",function(e){
        if (e.target.id === "large"){
            getProductsBySize("large");
        }else if (e.target.id === "medium"){
            getProductsBySize("medium");
        }else if (e.target.id === "small"){
            getProductsBySize("small");
        }else{
            productsDom.innerHTML = "";
            drawProductsInUi(JSON.parse(localStorage.getItem("products")) || products);
        }
    })
})
function getProductsBySize(str){
    let myArr = JSON.parse(localStorage.getItem("products")) || products;
    let arr = myArr.filter(item => item.size === str);
    if (arr.length !== 0){
        productsDom.innerHTML = "";
        drawProductsInUi(arr);
    }else{
        productsDom.innerHTML = "There Is No Items";
    }
}
let inputSearch = document.querySelector("#input-search");
inputSearch.addEventListener("keyup",function(e){
    searchByName(JSON.parse(localStorage.getItem("products")) || products,e.target.value);
    if (e.target.value === ""){
        drawProductsInUi(JSON.parse(localStorage.getItem("products")) || products);
    }
})
function searchByName(arr,str){
    let myArr = arr.filter(item => item.name.toLowerCase().indexOf(str.toLowerCase()) != -1);
    productsDom.innerHTML = "";
    drawProductsInUi(myArr);
}