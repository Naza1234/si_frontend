const apiUrl="https://si-server.onrender.com"
const winUrl="https://smaster.live"



fetch(`${apiUrl}/withdrawal`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Sort the data array, placing items with Approved: false at the top
    data.sort((a, b) => a.Approved === b.Approved ? 0 : a.Approved ? 1 : -1);
    
    // Iterate through the sorted data
    data.forEach(element => {
      dataIn(element);
    });
    butclick()
  })
  .catch((error) => {
    console.error('Error:', error);
  });


function dataIn(data){
    var html=`
    <li>
    <h1 class="hid">${data._id}</h1>
    <span>
        <h1>
            Amount: ${data.Amount}
        </h1>
        <h2>
            Approved: ${data.Approved}
        </h2>
    </span>
    <button class="detailsbtn">
        Details
    </button>
   </li>
    `
    var newBody=document.getElementsByClassName("vendorul")[0]
    newBody.insertAdjacentHTML('beforeend',html)
   
}







var wid
function butclick(){
  var itembtn=document.getElementsByClassName("detailsbtn")
  for (let i = 0; i < itembtn.length; i++) {
    const element = itembtn[i];
    element.addEventListener("click",(e)=>{
      document.querySelector(".load_body").classList.add("loader_out")
      var btn=e.target
      var payrent=btn.parentElement
      var id=payrent.getElementsByClassName("hid")[0].innerHTML
      wid=id
      shoepop(id)
    })
  }
}

function shoepop(id){
  fetch(`${apiUrl}/withdrawal/${id}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  
      dataInForPop(data);
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });


}
function dataInForPop(data){
 
  var html=`
  <section class="detals">
  <div>
      <h1>
          Vendor details 
      </h1>
      <img class="vendoricon" src="${data.vendorStoreIcon}" alt="">
      <h2>
          ${data.vendorStoreName}
      </h2>
     
      <span>
          <p>
              withdrawn  amount
          </p> 
          <h3>
              ${data.vendorAB}
          </h3>
      </span>
  </div>
  <div>
      <h1>
          Withdrawal Request  
      </h1>
      <span>
          <p>
              Amount   
          </p>
          <h3>
              ${data._doc.Amount}
          </h3>
      </span>
      <span>
          <p>
              Bank Name 
          </p>
          <h3>
          ${data._doc.BankName}
          </h3>
      </span>
      <span>
          <p>
              Account Name
          </p>
          <h3>
          ${data._doc.Accountname}
          </h3>
      </span>
      <span>
          <p>
              Account Number
          </p>
          <h3>
          ${data._doc.AcountNumber}
          </h3>
      </span>
      <span>
          <button onclick="remove()">
              Decline
          </button>
          <button onclick="Processed()">
              Processed
          </button>
      </span>
  </div>
</section>
  `
  document.getElementsByClassName("popup")[0].innerHTML=html
  document.getElementsByClassName("popup")[0].classList.add("see")
  document.querySelector(".load_body").classList.remove("loader_out")
}


function remove(){

    // Define the URL for the delete request
    const deleteURL ={
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json', // Specify the content type if needed
          // Add any additional headers if required
      },
  } ; // Replace with the actual API endpoint

    // Send the DELETE request
    fetch(`${apiUrl}/withdrawal/${wid}`,deleteURL )
    .then(response => {
        window.location= `${winUrl}/admin/withdrawal.html`
    })
    .catch(error => {
        // Handle network-related errors
        console.error('Network error:', error);
    });


}

function Processed() {
  // Define the URL for the PUT request
  const putURL = `${apiUrl}/withdrawal/${wid}`; // Replace with the actual API endpoint

  // Create the data to be sent in the request body
  const data = {
      Approved: true
  };

  // Send the PUT request
  fetch(putURL, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
      },
      body: JSON.stringify(data) // Convert the data object to JSON
  })
  .then(response => {
    window.location= `${winUrl}/admin/withdrawal.html`
  })
  .catch(error => {
      // Handle network-related errors
      console.error('Network error:', error);
  });
}
