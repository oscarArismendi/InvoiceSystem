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
        options += `<option value="${client.id}">${client.name}</option>`;
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
    // console.log(selectProduct);
    const subtotal = selectProduct.price*quantity;

    const li=document.createElement('li');
    li.textContent = `${selectProduct.description} - Quantity: ${quantity} - Subtotal: ${subtotal}`;
    itemsList.append(li);

    productSelect.selectedIndex=-1;
    quantityInput.value = "";

}

function createInvoice(){
    const dateInput = document.getElementById("invoiceDate");
    const clientSelect =  document.getElementById("clientInvoice");
    const itemsList = document.getElementById("items-list");

    const date = new Date(dateInput.value);
    const clientId = clientSelect.value;
    const itemsInvoices=[];
    let invoiceTotal=0;
    for(const li of itemsList.getElementsByTagName("li")){
        itemsInvoices.push(li.textContent);
        const quantityMatch = li.textContent.match(/Quantity: (\d+)/);
        const subtotalMatch = li.textContent.match(/Subtotal: (\d+)/);
        // console.log("data: ",quantityMatch,subtotalMatch);
        if(quantityMatch && subtotalMatch) {
            const quantity = parseInt(quantityMatch[1]);
            const subtotal = parseInt(subtotalMatch[1]);
            invoiceTotal += subtotal;
        }
    }

    if(!date || !clientId ||  itemsInvoices.length===0){
        alert("Please, complete all the inputs")
        return;
    }

    const client = listClients.find(c=>c.id===parseInt(clientId));

    const newInvoice = {
        date: date,
        client:client,
        items: itemsInvoices,
        total: invoiceTotal
    };

    invoiceList.push(newInvoice);

    console.log("Invoice created",newInvoice);
    console.log("Invoice list:",invoiceList);

    dateInput.value = "";
    clientSelect.selectedIndex=0;
    itemsList.innerHTML="";

    alert(`Invoice sucessfull created! Total: ${invoiceTotal}`);
}


function showInvoicesList(){
    const invoiceForm = document.getElementById("invoices-form");
    const invoiceListHTML = document.getElementById("invoices-list");

    invoiceForm.style.display = "none";
    invoiceListHTML.style.display = "block";

    const ul = document.createElement("ul");
    ul.style.listStyleType = "none";//no dots
    ul.style.padding = "0";

    //go over the list and add every invoice as a li
    for (const invoice of invoiceList){
        const li = document.createElement("li");
        // console.log(li);
        li.style.marginBottom = '15px';
        li.style.borderBottom = '1px solid #ccc';
        li.style.paddingBottom = '10px';

        //validate that the date is a valid
        console.log("invoice date",invoice.date);
        const date = invoice.date instanceof Date ? invoice.date.toLocaleDateString() : "date not valid";

        const clientDate = document.createElement("div");
        clientDate.style.fontWeight ="bold";
        clientDate.textContent =  `Date: ${date}, Client: ${invoice.client.name}, Total: ${invoice.total}`;
        li.appendChild(clientDate);

        const itemsUl = document.createElement("ul");
        itemsUl.style.listStyleType = "none";
        itemsUl.style.padding="0";

        //go over the items in invoices and add the item as a li
        for(const item of invoice.items){
            const itemLi = document.createElement("li");
            itemLi.textContent = `Product: ${item}`;
            itemsUl.appendChild(itemLi)
        }
        
        li.appendChild(itemsUl);
        ul.appendChild(li);
    }
    
    invoiceListHTML.innerHTML = ""; 
    invoiceListHTML.appendChild(ul);

    const comebackButton =  document.createElement("button");
    comebackButton.textContent = "Comeback to the form";
    comebackButton.addEventListener('click',comebackInvoiceForm);
    invoiceListHTML.append(comebackButton);

}

function comebackInvoiceForm(){
    const invoiceForm = document.getElementById("invoices-form");
    const invoiceListHTML = document.getElementById("invoices-list");

    invoiceListHTML.style.display = "none";
    invoiceForm.style.display = "block";
}