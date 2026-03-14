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
}
function renderizarCalendario(){
    const calendario = document.QuerySelector('.calendar');
    const notas = obtenerNotas();

    calendario.innerHTML = "";
    for(let i = 0; i < monthNames.length;i++){

        //Filtra las notas de este mes específico. 
        const notasDelMes = notas.filter(nota => nota.months === i);
        const numNotas = notasDelMes.length;
        // Crea el elemento del DOM
        const mesDiv = document.createElement('div');
        mesDiv.classList.add('mes-card');
    
        if(numNotas > 0){
            mesDiv.classList.add('destacado');
        }else{
            mesDiv.classList.add('apagado')
        }

        mesDiv.innerHTML = ` <h3> ${monthNames[i]}</h3> <p> ${numNotas} </p>`;

        mesDiv.onclick = () => {
            window.location.href=`mes.html?mes=${i}`;
        };
        //Añade al contenedor
        calendario.appendChild(mesDiv);
    }

}