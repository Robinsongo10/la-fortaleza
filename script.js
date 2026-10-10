// ================================
// CONFIGURACIÓN DE LA FECHA
// ================================

// La fecha mínima seleccionable es la fecha actual
const campoFecha = document.getElementById("fecha");

const fechaActual = new Date();
const año = fechaActual.getFullYear();
const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
const dia = String(fechaActual.getDate()).padStart(2, "0");

campoFecha.min = año + "-" + mes + "-" + dia;
// ================================
// FORMULARIO DE RESERVA
// ================================
const formReserva = document.getElementById("formReserva");

formReserva.addEventListener("submit", function(event) {

    event.preventDefault();
    // Validamos los datos antes de enviar la reserva 
    const nombre = document.getElementById("nombre").value.trim();
    if (nombre === "") {
    alert("Por favor, escribe tu nombre.");
    return;
}
    const fecha = document.getElementById("fecha").value;
    if (fecha === "") {
    alert("Por favor, selecciona una fecha.");
    return;
}
    const personas = document.getElementById("personas").value;
  // Validar que el número de personas sea al menos 1
    const cantidadPersonas = Number(personas);
// Validar que el número de personas no sea mayor a 10
    if (cantidadPersonas < 1) {
    alert("El número de personas debe ser al menos 1.");
    return;
}

if (cantidadPersonas > 10) {
    alert("La reserva permite máximo 10 personas.");
    return;
}
    const cabalgata = document.getElementById("tipoCabalgata").value;
    if (cabalgata === "") {
    alert("Por favor, selecciona una cabalgata.");
    return;
}
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();

hoy.setHours(0, 0, 0, 0);

if (fechaSeleccionada < hoy) {
    alert("Por favor, selecciona una fecha válida.");
    return;
}
// ================================
// ENVÍO DE LA RESERVA POR WHATSAPP
// ================================
    const numero = "573001547544";
// Crear el mensaje de WhatsApp con los datos del formulario quien recibe el mensaje es el número de teléfono que se encuentra en la variable numero
    const mensaje =
    "🐎 RESERVA DE CABALGATA%0A%0A" +
    "Nombre: " + nombre + "%0A" +
    "Fecha: " + fecha + "%0A" +
    "Personas: " + personas + "%0A" +
    "Cabalgata: " + cabalgata + "%0A%0A" +
    "¡Hola! Quiero confirmar esta reserva.";
// le muestra al usuario un mensaje de confirmación con los datos ingresados antes de redirigirlo a WhatsApp
   const confirmar = confirm(
    "Revisa tu reserva:\n\n" +
    "Nombre: " + nombre + "\n" +
    "Fecha: " + fecha + "\n" +
    "Personas: " + personas + "\n" +
    "Cabalgata: " + cabalgata + "\n\n" +
    "¿Quieres continuar con WhatsApp?"
);

if (!confirmar) {
    return;
}

const url = "https://wa.me/" + numero + "?text=" + mensaje;

window.location.href = url;

});
// ================================
// BOTONES DE RESERVA DE LAS TARJETAS
// ================================
const botonesReserva = document.querySelectorAll(".btnReserva");

botonesReserva.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const cabalgataSeleccionada = boton.dataset.cabalgata;

        const selectorCabalgata = document.getElementById("tipoCabalgata");

        selectorCabalgata.value = cabalgataSeleccionada;
        selectorCabalgata.classList.add("resaltado");
        setTimeout(function() {
    selectorCabalgata.classList.remove("resaltado");
}, 2000);

        document.getElementById("contacto").scrollIntoView({
            behavior: "smooth"
        });

    });

});
// ================================
// MENÚ HAMBURGUESA
// ================================
const menuToggle = document.getElementById("menuToggle");
const menuNav = document.getElementById("menuNav");

// Esta es la orden que muestra u oculta el menú al tocar las 3 rayitas
menuToggle.addEventListener("click", function() {
    menuNav.classList.toggle("activa");
});

// Esta orden cierra el menú automáticamente cuando el usuario elige una opción
const enlacesMenu = document.querySelectorAll("nav a");
enlacesMenu.forEach(function(enlace) {
    enlace.addEventListener("click", function() {
        if (window.innerWidth <= 768) {
            menuNav.classList.remove("activa");
        }
    });
});
// ================================
// AMPLIACIÓN DE FOTOS EN LA GALERÍA
// ================================
const modal = document.getElementById("modalGaleria");
const imgModal = document.getElementById("imgModal");
const cerrarModal = document.getElementById("cerrarModal");
const imagenesGaleria = document.querySelectorAll(".fotos img");

// Abrir foto al hacer clic
imagenesGaleria.forEach(function(imagen) {
    imagen.addEventListener("click", function() {
        modal.style.display = "flex";
        imgModal.src = this.src;
    });
});

// Cerrar foto al tocar la "X"
cerrarModal.addEventListener("click", function() {
    modal.style.display = "none";
});

// Cerrar foto al tocar la parte negra del fondo
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
/* ================================ */
/* CARRUSEL AUTOMÁTICO DE PORTADA   */
/* ================================ */
const diapositivas = document.querySelectorAll(".diapositiva");
let indiceActual = 0;

function cambiarDiapositiva() {
    // 1. Quitar la clase 'activa' a la foto actual para ocultarla
    diapositivas[indiceActual].classList.remove("activa");
    
    // 2. Calcular el número de la siguiente foto
    indiceActual = (indiceActual + 1) % diapositivas.length;
    
    // 3. Poner la clase 'activa' a la nueva foto para mostrarla
    diapositivas[indiceActual].classList.add("activa");
}

// Ejecutar la función cada 4000 milisegundos (4 segundos)
setInterval(cambiarDiapositiva, 4000);