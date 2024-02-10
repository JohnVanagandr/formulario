const formulario = document.getElementById('formulario')
const btnEnviar = document.getElementById('btn-enviar');

const ficha = document.getElementById('ficha')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const correo = document.getElementById('correo')
const telefono = document.getElementById('telefono')
const ciudad = document.getElementById('ciudad')
//const generos = document.querySelectorAll('input[name="genero"]')
const generos = document.getElementsByName('genero')
const habilidades = document.getElementsByName('habilidad[]')

const validarCorreo = correo => {
    // Validamos que el campo tenga solo un @  y un punto
    // el @ no puede ser el primer caracter del correo 
    // y el punto debe ir posicionando al menos un carácter después de la @
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
}

const soloLetras = (e) => {
    //console.log(e)
    const key = e.keyCode || e.which;
    const tecla = String.fromCharCode(key).toLowerCase();
    const letras = "áéíóúabcdefghijklmnñopqrstuvwxyz";
    const especiales = ['8', '32', '37', '39', '46'];
    let tecla_especial = false
    
    for (const i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        e.preventDefault()
    }
}

const soloNumeros = (e) => {
    //console.log(e)
    // validamos que el keyCode corresponda a las teclas de los números
    if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode) {
        e.preventDefault()
    }
}

const enviarFormulario = formulario => {
    //console.log(formulario)
    formulario.submit()
}

const validacion = (e) => {
    e.preventDefault()

    let seleccionHabilidad = 0
    for (const habilidad of habilidades) {
        if (habilidad.checked) {
            seleccionHabilidad++
        }
    }

    let seleccionGenero = ''
    for (const genero of generos) {
        if (genero.checked) {
            seleccionGenero = genero.value
            break
        }
    }

    if (ficha.value === "") {
        alert('Por favor, escribe el número de la ficha')
        ficha.focus()
        return false
    }

    if (nombre.value === "") {
        alert('Por favor, escribe tu nombre')
        nombre.focus()
        return false
    }

    if (apellido.value === "") {
        alert('Por favor, escribe tus apellidos')
        apellido.focus()
        return false
    }

    if (!validarCorreo(correo.value)) {
        alert("Por favor, escribe un correo electrónico válido");
        correo.focus();
        return false;
    }

    if (telefono.value == "") {
        alert('Por favor, escribe tu telefono')
        telefono.focus()
        return false
    }

    if (seleccionGenero === "") {
        alert('Por favor, seleccione un genero')
        return false
    }

    if (ciudad.selectedIndex == null || ciudad.selectedIndex == 0) {
        alert('Por favor, seleccione una ciudad')
        return false
    }

    if (seleccionHabilidad < 3) {
        alert('Por favor, seleccione como minimo 3 habilidades')
        return false
    }

    enviarFormulario(formulario)

}

//Eventos del formulario

//Evento para validar cuando una persona presiona una tecla sea solo numeros
nombre.addEventListener('keypress', soloLetras)
apellido.addEventListener('keypress', soloLetras)

//Evento para validar cuando una persona presiona una tecla sea solo las teclas de numero
telefono.addEventListener('keypress', soloNumeros)

//Evento para validar el vento click del boton del formulario
btnEnviar.addEventListener('click', validacion)