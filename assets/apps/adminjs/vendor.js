const apiUrl="https://si-server.onrender.com"
const winUrl="https://smaster.live"

fetch(`${apiUrl}/vendor`)
.then((response) => {
return response.json();
})
.then((data) => {
  
    data.forEach(element => {
        dataIn(element)
        vendorClick(element)
    });
})
.catch((error) => {

console.error('Error:', error);
});

function dataIn(data){
    var html=`
    <li class="vendor_click">
    <p class="hid">${data._id}</p>
    <h1>
      ${data.vendorName}
    </h1>
    <span>
      <h3>
          products
      </h3>
      <h2>
          ${data.purchasedCount+data.pendingCount}
      </h2>
    </span>
    <span>
      <h3>
          sold product
      </h3>
      <h2>
          ${data.purchasedCount}
      </h2>
    </span>
    <span>
      <h3>
          pending bids
      </h3>
      <h2>
          ${data.pendingCount}
      </h2>
    </span>
    <span>
      <h3>
          Account balance
      </h3>
      <h2>
          ${data.vendorAB}
      </h2>
    </span>
    <span>
      <h3>
          verification statue
      </h3>
      <h2>
          ${data.vendorVerificationStatus }
      </h2>
    </span>
  </li>
    `

   var newBody=document.getElementsByClassName("vendorul")[0]
   newBody.insertAdjacentHTML('beforeend',html)
}

function vendorClick(data){
  if(dataIn.length>0){
    var vendors=document.getElementsByClassName("vendor_click")
   for (let i = 0; i < vendors.length; i++) {
    const element = vendors[i];
      element.addEventListener("click",(e)=>{
           var btn=e.target
           var id=btn.getElementsByClassName("hid")[0].innerHTML
           showPopup(id)
      })
   }
  }
}

function showPopup(id){
  fetch(`${apiUrl}/vendor/${id}`)
.then((response) => {
return response.json();
})
.then((data) => {
  document.getElementsByClassName("vendor_click")[0].classList.add("vendorVerification-out")
  document.getElementsByClassName("vendor_click div")[0].innerHTML=`
  <span >
                
  <h1>
      vendor name
  </h1>
  <h2>
     ${data.vendorName}
  </h2>
</span>
<span>
  <h1>
      StoreName
  </h1>
  <h2>
      ${data.vendorStoreName}
  </h2>
</span>
<span>
  <h1>
      Email
  </h1>
  <h2>
      ${data.vendorEmail}
  </h2>
</span>
<span>
  <h1>
      Mobile
  </h1>
  <h2>
      ${data.vendorMobile}
  </h2>
</span>
<span>
  <h1>
      Address
  </h1>
  <h2>
      ${data.vendorAddress}
  </h2>
</span>
<span>
  <button onclick="close()">
      cancel
  </button>
  <button class="btn_verify">
  ${data._id}
      verify
  </button>
</span>
  `
})
.catch((error) => {

console.error('Error:', error);
});


document.getElementsByClassName("btn_verify")[0].addEventListener("click",()=>{
 var param={
  vendorVerificationStatus:"verified"
 }
 const requestOptions = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers if needed
  },
  body: JSON.stringify(param)
};
fetch(`${apiUrl}/vendor/${id}`, requestOptions)
  .then(response => {
    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      return response.json(); // Parse the response body as JSON
    } else {
      throw new Error('Failed to update resource');
    }
  })
  .then(data => {
    // Handle the response data
    console.log('Updated resource:', data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error updating resource:', error);
  });
})


}

function close(){
  document.getElementsByClassName("vendor_click")[0].classList.remove("vendorVerification-out")
}
