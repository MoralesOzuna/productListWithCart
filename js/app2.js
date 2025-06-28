/* Constructores 

Es una función especial que se utiliza para crear nuevos objetos con una misma estructura.
*/


let cartTotal = [];

function Cart(name, category, number, price, subtotal, total){
    this.name = name;
    this.category = category;
    this.number = number;
    this.price = price;
    this.subtotal = this.number * this.price;
   
}
function UI(){

}
/* Load the products from database.js to UI */
UI.prototype.loadProducts = function (){
    const container = document.querySelector('.products');
    container.innerHTML = '';

    /* products is from the json archive */
    products.forEach(product => {
        //Destructuring de objetos
        const {category, name, price, image} = product;
        const article = document.createElement('article');     
        article.classList.add('product'); 

        article.innerHTML = `
        <div class = "img-container">

            <picture>
                <source media="(min-width: 1024px)" srcset="${image.desktop}">
                <source media="(min-width: 768px)" srcset="${image.tablet}">
                <img src="${image.mobile}" alt="product">
            </picture>
        
            <button class =  "product__button">
                <img src = "../assets/images/icon-add-to-cart.svg" alt = "Cart icon">Add to Cart     
            </button>
        </div>

        <div class = "information">
            <p class = "information__tag"> ${category} </p>
            <h2 class = "information__name"> ${name} </h2>
            <p class = "information__price"> $${price.toFixed(2)}</p>        
        </div>
        `

        container.appendChild(article);

    });   

    this.addButton();
}

UI.prototype.addButton = function(){

    /* Select all products */    
    const articles = document.querySelectorAll('.product');

    articles.forEach(article =>{
        const addtoCartButton = article.querySelector('.product__button');
        
        addtoCartButton.addEventListener('click', () =>{
            //Dissapear add to cart button to create the new one
            addtoCartButton.style.display = 'none';
    
            const imgContainer = article.querySelector('.img-container');
            const quantityButtonExist = imgContainer.querySelector('.product__button--active');

            //If button exist we don't create a new one instead just display the inline style atrribuite
            if(quantityButtonExist){  
                quantityButtonExist.style.display = 'inline';
               
                getProduct(article);
       
            }

            //Create a new button if doesn't exist
            else{
                const quantityButton = document.createElement('BUTTON');      
                quantityButton.classList.add('product__button--active', 'buttonActive');
    
                //Add the new button to HTML
                const imgContainer = article.querySelector('.img-container');
                imgContainer.appendChild(quantityButton);
    
                //add buttonActive text
                const quantityAmount = document.createElement('SPAN');
                quantityAmount.classList.add('product__amount');
                quantityAmount.textContent = '1'
                quantityButton.appendChild(quantityAmount);
    
                //Add increment and decrement buttons
                const quantityAdd = document.createElement('img');
                quantityAdd.src = '../assets/images/icon-increment-quantity.svg';
                quantityAdd.alt = 'increment icon';
                quantityAdd.classList.add('product__add', 'right');
    
                const quantityLess = document.createElement('img');
                quantityLess.src = '../assets/images/icon-decrement-quantity.svg';
                quantityLess.alt = 'decrement icon';
                quantityLess.classList.add('product__add', 'left');
    
                quantityButton.appendChild(quantityLess);
                quantityButton.appendChild(quantityAdd);

                getProduct(article);

            quantityAdd.addEventListener('click', () =>{
                const name = article.querySelector('.information__name').textContent;
             
                const cartItem = cartTotal.find(producto => producto.name == name);
                
                if(cartItem){
                    cartItem.increment();
                    ui.cartHTML();
                    quantityAmount.textContent = cartItem.number;
                
                 
                }
            })

            quantityLess.addEventListener('click', () =>{
                const name = article.querySelector('.information__name').textContent;
                const cartItem = cartTotal.find(producto => producto.name === name);

                if(cartItem){
                    cartItem.decrement();
                    ui.cartHTML();
                    quantityAmount.textContent = cartItem.number;

                    
                if(cartItem.number < 1){
                    quantityButton.style.display = 'none';
                    addtoCartButton.style.display = 'block';
                    quantityAmount.textContent = 1;
                    cartTotal = cartTotal.filter(producto => producto !== cartItem);
                    document.querySelector('.cart__image').style.display = 'block';
                    document.querySelector('.cart__message').style.display = 'block';
                    document.querySelector('.totalText').remove();
                    document.querySelector('.totalCart').remove();
                    document.querySelector('.totalContainer').remove();
                    document.querySelector('.confirmButton').remove();
                 
                    }
                    ui.cartHTML();
                }

            })

            }
        })
        
    })
}

Cart.prototype.increment = function(){
    this.number++;
    this.subtotal = this.number * this.price;
   
}

Cart.prototype.decrement = function(){
    this.number--;
    this.subtotal = this.number * this.price;
 
}

getProduct = function(article) { 

    //esto esta bien
    /* la funcion getProduct está tomando datos del HTML y luego creando un nuevo objeto Cart con esos datos. Eso no tiene sentido que sea un método de Cart.prototype, porque aún no tienes ningún Cart. De hecho, lo usas para crear uno. */

    const infoProduct = {
        name: article.querySelector('.information__name').textContent,
        category: article.querySelector('.information__tag').textContent,
        price: parseFloat(article.querySelector('.information__price').textContent.replace(/[^0-9.]/g, '')).toFixed(2),
        number: 1
    }

    const exist = cartTotal.find(product => product.name === infoProduct.name);

    if(!exist){
    const cartItem =  new Cart(infoProduct.name, infoProduct.category, infoProduct.number, infoProduct.price);

    //Aqui agregamos el primer CartTotal
    cartTotal.push(cartItem);    
        ui.cartHTML();
     

    }    
}

UI.prototype.cartHTML = function(){
    const cartContainer = document.querySelector('.cart');
    const cartImage = document.querySelector('.cart__image');
    const cartMessage = document.querySelector('.cart__message');
    const cartList = document.querySelector('.cart__list');
    const cartItem = document.querySelector('.cart__item');
    let total = 0;
    let totalItems = 0;


    if(cartTotal != ''){
        cartImage.style.display = 'none'
        cartMessage.style.display = 'none';
    }

    if(cartList.querySelectorAll('.purchase')){
        cartList.querySelectorAll('.purchase').forEach(el => el.remove());
        
 
    }
    

   cartTotal.forEach(product =>{

    totalItems += product.number;
    

    const cartNumber = document.querySelector('.cart__number');
    cartNumber.textContent = totalItems;

    const purchase = document.createElement('li');
    purchase.classList.add('purchase');

    const purchaseName = document.createElement('P');
    purchaseName.textContent = product.name;
    purchaseName.classList.add('purchase__name');

    const purchaseNumber = document.createElement('P');
    purchaseNumber.textContent = `${product.number}x`;
    purchaseNumber.classList.add('purchase__number');

    const purchasePrice = document.createElement('P');
    purchasePrice.textContent = `@ $${product.price}`;
    purchasePrice.classList.add('purchase__price');

    const purchaseSubtotal = document.createElement('P');
    purchaseSubtotal.textContent = `$${product.subtotal}`
    purchaseSubtotal.classList.add('purchase__subtotal');

    total += product.subtotal;
    /* 
    const purchaseTotal = document.createElement('P');
    purchaseTotal.textContent = `$${total}` 
    purchaseTotal.classList.add('purchase__total'); */


    const purchaseQuit = document.createElement('IMG');
    purchaseQuit.src = '../assets/images/icon-remove-item.svg';
    purchaseQuit.classList.add('purchase__icon');

    purchaseQuit.addEventListener('click', () =>{
        //get the name of the product
        let productQuit = purchaseQuit.parentElement.firstChild.textContent;

        //seleccionamos todos los productos
        const articles = document.querySelectorAll('.product');
        //filter all the products of cartTotal.name that are diferent compared to productQuit, 
        cartTotal = cartTotal.filter( product => product.name != productQuit);
              ui.cartHTML();


         articles.forEach( article =>{
            if(article.querySelector('.information__name').textContent == productQuit){

                //Reiniciamos los valores de los botones
                article.querySelector('.information__name').parentElement.previousElementSibling.children[1].style.display = 'block';
                article.querySelector('.information__name').parentElement.previousElementSibling.lastElementChild.firstChild.textContent = 1;
                article.querySelector('.information__name').parentElement.previousElementSibling.lastElementChild.style.display = 'none';

            }
        })

        if(cartTotal == ''){
        cartNumber.textContent = '0';
        cartImage.style.display = 'block'
        cartMessage.style.display = 'block';
        document.querySelector('.totalText').remove();
        document.querySelector('.totalCart').remove();
        document.querySelector('.confirmButton').remove();
     
        ui.cartHTML();
    } /* Evento purchaseQuit */
    
  
    })

    
  
    purchase.appendChild(purchaseName);
    purchase.appendChild(purchaseNumber);
    purchase.appendChild(purchasePrice);
    purchase.appendChild(purchaseSubtotal);
    /* purchase.appendChild(purchaseTotal); */
    purchase.appendChild(purchaseQuit);
    
   /*  purchase.classList.add('purchase__name');
    purchase.textContent = product.name; */
    
    cartItem.appendChild(purchase);

    ui.createTotal(total);
    ui.createButton();

  })
}




UI.prototype.createTotal = function(total){
    total = total.toFixed(2);

    if(document.querySelector('.totalCart') || document.querySelector('.totalText')){
        document.querySelector('.totalCart').remove();
        document.querySelector('.totalText').remove();
        document.querySelector('.totalContainer').remove();

    }

    const cart = document.querySelector('.cart');

    const totalContainer = document.createElement('DIV');
    totalContainer.classList.add('totalContainer')

    totalText = document.createElement('p');
    totalText.textContent = 'Order Total';
    totalText.classList.add('totalText')
    totalContainer.appendChild(totalText);


    let totalCart = document.createElement('p');
    totalCart.classList.add('totalCart')
    totalCart.textContent = `$${total}`;
    totalContainer.appendChild(totalCart);

    /* cart.appendChild(totalContainer); */
    cart.insertBefore(totalContainer, document.querySelector('.confirmButton'))
    
}

UI.prototype.createButton = function(){
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('confirmButton');

    if(document.querySelector('.confirmButton')){
      
        buttonContainer.style.display = 'inline';
    } else{
        buttonContainer.innerHTML = `
            <p class = confirmButton__text> This is a <span> carbon-neutral</span> delivery </p>
            <button class = confirmButton__button> Confirm Order </button>
            `      
            document.querySelector('.cart').appendChild(buttonContainer);

    }

    
    const confirmButton = document.querySelector('.confirmButton__button');

        /* 2. const newConfirmButton = confirmButton.cloneNode(true);
            Clona el botón:
            cloneNode(true) clona el nodo con todos sus hijos y atributos.
            El nuevo botón (newConfirmButton) es idéntico visualmente al original.
            ⚠️No copia los event listeners (esto es la clave de este truco). */

        /* 3. confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
            Reemplaza el botón original con el clon:

            confirmButton.parentNode accede al padre del botón.

            replaceChild(nuevo, viejo) sustituye el botón original (confirmButton) con el clon (newConfirmButton).

            Como el clon no tiene ningún evento, se eliminan todos los listeners anteriores.

            4. newConfirmButton.addEventListener('click', () => ui.orderConfirmation());
            Ahora se añade un único listener limpio al nuevo botón. */

    const newConfirmButton = confirmButton.cloneNode(true);
    confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton)
    newConfirmButton.addEventListener('click', () => ui.orderConfirmation());
        
}

UI.prototype.orderConfirmation = function(){
    const orderDiv = document.createElement('DIV');
    orderDiv.classList.add('order');

    orderDiv.innerHTML = `
        <img class = order__icon src = '../assets/images/icon-order-confirmed.svg'>
        <h2 class = 'order__title'> Order Confirmed </h2>
        <p class = 'order__text'> We hope you enjoy your food!>

    `
    const orderProducts = document.createElement('div');
    orderProducts.classList.add('confirmed');

    let total = 0;

    cartTotal.forEach(product =>{
        total += product.subtotal;
        orderProducts.innerHTML += `
            <div class = confirmed__container>
                <h3 class ="confirmed__title"> ${product.name} </h3>
                <p class = "confirmed__number"> ${product.number}x </p>
                <p class = "confirmed__price"> @ ${product.price} </p>
                <p class = "confirmed__subtotal"> $${product.subtotal.toFixed(2)} <p>
            </div>
        `
        orderDiv.appendChild(orderProducts);
    });

    const totalContainer = document.createElement('DIV');
    totalContainer.classList.add('confirmed__total-Div')
    totalContainer.innerHTML = `
        <div class = confirmed__total>
                <p class = 'confirmed__totalText'> Order Total </p>
                <p class = 'confirmed__totalQuantity'> $${total} </p> 
        </div> 
    `
    store = document.querySelector('.store');
    main = document.querySelector('.main')
    orderProducts.appendChild(totalContainer)
    main.appendChild(orderDiv);

    
    const confirmedName = document.querySelectorAll('.confirmed__title');
    confirmedName.forEach(name =>{
        products.forEach(data =>{
            if(name.textContent.trim() == data.name){
                const parentDiv = name.parentElement;
                const orderThumbail = document.createElement('IMG');
                orderThumbail.classList.add('confirmed__image')
                orderThumbail.src = data.image.thumbnail;
                parentDiv.appendChild(orderThumbail);
            }
        })
    })

    const buttonNewOrden = document.createElement('BUTTON');
    buttonNewOrden.classList.add('button__confirmed', 'confirmButton__button');
    buttonNewOrden.textContent = 'Start New Order';

    buttonNewOrden.addEventListener('click', ()=> ui.resetPage(orderDiv))



    const productsDiv = document.querySelector('.products');
    const asideDiv = document.querySelector('.cart');
    orderDiv.appendChild(buttonNewOrden);


    productsDiv.style.display = 'none';
    asideDiv.style.display = 'none';


}


UI.prototype.resetPage = function(order, store){


    const spinnerDiv = document.createElement('div');
    spinnerDiv.classList.add('spinner');
    spinnerDiv.innerHTML = `
      <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
    `

    setTimeout(() =>{
        spinnerDiv.remove();
        order.remove();
        store.style.display = 'block';
    },3000)

    order.appendChild(spinnerDiv);
}


addEventListener('DOMContentLoaded', () =>{
    ui.loadProducts();
})


/* Instanciamos
Creamos una instancia de la funcion constructora. 
*/
const ui = new UI();
