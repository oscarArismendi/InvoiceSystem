const listClients=[];

function loadClients(){
    for(let i = 0; i <= 10; i++){
        const newClient={
            id:i+1,
            name:faker.name.findName(),
            age:Math.floor(Math.random()*30) + 18,
            email:faker.internet.email()
        };
        listClients.push(newClient);
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

function createClient(){
    const nameInput = document.getElementById("clientName");
    const ageInput = document.getElementById("clientAge");
    const emailInput = document.getElementById("clientEmail");

    const name = nameInput.value;
    const age = ageInput.value;
    const email = emailInput.value;

    const newClient = {
        id:listClients.length+1,
        name:name,
        age:age,
        email:email
    }

    listClients.push(newClient);

    nameInput.value="";
    ageInput.value="";
    emailInput.value="";

    alert("Client sucessfully created");

    updateClientsInInvoices();

    return newClient;
}

function showClientsList(){
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
    comebackButton.addEventListener('click',comebackForm());
    clientsList.append(comebackButton);
}

function comebackForm() { // fix the reason why it automatic do it when you click showClientList
    const clientsForm = document.getElementById("clients-form");
    const clientsList = document.getElementById("clients-list");
    console.log("hola")
    // clientsList.style.display= "none";
    // clientsForm.style.display= "block";
}


