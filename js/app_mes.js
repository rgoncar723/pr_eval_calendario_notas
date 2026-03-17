
const CLAVE_STORAGE = "calendario_notas";
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const params = new URLSearchParams(window.location.search);
const mesActualIdx = params.get("mes") !== null ? Number(params.get("mes")) : null;


if (mesActualIdx === null || isNaN(mesActualIdx)) {
    window.location.href = "index.html";
}


function obtenerNotas() {
    const raw = localStorage.getItem(CLAVE_STORAGE);
    try {
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function guardarNotasEnStorage(notas) {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(notas));
}

function configurarCabecera() {
    const titulo = document.querySelector('.titulo-mes');
    if (titulo) {
        titulo.textContent = `Notas de ${monthNames[mesActualIdx]}`;
    }
}

function renderizarNotasDelMes() {
    const contenedor = document.querySelector('#notas-mes');
    if (!contenedor) return;

    const todas = obtenerNotas();
  
    const notasFiltradas = todas.filter(n => n.mes === mesActualIdx);

    contenedor.innerHTML = "";

    if (notasFiltradas.length === 0) {
        contenedor.innerHTML = "<p class='msg-vacio'>No hay notas para este mes.</p>";
        return;
    }

    notasFiltradas.forEach(nota => {
        const div = document.createElement('div');
        div.classList.add('nota-card');
        div.innerHTML = `
            <h4>${nota.titulo}</h4>
            <p>${nota.descripcion}</p>
            <div class="acciones">
                <button class="btn-editar" onclick="cargarNotaEnFormulario(${nota.id})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarNota(${nota.id})">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}


function guardarNota(evento) {
        console.log("Evento recibido:", evento); 
    if (!evento) {
        console.error("¡No se recibió el evento!");
        return;
    }
    evento.preventDefault();

    const titulo = document.querySelector('#titulo').value.trim();
    const descripcion = document.querySelector('#descripcion').value.trim();
    const idExistente = document.querySelector('#nota-id').value;
    
    if (!titulo || !descripcion) {
        alert("Por favor, completa los campos.");
        return;
    }

    let todas = obtenerNotas();

    if (idExistente === "") {
    
        const nuevaNota = {
            id: Date.now(),
            titulo: titulo,
            descripcion: descripcion,
            mes: mesActualIdx
        };
        todas.push(nuevaNota);
    } else {
      
        const idNum = Number(idExistente);
        todas = todas.map(n => n.id === idNum ? { ...n, titulo, descripcion } : n);
    }

    guardarNotasEnStorage(todas);
    evento.target.reset();
    document.getElementById('nota-id').value = "";
    renderizarNotasDelMes();
}

function cargarNotaEnFormulario(id) {
    const nota = obtenerNotas().find(n => n.id === id);
    if (!nota) return;

    document.querySelector('#titulo').value = nota.titulo;
    document.querySelector('#descripcion').value = nota.descripcion;
    document.querySelector('#nota-id').value = nota.id;
   
}

function eliminarNota(id) {
    if (confirm("¿Borrar esta nota?")) {
        const todas = obtenerNotas();
        const filtradas = todas.filter(n => n.id !== id);
        guardarNotasEnStorage(filtradas);
        renderizarNotasDelMes();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    configurarCabecera();
    renderizarNotasDelMes();

    const formulario = document.querySelector('#form-nota');
    if (formulario) {
        formulario.addEventListener("submit", guardarNota);
    }
});
