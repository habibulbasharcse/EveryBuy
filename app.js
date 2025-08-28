
const loadProducts =() =>{
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    displayProducts(data);
  });
}

const displayProducts = (products) => {

    const productCont = document.getElementById("product-cont");
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card", "col-lg-3", "col-md-4", "col-sm-6", "m-3"); 
        div.style.width = "18rem";

        div.innerHTML = `
            <img src="${product.image}" class="card-img-top card-img" alt="${product.title}">
            <div class="card-body text-center">
                <h5 class="card-title">${product.title}</h5>
                <p class="fw-bold text-danger fs-4">$${product.price}</p>
            
                <details>
                    <summary>Details</summary>
                    <p>${product.description}</p>
                </details><br>

                <!-- Buy Now button (full width, উপরে) -->
                <button class="btn btn-success w-100 mb-2">Buy Now</button>

                <!-- Add to Cart button (full width, নিচে) -->
                <button class="btn btn-primary w-100 add-cart-btn">
                    <i class="fa-solid fa-cart-shopping"></i> Add To Cart
                </button>
            </div>
        `;


        productCont.appendChild(div);
        const addCartBtn = div.querySelector('.add-cart-btn');
        addCartBtn.addEventListener('click', () => addToCart(product));
    });
}
let total = 0;
let count = 0;

const addToCart = (product) => {
    const cartItems = document.getElementById("cart-items");
    const div = document.createElement("div");
    div.classList.add("card", "col-lg-3", "col-md-4", "col-sm-6", "m-3");
    div.style.width = "18rem";

    div.innerHTML=`
        <img  src="${product.image}" class="card-img-top card-img" alt="${product.title}">
        <div class="card-body text-center">
            <h5 class="card-title">${product.title}</h5>
            <p class="fw-bold text-danger fs-4">$${product.price}</p>
            <button class="btn btn-primary mt-2 remove-btn">
            <i class="fa-solid fa-cart-shopping"></i> Remove 
            </button>
        </div>
    `;
    cartItems.appendChild(div);
    total += parseFloat(product.price);
    count += 1;

    const totalDiv = document.getElementById("total-price"); 
    totalDiv.innerHTML = `<span style="color: white;">
    Total Items: ${count} <br> Total Price: $${total.toFixed(2)}
    </span>`;

    const removeItem = div.querySelector(".remove-btn");
    removeItem.addEventListener('click' ,() => {
        cartItems.removeChild(div);
        total -= parseFloat(product.price);
        count -= 1;
        totalDiv.innerHTML = `<span style="color: white;">
    Total Items: ${count} <br> Total Price: $${total.toFixed(2)}
    </span>`;
    });
}
    

loadProducts();

