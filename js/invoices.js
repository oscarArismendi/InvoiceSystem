const invoiceList = [];

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