const title = document.getElementById("title");
const resetOrDeleteButton = document.getElementById("resetDeleteButton");
const addOrModifyButton = document.getElementById("addModifyButton");
const url = new URLSearchParams(window.location.search);
const urlId = url.get("id");

function showAlert(message) {
  return confirm(message);
}

// ----------------------------------------------------------------------------------------------------------------------------------------------

addOrModifyButton.addEventListener("click", function (event) {
  if (urlId) {
    updateProduct(event, urlId);
    showAlert("sicuro di voler modificare questo prodotto?");
    window.location.href = `./homepage.html`;
  } else {
    addProduct(event);
    showAlert("sicuro di voler aggiungere questo prodotto?");
    window.location.href = `./homepage.html`;
  }
});

// ----------------------------------------------------------------------------------------------------------------------------------------------

function resetForm() {
  document.getElementById("myForm").reset();
}

// ----------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const url = new URLSearchParams(window.location.search);
  const urlId = url.get("id");
  if (url) {
    addOrModifyButton.innerText = "Add";
    resetOrDeleteButton.innerText = "Reset";
    title.innerText = "Backoffice Add";
  }

  if (urlId) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${urlId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWYwMzRjNTllYzAwMTk5MGQ3MDQiLCJpYXQiOjE3MDkyODUxMjQsImV4cCI6MTcxMDQ5NDcyNH0.riO_yVhKbSvRs3Ipox80RCZrqQdzfDQlP8Jmiv3ZgBI",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante la modifica del prodotto");
        }
        return response.json();
      })
      .then((product) => {
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("imageUrl").value = product.imageUrl;
        document.getElementById("price").value = product.price;
        title.innerText = "Backoffice Update";
        addOrModifyButton.innerText = "Update";
        resetOrDeleteButton.innerText = "Remove";

        resetOrDeleteButton.addEventListener("click", function () {
          const confirmation = confirm("Sicuro di voler eliminare questo prodotto?");
          if (confirmation) {
            deleteProduct(urlId);
            window.location.href = `./homepage.html`;
          }
        });
      })
      .catch((error) => console.error("Errore durante il recupero dei dettagli del prodotto:", error));
  }
});

// ----------------------------------------------------------------------------------------------------------------------------------------------

const addProduct = (element) => {
  element.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWYwMzRjNTllYzAwMTk5MGQ3MDQiLCJpYXQiOjE3MDkyODUxMjQsImV4cCI6MTcxMDQ5NDcyNH0.riO_yVhKbSvRs3Ipox80RCZrqQdzfDQlP8Jmiv3ZgBI",
    },
    body: JSON.stringify(newProduct),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Prodotto aggiunto con successo");
        alert("Prodotto aggiunto con successo");
      } else {
        console.error("Errore durante l'aggiunta del prodotto");
      }
    })

    .catch((error) => {
      console.error("Errore durante l'invio della richiesta:", error);
    });
};

// ----------------------------------------------------------------------------------------------------------------------------------------------

const updateProduct = (element, productId) => {
  element.preventDefault();

  const updatedProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWYwMzRjNTllYzAwMTk5MGQ3MDQiLCJpYXQiOjE3MDkyODUxMjQsImV4cCI6MTcxMDQ5NDcyNH0.riO_yVhKbSvRs3Ipox80RCZrqQdzfDQlP8Jmiv3ZgBI",
    },
    body: JSON.stringify(updatedProduct),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Prodotto aggiornato con successo");
        alert("Prodotto aggiornato con successo");
      } else {
        console.error("Errore durante l'aggiornamento del prodotto");
      }
    })
    .catch((error) => {
      console.error("Errore durante l'invio della richiesta:", error);
    });
};

// ----------------------------------------------------------------------------------------------------------------------------------------------

const deleteProduct = (productId) => {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWYwMzRjNTllYzAwMTk5MGQ3MDQiLCJpYXQiOjE3MDkyODUxMjQsImV4cCI6MTcxMDQ5NDcyNH0.riO_yVhKbSvRs3Ipox80RCZrqQdzfDQlP8Jmiv3ZgBI",
    },
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Prodotto eliminato con successo");
        alert("Prodotto eliminato con successo");
      } else {
        console.error("Errore durante l'eliminazione del prodotto");
      }
    })
    .catch((error) => {
      console.error("Errore durante l'invio della richiesta:", error);
    });
};
