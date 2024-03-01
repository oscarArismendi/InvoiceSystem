document.addEventListener("DOMContentLoaded",async () =>{
    await loadClients();
    loadClientsForm();
    await loadProducts();
    loadProductsForm();
    await loadInvoice();
    loadInvoicesForm();
});
