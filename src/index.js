import aload from 'aload';
import { init } from './js/app';
import { querySharedElements } from './js/shared-DOM-elements';

// importa los estilos (solo a webpack le interesa esto)
import './css/styles.css';

// cuando el documento está listo para ser manipulado
document.addEventListener('DOMContentLoaded', () => {
    // lazy-load de imágenes
    aload();

    // obtenemos aquellos nodos HTML que son compartidos
    querySharedElements();

    // inicializa la app
    init();
});
