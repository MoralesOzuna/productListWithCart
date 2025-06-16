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
    this.total =+ this.subtotal;
}
function UI(){

}
/* Load the products from database.js to UI */
UI.prototype.loadProducts = function (){
    const container = document.querySelector('.products');
    container.innerHTML = '';


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
                cartTotal.forEach(producto=>{
                    producto.number = 1;
                   
                 })
           
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
                    ui.cartHTML();
                 

                }
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
    /* la funcion getProduct está tomando datos del HTML y luego creando un nuevo objeto Cart con esos datos. Eso no tiene sentido que sea un método de Cart.prototype, porque aún no tienes ningún Cart. De hecho, lo usas para crear uno. */

    const infoProduct = {
        name: article.querySelector('.information__name').textContent,
        category: article.querySelector('.information__tag').textContent,
        price: parseFloat(article.querySelector('.information__price').textContent.replace(/[^0-9.]/g, '')).toFixed(2),
        number: 1
    }

    const cartItem =  new Cart(infoProduct.name, infoProduct.category, infoProduct.number, infoProduct.price);
  
   
  
    cartTotal.push(cartItem);    

    ui.cartHTML();
    
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

    if(cartItem.querySelectorAll('.purchase')){
        cartItem.querySelectorAll('.purchase').forEach(el => el.remove());
        
 
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
        let productQuit = purchaseQuit.parentElement.firstChild.textContent;
        const articles = document.querySelectorAll('.product');
        cartTotal = cartTotal.filter( product => product.name != productQuit)
        
        
         articles.forEach( article =>{
            if(article.querySelector('.information__name').textContent == productQuit){

                article.querySelector('.information__name').parentElement.previousElementSibling.children[1].style.display = 'block';
                article.querySelector('.information__name').parentElement.previousElementSibling.lastElementChild.firstChild.textContent = 1;
                article.querySelector('.information__name').parentElement.previousElementSibling.lastElementChild.style.display = 'none';
            }
        })

        if(cartTotal == ''){
        cartNumber.textContent = '0';
        cartImage.style.display = 'block'
        cartMessage.style.display = 'block';

     
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

  })
  
}

UI.prototype.createTotal = function(total){
    total = total.toFixed(2);

    if(document.querySelector('.totalCart') || document.querySelector('.totalText')){
        document.querySelector('.totalCart').remove();
        document.querySelector('.totalText').remove();

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

    cart.appendChild(totalContainer);
}


addEventListener('DOMContentLoaded', () =>{
    ui.loadProducts();
})


/* Instanciamos
Creamos una instancia de la funcion constructora. 
*/
const ui = new UI();
