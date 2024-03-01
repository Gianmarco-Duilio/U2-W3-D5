const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
getProductDetails(productId);

function getProductDetails(productId) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWYwMzRjNTllYzAwMTk5MGQ3MDQiLCJpYXQiOjE3MDkyODUxMjQsImV4cCI6MTcxMDQ5NDcyNH0.riO_yVhKbSvRs3Ipox80RCZrqQdzfDQlP8Jmiv3ZgBI",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli del prodotto");
      }
    })
    .then((product) => {
      displayProductDetails(product);
    });
}

function displayProductDetails(product) {
  const productDetailsContainer = document.getElementById("product-details-container");

  const card = document.createElement("div");
  card.classList.add("card", "shadow", "p-3", "mb-5", "rounded-4");
  productDetailsContainer.appendChild(card);

  const immagine = document.createElement("img");
  immagine.classList.add("card-img-top", "object-fit-cover");
  immagine.src = product.imageUrl;
  card.appendChild(immagine);

  const bodyCard = document.createElement("div");
  bodyCard.classList.add("card-body", "text-center");
  card.appendChild(bodyCard);

  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.innerText = product.brand;
  bodyCard.appendChild(title);

  const description = document.createElement("p");
  description.classList.add("card-text");
  description.innerText = product.name;
  bodyCard.appendChild(description);

  const price = document.createElement("small");
  price.classList.add("text-muted");
  price.innerText = "PRICE " + product.price + "€";
  bodyCard.appendChild(price);
}
