const listClients=[];

function loadClients(){
    for(let i = 0; i <= 10; i++){
        const newClient={
            id:i,
            name:faker.name.findName(),
            age:Math.floor(Math.random()*30) + 18,
            email:faker.internet.email()
        };
        listClients.push(newClient);
    }
}

function loadClientsForm(){
    const clientsForm = document.getElementById("clients-form");

}
