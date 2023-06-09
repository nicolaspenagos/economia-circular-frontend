export function getColorsByPrinciple() {
  const colorsMap = new Map();

  colorsMap.set("Capital natural.", "#F38A87");
  colorsMap.set("Tecnologías para la Economía Circular", "#CAABD7");
  colorsMap.set("Ecoeficiencia", "#79B3EA");
  colorsMap.set("Pensamiento sistémico", "#F1D183");
  colorsMap.set("Pensamiento en cascada", "#84E2CA");

  colorsMap.set("Pensamiento local", "#CAABD7");
  colorsMap.set("Gestión del impacto", "#84E2CA");
  colorsMap.set("Innovación", "#F38A87");
  colorsMap.set("Optimización de valor", "#F1D183");

  colorsMap.set("Resiliencia para la diversidad", "#F38A87");
  colorsMap.set("Circularidad y longevidad", "#84E2CA");
  colorsMap.set("Diseño para prevención de residuos", "#F1D183");

  return colorsMap;
}

export function getColorByActivity() {
  const colorsMap = new Map();

  colorsMap.set("Actividad 1", "#8B8BC3");
  colorsMap.set("Actividad 2", "#F7E49A");
  colorsMap.set("Actividad 3", "#E4B7D5");
  colorsMap.set("Actividad 4", "#FECE79");
  colorsMap.set("Actividad 5", "#F8A656");
  colorsMap.set("Actividad 6", "#A0D9D9");
  colorsMap.set("Actividad 7", "#CAE089");
  colorsMap.set("Actividad 8", "#EB609D");
  colorsMap.set("Actividad 9", "#F48170");
  colorsMap.set("Actividad 10", "#6DB5D8");
  colorsMap.set("Actividad 11", "#F391BC");
  colorsMap.set("Actividad 12", "#97D1A9");

  return colorsMap;
}

export function getColorClassMapByActivity() {
  const colorsMap = new Map();

  colorsMap.set("Actividad 1", "bg-[#8B8BC3]");
  colorsMap.set("Actividad 2", "bg-[#F7E49A]");
  colorsMap.set("Actividad 3", "bg-[#E4B7D5]");
  colorsMap.set("Actividad 4", "bg-[#FECE79]");
  colorsMap.set("Actividad 5", "bg-[#F8A656]");
  colorsMap.set("Actividad 6", "bg-[#A0D9D9]");
  colorsMap.set("Actividad 7", "bg-[#CAE089]");
  colorsMap.set("Actividad 8", "bg-[#EB609D]");
  colorsMap.set("Actividad 9", "bg-[#F48170]");
  colorsMap.set("Actividad 10", "bg-[#6DB5D8]");
  colorsMap.set("Actividad 11", "bg-[#F391BC]");
  colorsMap.set("Actividad 12", "bg-[#97D1A9]");

  return colorsMap;
}

export function getColorsMapClasses() {
  const colorsMap = new Map();

  colorsMap.set("Capital natural.", "bg-[#F38A87]");
  colorsMap.set("Tecnologías para la Economía Circular", "bg-[#CAABD7]");
  colorsMap.set("Ecoeficiencia", "bg-[#79B3EA]");
  colorsMap.set("Pensamiento sistémico", "bg-[#F1D183]");
  colorsMap.set("Pensamiento en cascada", "bg-[#84E2CA]");
  colorsMap.set("Pensamiento local", "bg-[#CAABD7]");
  colorsMap.set("Gestión del impacto", "bg-[#84E2CA]");
  colorsMap.set("Innovación", "bg-[#F38A87]");
  colorsMap.set("Optimización de valor", "bg-[#F1D183]");

  colorsMap.set("Resiliencia para la diversidad", "bg-[#F38A87]");
  colorsMap.set("Circularidad y longevidad", "bg-[#84E2CA]");
  colorsMap.set("Diseño para prevención de residuos", "bg-[#F1D183]");

  return colorsMap;
}

export function getPieChartConfig(princples) {
  const colorsMap = getColorsByPrinciple();
  let labels = [];
  let data = [];
  let backgroundColor = [];
  let totalObtained = 0;
  let totalPossible = 0;

  princples.forEach((principle) => {
    labels.push(principle.shortname);
    data.push(principle.obtainedScore);
    backgroundColor.push(colorsMap.get(principle.shortname));
    totalObtained += principle.obtainedScore;
    totalPossible += principle.possibleScore;
  });

  return {
    labels,
    data,
    backgroundColor,
    totalObtained,
    totalPossible,
  };
}

function getLables(principles) {
  let labels = [];
  principles.forEach((e) => {
    const titleParts = e.title.split(" ");
    labels.push("A" + titleParts[1]);
  });

  return labels;
}

export function getStackedBarCharConfig(principles, activities, weitghsMap) {
  principles.sort(function (a, b) {
    return parseInt(a.title.split(" ")[1]) - parseInt(b.title.split(" ")[1]);
  });

  const labels = [];
  const dataMap = setUpActivitiesDataMap(activities);
  let datasets = [];

  for (const [key, val] of weitghsMap) {
    labels.push("P" + key.split(" ")[1]);

    const values = val.vals;

    for (let i = 0; i < values.length; i++) {
      const current = values[i];
      const activityName = current.name;
      const index = parseInt(key.split(" ")[1]) - 1;
      const weight = current.value;

      const newData = dataMap.get(activityName);

      newData.data[index] =
        activities.find((x) => x.shortname === activityName).obtainedScore *
        weight;

      dataMap.set(activityName, newData);
    }
  }

  datasets = Array.from(dataMap.values());

  return {
    labels,
    datasets
  }
 
}

function setUpActivitiesDataMap(activities) {
  const map = new Map();
  const numberOfActivities = activities.length;

  for (let i = 0; i < numberOfActivities; i++) {
    const currenActivity = activities[i];

    const data = {
      data: new Array(numberOfActivities).fill(0),
      label: "A" + currenActivity.shortname.split(" ")[1],
      stack: "stack 1",
      backgroundColor: getColorByActivity().get(currenActivity.shortname),
    };

    map.set(currenActivity.shortname, data);
  }

  return map;
}
