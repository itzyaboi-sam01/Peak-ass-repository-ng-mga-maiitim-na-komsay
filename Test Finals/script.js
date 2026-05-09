document.addEventListener("DOMContentLoaded", function () {
    // 1. Selectors
    const searchInput = document.querySelector(".search-bar");
    const sortSelect = document.querySelector("#price-sort"); // Added ID for clarity
    const checkboxes = document.querySelectorAll(".sidebar input[type='checkbox']");
    
    // Select both Cards (figure) and Table Rows (tr)
    const getItems = () => document.querySelectorAll("figure, .product-card, .product-table tr:not(:first-child)");

    // 2. Unified Search Function
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const value = this.value.toLowerCase();
            const items = getItems();

            items.forEach(item => {
                // Get text from figcaption (GPU), h3 (Home), or whole row (Table)
                const titleElement = item.querySelector("figcaption, h3") || item;
                const text = titleElement.textContent.toLowerCase();
                
                // Show/Hide based on search
                item.style.display = text.includes(value) ? "" : "none";
            });
        });
    }

    // 3. Filter Logic (Checkboxes)
    function applyFilters() {
        const showOnlyInStock = checkboxes[0]?.checked; // Assuming first checkbox is stock
        const showOnlyCheap = checkboxes[1]?.checked;   // Assuming second is price

        getItems().forEach(item => {
            let isVisible = true;

            // Get Stock Info
            const stockText = item.querySelector(".stock")?.textContent.toLowerCase() || "";
            const isAvailable = stockText.includes("stock") && !stockText.includes("0");

            // Get Price Info
            const priceText = item.querySelector(".price")?.textContent || "0";
            const priceValue = parseFloat(priceText.replace(/[₱,]/g, ""));

            // Filter conditions
            if (showOnlyInStock && !isAvailable) isVisible = false;
            if (showOnlyCheap && priceValue > 10000) isVisible = false;

            item.style.display = isVisible ? "" : "none";
        });
    }

    checkboxes.forEach(box => {
        box.addEventListener("change", applyFilters);
    });

    // 4. Cart Logic
    const cartBtn = document.querySelector('.cart');
    let itemCount = 0;

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert(`You have ${itemCount} items in your cart.`);
        });
    }

    // Export addToCart to global window so HTML buttons can see it
    window.addToCart = function() {
        itemCount++;
        const cartText = document.querySelector('.cart span');
        if (cartText) cartText.textContent = `Cart (${itemCount})`;
    };
});