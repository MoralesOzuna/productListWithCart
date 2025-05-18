/* QUE HACER EN ESTE PROYECTO

1. HACER LA FUNCIONALIDAD CON EL BOTON DE ADD TO CART  LISTO
2. CARGAR LOS DEMAS ELEMENTOS DEL ARCHIVO JSON LISTO
3. AGREGAR PRODUCTOS AL CARRITO
4. PANTALLA DE CONFIRMACION DE ORDEN

*/


//1. Object constructor mas reutilizable, nos permite crear múltiples objetos con la misma estructura y lógica sin tener que repetir código.

function Cart(nombre, cantidad, precio, total){
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
    this.total = total;
}

Cart.prototype.cartElements = function(){

    //Si cantidad = 1; devuelve la info
    if(cantidad === 1 ){
        return {
            nombre: nombre,
            cantidad: cantidad,
            precio: precio,
            total: total
        }
    }
    //Si cantidad > 2 devuelve solo la cantidad actualizada
    if(cantidad > 1) {
        return {
            cantidad: cantidad
        }
    }
    return;   
}

function UI(){

}


UI.prototype.mostrarProductos = function(productos){
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

    ui.productButton();
}

UI.prototype.productButton = function(){
   

    articles = document.querySelectorAll('.product');

    articles.forEach( article =>{

        const buttonContainer = article.querySelector('.img-container'); 

        //AddButton es el boton para agregar al carrito.
        const addButton = article.querySelector('.product__button');
        //AddButtonActive es el boton que nos permite seleccionar cantidad.
        const addButtonActive = document.createElement('BUTTON');


        addButton.addEventListener('click', () =>{
            //Desaparece el boton de agregar al carrito
            addButton.style.display = 'none';
    
            //Agregamos el nuevo boton y estilos
            addButtonActive.classList.add('product__button--active');
            buttonContainer.appendChild(addButtonActive);
    
            //Si existe la clase en el boton activo, ya no duplicamos el texti
       
            if(addButtonActive.classList.contains('buttonActive')) return;
            addButtonActive.style.display = 'block';
            addButtonActive.textContent = ''; //Reseteamos texto del boton
            addButtonActive.classList.add('buttonActive'); //Nos da unos estilos adicionales de boton
    
            //Agregamos el elemento Span que tiene el numero
            const addSpan = document.createElement('SPAN'); 
            addSpan.textContent = '1';
    
            addButtonActive.appendChild(addSpan);
            //Agregamos las imagenes para agregar y disminuir
            const quantitySubtract = document.createElement('img');
            quantitySubtract.src = "assets/images/icon-decrement-quantity.svg";
            quantitySubtract.classList.add('product__add', 'more');
    
            const quantityAdd = document.createElement('img');
            quantityAdd.src =  "assets/images/icon-increment-quantity.svg";
            quantityAdd.classList.add('product__add', 'less');
    
            addButtonActive.appendChild(quantityAdd);
            addButtonActive.appendChild(quantitySubtract);

            //Creamos la instancia de cart

            nombre = article.querySelector('.information__tag').textContent;
            cantidad = Number.parseInt(addSpan.textContent);
            precio = parseFloat(
                article.querySelector('.information__price').textContent
                .replace(/[^0-9.]/g, ''));
            total = [];


            const cart = new Cart(nombre, cantidad, precio, total);

            const elements = cart.cartElements();
            
            
            console.log(elements);
            
            
       
    
            //Eventos que detonan los iconos de + y -
            quantityAdd.addEventListener('click', () =>{
                ui.sumarCantidad(addSpan);
              
                nombre = article.querySelector('.information__tag').textContent;
                cantidad = Number.parseInt(addSpan.textContent);
                precio = parseFloat(
                    article.querySelector('.information__price').textContent
                    .replace(/[^0-9.]/g, ''));
                total = [...total, precio];
    
                //Creamos una nueva instancia del carrito;
                const cart = new Cart(nombre, cantidad, precio, total);

                const elements = cart.cartElements();
                
                
                console.log(elements);

            })
    
            quantitySubtract.addEventListener('click', () =>{
                ui.restarCantidad(addSpan, addButtonActive, addButton);
                const elements = cart.cartElements();
            })
        })
    })
}


UI.prototype.sumarCantidad = function(textBoton){
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



//2. Instanciar UI
const ui = new UI(); //Es decir creamos un nuevo objeto de la clase particular UI





document.addEventListener('DOMContentLoaded', () =>{
    ui.mostrarProductos(products); //toma products de database.js
    
    
})