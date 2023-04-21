export function mapMarkedInfoToSring(questionId, questionOptionId, questionType){
    return 'questionId:'+questionId+' questionOptionId:'+questionOptionId+' questionType:'+questionType;
}

export function mapFromStringToMarkedInfo(infoString){
    console.log(infoString);
    const parts = infoString.split(' ');
    return {
        questionId:parts[0].split(':')[1],
        questionOptionId:parts[1].split(':')[1],
        questionType:parts[2].split(':')[1]
    }

}