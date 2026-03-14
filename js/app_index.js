const months = document.querySelectorAll('.month');
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


const CLAVE_STORAGE="calendario_notas";

function obtenerNotas() {
    const raw = localStorage.getItem(CLAVE_STORAGE);
    if(raw == null) {
        return null;
    }
    try{
        const datos = JSON.parse(raw);
        return Array.isArray(datos) ? datos : [];
    } catch(e){
        console.error("Error al parsear las notas desde localStorage:",e);
        return [];
    }
}
function guardarNotas(datos){
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(datos));
}
function borrarTodo(){
    if(confirm("¿Estás seguro de que deseas borrar todas las notas? Esta acción no se puede deshacer.")) {
        localStorage.removeItem(CLAVE_STORAGE);
        alert("Todas las notas han sido borradas.");
    } else {
        alert("Acción cancelada. Las notas no han sido borradas.");
    }
}function renderizarCalendario() {
    const calendario = document.querySelector('.calendar'); 
    const notas = obtenerNotas();

    calendario.innerHTML = "";

    for (let i = 0; i < monthNames.length; i++) {
        // Calcula los datos necesarios para esta vuelta
        const nombre = monthNames[i];
        const numNotas = notas.filter(nota => nota.mes === i).length;

        // Delega la creación a la función auxiliar
        const tarjeta = crearTarjetaMes(nombre, i, numNotas);

        // Se añade al contenedor
        calendario.appendChild(tarjeta);
    }
}
function crearTarjetaMes(nombre, indice, cantidadNotas) {
    //  Crea el elemento base
    const div = document.createElement('div');
    div.classList.add('mes-card');

    // Aplica la lógica de estilo (Requisito A1)
    if (cantidadNotas > 0) {
        div.classList.add('destacado');
    } else {
        div.classList.add('apagado');
    }

    // Inyecta el contenido
    div.innerHTML = `
        <h3>${nombre}</h3>
        <p>${cantidadNotas} notas</p>
    `;

    // Configura la navegación (Requisito A2)
    div.onclick = () => {
        window.location.href = `mes.html?mes=${indice}`;
    };

    // 5. Devuelve el div fabricado
    return div;
}