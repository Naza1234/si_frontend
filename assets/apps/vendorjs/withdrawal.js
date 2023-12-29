const apiUrl="https://si-server.onrender.com"
const winUrl="https://smaster.live"

// Get the current URL
const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const withD=searchParams.get("Add")
  
 if(withD){
  document.getElementsByClassName("addproduct")[0].classList.add("out")
 }
 function openwith(){
  document.getElementsByClassName("addproduct")[0].classList.add("out") 
 }



const userID=localStorage.getItem('AWByNAZAVendorID')

 
fetch(`${apiUrl}/vendor/${userID}`)
.then((response) => {
return response.json();
})
.then((data) => {
dataIn(data)
if(data.vendorVerificationStatus === pending){
    window.location=winUrl
}
})
.catch((error) => {

console.error('Error:', error);
});

 
fetch(`${apiUrl}/vendor/withdraws/${userID}`)
.then((response) => {
return response.json();
})
.then((data) => {
    showData(data)
})
.catch((error) => {

console.error('Error:', error);
});




function dataIn(data){
    document.getElementsByClassName("vendorName")[0].innerHTML=`
    Hello,<b>${data.vendorName}</b>
    `
}
var approved=[]
var pending=[]
var bodyForList=document.getElementsByClassName("withdrawUL")[0]
function showData(data){
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(element.Approved){
            approved.push(element)
            approvedW()
        }else{
            pending.push(element)
        }
    }
}


var but=document.getElementsByClassName("but")




but[0].addEventListener("click",()=>{
    but[0].classList.add("active-both-but")
    but[1].classList.remove("active-both-but")
    approvedW()
})

but[1].addEventListener("click",()=>{
    but[1].classList.add("active-both-but")
    but[0].classList.remove("active-both-but")
    pendingW()
})



function approvedW(){
    bodyForList.innerHTML=""
    for (let i = 0; i < approved.length; i++) {
        const element = approved[i];
        var html=`
        <li>
        <span>
            <h1>
               ${element.AcountNumber}
            </h1>
            <p>
                ${element.Amount}
            </p>
        </span>
        <span>
            <p>
              
            </p>
        </span>
       </li>
        `
        bodyForList.insertAdjacentHTML('beforeend',html)
    }
}

function pendingW(){
    bodyForList.innerHTML=""
    for (let i = 0; i < pending.length; i++) {
        const element = pending[i];
        var html=`
        <li>
        <span>
            <h1>
               ${element.AcountNumber}
            </h1>
            <p>
                ${element.Amount}
            </p>
        </span>
        <span>
            <p>
           
            </p>
        </span>
       </li>
        `
        bodyForList.insertAdjacentHTML('beforeend',html)
    }
}
















var form=document.getElementsByTagName("form")
var params={}
form[0].addEventListener("submit",(e)=>{
   e.preventDefault()
   var inputs=form[0].getElementsByTagName("input")
   params={
    UserID:userID,
    BankName:inputs[0].value,
    Accountname:inputs[1].value,
    Amount:inputs[2].value,
    AcountNumber:inputs[3].value,
   }
   console.log(params);
   document.getElementsByClassName("addproduct")[0].classList.remove("out")
   document.getElementsByClassName("addproduct")[1].classList.add("out")
})
form[1].addEventListener("submit",(e)=>{
    e.preventDefault()
    document.querySelector(".load_body").classList.add("loader_out")
    document.getElementsByClassName("addproduct")[1].classList.remove("out")
    var formInputs=form[1].getElementsByTagName("input")
    const paramstocheck={
        vendorEmail:formInputs[0].value,
        vendorPassword:formInputs[1].value,
    }
    console.log(paramstocheck);

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramstocheck),
      };
      var errorIs=false

  fetch(`${apiUrl}/vendor/login`, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data,userID);
      if(data===userID){

          withdraw()
        }else{
        document.querySelector(".load_body").classList.remove("loader_out")
        document.getElementsByClassName("addproduct")[2].classList.add("out")
        document.getElementsByClassName("imgi")[0].src="../assets/image/multiply.png"
    }
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });
})

function withdraw(){
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };
  fetch(`${apiUrl}/withdrawal`, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    document.querySelector(".load_body").classList.remove("loader_out")
    document.getElementsByClassName("addproduct")[2].classList.add("out")
    document.getElementsByClassName("imgi")[0].src="../assets/image/check.png"
        document.querySelector(".load_body").classList.remove("loader_out")
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });
}

function closeit(){
    document.getElementsByClassName("addproduct")[2].classList.remove("out")   
}
function backto(){
    document.getElementsByClassName("addproduct")[2].classList.remove("out")   
    document.getElementsByClassName("addproduct")[0].classList.add("out")   
}