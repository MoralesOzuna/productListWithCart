/* QUE HACER EN ESTE PROYECTO

1. HACER LA FUNCIONALIDAD CON EL BOTON DE ADD TO CART  LISTO
2. CARGAR LOS DEMAS ELEMENTOS DEL ARCHIVO JSON LISTO
3. AGREGAR PRODUCTOS AL CARRITO
4. PANTALLA DE CONFIRMACION DE ORDEN

*/


//1. Object constructor mas reutilizable, nos permite crear múltiples objetos con la misma estructura y lógica sin tener que repetir código.


/* CONSTRUCTORES como UI no va a tener metodos que retornen propiedades se deja vacio */
function Cart(nombre, cantidad, precio, total){
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
    this.total = total;
}

function UI(){

}

//Mostramos la lista de productos
UI.prototype.mostrarProductos = function(productos){ //Productos proviene de database.js
    productos.forEach( producto => {

        const article = document.createElement('ARTICLE');
        article.classList.add('product');

        producto.price = Number.parseFloat(producto.price).toFixed(2);
        article.innerHTML = `
        <div class = "img-container">
            <img class = "product__image" src = ${producto.image.mobile} alt="product store">

            <button class = "product__button">
                <img src = "../assets/images/icon-add-to-cart.svg" alt = "Cart Icon"> Add to Cart
            </button>
        </div>

        <div class = "information">
            <p class = "information__tag"> ${producto.category} </p>
            <h2 class = "information__name"> ${producto.name} </h2>
            <p class = "information__price"> $${producto.price} </p>
        </div>        
        `

    document.querySelector('.products').appendChild(article);
        
    });

    this.productButton();
}


UI.prototype.productButton = function(){
   
    articles = document.querySelectorAll('.product');

    articles.forEach( article =>{

        //Container donde se encuentra el boton
        const buttonContainer = article.querySelector('.img-container'); 
        //AddButton es el boton para agregar al carrito.
        const addButton = article.querySelector('.product__button');
        //AddButtonActive es el "nuevo" boton que nos permite seleccionar cantidad.
        const addButtonActive = document.createElement('BUTTON');

        addButton.addEventListener('click', () =>{
            //Desaparece el boton de agregar al carrito
            addButton.style.display = 'none';
    
            //Agregamos el nuevo boton al container
            addButtonActive.classList.add('product__button--active');
            buttonContainer.appendChild(addButtonActive);

            addButtonActive.style.display = 'block';
            addButtonActive.textContent = ''; //Reseteamos texto del boton
            addButtonActive.classList.add('buttonActive'); //Nos da unos estilos adicionales de boton
    
            //Agregamos el elemento Span que tiene el numero del boton activo
            const addSpan = document.createElement('SPAN'); 
            addSpan.textContent = '1';
            addButtonActive.appendChild(addSpan);

            this.quantityButtons(addButtonActive, addSpan, addButton, article);
        })
    })
}


UI.prototype.quantityButtons = function(BotonPadre, addSpan, addButton, article){
    //Agregamos las imagenes para agregar y disminuir
    const quantitySubtract = document.createElement('img');
    quantitySubtract.src = "assets/images/icon-decrement-quantity.svg";
    quantitySubtract.classList.add('product__add', 'more');

    const quantityAdd = document.createElement('img');
    quantityAdd.src =  "assets/images/icon-increment-quantity.svg";
    quantityAdd.classList.add('product__add', 'less');

    BotonPadre.appendChild(quantityAdd);
    BotonPadre.appendChild(quantitySubtract);

    TomarDatos(article, addSpan); 

    //Al agregar o disminuir cambia el numero
    quantityAdd.addEventListener('click', () =>{
        this.sumarCantidad(addSpan, article);
    })


    quantitySubtract.addEventListener('click', () =>{
        this.restarCantidad(addSpan, BotonPadre, addButton);
    })

    const cart = new Cart(nombre, cantidad, precio, total);
    const cartList = cart.cartElements();

    ui.mostrarResultado(cart, cartList);

}


function TomarDatos(article, addSpan){

    //Creamos un objeto con la informacion del producto seleccionado
    const infoProducto = {
        nombre: article.querySelector('.information__tag').textContent,
        cantidad: Number.parseInt(addSpan.textContent),
        precio: parseFloat(article.querySelector('.information__price').textContent.replace(/[^0-9.]/g, '')),
        total: Number.parseInt(addSpan.textContent) * parseFloat(article.querySelector('.information__price').textContent.replace(/[^0-9.]/g, ''))

    }

    const cart = new Cart(
        infoProducto.nombre,
        infoProducto.cantidad,
        infoProducto.precio,
        infoProducto.total
    );

     const elements = cart.cartElements();
}

UI.prototype.mostrarResultado = function(cart, cartList){

    let {nombre, cantidad, precio, total} = cart;
    cartAside = document.querySelector('.cart');
    cartTitle = document.querySelector('.cart__title');
    /* cartNumber = cartTitle.querySelector('span').textContent; */
    cartImage = document.querySelector('.cart__image');
    cartMessage = document.querySelector('.cart__message');

    cartTitle.style.textAlign = 'left';
    cartImage.style.display = 'none';
    cartMessage.style.display = 'none';

    listContainer = document.createElement('DIV');
    cartAside.appendChild(listContainer);

    console.log(cartList)
  
    


    
    listContainer.innerHTML =  `

    <ul class = "productos">
        <li class = "producto">
            <p class = "producto__nombre"> ${nombre} </p>
            <p class = "producto__cantidad"> ${cantidad} </p>
            <p class = "producto__precio"> ${precio} </p>
        

        </li>


    
    
    
    `
    




    //Crea el carrito

  

}





Cart.prototype.cartElements = function(){
     cantidad = this.cantidad;
     nombre = this.nombre;
     precio = this.precio;
     total = this.total;

     console.log(this.cantidad)


    return {
        nombre: nombre,
        cantidad: cantidad,
        precio: precio,
        total: total
        

    }

}


UI.prototype.sumarCantidad = function(textBoton, article){
    let cantidad = Number.parseInt(textBoton.textContent);
    cantidad++;
    textBoton.textContent = cantidad;
}

UI.prototype.restarCantidad = function(textBoton, buttonActive, addButton) {

    let cantidad = Number.parseInt(textBoton.textContent);
   
    if(cantidad >= 1){
        cantidad--;
        textBoton.textContent = cantidad;
    }

    if(cantidad == 0){
        buttonActive.classList.remove('buttonActive')
        buttonActive.style.display = 'none';
        addButton.style.display = 'inline'
    }
  
}

UI.prototype.mostrarResultado = function(cart, cartList){

    let {nombre, cantidad, precio, total} = cart;
    cartAside = document.querySelector('.cart');
    cartTitle = document.querySelector('.cart__title');
    /* cartNumber = cartTitle.querySelector('span').textContent; */
    cartImage = document.querySelector('.cart__image');
    cartMessage = document.querySelector('.cart__message');

    cartTitle.style.textAlign = 'left';
    cartImage.style.display = 'none';
    cartMessage.style.display = 'none';

    listContainer = document.createElement('DIV');
    cartAside.appendChild(listContainer);

    console.log(cartList)
  
    


    
    listContainer.innerHTML =  `

    <ul class = "productos">
        <li class = "producto">
            <p class = "producto__nombre"> ${nombre} </p>
            <p class = "producto__cantidad"> ${cantidad} </p>
            <p class = "producto__precio"> ${precio} </p>
        

        </li>


    
    
    
    `
    




    //Crea el carrito

  

}

//2. Instanciar UI
const ui = new UI(); //Es decir creamos un nuevo objeto de la clase particular UI




document.addEventListener('DOMContentLoaded', () =>{
    ui.mostrarProductos(products); //toma products de database.js
    
    
})


