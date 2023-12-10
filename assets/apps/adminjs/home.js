const apiUrl="https://si-server.onrender.com"
const winUrl="https://smaster.live"


fetch(`${apiUrl}/vendor/funds`)
.then((response) => {
return response.json();
})
.then((data) => {
dataIn(data)
})
.catch((error) => {

console.error('Error:', error);
});

function dataIn(data){
    var html=`
    <div>
    <span>
        <img src="../assets/image/Frame 73.png" alt="">
        <h2>
            Total Revenue   
        </h2>
    </span>
    <span>
        <h3>
            Total
        </h3>
        <p>
          ${data.totalVendorEarning+data.totalVendorAB}
        </p>
    </span>
</div>
<div>
    <span>
        <img src="../assets/image/Frame 73 (1).png" alt="">
        <h2>
            Available Balance
        </h2>
    </span>
    <span>
        <h3>
            Total
        </h3>
        <p>
            ${data.totalVendorAB}
        </p>
    </span>
</div>
<div>
    <span>
        <img src="../assets/image/Frame 73 (2).png" alt="">
        <h2>
           Pending Earnings
        </h2>
    </span>
    <span>
        <h3>
            Total
        </h3>
        <p>
            ${data.totalVendorAB}
        </p>
    </span>
</div>
    `

    document.getElementsByClassName("amount")[0].innerHTML=html
}


fetch(`${apiUrl}/products`)
.then((response) => {
return response.json();
})
.then((data) => {

for (let i = 0; i < data.length; i++) {
    const element = data[i];
   if (element.images.length>0) {
    dataForP(element)
   }
}
myProducts()
}
)
.catch((error) => {

console.error('Error:', error);
});

const bodyForList=document.getElementsByTagName("ul")[0]
function dataForP(data) {
    var html=`
    <li>
    <img src="${data.images[0].imageUrl}" alt="">
    <h1>${data.ProductName}</h1>
    <span>
        <h2>
            Current Bid  
        </h2>
        <h3>
            ${data.ProductAuctionPrice}
        </h3>
    </span>
    <span>
        <h2>
            Bid End Time
        </h2>
        <h3>
            ${data.ProductAuctionEndData}
        </h3>
    </span>
    </li>`
    bodyForList.insertAdjacentHTML('beforeend',html)
}