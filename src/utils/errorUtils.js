export function showError(error) {
    if(error.response?.data){
        const errorData = error.response.data;
        alert(errorData.code + "\n" + errorData.message);
    }else{
        alert(error.message);
    }
      
}
