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
let createProductBtn = document.querySelector(".section-form-create #create-product-btn");
let productImage;
let productOffre;
let productSolde;
let productSize;
let productCategory;
//EVENTS
selectOffre.addEventListener("change",getProductOffre);
selectSize.addEventListener("change",getProductSize);
selectCategory.addEventListener("change",getProductCategory);
inputFile.addEventListener("change",uploadImage);
createProductBtn.addEventListener("click",createProduct);
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
        productOffre = e.target.value;
    }
}
function getProductSize(e){
    productSize = e.target.value;
}
function getProductCategory(e){
    productCategory = e.target.value;
}
function createProduct(e){
    e.preventDefault();
    let nameValue = inputName.value;
    let titleValue = inputTitle.value;
    let priceValue = inputPrice.value;
    let descValue = inputDesc.value;
    if (nameValue && titleValue && priceValue && descValue){
        let allProducts = JSON.parse(localStorage.getItem("products")) || products;
        let obj = {
            id:allProducts[allProducts.length - 1].id + 1,
            title:titleValue,
            name:nameValue,
            imageUrl:productImage,
            qty:1,
            newPrice:`$${priceValue}.00`,
            category:productCategory,
            offre:productOffre,
            size:productSize,
            desc:descValue,
            isMe:"Y",
        }
        if (obj.offre != "NEW"){
            let x = +obj.newPrice.slice(1,obj.newPrice.indexOf("."));
            obj.oldPrice = `$${+inputSolde.value + x}.00`;
        }
        let newProducts = [...allProducts,obj];
        localStorage.setItem("products",JSON.stringify(newProducts));
        inputName.value = "";
        inputTitle.value = "";
        inputPrice.value = "";
        inputDesc.value = "";
        setTimeout(() => {
            window.location = "index.html";
        },1500)
    }else{
        alert("Please Fill Data");
    }
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