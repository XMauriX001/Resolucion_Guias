//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];

document.getElementById("idTablaPacientes").addEventListener("click", (e) => {
    if (e.target.closest("button")) {
        const button = e.target.closest("button");
        const buttonId = button.id;
        const index = parseInt(buttonId.replace(/[^0-9]/g, "")) - 1;

        if (buttonId.startsWith("idBtnEliminar")) {
            // Eliminar paciente
            arrayPaciente.splice(index, 1);
            imprimirPacientes();
        } else if (buttonId.startsWith("idBtnEditar")) {
            // Editar paciente
            editarPaciente(index);
        }
    }
});

/*
Creando una función para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
};

/*
 function para validar el ingreso del paciente
*/

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
                ? "Mujer"
                : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        //Agregando información al arreglo paciente
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        //Llamando al componente de Bootstrap
        toast.show();


        //Limpiando formulario
        limpiarForm();
    } else {
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        $fila += `  <tr>
                        <td scope = "row" class="text-center fw-bold">${contador}</td >
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td>${element[2]}</td>
                        <td>${element[3]}</td>
                        <td>${element[4]}</td>
                        <td>${element[5]}</td>
                        <td>
                            <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" alt="Eliminar">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" alt="Editar">
                                <i class="bi bi-trash-fill"></i>
                            </button>                            
                        </td>
                    </tr>`;
        contador++;
    });
    return $fila;
};

const imprimirPacientes = () => {
    let $table = `  <div class="table-responsive" >
                        <table class="table table-striped table-hover table-bordered">
                            <tr>
                                <th scope="col" class="text-center" style="width:5%">#</th>
                                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                                <th scope="col" class="text-center" style="width:10%">Pais</th>
                                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                                <th scope="col" class="text-center" style="width:10%">Opciones</th>
                            </tr>
                            ${imprimirFilas()}
                        </table>
                    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
};



// Contador global de los option correspondiente
// al select (cmb) país
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Pais agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

//Función para editar paciente
const editarPaciente = (index) => {
    let paciente = arrayPaciente[index];

    //Cargando datos en el formulario
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    if (paciente[3] == "Hombre") {
        inputRdMasculino.checked = true;
    } else if (paciente[3] == "Mujer") {
        inputRdFemenino.checked = true;
    }
    // Buscando el value del país en el select
    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text == paciente[4]) {
            cmbPais.selectedIndex = i;
            break;
        }
    }
    inputDireccion.value = paciente[5];

    arrayPaciente.splice(index, 1);
}

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre país del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar función al momento de cargar la pagina HTML
limpiarForm();