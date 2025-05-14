/* QUE HACER EN ESTE PROYECTO

1. HACER LA FUNCIONALIDAD CON EL BOTON DE ADD TO CART
2. CARGAR LOS DEMAS ELEMENTOS DEL ARCHIVO JSON
3. AGREGAR PRODUCTOS AL CARRITO
4. PANTALLA DE CONFIRMACION DE ORDEN

*/


//1. Object constructor mas reutilizable, nos permite crear múltiples objetos con la misma estructura y lógica sin tener que repetir código.
function cart(nombre, cantidad, precio, total){
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
    this.total = total;
}

function UI(){

}

UI.prototype.productButton = function(){
    const buttonContainer = document.querySelector('.img-container'); 

    //AddButton es el boton para agregar al carrito.
    const addButton = document.querySelector('.product__button');
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

        const addSpan = document.createElement('SPAN'); //Agregamos el elemento Span que tiene el numero
        addSpan.textContent = '1';
     

        const quantitySubtract = document.createElement('img');
        quantitySubtract.src = "assets/images/icon-decrement-quantity.svg";
        quantitySubtract.classList.add('product__add', 'more');


        const quantityAdd = document.createElement('img');
        quantityAdd.src =  "assets/images/icon-increment-quantity.svg";
        quantityAdd.classList.add('product__add', 'less');

        addButtonActive.appendChild(quantityAdd);
        addButtonActive.appendChild(quantitySubtract);

        addButtonActive.appendChild(addSpan);

        quantityAdd.addEventListener('click', () =>{
            ui.sumarCantidad(addSpan);
        })

        quantitySubtract.addEventListener('click', () =>{
            ui.restarCantidad(addSpan, addButtonActive, addButton);
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
    ui.productButton();
})