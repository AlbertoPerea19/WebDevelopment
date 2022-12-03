const carrito = document.querySelector('#contenedor-tabla-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

let navbar = document.querySelector('.menu-nav-index');
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .menu-nav-index a');
let navLinksProductos = document.querySelectorAll('ul .clickto a');

let navProductos = document.querySelector('.clickto');

jQuery('.target').hide();
jQuery('#div1').show();

jQuery(function(){
    jQuery('.clickto').click(function(){
        jQuery('.target').hide();
        jQuery('#div'+$(this).attr('target')).show();
        
        navLinksProductos.forEach(links =>{
            links.classList.remove('activate');
            
        });
        let id=('#li'+$(this).attr('target'));
        jQuery(id).addClass('activate');
    });
});


window.onscroll=()=>{

    navbar.classList.remove('active');
    section.forEach(sec =>{

        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 100;
        let id = sec.getAttribute('id');
    
        if(top >= offset && top < offset + height){
          navLinks.forEach(links =>{
            links.classList.remove('active');
            document.querySelector('header .menu-nav-index a[href*='+id+']').classList.add('active');
          });
        };
    
      });
}

window.onload = () =>{

    //Cargamos el contenido del carrito
    cargarCarrito();

    //Cuando agregas un producto presionando "Agregar al Carrito"
    listaProductos.addEventListener( 'click', agregarProducto );

    //Elimina producto del carrito
    carrito.addEventListener( 'click', eliminarProductoCarrito );

    //Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener( 'click', ()=>{
        //Reseteamos el arreglo
        articulosCarrito = [];
        //Limpiamos el html del carrito
        limpiarCarritoHTML();
    });

}

// ------------- Objeto Prodcuto -------------
function Producto( id, nombreProducto, imagen, precio ){
    this.id = id;
    this.nombreProducto = nombreProducto;
    this.imagen = imagen;
    this.precio = precio;
    this.cantidad = 1;
    //Setter para cantidad
}


// ------------- FUNCIONES -------------

//Cargamos el JSON del LocalStorage
function cargarCarrito(){
    articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];
    carritoHTML();
}


//Agrega un producto al carrito
function agregarProducto( e ){
    e.preventDefault();
    
    if( e.target.classList.contains('agregar-carrito') ){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto( productoSeleccionado );
    }

}

//Lee el contenido HTML al que clickeamos y extrae info del prodcuto
function leerDatosProducto( producto ){

    //crear un objeto con el contenido del producto actual
    const imagen = producto.querySelector('img').src;
    const nombreProducto = producto.querySelector('h4').textContent;
    const precio = producto.querySelector('#precio').textContent;
    const id = producto.querySelector('a').getAttribute('data-id');
    const infoProducto = new Producto( id, nombreProducto, imagen, precio );
    

    //Revisa si un elemento ua existe en el carrito
    const existeEnCarrito = articulosCarrito.some( producto => producto.id === infoProducto.id  )
    if( existeEnCarrito ){
        //Actualizamos la cantidad
        const productos = articulosCarrito.map( producto => {
            if( producto.id === infoProducto.id ){
                producto.cantidad++;
                return producto;
            }
            
        } );
    } else{
        //Agrega el producto creado al arreglo de carritos
        articulosCarrito.push( infoProducto );
    }
    
    carritoHTML();
}


//Muestra el carrito de compras en el HTML
function carritoHTML(){
    var total=0;
    //Limpiar el  HTML
    limpiarCarritoHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( ( producto )=>{
        var costo=producto.precio*producto.cantidad;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100px" ></img></td>
            <td>
                <p>${producto.nombreProducto}</p>
            </td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
            <td>$${costo}</td>
            <td>
                <img id="logo-borrar" src="src/img/remover.png" width="20px" href="#" class="borrar-curso" data-id="${producto.id}"></img>
            </td>
        `; 
        total+=costo;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild( row );

    } );
        const para=document.createElement('totales');
        para.innerHTML=`
            <div class="footer-carrito">
                <b class="total">Total:$${total}</b>
            </div>
            
        `;
        contenedorCarrito.appendChild( para );
    sincronizarStorage();
}

//Limpia los productos de tbody
function limpiarCarritoHTML(){
    while( contenedorCarrito.firstChild ){
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
}

function eliminarProductoCarrito( e ){
    console.log(e.target.classList.contains('borrar-curso'));
    if( e.target.classList.contains('borrar-curso') ){
        const productoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito
        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId );

        //Damos refresh al HTML del carrito
        carritoHTML();
    }
}


function sincronizarStorage(){
    localStorage.setItem( 'carrito', JSON.stringify(articulosCarrito) );
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

//   FACEBOOK SIGN-IN

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  let menu = document.querySelector('#menu-bars');
  menu.onclick = () =>{
    menu.classList.toggle('fa-times');
  }

  document.querySelector('#search-icon').onclick = () =>{
    document.querySelector('#search-form').classList.toggle('active');
  }
  
  document.querySelector('#close').onclick = () =>{
    document.querySelector('#search-form').classList.remove('active');
  }