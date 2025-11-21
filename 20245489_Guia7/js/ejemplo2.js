// OBTENIENDO EL FORMULARIO
const formulario = document.forms["frmRegistro"];

// OBTENIENDO LA REFERENCIA DEL BOTON Y DEL MODAL
const button = document.forms["frmRegistro"].elements["btnRegistro"]
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const bodyModal = document.getElementById("idBodyModal");

// DEFINICION DE FUNCIONES
const recorrerFormulario = function () {
    // OBTENIENDO EL FORMULARIO


    // INICIALIZANDO CONTADORES
    let totText = 0;
    let totPass = 0;
    let totEmail = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totFile = 0;
    let totDate = 0;
    let totSelect = 0;

    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    // RECORRIENDO CADA ELEMENTO DEL FORMULARIO
    for (let index = 0; index < elementos.length; index++) {
        const elemento = elementos[index];
        const tipoElemento = elemento.type;
        const tipoNode = elemento.nodeName;

        // Contabilizando el total de INPUT TYPE = TEXT
        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        }
        // Contabilizando el total de INPUT TYPE = PASSWORD
        else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        }
        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        }
        // Contabilizando el total de INPUT TYPE = RADIO
        else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        }
        // Contabilizando el total de INPUT TYPE = FILE
        else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        }
        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado =
        `Total de input[type="text"] = ${totText}<br>
  Total de input[type="password"] = ${totPass}<br>
  Total de input[type="radio"] = ${totRadio}<br>
  Total de input[type="checkbox"] = ${totCheck}<br>
  Total de input[type="date"] = ${totDate}<br>
  Total de input[type="email"] = ${totEmail}<br>
  Total de select = ${totSelect}<br>`;

    bodyModal.innerHTML = resultado;
    //Function que permite mostrar el modal de Bootstrap
    //Esta funcion es definida por Bootstrap
    modal.show();
};

// agregando eventos al boton
button.onclick = () => {
    validarFormulario();
};

//Validar la información del formulario
const validarFormulario = function () {
    let errores = [];

    // Validar campos no vacíos
    const nombre = document.getElementById("idNombre").value.trim();
    const apellido = document.getElementById("idApellidos").value.trim();
    const fechaNacimiento = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value.trim();
    const password = document.getElementById("idPassword").value;
    const passwordRepetir = document.getElementById("idPasswordRepetir").value;

    if (!nombre) {
        errores.push("El campo Nombres no puede estar vacío");
    }

    if (!apellido) {
        errores.push("El campo Apellidos no puede estar vacío");
    }

    if (!fechaNacimiento) {
        errores.push("El campo Fecha de nacimiento no puede estar vacío");
    }

    if (!correo) {
        errores.push("El campo Correo electrónico no puede estar vacío");
    }

    if (!password) {
        errores.push("El campo Contraseña no puede estar vacío");
    }

    if (!passwordRepetir) {
        errores.push("El campo Repetir Contraseña no puede estar vacío");
    }

    // Validar que la fecha de nacimiento no supere la fecha actual
    if (fechaNacimiento) {
        const fechaNac = new Date(fechaNacimiento);
        const fechaActual = new Date();
        if (fechaNac > fechaActual) {
            errores.push("La fecha de nacimiento no puede ser mayor a la fecha actual");
        }
    }

    // Validar email con expresión regular
    if (correo) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(correo)) {
            errores.push("El formato del correo electrónico no es válido");
        }
    }

    //Validar que las contraseñas sean iguales
    if (password && passwordRepetir) {
        if (password !== passwordRepetir) {
            errores.push("Las contraseñas no coinciden");
        }
    }

    // Verificar que esté seleccionada al menos una opción para "algunos intereses"
    const intereses = [
        document.getElementById("idCkProgramacion"),
        document.getElementById("idCkBD"),
        document.getElementById("idCkRedes"),
        document.getElementById("idCkSeguridad")
    ];

    const algunInteresSeleccionado = intereses.some(interes => interes.checked);
    if (!algunInteresSeleccionado) {
        errores.push("Debe seleccionar al menos un interés");
    }

    // Verificar que el usuario seleccione una carrera
    const carreras = [
        document.getElementById("idRdIng"),
        document.getElementById("idRdLic"),
        document.getElementById("idRdTec"),
        document.getElementById("idRdOtro")
    ];

    const algunaCarreraSeleccionada = carreras.some(carrera => carrera.checked);
    if (!algunaCarreraSeleccionada) {
        errores.push("Debe seleccionar una carrera");
    }

    // Verificar que sea seleccionado un país de origen
    const pais = document.getElementById("idCmPais");
    if (pais.selectedIndex === 0) {
        errores.push("Debe seleccionar un país de origen");
    }

    if (errores.length > 0) {
        alert("Errores encontrados:\n\n" + errores.join("\n"));
        return false;
    } else {
        // Si no hay errores, mostrar resultados en tabla
        mostrarResultados();
        return true;
    }
};

// Función que mostrará los resultados en la tabla con modal bootstrap
const mostrarResultados = function () {
    // Crear modal
    let modalResultadoElement = document.getElementById("idModalResultado");
    if (!modalResultadoElement) {
        modalResultadoElement = document.createElement("div");
        modalResultadoElement.setAttribute("id", "idModalResultado");
        modalResultadoElement.setAttribute("class", "modal fade");
        modalResultadoElement.setAttribute("tabindex", "-1");
        modalResultadoElement.setAttribute("aria-labelledby", "modalResultadoLabel");
        modalResultadoElement.setAttribute("aria-hidden", "true");

        const modalDialog = document.createElement("div");
        modalDialog.setAttribute("class", "modal-dialog modal-lg");

        const modalContent = document.createElement("div");
        modalContent.setAttribute("class", "modal-content");

        // Header del modal
        const modalHeader = document.createElement("div");
        modalHeader.setAttribute("class", "modal-header");

        const modalTitle = document.createElement("h5");
        modalTitle.setAttribute("class", "modal-title");
        modalTitle.setAttribute("id", "modalResultadoLabel");
        modalTitle.textContent = "Datos del Formulario";

        const closeButton = document.createElement("button");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("class", "btn-close");
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        // Body del modal
        const modalBody = document.createElement("div");
        modalBody.setAttribute("class", "modal-body");
        modalBody.setAttribute("id", "idModalResultBody");

        // Footer del modal
        const modalFooter = document.createElement("div");
        modalFooter.setAttribute("class", "modal-footer");

        const closeFooterButton = document.createElement("button");
        closeFooterButton.setAttribute("type", "button");
        closeFooterButton.setAttribute("class", "btn btn-secondary");
        closeFooterButton.setAttribute("data-bs-dismiss", "modal");
        closeFooterButton.textContent = "Cerrar";

        modalFooter.appendChild(closeFooterButton);

        // Ensamblar modal
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modalResultadoElement.appendChild(modalDialog);

        document.body.appendChild(modalResultadoElement);

        // Crear nueva instancia del modal
        modalResultado = new bootstrap.Modal(modalResultadoElement, {});
    }

    const modalBody = document.getElementById("idModalResultBody");

    // Limpiar contenido previo del modal
    while (modalBody.firstChild) {
        modalBody.removeChild(modalBody.firstChild);
    }

    // Crear tabla usando DOM
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped");

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    const thCampo = document.createElement("th");
    thCampo.textContent = "Campo";

    const thValor = document.createElement("th");
    thValor.textContent = "Valor";

    trHead.appendChild(thCampo);
    trHead.appendChild(thValor);
    thead.appendChild(trHead);
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    // Función auxiliar para agregar filas a la tabla
    const agregarFila = (campo, valor) => {
        const tr = document.createElement("tr");

        const tdCampo = document.createElement("td");
        tdCampo.textContent = campo;

        const tdValor = document.createElement("td");
        tdValor.textContent = valor;

        tr.appendChild(tdCampo);
        tr.appendChild(tdValor);
        tbody.appendChild(tr);
    };

    // Recopilar datos del formulario
    const nombre = document.getElementById("idNombre").value;
    const apellido = document.getElementById("idApellidos").value;
    const fechaNacimiento = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value;

    // Obtener intereses seleccionados
    const interesesSeleccionados = [];
    if (document.getElementById("idCkProgramacion").checked) interesesSeleccionados.push("Programación");
    if (document.getElementById("idCkBD").checked) interesesSeleccionados.push("Base de Datos");
    if (document.getElementById("idCkRedes").checked) interesesSeleccionados.push("Inteligencia artificial");
    if (document.getElementById("idCkSeguridad").checked) interesesSeleccionados.push("Seguridad informática");

    // Obtener carrera seleccionada
    let carreraTexto = "";
    if (document.getElementById("idRdIng").checked) carreraTexto = "Ingeniería de Software y Negocios Digitales";
    else if (document.getElementById("idRdLic").checked) carreraTexto = "Licenciatura en Economía y Negocios";
    else if (document.getElementById("idRdTec").checked) carreraTexto = "Ingeniería de Negocios";
    else if (document.getElementById("idRdOtro").checked) carreraTexto = "Otra";

    // Obtener país seleccionado
    const pais = document.getElementById("idCmPais");
    const paisTexto = pais.options[pais.selectedIndex].text;

    const avatar = document.getElementById("idArchivo");
    const archivoAvatar = avatar.files.length > 0 ? avatar.files[0].name : "No se seleccionó archivo";

    // Agregar filas a la tabla
    agregarFila("Nombres", nombre);
    agregarFila("Apellidos", apellido);
    agregarFila("Fecha de Nacimiento", fechaNacimiento);
    agregarFila("Correo Electrónico", correo);
    agregarFila("Intereses", interesesSeleccionados.join(", "));
    agregarFila("Carrera", carreraTexto);
    agregarFila("País de Origen", paisTexto);
    agregarFila("Archivo Avatar", archivoAvatar);

    tabla.appendChild(tbody);
    modalBody.appendChild(tabla);

    // Mostrar modal de resultados
    modalResultado.show();
};