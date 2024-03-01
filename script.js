const url = new URLSearchParams(window.location.search);
const urlId = url.get("id");

const addOrUpdateProduct = (element) => {
  element.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  const url = "https://striveschool-api.herokuapp.com/api/product/";
  const method = urlId ? "PUT" : "POST";
  const requestUrl = urlId ? `${url}/${urlId}` : url;

  fetch(requestUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWYwMzRjNTllYzAwMTk5MGQ3MDQiLCJpYXQiOjE3MDkyODUxMjQsImV4cCI6MTcxMDQ5NDcyNH0.riO_yVhKbSvRs3Ipox80RCZrqQdzfDQlP8Jmiv3ZgBI",
    },
    body: JSON.stringify(newProduct),
  })
    .then(function (response) {
      if (response.ok) {
        if (method === "PUT") {
          console.log("Prodotto aggiornato con successo");
        } else {
          console.log("Prodotto aggiunto con successo");
        }
      } else {
        console.error("Errore durante l'aggiunta o l'aggiornamento del prodotto");
      }
    })
    .catch((error) => {
      console.error("Errore durante l'invio della richiesta:", error);
    });
};

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function (element) {
  addOrUpdateProduct(element);
});

function resetForm() {
  document.getElementById("myForm").reset();
}
