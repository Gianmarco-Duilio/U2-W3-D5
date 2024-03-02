// ----------------------------------------------------------------------------------------------------------------------------------------------

fetch("https://striveschool-api.herokuapp.com/api/product/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWYwMzRjNTllYzAwMTk5MGQ3MDQiLCJpYXQiOjE3MDkyODUxMjQsImV4cCI6MTcxMDQ5NDcyNH0.riO_yVhKbSvRs3Ipox80RCZrqQdzfDQlP8Jmiv3ZgBI",
  },
})
  .then(function (response) {
    if (response.ok) {
      console.log("Prodotti Caricati");
      return response.json();
    } else {
      throw new Error("Errore");
    }
  })
  .then(function (product) {
    console.log(product);
    addProduct(product);
  });

// ----------------------------------------------------------------------------------------------------------------------------------------------

function addProduct(product) {
  const contenitoreObj = document.getElementById("container");
  // ----------------------------------------------------------------------------------------------------------------------------------------------

  product.forEach((element) => {
    const column = document.createElement("div");
    column.classList.add("col-md-4", "g-3");
    contenitoreObj.appendChild(column);

    // ----------------------------------------------------------------------------------------------------------------------------------------------

    const card = document.createElement("div");
    card.classList.add("card", "shadow", "p-3", "mb-5", "rounded-4", "h-100");
    column.appendChild(card);

    // ----------------------------------------------------------------------------------------------------------------------------------------------

    const immagine = document.createElement("img");
    immagine.classList.add("card-img-top", "object-fit-cover");
    immagine.src = element.imageUrl;
    card.appendChild(immagine);

    // ----------------------------------------------------------------------------------------------------------------------------------------------

    const bodyCard = document.createElement("div");
    bodyCard.classList.add("card-body", "text-center");
    card.appendChild(bodyCard);

    // ----------------------------------------------------------------------------------------------------------------------------------------------

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.innerText = element.brand;
    bodyCard.appendChild(title);

    // ----------------------------------------------------------------------------------------------------------------------------------------------

    const name = document.createElement("p");
    name.classList.add("card-text");
    name.innerText = element.name;
    bodyCard.appendChild(name);

    // ----------------------------------------------------------------------------------------------------------------------------------------------

    const price = document.createElement("small");
    price.classList.add("text-muted");
    bodyCard.appendChild(price);
    price.innerText = element.price + "€";
    // ----------------------------------------------------------------------------------------------------------------------------------------------

    const containerBtn = document.createElement("div");
    containerBtn.classList.add("bg-secondary", "border-top", "mt-2");
    bodyCard.appendChild(containerBtn);

    // ----------------------------------------------------------------------------------------------------------------------------------------------

    const btnDetail = document.createElement("button");
    btnDetail.classList.add("btn", "btn-sm", "btn-outline-secondary", "m-3");
    bodyCard.appendChild(btnDetail);
    btnDetail.innerText = "Detail";
    btnDetail.addEventListener("click", function (e) {
      window.location.href = `./detail.html?id=${element._id}`;
    });
  });
}

// ----------------------------------------------------------------------------------------------------------------------------------------------
