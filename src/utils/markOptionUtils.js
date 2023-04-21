export function mapMarkedInfoToSring(
  questionId,
  questionOptionId,
  questionType,
  dependentQuestionId
) {
  return (
    "questionId:" +
    questionId +
    " questionOptionId:" +
    questionOptionId +
    " questionType:" +
    questionType +
    " dependentQuestionId:" +
    dependentQuestionId
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
  };
}
