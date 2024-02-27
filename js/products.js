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
        <!-- here can be add and delate products -->
    </form>
    `;

    const productsList = document.getElementById("products-list");
    productsList.style.display = "none";
}

function createProduct() {
    const codeInput = document.getElementById("productCode");
    const descInput = document.getElementById("productDescription");
    const priceInput = document.getElementById("productPrice");
    console.log(codeInput);
    const code = codeInput.value;
    const description = descInput.value;
    const price = priceInput.value;

    if(!code || !description || !price){
        alert("Please, fill all the questions");
        return;
    }

    const newProduct = {
        code : code,
        description : description,
        price:price
    }

    listProducts.push(newProduct);

    codeInput.value="";
    descInput.value = "";
    priceInput.value = "";

    alert("Product sucessfully created");
    updateProductsInInvoices();

    return newProduct;
} 

function showProductsList(){
    const productsForm = document.getElementById("products-form");
    const productsList = document.getElementById("products-list");

    productsForm.style.display="none";
    productsList.style.display="block";

    const ul = document.createElement("ul");

    for(const product of listProducts){
        const li = document.createElement("li");
        li.textContent=`Code: ${product.code}, Description: ${product.description}, Price: ${product.price}`; 
        ul.appendChild(li);
    }

    productsList.innerHTML ="";
    productsList.appendChild(ul);

    const comebackButton =  document.createElement("button");
    comebackButton.textContent = "Comeback to the form";
    comebackButton.addEventListener('click',comebackFormProduct);
    productsList.append(comebackButton);
}

function comebackFormProduct() { 
    const productsForm = document.getElementById("products-form");
    const productsList = document.getElementById("products-list");
    productsList.style.display= "none";
    productsForm.style.display= "block";
}