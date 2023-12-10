const apiUrl="https://si-server.onrender.com"
const winUrl="https://auction.smaster.live"

fetch(`${apiUrl}/vendor`)
.then((response) => {
return response.json();
})
.then((data) => {
  
    data.forEach(element => {
        dataIn(element)
    });
})
.catch((error) => {

console.error('Error:', error);
});

function dataIn(data){
    var html=`
    <li>
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
          contact
      </h3>
      <h2>
          ${data.vendorEmail}
      </h2>
    </span>
  </li>
    `

   var newBody=document.getElementsByClassName("vendorul")[0]
   newBody.insertAdjacentHTML('beforeend',html)
}

