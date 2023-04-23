export function mapMarkedInfoToSring(
  questionId,
  questionOptionId,
  questionType,
  dependentQuestionId,
  exclusive
) {

  return (
    "questionId:" +
    questionId +
    " questionOptionId:" +
    questionOptionId +
    " questionType:" +
    questionType +
    " dependentQuestionId:" +
    dependentQuestionId +
    " exclusive:" +
    exclusive
  );
}

export function mapFromStringToMarkedInfo(infoString) {
  const parts = infoString.split(" ");

  return {
    questionId: parts[0].split(":")[1],
    questionOptionId: parts[1].split(":")[1],
    questionType: parts[2].split(":")[1],
    dependentQuestionId:
      parts[3].split(":")[1] === "null" ? null : parts[3].split(":")[1],
    exclusive: parts[4].split(":")[1] === "true" ? true : false,
  };
}

export function isExlusive(str) {
  if (str.split(" ")[4].split(":")[1] === "true") return true;
  return false;
}

export function replaceNumbersWithWords(str) {
  const numberWords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return str.replace(/\d/g, (match) => numberWords[parseInt(match)]);
}
