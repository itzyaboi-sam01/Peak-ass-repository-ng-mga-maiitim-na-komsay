document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.querySelector(".search-bar");
    const table = document.querySelector(".product-table");
    const sortSelect = document.querySelector("select");
    const checkboxes = document.querySelectorAll(".sidebar input[type='checkbox']");

    function getRows() {
        return document.querySelectorAll(".product-table tr:not(:first-child)");
    }

   
    searchInput.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();

        getRows().forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(value) ? "" : "none";
        });
    });

    
    sortSelect.addEventListener("change", function () {
        let rowsArray = Array.from(getRows());

        if (this.value === "Price") {
            rowsArray.sort((a, b) => getPrice(a) - getPrice(b));
        } else if (this.value === "Name") {
            rowsArray.sort((a, b) =>
                a.cells[0].innerText.localeCompare(b.cells[0].innerText)
            );
        }

        rowsArray.forEach(row => table.appendChild(row));
    });

    function getPrice(row) {
        return parseFloat(row.cells[1].innerText.replace(/[₱,]/g, ""));
    }

   
    checkboxes.forEach(box => {
        box.addEventListener("change", applyFilters);
    });

    function applyFilters() {
        const inStock = checkboxes[0].checked;
        const cheap = checkboxes[1].checked;

        getRows().forEach(row => {
            let show = true;

            const stock = row.cells[2].innerText.toLowerCase();
            const price = getPrice(row);

            if (inStock && stock !== "available") show = false;
            if (cheap && price > 5000) show = false;

            row.style.display = show ? "" : "none";
        });
    }

});