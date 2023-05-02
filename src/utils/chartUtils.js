export function getColorsByPrinciple(){
    const colorsMap = new Map();

    colorsMap.set('Capital natural', '#F38A87');
    colorsMap.set('Tecnologías para la EC', '#CAABD7');
    colorsMap.set('Ecoeficiencia', '#79B3EA');
    colorsMap.set('Pensamiento sistémico', '#FBDD94');
    colorsMap.set('Pensamiento en cascada', '#84E2CA');

    colorsMap.set('Pensamiento local', '#CAABD7');
    colorsMap.set('Gestión del impacto', '#84E2CA');
    colorsMap.set('Innovación', '#F38A87');
    colorsMap.set('Optimización de valor', '#FBDD94');

    colorsMap.set('Resiliencia para la diversidad', '#F38A87');
    colorsMap.set('Circularidad y longevidad', '#84E2CA');
    colorsMap.set('Diseño para prevención de residuos', '#FBDD94');



    return colorsMap;
}

export function getColorsMapClasses(){
    const colorsMap = new Map();

    colorsMap.set("Capital natural", "bg-[#F38A87]");
    colorsMap.set("Tecnologías para la EC", "bg-[#CAABD7]");
    colorsMap.set("Ecoeficiencia", "bg-[#79B3EA]");
    colorsMap.set("Pensamiento sistémico", "bg-[#FBDD94]");
    colorsMap.set("Pensamiento en cascada", "bg-[#84E2CA]");
    colorsMap.set('Pensamiento local', 'bg-[#CAABD7]');
    colorsMap.set('Gestión del impacto', 'bg-[#84E2CA]');
    colorsMap.set('Innovación', 'bg-[#F38A87]');
    colorsMap.set('Optimización de valor', 'bg-[#FBDD94]');

    colorsMap.set('Resiliencia para la diversidad', 'bg-[#F38A87]');
    colorsMap.set('Circularidad y longevidad', 'bg-[#84E2CA]');
    colorsMap.set('Diseño para prevención de residuos', 'bg-[#FBDD94]');


    return colorsMap;
}


export function getPieChartConfig(princples){
    
    const colorsMap = getColorsByPrinciple();
    let labels = [];
    let data = [];
    let backgroundColor = [];
    let totalObtained = 0;
    let totalPossible = 0;

    princples.forEach(principle => {
        labels.push(principle.shortname);
        data.push(principle.obtainedScore);
        console.log(principle.shortname);
        backgroundColor.push(colorsMap.get(principle.shortname));
        totalObtained+=principle.obtainedScore;
        totalPossible += principle.possibleScore;
    });

    return {
        labels,
        data,
        backgroundColor,
        totalObtained,
        totalPossible
    }

}