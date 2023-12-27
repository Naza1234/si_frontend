const apiUrl="https://si-server.onrender.com"
const winUrl="https://smaster.live"


var btn=document.getElementsByClassName("btn")
var form=document.getElementsByTagName("form")
btn[0].addEventListener("click",()=>{
    btn[1].classList.remove("active-btn")
    btn[0].classList.add("active-btn")
    document.getElementsByClassName("fromul")[0].innerHTML=`
    <li>
            
            Full Name
            <input type="text" placeholder="Full Name"  required>
        
            </li>
            <li>
        
            Username
            <input type="text" placeholder="Name" required>
        
            </li>
            <li>
        
            Email
            <input type="email" placeholder="@example.com" required>
        
            </li>
            <li>
        
            Mobile
            <input type="number" placeholder="000000000" required>
        
            </li>
            <li>
        
            Address
            <input type="text" placeholder="Address" required>
        
            </li>
            <li>
        
            Password
            <input type="password"  required>
        
           </li>
    `
})
btn[1].addEventListener("click",()=>{
    btn[0].classList.remove("active-btn")
    btn[1].classList.add("active-btn")
    document.getElementsByClassName("fromul")[0].innerHTML=`
    <li>
            
    Full Name
    <input type="text" placeholder="Full Name"  required>

    </li>
    <li>

    Username
    <input type="text" placeholder="Name" required>

    </li>
    <li>

    Email
    <input type="email" placeholder="@example.com" required>

    </li>
    <li>

    StoreName
    <input type="text" placeholder="@example" required>

    </li>
    <li>

    StoreIcon
    <input type="file" required >

    </li>
    <li>

    Mobile
    <input type="number" placeholder="000000000"  required>

    </li>
    <li>

    Address
    <input type="text" placeholder="Address" required>

    </li>
    <li>

    Password
    <input type="password" required>

   </li>

    `
})
var form2

form[0].addEventListener("submit",(e)=>{
    e.preventDefault()

    form[0].classList.add("hid")
    form[1].classList.remove("hid")
    getEmail()
    document.getElementsByClassName("email")[0].innerHTML=document.getElementsByTagName("input")[2].value
})
var otp
function getEmail(){
  fetch(`${apiUrl}/user/emailVerification/${document.getElementsByTagName("input")[2].value}`)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
    otp=data.code
  }
  )
  .catch((error) => {
  console.error('Error:', error);
  });
  
}

  form[1].addEventListener("submit",(e)=>{
    e.preventDefault()
    var inputOPT=document.getElementsByClassName("opt")[0].value
    if(inputOPT===otp){
  
    if(btn[0].classList.contains("active-btn")){
        user()
    }
    if(btn[1].classList.contains("active-btn")){
        vendor()
    }
    }else{
        document.getElementsByClassName("emailOPTerror")[0].innerHTML="bad OTP"
        document.getElementsByClassName("emailOPTerror")[0].classList.add("error")
    }
  })

function user(){
  document.querySelector(".load_body").classList.add("loader_out")
    var formInputs=document.getElementsByTagName("input")
    const params={
        UserName:formInputs[0].value,
        UserPassword:formInputs[5].value,
        UserMobile:formInputs[3].value,
        UserAddress:formInputs[4].value,
        UserAgreement:formInputs[6].checked,
        UserEmail:formInputs[2].value,
        winurl:winUrl
    }
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };
      var errorIs=false

  fetch(`${apiUrl}/user/signup`, requestOptions)
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
    document.querySelector(".load_body").classList.remove("loader_out")
    if (errorIs) {
      document.getElementsByTagName("h6")[0].innerHTML=data.message
      document.getElementsByTagName("h6")[0].classList.add("error")
    }else{
        document.getElementsByTagName("h6")[0].innerHTML="Account created. pleas check email for link"
        document.getElementsByTagName("h6")[0].classList.add("good")
        localStorage.setItem('AWByNAZAUserID',data);
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
    const formData= new FormData()
    formData.append("vendorName",formInputs[0].value)
    formData.append("vendorStoreName",formInputs[3].value)
    formData.append("vendorStoreIcon",formInputs[4].files[0])
    formData.append("vendorEmail",formInputs[2].value)
    formData.append("vendorMobile",formInputs[5].value)
    formData.append("vendorAddress",formInputs[6].value)
    formData.append("vendorPassword",formInputs[7].value)
    formData.append("vendorAgreement",formInputs[8].checked)
    formData.append("winurl",winUrl)


    const requestOptions = {
        method: 'POST',
         body: formData,
      };
      var errorIs=false

  fetch(`${apiUrl}/vendor/signup`, requestOptions)
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
    console.log(data);
    document.querySelector(".load_body").classList.remove("loader_out")
    if (errorIs) {
      document.getElementsByTagName("h6")[0].innerHTML=data.message
      document.getElementsByTagName("h6")[0].classList.add("error")
    }else{
      document.getElementsByTagName("h6")[0].innerHTML="Account created. pleas check email for link"
      document.getElementsByTagName("h6")[0].classList.add("good")
    }
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });
}