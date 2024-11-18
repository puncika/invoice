// Funkcia na prepnutie aktívneho tlačidla
function setActiveButton(activeId) {
    const buttons = document.querySelectorAll('.toggle-button');

    buttons.forEach(button => {
        button.classList.remove('active'); // Remove 'active' from all buttons
    });

    const clickedButton = document.getElementById(activeId);
    clickedButton.classList.add('active'); // Add 'active' to the clicked button
}



window.onload = function() {
    console.log("Stránka je načítaná!");
    generateInvoiceNumber(); // Zavolá funkciu na generovanie čísla faktúry
};





function generateInvoiceNumber() {
    const currentYearInvoiceGen = new Date().getFullYear();
    const invoiceNumber = currentYearInvoiceGen + "0001";
    document.getElementById("faktura-title-number").textContent = invoiceNumber;
}




document.getElementById("company-name").addEventListener("input", function() {
    document.getElementById("preview-company-name").textContent = this.value;
});
document.getElementById("ico").addEventListener("input", function() {
    document.getElementById("preview-ico").textContent = this.value;
});
document.getElementById("bank-account").addEventListener("input", function() {
    document.getElementById("preview-bank-account").textContent = this.value;
});
document.getElementById("contact-number").addEventListener("input", function() {
    document.getElementById("preview-contact-number").textContent = this.value;
});
document.getElementById("company-name-other").addEventListener("input", function() {
    document.getElementById("preview-company-name-other").textContent = this.value;
});
document.getElementById("ico-other").addEventListener("input", function() {
    document.getElementById("preview-ico-other").textContent = this.value;
});
document.getElementById("bank-account-other").addEventListener("input", function() {
    document.getElementById("preview-bank-account-other").textContent = this.value;
});
document.getElementById("contact-number-other").addEventListener("input", function() {
    document.getElementById("preview-contact-number-other").textContent = this.value;
});


/* <!--    SEKCIA KDE SA NASTAVUJE **DATUM DODANIA** - **DATUM VYSTAVENIA** - **DATUM SPLATNOSTI** --> */

// Získanie aktuálneho dátumu
const currentDate = new Date();

// Funkcia na vytvorenie možností
function populateDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ""; // Vyčisti predchádzajúce hodnoty
    options.forEach(option => {
        const div = document.createElement("div");
        div.textContent = option;
        div.addEventListener("click", function () {
            document.getElementById(`selected-${dropdownId.split('-')[0]}`).textContent = option;
            dropdown.style.display = "none"; // Skry dropdown
        });
        dropdown.appendChild(div);
    });
}

// Otvorenie dropdownu
function openDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Generovanie možností pre deň, mesiac a rok
document.getElementById("day-select").addEventListener("click", function () {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1); // Generovanie dní
    populateDropdown("day-dropdown", days);
    openDropdown("day-dropdown");
});

document.getElementById("month-select").addEventListener("click", function () {
    const months = ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"];
    populateDropdown("month-dropdown", months);
    openDropdown("month-dropdown");
});

document.getElementById("year-select").addEventListener("click", function () {
    const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() + i); // Použitie aktuálneho roku
    populateDropdown("year-dropdown", years);
    openDropdown("year-dropdown");
});







function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF()

   


    doc.text("Dodávatel", 10, 10);
    doc.text(document.getElementById("company-name").value, 10, 20);
    doc.text(document.getElementById("ico").value, 10, 30);
    doc.text(document.getElementById("bank-account").value, 10, 40);
    doc.text(document.getElementById("contact-number").value, 10, 50);
    doc.text("Odberatel", 10, 60);
    doc.text(document.getElementById("company-name-other").value, 10, 70);
    doc.text(document.getElementById("ico-other").value, 10, 80);
    doc.text(document.getElementById("bank-account-other").value, 10, 90);
    doc.text(document.getElementById("contact-number-other").value, 10, 100);
    
    console.log(doc.getFontList());


    doc.save("faktura.pdf");
}; 
