const apiUrl="https://si-server.onrender.com"
const winUrl="https://smaster.live"


var btn=document.getElementsByClassName("btn")
var form=document.getElementsByTagName("form")[0]

btn[0].addEventListener("click",()=>{
    btn[1].classList.remove("active-btn")
    btn[0].classList.add("active-btn")
})
btn[1].addEventListener("click",()=>{
    btn[0].classList.remove("active-btn")
    btn[1].classList.add("active-btn")
})



form.addEventListener("submit",(e)=>{
    e.preventDefault()
    if(btn[0].classList.contains("active-btn")){
        user()
    }
    if(btn[1].classList.contains("active-btn")){
        vendor()
    }
})

function user(){
  document.querySelector(".load_body").classList.add("loader_out")
    var formInputs=document.getElementsByTagName("input")
    const params={
        UserEmail:formInputs[0].value,
        UserPassword:formInputs[1].value,
    }
    console.log(params);
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };
      var errorIs=false

  fetch(`${apiUrl}/user/login`, requestOptions)
  .then((response) => {
    if (response.status === 400) {
        errorIs=!errorIs
      // Handle the 400 Bad Request error
      console.error('Bad Request Error:', response);
    }
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    if (errorIs) {
      document.getElementsByTagName("h6")[0].innerHTML=data.message
      document.getElementsByTagName("h6")[0].classList.add("error")
      document.querySelector(".load_body").classList.remove("loader_out")
  }else{
    localStorage.setItem('AWByNAZAUserID',data);
    window.location=`${winUrl}`
  }
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });
}

function vendor(){
  document.querySelector(".load_body").classList.add("loader_out")
    var formInputs=document.getElementsByTagName("input")
    const params={
        vendorEmail:formInputs[0].value,
        vendorPassword:formInputs[1].value,
    }
    

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };
      var errorIs=false

  fetch(`${apiUrl}/vendor/login`, requestOptions)
  .then((response) => {
    if (response.status ===400) {
        errorIs=!errorIs
      // Handle the 400 Bad Request error
      console.error('Bad Request Error:', response);
    }
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    if (errorIs) {
        document.getElementsByTagName("h6")[0].innerHTML=data.message
        document.getElementsByTagName("h6")[0].classList.add("error")
        document.querySelector(".load_body").classList.remove("loader_out")
    }else{
      window.location=`${winUrl}/vendor/home.html?ID=${data}`
    }
    
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });
}