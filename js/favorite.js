let productsDom = document.querySelector(".products-content");
let noProductsDom = document.querySelector(".no-products");
function drawProductsUi(allItems = []){
    let allProducts = JSON.parse(localStorage.getItem("products-in-favorite")) || allItems;
    if (allProducts && allProducts.length == 0){
        noProductsDom.innerHTML = "There Is No Items!!";
    }
    let productsUi = allProducts.map(item => {
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
                <button onclick="removeFromFavorite(${item.id})">REMOVE FROM FAVORITE</button>
            </div>
        `
    })
    productsDom.innerHTML = productsUi.join("");
}
drawProductsUi();
function removeFromFavorite(id){
    let items = JSON.parse(localStorage.getItem("products-in-favorite"));
    let filtredItems = items.filter(item => item.id != id);
    let arr = JSON.parse(localStorage.getItem("products")) || products;
    arr.map(item => {
        if (item.id == id){
            delete item.liked;
        }
    })
    localStorage.setItem("products",JSON.stringify(arr));
    localStorage.setItem("products-in-favorite",JSON.stringify(filtredItems));
    drawProductsUi(filtredItems);
}