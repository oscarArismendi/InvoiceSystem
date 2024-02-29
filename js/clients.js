const listClients=[];

async function loadClients(){
    try{
        listClients.length=0;
        const response = await fetch("http://localhost:3000/clients");
        if(!response.ok){
            throw new Error("Error to load clientes. state:",response.status);
        }
        const clients = await response.json();
        listClients.push(...clients);
    }catch(error){
        console.error("error to load the clients",error.message);
    }
}

async function saveClient(newClient){
    try{
        const response = await fetch("http://localhost:3000/clients",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(newClient)
        });
        if(!response.ok){
            throw new Error("Error to load clientes. state:",response.status);
        }
        const createdClient = await response.json();
        console.log("created Client:",createdClient);
    }catch(error){
        console.error("error to load the clients",error.message);
    }
}

function loadClientsForm(){
    const clientsForm = document.getElementById("clients-form");

    clientsForm.innerHTML = `
    <form>
        <label for="clientName">Name of the client:</label>
        <input type="text" id="clientName" required>
        <label for="clientAge">Age of the client:</label>
        <input type="number" id="clientAge" required>
        <label for="clientEmail">Email of the client:</label>
        <input type="email" id="clientEmail" required>
        <button type="button" onclick="createClient()">Create client</button>
        <button type="button" onclick="showClientsList()">See all clients</button>
        <!-- here can be add and delate clients-->
    </form>
    `;
    const clientsList = document.getElementById("clients-list")
    clientsList.style.display= "none";
}

async function createClient(){
    const nameInput = document.getElementById("clientName");
    const ageInput = document.getElementById("clientAge");
    const emailInput = document.getElementById("clientEmail");

    const name = nameInput.value;
    const age = ageInput.value;
    const email = emailInput.value;

    if (!/^.+@.+\..+[a-zA-Z]+$/.test(email) || !name || !age) {
        alert("Please, fill the fields correctly");
        return;
    }

    const newClient = {
        id:listClients.length+1,
        name:name,
        age:age,
        email:email
    }

    await saveClient(newClient);
    await loadClients();

    nameInput.value="";
    ageInput.value="";
    emailInput.value="";

    alert("Client sucessfully created");

    updateClientsInInvoices();

    return newClient;
}

async function showClientsList(){
    await loadClients();
    const clientsForm = document.getElementById("clients-form");
    const clientsList = document.getElementById("clients-list");

    clientsForm.style.display="none";
    clientsList.style.display="block";

    const ul = document.createElement("ul");

    for(const client of listClients){
        const li = document.createElement("li");
        li.textContent=`ID: ${client.id}, Name: ${client.name}, Age: ${client.age},Email: ${client.email}`; 
        ul.appendChild(li);
    }

    clientsList.innerHTML ="";
    clientsList.appendChild(ul);

    const comebackButton =  document.createElement("button");
    comebackButton.textContent = "Comeback to the form";
    comebackButton.addEventListener('click',comebackForm);
    clientsList.append(comebackButton);
}

function comebackForm() { 
    const clientsForm = document.getElementById("clients-form");
    const clientsList = document.getElementById("clients-list");
    clientsList.style.display= "none";
    clientsForm.style.display= "block";
}


