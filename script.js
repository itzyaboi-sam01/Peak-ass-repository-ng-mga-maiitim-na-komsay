let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

function saveData() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

function render() {
  const list = document.getElementById("inventoryList");
  list.innerHTML = "";

  inventory.forEach((item, index) => {
    list.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>
          <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addItem() {
  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;

  if (name === "" || quantity === "") {
    alert("Please fill all fields");
    return;
  }

  inventory.push({ name, quantity });
  saveData();
  render();

  document.getElementById("name").value = "";
  document.getElementById("quantity").value = "";
}

function deleteItem(index) {
  inventory.splice(index, 1);
  saveData();
  render();
}

// Load on start
render();