const invoiceList = [];

function updateClientsInInvoices(){
    const  clientSelect = document.getElementById("clientInvoice");
    clientSelect.innerHTML="";
    const optionsClient = generateOptionsClients();
    clientSelect.innerHTML=optionsClient;
}

function updateProductsInInvoices(){
    const  productSelect = document.getElementById("invoiceProducts");
    productSelect.innerHTML="";
    const optionsProducts = generateOptionsProducts();
    productSelect.innerHTML = optionsProducts;
}

function loadInvoicesForm(){
    const invoicesForm = document.getElementById("invoices-form");
    invoicesForm.innerHTML = `
    <form>
        <label for="invoiceDate">Date of the invoice:</label>
        <input type="date" id="invoiceDate" required>
        
        <label for="clientInvoice">Client:</label>
        <select id="clientInvoice" required>
            ${generateOptionsClients()}
        </select>

        <label for="invoiceProducts">Product:</label>
        <select id="invoiceProducts" multiple required>
            ${generateOptionsProducts()}
        </select>

        <label for="productQuantity">Quantity:</label>
        <input type="number" id="productQuantity" required>

        <button type="button" onclick="addInvoiceItem()">add Item</button>

        <h3>Items of the invoice:</h3>
        <ul id="items-list"></ul>

        <button type="button" onclick="createInvoice()">Create invoice</button>
        <button type="button" onclick="showInvoicesList()">Show all invoices</button>
    </form>
    `;
}

function generateOptionsClients(){
    let options = "";
    for(const client of listClients){
        options += `<option value="${client._id}">${client.name}</option>`;
    }
    return options;
}

function generateOptionsProducts(){
    let options = "";
    for(const product of listProducts){
        options += `<option value="${product._id}">${product.description}`;
    }
    return options;
}

function addInvoiceItem(){
    const productSelect = document.getElementById("invoiceProducts");
    const quantityInput = document.getElementById("productQuantity");
    const itemsList = document.getElementById("items-list");
    console.log(productSelect.selectedIndex);
    const selectProductIndex = productSelect.selectedIndex;
    const quantity=quantityInput.value;

    if(selectProductIndex ===-1 || !quantity){
        alert("please, select a product and specify the quantity");
        return;
    }

    const selectProduct = listProducts[selectProductIndex];
    console.log(selectProduct);
    const subtotal = selectProduct.price*quantity;

    const li=document.createElement('li');
    li.textContent = `${selectProduct.description} - Quantity: ${quantity} - Subtotal ${subtotal}`;
    itemsList.append(li);

    productSelect.selectIndex=-1;
    quantityInput.value = "";

}

function createInvoice(){
    const dateInput = document.getElementById("invoiceDate");
    const clientSelect =  document.getElementById("clientInvoice");
    const itemsList = document.getElementById("items-list");

    const date = dateInput.value;
    const clientId = clientSelect.value;
    const itemsInvoices=[];
    let invoiceTotal=0;

    for(const li of itemsList.getElementsByTagName("li")){

    }
}

