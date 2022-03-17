const menu = [
  {
    id: 1,
    title: "7 easy recipes",
    category: "breakfast",
    img: "./images/item-1.jpg",
    desc: `Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! `,
  },
  {
    id: 2,
    title: "9 easy gluten-free dinners",
    category: "lunch",
    img: "./images/item-2.jpg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing.`,
  },
  {
    id: 3,
    title: "Fish tacos recipes",
    category: "shakes",
    img: "./images/item-3.jpg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "The ultimate seafood",
    category: "breakfast",
    img: "./images/item-4.jpg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "Gluten-free raspberry slice",
    category: "lunch",
    img: "./images/item-5.jpg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "Discover bonus recipes",
    category: "shakes",
    img: "./images/item-6.jpg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "Quick and easy veggie rolls",
    category: "breakfast",
    img: "./images/item-7.jpg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "Quick salmon & potato salad",
    category: "lunch",
    img: "./images/item-8.jpg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "Quick and easy veggie rolls",
    category: "shakes",
    img: "./images/item-9.jpg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "Autumn fruit and veg",
    category: "dinner",
    img: "./images/item-10.jpg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];
document.addEventListener("DOMContentLoaded", function () {
  // get parent element
  const sectionCenter = document.querySelector(".section-center");
  const btnContainer = document.querySelector(".btn-container");

  diplayMenuItems(menu);
  displayMenuButtons();

  function diplayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) {
      // console.log(item);

      return `<article class="menu-item">
          <img src=${item.img} alt=${item.title} class="photo" id="photo${item.id}"/>
          <div class="item-info">
            <header>
              <h4 class="menu-title">${item.title}</h4>
            </header>
            <p class="item-text">
              ${item.desc}
            </p>
            <div class="add-to-btn-wrapper">
              <button class="addToCartBtn btn" data-id="${item.id}">add to list</button>
            </div>
          </div>
        </article>`;
    });
    displayMenu = displayMenu.join("");
    // console.log(displayMenu);

    sectionCenter.innerHTML = displayMenu;
  }
  function displayMenuButtons() {
    const categories = menu.reduce(
      function (values, item) {
        if (!values.includes(item.category)) {
          values.push(item.category);
        }
        return values;
      },
      ["all"]
    );
    const categoryBtns = categories
      .map(function (category) {
        return `<button type="button" class="filter-btn" data-id=${category}>
          ${category}
        </button>`;
      })
      .join("");

    btnContainer.innerHTML = categoryBtns;
    const filterBtns = btnContainer.querySelectorAll(".filter-btn");

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const category = e.currentTarget.dataset.id;
        const menuCategory = menu.filter(function (menuItem) {
          if (menuItem.category === category) {
            return menuItem;
          }
        });
        if (category === "all") {
          diplayMenuItems(menu);
        } else {
          diplayMenuItems(menuCategory);
        }
      });
    });
  }

  // open cart modal
  const cart = document.querySelector(".btn-primary");
  const cartModalOverlay = document.querySelector(".cart-modal-overlay");

  cart.addEventListener("click", () => {
    cartModalOverlay.classList.add("open-modal");
  });
  // end of open cart modal

  // close cart modal
  const closeBtn = document.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    cartModalOverlay.classList.remove("open-modal");
  });
  // end of close cart modal

  (function () {
    // VARS
    const productsContainer = document.querySelector("#template-product");
    const cartContainer = document.querySelector("#cart-items");
    const cartContent = document.querySelector("#template-cart");

    function getLSContent() {
      // get contents from local storage.
      // if nothing is there, create an empty array
      const lsContent = JSON.parse(localStorage.getItem("menu")) || [];
      return lsContent;
    }

    function setLSContent(lsContent) {
      // save content inside local storage
      localStorage.setItem("menu", JSON.stringify(lsContent));
    }

    function displayProducts() {
      // display all products in the cart

      // get contents from local storage
      const lsContent = getLSContent();
      let productMarkup = "";
      // if local storage is not empty, build the
      // cart items markup and the appropriate details
      if (lsContent !== null) {
        for (let product of lsContent) {
          productMarkup += `
        <div class="product-row">
          <img class="cart-item-img" src="${product.image}" alt="${product.name}">
          <h4 class="cart-item-name">${product.name}</h4>
          <button class="remove-btn" data-id="${product.id}">Remove</button>
        </div>
        `;
        }
      } else {
        // if no content is in local storage, alert user
        productMarkup = "Your cart is empty.";
      }
      // add markup to DOM
      cartContent.querySelector(".product-rows").innerHTML = productMarkup;
    }

    function saveProduct(clickedBtn) {
      // save selected product in local storage and display it in the cart together

      // vars
      const productId = clickedBtn.getAttribute("data-id");
      const card = clickedBtn.parentElement.parentElement.parentElement;
      const cardInfo = clickedBtn.parentElement;
      const prodImage = card.querySelector("img").src;
      const prodName = card.querySelector("h4").textContent;
      // const prodPrice = cardInfo.querySelector(".card__price").textContent;

      let isProductInCart = false;

      // get local storage array
      const lsContent = getLSContent();

      // to avoid user adds the same course twice, check
      // the product is not in LS already before adding it
      lsContent.forEach(function (product) {
        if (product.id === productId) {
          alert("This item is already in your cart.");
          isProductInCart = true;
        }
      });

      // only if the product is not already in the cart,
      // create an object representing selected product info
      // and push it into local storage array
      if (!isProductInCart) {
        lsContent.push({
          id: productId,
          image: prodImage,
          name: prodName,
        });

        // add product into into local storage
        setLSContent(lsContent);
        // update the display of courses in the shopping cart
        displayProducts();
      }
    }

    function removeProduct(productId) {
      // remove product from cart (and from local storage)

      // retrieve list of products from LS
      const lsContent = getLSContent();

      // get the index of the product item to remove
      // inside the local storage content array
      let productIndex;
      lsContent.forEach(function (product, i) {
        if (product.id === productId) {
          productIndex = i;
        }
      });

      // modify the items in local storage array
      // to remove the selected product item

      lsContent.splice(productIndex, 1);
      // update local storage content
      setLSContent(lsContent);

      displayProducts();
    }

    function clearCart() {
      // clear all products from cart (and local storage)

      // retrieve list of products from LS
      const lsContent = getLSContent();
      // empty array in local storage
      lsContent.splice(0, lsContent.length);
      // update local storage
      setLSContent(lsContent);
      // display cart content again
      displayProducts();
    }

    // BIND EVENTS AND CALL FUNCTIONS

    // Page load:
    displayProducts();

    // Save product in cart and Local Storage
    // when add to cart button is clicked
    productsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("addToCartBtn")) {
        e.preventDefault();
        const clickedBtn = e.target;
        saveProduct(clickedBtn);
      }
    });

    // bind removeProduct to click event of the cartContent table
    cartContainer.querySelector(".product-rows").addEventListener("click", function (e) {
      e.preventDefault();
      // identify the button that was clicked
      const clickedBtn = e.target;
      // if it's a remove button
      if (e.target.classList.contains("remove-btn")) {
        // get the value of the data-id property, which contains the
        // id of the selected product
        const productId = clickedBtn.getAttribute("data-id");
        // use the id to remove the selected product
        removeProduct(productId);
        // display products in the cart again,
        // now the list should be displayed with 1 less product
        // or empty if no products are left in the cart
      }
    });
  })();
});
