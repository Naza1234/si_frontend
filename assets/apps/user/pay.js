
const itemsID = JSON.parse(localStorage.getItem("paymentProducts"));

if (!itemsID) {
    window.location=winUrl
}


document.getElementsByTagName("form")[0].addEventListener("submit",(e)=>{
    e.preventDefault()
    var input=document.getElementsByTagName("input")
    var parse={
        itemsID:itemsID,
        userID:userID,
        contact:input[0].value,
        location:input[1].value
    }
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parse),
      };
      
  fetch(`${apiUrl}/payments`, requestOptions)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  }); 


})



