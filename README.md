## Calendario de Notas Interactivo
Una aplicación web progresiva y ligera para gestionar notas personales organizadas por meses. 
El proyecto permite visualizar un calendario anual, acceder a meses específicos y realizar operaciones sobre notas que se almacenan de forma persistente en el navegador.

## Características Principales
Vista General del Calendario: Pantalla principal con tarjetas para los 12 meses.

Indicadores Visuales: Los meses con notas guardadas se destacan visualmente (Requisito A1).

Gestión por mes: Navegación dinámica mediante parámetros de la URL (?mes=X) para gestionar notas de un mes específico.

Persistencia Local: Uso de localStorage para que los datos no se pierdan al cerrar el navegador.

Listado Global: Función para visualizar todas las notas del año desde la pantalla principal.



## Estructura del Proyecto


```plaintext
pr_eval_calendario_notas/
├── index.html          
├── notas.html          
├── css/
│   └── styles.css      
└── js/
    ├── app_index.js    
    └── app_mes.js      
```

## Flujo de Usuario:

Haz clic en cualquier mes para entrar en su gestor de notas.

Rellena el formulario para añadir una nota (Título, Descripción).

Usa los botones de Editar para modificar una nota existente o Eliminar para quitarla.

Vuelve al calendario para ver cómo se actualizan los contadores de notas.
