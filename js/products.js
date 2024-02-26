const listProducts = []

function loadProducts(){
    for(let i = 0; i <= 10;i++){
        const newProduct = {
            code: `PROD-${i}`,
            description: faker.commerce.productName(),
            price:parseFloat(faker.commerce.price(10,100,2))
        };
        listProducts.push(newProduct);
    }
}

function loadProductsForm(){
    const productsForm = document.getElementById("products-form");

    productsForm.innerHTML = `
    <form>
        <label for="productCode">Code of the product:</label>
        <input type="text" id="productCode" required>
        <label for="productDescription">Description of the product:</label>
        <input type="text" id="productDescription" required>
        <label for="productPrice">Price of the product:</label>
        <input type="number" id="productPrice" required>
        <button type="button" onclick="createProduct()">Create product</button>
        <button type="button" onclick="showProductsList()">See all products</button>
        <!-- here can be add and delate clients -->
    </form>
    `;

    const productsList = document.getElementById("products-list");
    productsList.style.display = "none";
}