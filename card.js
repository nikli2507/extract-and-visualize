// Sample list of objects
let itemList = [
    {name: "Item 1", description: "This is item 1", price: 10},
    {name: "Item 2", description: "This is item 2", price: 20},
    {name: "Item 3", description: "This is item 3", price: 30},
  ];
  
  // Create a container element to hold the cards
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  
  // Loop through the list of objects and create a card for each one
  for (let item of itemList) {
    // Create a new card element
    let card = document.createElement("div");
    card.classList.add("card");
  
    // Create the card contents
    let cardName = document.createElement("h2");
    cardName.textContent = item.name;
    let cardDescription = document.createElement("p");
    cardDescription.textContent = item.description;
    let cardPrice = document.createElement("p");
    cardPrice.textContent = "Price: $" + item.price;
  
    // Add the contents to the card
    card.appendChild(cardName);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);
  
    // Add the card to the container
    cardContainer.appendChild(card);
  }
  
  // Add the container to the page
  document.body.appendChild(cardContainer);