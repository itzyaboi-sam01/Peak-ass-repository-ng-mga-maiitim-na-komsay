document.addEventListener("DOMContentLoaded", function () {

    // SELECTORS
    const searchInput = document.querySelector(".search-bar");
    const checkboxes = document.querySelectorAll(".sidebar input[type='checkbox']");
    const cartText = document.querySelector('.cart > span');
    const cartList = document.getElementById('cart-items-list');
    const totalPriceDisplay = document.getElementById('total-price');
    const cartIcon = document.querySelector('.cart');
    

    //product cards
    const getItems = () => document.querySelectorAll("figure");

    //Cart Variables
    let itemCount = 0;
    let totalPrice = 0;

    //Toggle Cat
    window.toggleCart = function () {
        const cartTab = document.getElementById('cart-tab');
        const cartOverlay = document.getElementById('cart-overlay');

        if (cartTab && cartOverlay) {
            cartTab.classList.toggle('active');
            cartOverlay.classList.toggle('active');
        }
    };

    //Open Cart
    function openCart() {
        const cartTab = document.getElementById('cart-tab');
        const cartOverlay = document.getElementById('cart-overlay');

        if (cartTab && cartOverlay) {
            cartTab.classList.add('active');
            cartOverlay.classList.add('active');
        }
    }

    // Open cart when clicking icon
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }

    //Search & Filters
    function applyAllFilters() {

        const searchTerm = searchInput
            ? searchInput.value.toLowerCase()
            : "";

        const showOnlyInStock = checkboxes[0]?.checked;
        const showOnlyCheap = checkboxes[1]?.checked;

        getItems().forEach(card => {

            const name = card.querySelector("figcaption")
                .textContent
                .toLowerCase();

            const priceText = card.querySelector(".price").textContent;

            const price = parseFloat(
                priceText.replace(/[₱,]/g, "")
            );

            const stockText = card.querySelector(".stock")
                .textContent
                .toLowerCase();

            let isVisible = name.includes(searchTerm);

            // Filter logic
            if (showOnlyInStock &&
                stockText.includes("unavailable" || "0 stock")) {
                isVisible = false;
            }

            if (showOnlyCheap && price > 3500) {
                isVisible = false;
            }

            card.style.display = isVisible
                ? "flex"
                : "none";
        });
    }

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener("input", applyAllFilters);
    }

    checkboxes.forEach(cb => {
        cb.addEventListener("change", applyAllFilters);
    });

    //ADD TO CART
    window.addToCart = function (name, price, event) {

        itemCount++;
        totalPrice += price;

        // Update navbar cart text
        if (cartText) {
            cartText.textContent = `Cart (${itemCount})`;
        }

        // Update total price
        if (totalPriceDisplay) {
            totalPriceDisplay.textContent =
                totalPrice.toLocaleString();
        }

        // Create cart item
        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${name}</strong>
                <p>₱${price.toLocaleString()}</p>
            </div>
        `;

        cartList.appendChild(li);

        // Button feedback
        if (event) {

            const btn = event.target;
            const originalText = btn.innerText;

            btn.innerText = "Added!";
            btn.style.backgroundColor = "#28a745";

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "";
            }, 1500);
        }
    };

    document.addEventListener("DOMContentLoaded", function () {

    const cart = document.querySelector(".cart");

    window.toggleCart = function () {

        const cartTab = document.getElementById("cart-tab");
        const cartOverlay = document.getElementById("cart-overlay");

        cartTab.classList.toggle("active");
        cartOverlay.classList.toggle("active");
    };

    // CLICK CART TO OPEN
    cart.addEventListener("click", toggleCart);
});

    
});