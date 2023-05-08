const REPORT_BY_LEVELS = new Map();

REPORT_BY_LEVELS.set('Cadena de suministro', ['Capital natural', 'Tecnologías para la EC', 'Pensamiento sistémico',  'Pensamiento en cascada',   'Ecoeficiencia']);
REPORT_BY_LEVELS.set('Empresa', [ 'Innovación','Gestión del impacto',   'Optimización de valor',  'Pensamiento local']);
REPORT_BY_LEVELS.set('Producto', [ 'Resiliencia para la diversidad',   'Circularidad y longevidad',     'Diseño para prevención de residuos']) ;

let PRINCIPLES_SCORES_WEITGHS = new Map();

PRINCIPLES_SCORES_WEITGHS.set('Principio 1', { vals: [{ name: 'Actividad 2', value: 0.5 }, { name: 'Actividad 3', value: 0.3448275862068966 }] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 2', { vals: [{ name: 'Actividad 1', value: 0.43478260869565216 }, { name: 'Actividad 4', value: 0.6666666666666666 }] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 3', { vals: [{ name: 'Actividad 2', value: 0.25 }, { name: 'Actividad 5', value: 0.2142857142857143 }, { name: 'Actividad 8', value: 0.50 }, { name: 'Actividad 10', value: 0.35714285714285715 }] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 4', { vals: [{ name: 'Actividad 3', value: 0.1724137931034483 }, { name: 'Actividad 6', value: 0.25423728813559326 }, { name: 'Actividad 9', value: 0.14423076923076925 }, { name: 'Actividad 12', value: 0.24193548387096775 }] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 5', { vals: [{ name: 'Actividad 7', value: 0.30 }, { name: 'Actividad 10', value: 0.35714285714285715 }, { name: 'Actividad 11', value: 0.35714285714285715 }, { name: 'Actividad 12', value: 0.24193548387096775}] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 6', { vals: [{ name: 'Actividad 1', value: 0.21739130434782608 }, { name: 'Actividad 4', value: 0.3333333333333333 }, { name: 'Actividad 9', value: 0.14423076923076925 }, { name: 'Actividad 11', value: 0.35714285714285715 }] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 7', { vals: [{ name: 'Actividad 5', value: 0.28571428571428575 }, { name: 'Actividad 7', value: 0.40 }, { name: 'Actividad 9', value: 0.19230769230769232 }] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 8', { vals: [{ name: 'Actividad 5', value: 0.28571428571428575 }, { name: 'Actividad 6', value: 0.3389830508474576 }, { name: 'Actividad 12', value:  0.3225806451612903 }] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 9', { vals: [{ name: 'Actividad 2', value: 0.25 }, { name: 'Actividad 5', value: 0.2142857142857143 }, { name: 'Actividad 7', value: 0.30 }, { name: 'Actividad 8', value: 0.50 }] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 10', { vals: [{ name: 'Actividad 1', value: 0.17391304347826086 }, { name: 'Actividad 6', value: 0.2033898305084746 }, { name: 'Actividad 9', value: 0.11538461538461539 }, { name: 'Actividad 10', value: 0.2857142857142857 }, { name: 'Actividad 11', value: 0.2857142857142857 }] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 11', { vals: [{ name: 'Actividad 1', value: 0.17391304347826086 }, { name: 'Actividad 3', value: 0.13793103448275862 }, { name: 'Actividad 6', value: 0.2033898305084746 }, { name: 'Actividad 9', value: 0.11538461538461539 }, { name: 'Actividad 12', value: 0.19354838709677422}] });
PRINCIPLES_SCORES_WEITGHS.set('Principio 12', { vals: [{ name: 'Actividad 3', value: 0.3448275862068966 }, { name: 'Actividad 9', value: 0.2884615384615385 }] });


const REPORT_BY_PRINCIPLES_VS_ACTIVITIES = new Map();
REPORT_BY_PRINCIPLES_VS_ACTIVITIES.set('Principios vs Actividades', PRINCIPLES_SCORES_WEITGHS);
REPORT_BY_PRINCIPLES_VS_ACTIVITIES.set('Tabla de puntajes', 'ALL');

const REPORT_ROADMAP = new Map();
REPORT_ROADMAP.set('Hoja de ruta', '/roadmap.svg');

const REPORT_RECOMENDATIONS = new Map();

REPORT_RECOMENDATIONS.set('Recomendaciones', '');

export const LOW_SCORE_CRITERIA = 400;
export const TABLE_HEADERS_PRINCIPLE = ['Principio', 'Puntaje posible', 'Puntaje obtenido', 'Porcentaje'];
export const TABLE_HEADERS_ACTIVITY = ['','Actividad', 'Puntaje posible', 'Puntaje obtenido', 'Porcentaje'];
export const BY_LEVELS= 'ReportByLevels';
export const BY_PRINCIPLES_VS_ACTIVITIES= 'PrinciplesVsActivities';
export const BY_ROADMAP = 'Roadmap';
export const BY_RECOMENDATIONS= 'Recomendations';


export {REPORT_BY_LEVELS, REPORT_BY_PRINCIPLES_VS_ACTIVITIES, REPORT_ROADMAP, REPORT_RECOMENDATIONS};