let usuarios = [];
let indiceActual = 0;

// Cargar usuarios desde el servidor (usuarios.json)
function cargarUsuarios() {
    fetch('/usuarios')
        .then(response => response.json())
        .then(data => {
            usuarios = data;
            mostrarUsuario(indiceActual);
            actualizarTabla();
        })
        .catch(error => console.error('Error al cargar usuarios:', error));
}

// Mostrar usuario en el formulario
function mostrarUsuario(indice) {
    if (usuarios.length > 0) {
        document.getElementById('nombre').value = usuarios[indice].nombre;
        document.getElementById('edad').value = usuarios[indice].edad;
        document.getElementById('ciudad').value = usuarios[indice].ciudad;
    }
}

// Actualizar la tabla de usuarios
function actualizarTabla() {
    const tabla = document.getElementById('tabla-usuarios');
    tabla.innerHTML = '';
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        const celdaNombre = document.createElement('td');
        const celdaEdad = document.createElement('td');
        const celdaCiudad = document.createElement('td');
        celdaNombre.textContent = usuario.nombre;
        celdaEdad.textContent = usuario.edad;
        celdaCiudad.textContent = usuario.ciudad;
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaEdad);
        fila.appendChild(celdaCiudad);
        tabla.appendChild(fila);
    });
}

// Agregar un nuevo usuario
function agregarUsuario() {
    const nuevoUsuario = {
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value,
        ciudad: document.getElementById('ciudad').value
    };

    // Enviar el nuevo usuario al servidor
    fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // Mensaje del servidor
        usuarios.push(nuevoUsuario);  // Actualiza el array local
        actualizarTabla();  // Actualiza la tabla
        limpiarFormulario();  // Limpia el formulario
    })
    .catch(error => console.error('Error al agregar usuario:', error));
}

// Limpiar el formulario
function limpiarFormulario() {
    document.getElementById('form-usuario').reset();
}

// Navegar entre usuarios
function anteriorUsuario() {
    if (indiceActual > 0) {
        indiceActual--;
        mostrarUsuario(indiceActual);
    }
}

function siguienteUsuario() {
    if (indiceActual < usuarios.length - 1) {
        indiceActual++;
        mostrarUsuario(indiceActual);
    }
}

// Cargar los usuarios al cargar la página
window.onload = cargarUsuarios;
