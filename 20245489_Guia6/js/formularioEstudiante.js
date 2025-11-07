const inputCarnet = document.getElementById("idCarnet");
const inputNombreCompleto = document.getElementById("idTxtNombreCompleto");
const inputNumeroDui = document.getElementById("idNumeroDui");
const inputNumeroNit = document.getElementById("idNumeroNit");
const inputFechaNacimiento = document.getElementById("idFechaNacimiento");
const inputCorreoElectronico = document.getElementById("idCorreoElectronico");
const inputEdad = document.getElementById("idEdad");


//Botones
const buttonAgregarEstudiante = document.getElementById("idBtnAgregar");
const buttonLimpiarEstudiante = document.getElementById("idBtnLimpiar");
const buttonMostrarEstudiante = document.getElementById("idBtnMostrar");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");


let arrayEstudiante = [];

const limpiarForm = () => {
    inputCarnet.value = "";
    inputNombreCompleto.value = "";
    inputNumeroDui.value = "";
    inputNumeroNit.value = "";
    inputFechaNacimiento.value = "";
    inputCorreoElectronico.value = "";
    inputEdad.value = 0;

    inputNombreCompleto.focus();
};

//Función para agregar estudiante
const addEstudiante = function () {
    let carnet = inputCarnet.value;
    let nombreCompleto = inputNombreCompleto.value;
    let numeroDui = inputNumeroDui.value;
    let numeroNit = inputNumeroNit.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let correoElectronico = inputCorreoElectronico.value;
    let edad = inputEdad.value;

    if
        (
        validarCarnet() &&
        validarNombreCompleto() &&
        validarNumeroDui() &&
        validarNumeroNit() &&
        validarCorreo() &&
        validarEdad()
    ) {
        arrayEstudiante.push(
            new Array(carnet, nombreCompleto, numeroDui, numeroNit, fechaNacimiento, correoElectronico, edad)
        )
        mensaje.innerHTML = "Se ha registrado un nuevo estudiante";
        //Llamando al componente de Bootstrap
        toast.show();

        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";

        toast.show();
        alert("Error en la validación de los campos");
    }
}

function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayEstudiante.forEach((element) => {
        $fila += `  <tr>
                        <td scope = "row" class="text-center fw-bold">${contador}</td >
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td>${element[2]}</td>
                        <td>${element[3]}</td>
                        <td>${element[4]}</td>
                        <td>${element[5]}</td>
                        <td>${element[6]}</td>
                        
                    </tr>`;
        contador++;
    });
    return $fila;
};

const imprimirEstudiantes = () => {
    let $table = `  <div class="table-responsive" >
                        <table class="table table-striped table-hover table-bordered">
                            <tr>
                                <th scope="col" class="text-center" style="width:5%">#</th>
                                <th scope="col" class="text-center" style="width:15%">Carnet</th>
                                <th scope="col" class="text-center" style="width:15%">Nombre Completo</th>
                                <th scope="col" class="text-center" style="width:10%">Número de DUI</th>
                                <th scope="col" class="text-center" style="width:10%">Número de NIT</th>
                                <th scope="col" class="text-center" style="width:10%">Fecha Nacimiento</th>
                                <th scope="col" class="text-center" style="width:25%">Correo Electrónico</th>
                                <th scope="col" class="text-center" style="width:10%">Edad</th>
                            </tr>
                            ${imprimirFilas()}
                        </table>
                    </div>`;

    document.getElementById("idTablaEstudiantes").innerHTML = $table;
};
//Funciones de validación
function validarCarnet() {
    let carnet = inputCarnet.value;
    const regex = /^[A-Z]{2}[0-9]{3}$/;
    return regex.test(carnet);
};

function validarNombreCompleto() {
    let nombreCompleto = inputNombreCompleto.value;
    const regex = /^[a-zA-Z\s]*$/;

    return regex.test(nombreCompleto);
};

function validarNumeroDui() {
    let numeroDui = inputNumeroDui.value;
    const regex = /^\d{8}-\d{1}$/;
    return regex.test(numeroDui);
};

function validarNumeroNit() {
    let numeroNit = inputNumeroNit.value;
    const regex = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
    return regex.test(numeroNit);
}

function validarCorreo() {
    let correo = inputCorreoElectronico.value;

    const regrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regrex.test(correo);
};

function validarEdad() {
    let edad = inputEdad.value;
    const regex = /^(1[8-9]|[2-2][0-9])$/;
    return regex.test(edad);
}

//Botones de la página

buttonLimpiarEstudiante.onclick = () => {
    limpiarForm();
};

buttonAgregarEstudiante.onclick = () => {
    addEstudiante();
};

buttonMostrarEstudiante.onclick = () => {
    imprimirEstudiantes();
};

limpiarForm();