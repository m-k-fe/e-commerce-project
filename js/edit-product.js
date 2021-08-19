"use strict";
//VARIABLES
let inputFile = document.querySelector(".section-form-create #input-img");
let inputTitle = document.querySelector(".section-form-create #input-title");
let inputName = document.querySelector(".section-form-create #input-name");
let inputPrice = document.querySelector(".section-form-create #input-price");
let inputDesc = document.querySelector(".section-form-create #desc");
let selectOffre = document.querySelector(".section-form-create #select-offre");
let inputSolde = document.querySelector(".section-form-create #input-solde");
let selectSize = document.querySelector(".section-form-create #size");
let selectCategory = document.querySelector(".section-form-create #category");
let editProductBtn = document.querySelector(".section-form-create #create-product-btn");
let allProducts = JSON.parse(localStorage.getItem("products")) || products;
let myViews = JSON.parse(localStorage.getItem("products-views")) || [];
let myCart = JSON.parse(localStorage.getItem("products-in-cart")) || [];
let myFavorite = JSON.parse(localStorage.getItem("products-in-favorite")) || [];
let myProductId = localStorage.getItem("my-product-id");
let getProduct = allProducts.find(item => item.id == myProductId);
let getViewsProduct = myViews.find(item => item.id == myProductId);
let getCartProduct = myCart.find(item => item.id == myProductId);
let getFavoriteProduct = myFavorite.find(item => item.id == myProductId);
let productImage;
let productOffre;
let productSolde;
let productSize;
let productCategory;
inputTitle.value = getProduct.title;
inputName.value = getProduct.name;
inputPrice.value = +getProduct.newPrice.slice(1,getProduct.newPrice.indexOf("."));
inputDesc.value = getProduct.desc;
selectCategory.value = getProduct.category;
selectSize.value = getProduct.size;
if (getProduct.offre === "NEW"){
    selectOffre.value = getProduct.offre;
}else{
    selectOffre.value = "solde";
    inputSolde.style.display = "block";
    inputSolde.value = +getProduct.offre.slice(2,getProduct.offre.indexOf("."));
}
//EVENTS
selectOffre.addEventListener("change",getProductOffre);
selectSize.addEventListener("change",getProductSize);
selectCategory.addEventListener("change",getProductCategory);
inputFile.addEventListener("change",uploadImage);
editProductBtn.addEventListener("click",editProduct);
//FUNCTIONS
function getProductOffre(e){
    if (e.target.value === "solde"){
        inputSolde.style.display = "block";
        inputSolde.addEventListener("keyup",function(e){
            productOffre = `-$${e.target.value}.00`;
            productSolde = `$${e.target.value}.00`;
        })
    }else{
        inputSolde.style.display = "none";
        productOffre = "NEW";
    }
}
function getProductSize(e){
    productSize = e.target.value;
}
function getProductCategory(e){
    productCategory = e.target.value;
}
function editProduct(e){
    e.preventDefault();
    getProduct.title = inputTitle.value;
    getViewsProduct ? getViewsProduct.title = inputTitle.value : false;
    getCartProduct ? getCartProduct.title = inputTitle.value : false;
    getFavoriteProduct ? getFavoriteProduct.title = inputTitle.value : false;
    getProduct.name = inputName.value;
    getViewsProduct ? getViewsProduct.name = inputName.value : false;
    getCartProduct ? getCartProduct.name = inputName.value : false;
    getFavoriteProduct ? getFavoriteProduct.name = inputName.value : false;
    getProduct.newPrice = `$${inputPrice.value}.00`;
    getViewsProduct ? getViewsProduct.newPrice = `$${inputPrice.value}.00` : false;
    getCartProduct ? getCartProduct.newPrice = `$${inputPrice.value}.00` : false;
    getFavoriteProduct ? getFavoriteProduct.newPrice = `$${inputPrice.value}.00` : false;
    getProduct.desc = inputDesc.value;
    getViewsProduct ? getViewsProduct.desc = inputDesc.value : false;
    getCartProduct ? getCartProduct.desc = inputDesc.value : false;
    getFavoriteProduct ? getFavoriteProduct.desc = inputDesc.value : false;
    getProduct.imageUrl = productImage;
    getViewsProduct ? getViewsProduct.imageUrl = productImage : false;
    getCartProduct ? getCartProduct.imageUrl = productImage : false;
    getFavoriteProduct ? getFavoriteProduct.imageUrl = productImage : false;
    if (productCategory == undefined){
        getProduct.category = selectCategory.value;
        getViewsProduct ? getViewsProduct.category = selectCategory.value : false;
        getCartProduct ? getCartProduct.category = selectCategory.value : false;
        getFavoriteProduct ? getFavoriteProduct.category = selectCategory.value : false;
    }else{
        getProduct.category = productCategory;
        getViewsProduct ? getViewsProduct.category = productCategory : false;
        getCartProduct ? getCartProduct.category = productCategory : false;
        getFavoriteProduct ? getFavoriteProduct.category = productCategory : false;
    }
    if (productSize == undefined){
        getProduct.size = selectSize.value;
        getViewsProduct ? getViewsProduct.size = selectSize.value : false;
        getCartProduct ? getCartProduct.size = selectSize.value : false;
        getFavoriteProduct ? getFavoriteProduct.size = selectSize.value : false;
    }else{
        getProduct.size = productSize;
        getViewsProduct ? getViewsProduct.size = productSize : false;
        getCartProduct ? getCartProduct.size = productSize : false;
        getFavoriteProduct ? getFavoriteProduct.size = productSize : false;
    }
    if (productOffre == undefined){
        if (selectOffre.value === "new"){
            getProduct.offre = "NEW";
            getViewsProduct ? getViewsProduct.offre = "NEW" : false;
            getCartProduct ? getCartProduct.offre = "NEW" : false;
            getFavoriteProduct ? getFavoriteProduct.offre = "NEW" : false;
        }else{
            getProduct.offre = `-$${inputSolde.value}.00`;
            getViewsProduct ? getViewsProduct.offre = `-$${inputSolde.value}.00` : false;
            getCartProduct ? getCartProduct.offre = `-$${inputSolde.value}.00` : false;
            getFavoriteProduct ? getFavoriteProduct.offre = `-$${inputSolde.value}.00` : false;
        }
    }else{
        getProduct.offre = productOffre;
        getViewsProduct ? getViewsProduct.offre = productOffre : false;
        getCartProduct ? getCartProduct.offre = productOffre : false;
        getFavoriteProduct ? getFavoriteProduct.offre = productOffre : false;
    }
    if (getProduct.offre != "NEW"){
        let x = +getProduct.newPrice.slice(1,getProduct.newPrice.indexOf("."));
        getProduct.oldPrice = `$${+inputSolde.value + x}.00`;
        getViewsProduct ? getViewsProduct.oldPrice = `$${+inputSolde.value + x}.00` : false;
        getCartProduct ? getCartProduct.oldPrice = `$${+inputSolde.value + x}.00` : false;
        getFavoriteProduct ? getFavoriteProduct.oldPrice = `$${+inputSolde.value + x}.00` : false;
    }else{
        delete getProduct.oldPrice;
        getViewsProduct ? delete getViewsProduct.oldPrice : false;
        getCartProduct ? delete getCartProduct.oldPrice : false;
        getFavoriteProduct ? delete getFavoriteProduct.oldPrice : false;
    }
    localStorage.setItem("products",JSON.stringify(allProducts));
    localStorage.setItem("products-views",JSON.stringify(myViews));
    localStorage.setItem("products-in-cart",JSON.stringify(myCart));
    localStorage.setItem("products-in-favorite",JSON.stringify(myFavorite));
    setTimeout(() => {
        window.location = "index.html";
    },1500)
}
function uploadImage(){
    let file = this.files[0];
    getBase64(file);
    let types = ["image/jpeg","image/png"];
    if (types.indexOf(file.type) == -1){
        alert("Type Not Supported!!");
        return;
    }
    if (file.size > 2 * 1024 * 1024){
        alert("Image Not Exced 2MG");
        return;
    }
    productImage = URL.createObjectURL(file);
}
function getBase64(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load",function(){
        productImage = reader.result;
    })
    reader.addEventListener("error",function(){
        alert("Error!!");
    })
}