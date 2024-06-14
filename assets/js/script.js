
//Clase Usuario
class Usuario {
    constructor(
        id,
        nombres, 
        apellidos,
        correo, 
        id_rol,
        username,
        pass,
        fecha_nac,
        calle,
        numeracion,
        comuna

    ) {
        this.id=id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.username = username;
        this.correo = correo;
        this.id_rol = id_rol;
        this.pass = pass;
        this.fecha_nacimiento = fecha_nac;
        this.calle = calle;
        this.numeracion = numeracion;
        this.comuna = comuna;
    }
}

//Clase Usuario
class Producto {
    constructor(
        id,
        nombre, 
        descripcion,
        valor ,
        img
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.valor = valor;
        this.img = img;

    
    }
}


//clase Rol
class Rol {
    constructor(id,descripcion){
        this.id = id;
        this.descripcion = descripcion;
    }
}

//usuarios.push(usuario);
//usuarios.forEach(usuario => { console.log(usuario.username)})

//USUARIOS
var usuarios = [];

let admin = new Usuario(
    1,
    'Pablo', 
    'Garrido Cid',
    'pa.garrido.cid@gmail.com', 
    1,
    'admin',
     'Pass1010!',
    //'123',
    '04-06-1999',
    '',
    '',
    ''
);
let usuario = new Usuario(
    2,
    'Javier', 
    'Gonzalez',
    'j.gonzalez@gmail.com', 
    2,
    'javierito',
    'Javierito123',
    '01-01-2000',
    '',
    '',
    ''
);
let cliente = new Usuario(
    3,
    'Paulina', 
    'Pinto',
    'p.pinto@gmail.com', 
    3,
    'pauli',
    'Pauli123',
    '01-01-2000',
    'El manzano',
    '338',
    'Las Condes'

);

usuarios.push(admin);
usuarios.push(usuario);
usuarios.push(cliente);

//PRODUCTOS

let productos = [];

let iphone_6_case = new Producto(
                1,
                'Iphone 6 Case',
                'phone case" para teléfono iphone',
                "$ 5.000",
                "carcasa_iphone_6.jpg");
let thanos = new Producto(
                2,
                'Thanos',
                'Articulo impreso en 3D con filamento ABS.',
                "$ 9.000",
                "thanos_imp_3d.jpg");
let taladro = new Producto(
                3,
                'Taladro',
                'Taladro percutor uso hogar marca TOTAL. Garantía 6 meses',
                "$ 29.990",
                "taladro.webp");
let soporte = new Producto(
                4,
                'Soporte teléfono',
                'Soporte impreso en 3D con filamento ABS.',
                "$ 7.990",
                "soporte_telefono.jpg");

productos.push(iphone_6_case);
productos.push(thanos);
productos.push(taladro);
productos.push(soporte);

//ROLES
var roles = [];

let rol_adm = new Rol(1,'Administrador');
let rol_usr = new Rol(2,'Usuario');
let rol_cli = new Rol(3,'Cliente');

roles.push(rol_adm);
roles.push(rol_usr);
roles.push(rol_cli);


var usuario_log = new Usuario();



var carrito = [];



/////// SCRIPT JS

$(document).ready(()=>{

    // usuarios.forEach(usuario=>{
    //     console.log(usuario.nombres+' '+usuario.apellidos+' ROL:'+roles.find(rol => rol.id == usuario.id_rol).descripcion);
    // })
    // $('#home').css('display', 'none');
    $('#product').css('display', 'none');
    $('#shoplist').css('display', 'none');
    $('#nav_user').css('display', 'none');
    $('#admin_dropdown').css('display', 'none');


    $("#logout").click(()=>{
        /** ESTO TIENE QUE CAMBIAR */

        // usuario_log = new Usuario();
        mostrar(document.getElementById('home'));
        mostrar_ocultarMenu('none');
        mostrar_ocultarLogin('');
        $("#msje_registrate").empty().text('Registrate como cliente o inicia sesión y podrás obtener acceso a nuestra amplia gama de productos y servicios. ');
        $("#msje_bienvenido").empty().text('Bienvenido a GameStore App');
        $("#admin_dropdown").css('display','none');
        //location.reload();

    })

})

function llenarCarritoDT(productos) {
    const $tableBody = $('#carrito_table tbody');
    $tableBody.empty(); // Limpiar cualquier fila existente

    if(productos.length >0){

        $("#text_carrito").css('display','none');

        productos.forEach(producto => {
        
            let btn = '<button onclick="quitarProductoCarrito('+producto.id+')" class="btn btn-outline-danger">Quitar</button> ';
    
            const $row = $(`
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.valor}</td>
                    <td>${btn}</td>
    
                </tr>
            `);
            $tableBody.append($row);
        });
        return
    }
    $("#text_carrito").css('display','')

    

    // $('#carrito_table').DataTable(); // Inicializar DataTable
}

function eliminarObjPorId(lista, id) {
    return lista.filter(obj => obj.id !== id);
}


function quitarProductoCarrito(id){
    carrito = eliminarObjPorId(carrito,id);
    llenarCarritoDT(carrito);
}

function obtenerProductos(){
    const $prod_list = $('#productos_list');


    $prod_list.empty();

    productos.forEach(producto =>{


        let funcion = 'addToCart(this)';
        let msje = 'Agregar al carrito';

        let clase = 'btn btn-info';

        if(carrito.find(prod => prod.id == producto.id)){
            //el producto existe en carrito y debemos cambiar la funcion
            funcion = "mostrar(document.getElementById('shoplist'))";
            clase = 'btn btn-outline-success';
            msje = 'Ver carrito';
        }

        let btn = '<button id="'+producto.id+'" onclick="'+funcion+'" class="'+clase+'">'+msje+'</button>';

        const $productItem = $(`
                    <div class="product-item">
                        <img src="assets/img/${producto.img}" alt="${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>${producto.descripcion}</p>
                        <p>${producto.valor}</p>
                        ${btn}
                    </div>
                `);
        $prod_list.append($productItem);
    });
}


function obtenerProductosAdm(){
    const $tableBody = $("#productos_adm_table tbody");

    $tableBody.empty(); // Limpiar cualquier fila existente

    if(productos.length >0){

        productos.forEach(producto => {
        
            let btn = '<button onclick="console.log('+producto.id+')" class="btn btn-outline-success">Ver</button> ';
    
            const $row = $(`
                <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.valor}</td>
                    <td>${btn}</td>

    
                </tr>
            `);
            $tableBody.append($row);
        });
        return
    }

}

function obtenerUsuariosAdm(){
    const $tableBody = $("#usuarios_table tbody");

    $tableBody.empty(); // Limpiar cualquier fila existente

    if(usuarios.length >0){

        usuarios.forEach(user => {

            let rol = roles.find(rol => rol.id == user.id_rol)
        
            let btn = '<button onclick="console.log('+user.id+')" class="btn btn-outline-success">Ver</button> ';
    
            const $row = $(`
                <tr>
                    <td>${user.id}</td>
                    <td>${user.nombres} ${user.apellidos}</td>
                    <td>${rol.descripcion}</td>
                    <td>${user.username}</td>
                    <td>${user.correo}</td>
                    <td>${btn}</td>

    
                </tr>
            `);
            $tableBody.append($row);
        });
        return
    }

}


function addToCart(elemento){
    let prod = productos.find(producto => producto.id == elemento.id)
    carrito.push(prod);
    llenarCarritoDT(carrito)
    mostrar(document.getElementById('shoplist'));
}   

function mostrar(element){
    // Mostrar la pantalla de carga
    $('#loading').css('display', 'flex');

    // obtenerProductos();

    // Simular un retardo para la carga (por ejemplo, 1 segundo)
    setTimeout(function() {
        // Ocultar todos los artículos
        $('#home_div').css('display', 'none');
        $('#products_div').css('display', 'none');
        $('#user_form_div').css('display', 'none');
        $('#carrito_div').css('display', 'none');
        $('#login_div').css('display', 'none');
        $('#productos_div').css('display', 'none');
        $('#usuarios_div').css('display', 'none');



        
        // Mostrar el artículo correspondiente
        switch (element.id) {
            case 'home':
                $('#home_div').css('display','block');
                break;
            case 'product':
                $('#products_div').css('display','block');
                obtenerProductos();
                break;
            case 'contact':
                $('#user_form_div').css('display','block');
                break;
            case 'shoplist':
                $('#carrito_div').css('display','block');
                break;
            case 'login':
                $('#login_div').css('display','block');
                break;
            case 'productos':
                $("#productos_div").css('display','block');
                obtenerProductosAdm();
                break;
            case 'usuarios':
                $("#usuarios_div").css('display','block');
                obtenerUsuariosAdm();
                break;
        }

        // Ocultar la pantalla de carga
        $('#loading').css('display', 'none');
    }, 1000); // 1000 milisegundos = 1 segundo


}
function registrarProducto() {


    // Obtener los valores de los campos del formulario
    let nombre = $("#nombre_producto").val().trim();
    let descripcion = $("#descripcion").val().trim();
    let valor = $("#valor").val().trim();
    let img = $("#img_path").val().trim();


    // Realizar las validaciones
    if (nombre === "" || descripcion === "" || valor === "" || img ==="") {
        let msje = !nombre ? 'el nombre':(!descripcion?'la descripcion':(!valor?'el valor':'la imagen'));
        alert("Debe ingresar "+msje+' del producto.');
        return;
    }
  
    let nuevo_producto = new Producto(
        productos.length+1,
        nombre,
        descripcion,
        valor,
        img
    )

    productos.push(nuevo_producto);

    alert("Producto: "+nuevo_producto.nombre+". registrado correctamente.");
    limpiarFormularioProducto();
    mostrar(document.getElementById('productos'));
}


function registrarUsuario(admin) {

    let input ='';
    let most_funct = document.getElementById('login');
    let limp_form = false;

    if(admin==1){
        limp_form =1;
        input = '_input';
        most_funct = document.getElementById('usuarios')
    }

    

    // Obtener los valores de los campos del formulario
    let nombres = $("#nombres"+input).val().trim();
    let apellidos = $("#apellidos"+input).val().trim();
    let username = $("#username"+input).val().trim();
    let email = $("#email"+input).val().trim();
    let password = $("#pass"+input).val().trim();
    let repetirPassword = $("#repet_pass"+input).val().trim();
    let fechaNacimiento = $("#fecha_nacimiento"+input).val().trim();
    let direccion = $("#direccion"+input).val().trim();
    let numeracion = $("#numeracion"+input).val().trim();
    let comuna = $("#comuna"+input).val();

    let rol_id = 3;

    if($("#rol_select").val() != 99){
        rol_id = $("#rol_select").val();
    }

    // Realizar las validaciones
    if (nombres === "" || apellidos === "" || username === "" || email === "" || password === "" || repetirPassword === "" || fechaNacimiento === "") {
        alert("Por favor, completa todos los campos obligatorios.(nombres, apellidos, username, email, contraseña, fecha nacimiento");
        return;
    }

    if (!validateEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    if (password !== repetirPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    if (!validatePassword(password)) {
        alert("La contraseña debe contener al menos un número, una letra mayúscula y tener una longitud entre 6 y 18 caracteres.");
        return;
    }

    // Validación de edad mínima (13 años)
    let fechaNacimientoDate = new Date(fechaNacimiento);
    let hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    let mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
        edad--;
    }
    if (edad < 13) {
        alert("Debes tener al menos 13 años para registrarte.");
        return;
    }

    let nuevo_usuario = new Usuario(
        usuarios.length+1,
        nombres,
        apellidos,
        email,
        rol_id,
        username,
        password,
        fechaNacimiento,
        direccion,
        numeracion,
        comuna        
    )

    usuarios.push(nuevo_usuario);

    alert("Usuario: "+nuevo_usuario.nombres+' '+nuevo_usuario.apellidos+". registrado correctamente.");
    limpiarFormulario(limp_form);
    mostrar(most_funct);
}



function accederUsuario(){
    let username = $('#username_login').val().trim();
    let pass = $('#pass_login').val().trim();

    if(!username || !pass){
        let msje = !username?'un nombre de usuario' : 'una contraseña';
        alert('Error: Falta indicar '+msje+'.');
        return
    }
    /**
     * tenemos que preguntar si el username existe en nuestro array de usuarios.
     */
    let usuario = usuarios.find(usuario => usuario.username == username);

    if(!usuario){
        alert('no se encontro usuario');
        return
    }
        
    if(usuario.pass == pass){
        usuario_log = usuario;
        mostrar_ocultarMenu('');
        mostrar(document.getElementById('home'));
        mostrar_ocultarLogin('none');
        $("#username_login").val('');
        $("#pass_login").val('');

        $("#msje_bienvenido").empty().text('Bienvenid@ '+usuario.nombres+' '+usuario.apellidos+'!')

        let rol = roles.find(rol => rol.id == usuario.id_rol);
        $("#rol_text").empty().text('Eres: '+rol.descripcion);

        if(rol.id == 1|| rol.id == 2){
            $("#admin_dropdown").css('display','');
            $("#usuarios").css('display','');
        }
        
        if(rol.id == 2){
            $("#usuarios").css('display','none');
        }

        let btn_ofertas = $("<button>")
                                .addClass('btn btn-outline-info')
                                .attr('id','btn_mostrar_ofertas')
                                .text('Ver ofertas')
                                // .click("mostrar(document.getElementById('product'))")

        $("#msje_registrate").empty().append('Puedes ver tus ofertas como '+rol.descripcion+': ').append(btn_ofertas);

        $("#btn_mostrar_ofertas").click(()=>{
            mostrar(document.getElementById('product'));
        })

        $("#userDropdown").html(usuario.nombres+' '+usuario.apellidos);

        obtenerProductos();

        return
    }
    alert('Contraseña o nombre de usuario incorrecto!.')


}
function mostrar_ocultarLogin(estilo){
    $('#login').css('display', estilo);
    $('#contact').css('display', estilo);
}
function mostrar_ocultarMenu(estilo){
    $('#product').css('display', estilo);
    $('#shoplist').css('display', estilo);
    $('#nav_user').css('display', estilo);

}

function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Utilizamos una expresión regular para validar la contraseña
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,18}$/;
    return passwordRegex.test(password);
}

function limpiarFormulario(admin) {

    let input = '';

    if(admin==1){
        input = '_input';
    }


    // Limpiar todos los campos del formulario
    $("#nombres"+input).val('');
    $("#apellidos"+input).val('');
    $("#username"+input).val('');
    $("#email"+input).val('');
    $("#pass"+input).val('');
    $("#repet_pass"+input).val('');
    $("#fecha_nacimiento"+input).val('');
    $("#direccion"+input).val('');
    $("#numeracion"+input).val('');
    $("#comuna"+input).val('');
}
function limpiarFormularioProducto() {


    // Limpiar todos los campos del formulario
    $("#nombre_producto").val('');
    $("#descripcion").val('');
    $("#valor").val('');
    $("#img_path").val('');

}






