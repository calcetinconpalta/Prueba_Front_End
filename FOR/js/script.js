const arrayHobbies = [];

// Helpers de caracteres

function esLetra(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function esDigito(c) {
    return c >= '0' && c <= '9';
}

function esLetraODigito(c) {
    return esLetra(c) || esDigito(c);
}

//  Mensajes de error

function mostrarError(id, msg) {
    document.getElementById(id).innerText = msg;
}

function limpiarError(id) {
    document.getElementById(id).innerText = "";
}

// Hobbies 

function agregar() {
    const input = document.getElementById("hobby");
    const hobby = input.value.trim();
    if (hobby !== "") {
        arrayHobbies.push(hobby);
        actualizarLista();
        input.value = "";
        limpiarError("hobby-msg");
    }
}

function actualizarLista() {
    const ul = document.getElementById("hobby-list");
    ul.innerHTML = "";
    for (let i = 0; i < arrayHobbies.length; i++) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerText = arrayHobbies[i];
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-sm btn-outline-danger";
        btn.innerText = "✕";
        btn.onclick = () => eliminarHobby(i);
        li.appendChild(btn);
        ul.appendChild(li);
    }
}

function eliminarHobby(index) {
    arrayHobbies.splice(index, 1);
    actualizarLista();
}

function limpiar() {
    arrayHobbies.length = 0;
    actualizarLista();
    const campos = ["username", "password", "re-password", "direccion", "comuna", "telefono", "url", "hobby"];
    campos.forEach(id => limpiarError(id + "-msg"));
    const resumen = document.getElementById("resumen-usuario");
    if (resumen) resumen.style.display = "none";
}

// Validaciones 

function validarUsername() {
    const val = document.getElementById("username").value;

    if (val === "") {
        mostrarError("username-msg", "El nombre de usuario es obligatorio.");
        return false;
    }
    if (val.length < 5 || val.length > 10) {
        mostrarError("username-msg", "Debe tener entre 5 y 10 caracteres.");
        return false;
    }
    if (!esLetra(val[0])) {
        mostrarError("username-msg", "Debe comenzar con una letra.");
        return false;
    }
    // Solo letras y dígitos (sin acentos ni símbolos)
    for (let i = 0; i < val.length; i++) {
        if (!esLetraODigito(val[i])) {
            mostrarError("username-msg", "No puede tener caracteres especiales ni acentos.");
            return false;
        }
    }
    // Los dígitos solo pueden aparecer al final
    let encontroDigito = false;
    for (let i = 0; i < val.length; i++) {
        if (esDigito(val[i])) {
            encontroDigito = true;
        } else if (encontroDigito) {
            mostrarError("username-msg", "Los dígitos solo pueden aparecer al final.");
            return false;
        }
    }

    limpiarError("username-msg");
    return true;
}

function validarPassword() {
    const username = document.getElementById("username").value.toLowerCase();
    const pass = document.getElementById("password").value;

    if (pass === "") {
        mostrarError("password-msg", "La contraseña es obligatoria.");
        return false;
    }
    if (pass.length < 3 || pass.length > 6) {
        mostrarError("password-msg", "Debe tener entre 3 y 6 caracteres.");
        return false;
    }

    let tieneLetra = false;
    let tieneDigito = false;
    for (let i = 0; i < pass.length; i++) {
        if (esLetra(pass[i])) tieneLetra = true;
        if (esDigito(pass[i])) tieneDigito = true;
    }
    if (!tieneLetra) {
        mostrarError("password-msg", "Debe contener al menos una letra.");
        return false;
    }
    if (!tieneDigito) {
        mostrarError("password-msg", "Debe contener al menos un dígito.");
        return false;
    }
    if (username !== "" && pass.toLowerCase().indexOf(username) !== -1) {
        mostrarError("password-msg", "No puede contener el nombre de usuario.");
        return false;
    }

    limpiarError("password-msg");
    return true;
}

function validarRePassword() {
    const pass = document.getElementById("password").value;
    const rePass = document.getElementById("re-password").value;

    if (rePass === "") {
        mostrarError("re-password-msg", "Debe confirmar la contraseña.");
        return false;
    }
    if (rePass !== pass) {
        mostrarError("re-password-msg", "Las contraseñas no coinciden.");
        return false;
    }

    limpiarError("re-password-msg");
    return true;
}

function validarDireccion() {
    const val = document.getElementById("direccion").value.trim();

    if (val === "") {
        mostrarError("direccion-msg", "La dirección es obligatoria.");
        return false;
    }

    limpiarError("direccion-msg");
    return true;
}

function validarComuna() {
    const val = document.getElementById("comuna").value;

    if (val === "") {
        mostrarError("comuna-msg", "Debe seleccionar una comuna.");
        return false;
    }

    limpiarError("comuna-msg");
    return true;
}

// Bloquea la tecla si ya hay 9 dígitos ingresados y se intenta agregar otro dígito
document.addEventListener("DOMContentLoaded", function () {
    const campoTel = document.getElementById("telefono");
    if (campoTel) {
        campoTel.addEventListener("keydown", function (e) {
            const soloDigitos = this.value.replace(/\D/g, "");
            // Si ya hay 9 dígitos y la tecla presionada es un dígito numérico, bloquear
            if (soloDigitos.length >= 9 && e.key >= "0" && e.key <= "9") {
                e.preventDefault();
            }
        });
    }
});

function validarTelefono() {
    const val = document.getElementById("telefono").value.trim();

    if (val === "") {
        mostrarError("telefono-msg", "El número de teléfono es obligatorio.");
        return false;
    }

    // Solo se permiten dígitos, +, espacios y guiones
    for (let i = 0; i < val.length; i++) {
        const c = val[i];
        if (!esDigito(c) && c !== '+' && c !== ' ' && c !== '-') {
            mostrarError("telefono-msg", "Solo se permiten dígitos, +, espacios y guiones.");
            return false;
        }
    }

    // Contar solo los dígitos — deben ser exactamente 9 (formato chileno local)
    let soloDigitos = "";
    for (let i = 0; i < val.length; i++) {
        if (esDigito(val[i])) soloDigitos += val[i];
    }
    if (soloDigitos.length !== 9) {
        mostrarError("telefono-msg", "Debe ingresar exactamente 9 dígitos. Ejemplo: 9 1234 5678");
        return false;
    }

    limpiarError("telefono-msg");
    return true;
}

function validarURL() {
    const val = document.getElementById("url").value.trim();

    if (val === "") {
        limpiarError("url-msg");
        return true;
    }

    const tieneHttp  = val.indexOf("http://")  === 0;
    const tieneHttps = val.indexOf("https://") === 0;
    if (!tieneHttp && !tieneHttps) {
        mostrarError("url-msg", "Debe comenzar con http:// o https://");
        return false;
    }

    const inicio = val.indexOf("://") + 3;
    const resto  = val.substring(inicio);

    if (resto.length < 4) {
        mostrarError("url-msg", "Ingrese una URL válida. Ejemplo: https://mi-sitio.cl");
        return false;
    }

    const puntoPosicion = resto.indexOf(".");
    if (puntoPosicion === -1 || puntoPosicion === 0 || puntoPosicion === resto.length - 1) {
        mostrarError("url-msg", "Ingrese una URL válida. Ejemplo: https://mi-sitio.cl");
        return false;
    }

    const antePunto = resto.substring(0, puntoPosicion);
    const despuesPunto = resto.substring(puntoPosicion + 1);
    if (antePunto.length === 0 || despuesPunto.length < 2) {
        mostrarError("url-msg", "Ingrese una URL válida. Ejemplo: https://mi-sitio.cl");
        return false;
    }

    for (let i = 0; i < antePunto.length; i++) {
        const c = antePunto[i];
        if (!esLetraODigito(c) && c !== '-' && c !== '_') {
            mostrarError("url-msg", "El dominio contiene caracteres inválidos.");
            return false;
        }
    }

    // La URL debe terminar en .cl (ignorando barra final opcional)
    const sinBarra = val.replace(/\/$/, "");
    const ultimoPunto = sinBarra.lastIndexOf(".");
    const extension = sinBarra.substring(ultimoPunto + 1).toLowerCase();
    if (extension !== "cl") {
        mostrarError("url-msg", "La URL debe ser de dominio chileno (.cl). Ejemplo: https://mi-sitio.cl");
        return false;
    }

    limpiarError("url-msg");
    return true;
}

function validarHobbies() {
    if (arrayHobbies.length < 2) {
        mostrarError("hobby-msg", "Debe agregar al menos 2 aficiones.");
        return false;
    }
    limpiarError("hobby-msg");
    return true;
}

function construirUsuario() {
    return {
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value,
        direccion: document.getElementById("direccion").value.trim(),
        comuna: document.getElementById("comuna").value,
        telefono: document.getElementById("telefono").value.trim(),
        url: document.getElementById("url").value.trim(),
        hobbies: arrayHobbies.slice()
    };
}

function mostrarResumen(usuario) {
    const resumen = document.getElementById("resumen-usuario");
    if (!resumen) return;
    resumen.innerHTML = "";
    resumen.style.display = "block";

    const campos = [
        ["Usuario", usuario.username],
        ["Dirección", usuario.direccion],
        ["Comuna", usuario.comuna],
        ["Teléfono", usuario.telefono],
        ["Página web", usuario.url || "—"],
        ["Aficiones", usuario.hobbies.join(", ")]
    ];
    for (let i = 0; i < campos.length; i++) {
        const fila = document.createElement("div");
        fila.className = "d-flex gap-2";
        const etiqueta = document.createElement("span");
        etiqueta.className = "fw-bold text-purple";
        etiqueta.style.minWidth = "100px";
        etiqueta.innerText = campos[i][0] + ":";
        const valor = document.createElement("span");
        valor.innerText = campos[i][1];
        fila.appendChild(etiqueta);
        fila.appendChild(valor);
        resumen.appendChild(fila);
    }
}

// Validación principal 

function validar() {
    const u   = validarUsername();
    const p   = validarPassword();
    const rp  = validarRePassword();
    const d   = validarDireccion();
    const c   = validarComuna();
    const t   = validarTelefono();
    const url = validarURL();
    const h   = validarHobbies();

    if (u && p && rp && d && c && t && url && h) {
        const usuario = construirUsuario();
        mostrarResumen(usuario);
        return false;
    }
    return false;
}
