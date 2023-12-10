

var items=[]
var TotalCost=0
var cartItemID=[]
var purchases=[]
var shipments=[]
var itemID

fetch(`${apiUrl}/cart/ByUserId/${userID}`)
.then((response) => {
return response.json();
})
.then((data) => {
  for (let i = 0; i < data.length; i++) {
    cartIN(data[i])
    items.push(data[i])
  }
}
)
.catch((error) => {
console.error('Error:', error);
});

function cartIN(data){
   var container=document.getElementsByClassName("cartItems")[0]
   var html=`
                   <li>
                   <h1 class="hid">${data.cart._id}</h1>
                    <img src="${data.images[0].imageUrl}" alt="">
                    <span>
                        <h1>
                            ${data.ProductName}
                        </h1>
                        <p>
                            ${data.ProductAuctionPrice}
                        </p>
                    </span>
                   </li>
   `
   container.insertAdjacentHTML('beforeend',html)
   setTotal()
}

function setTotal(){
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        TotalCost+=element.ProductAuctionPrice
    }
    document.getElementsByClassName("total_costNo")[0].innerHTML=!TotalCost?0:TotalCost
}

document.getElementsByClassName("prosessData")[0].addEventListener("click",()=>{
    if (items.length>0) {
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            cartItemID.push(element._id)
        }
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItemID),
          };
          
      localStorage.setItem("paymentProducts",JSON.stringify(cartItemID))
      fetch(`${apiUrl}/user/pay`, requestOptions)
      .then((response) => {
      return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location=data.url
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      }); 
    }else{
        console.log("no item in cart");
    }
})



fetch(`${apiUrl}/user/payedProducts/${userID}`)
.then((response) => {
return response.json();
})
.then((data) => {
    for (const iterator of data.PurchasedProducts) {
        purchases.push(iterator)
    }
    for (const iterator of data.shipments) {
        shipments.push(iterator)
    }
    purchase()
}
)
.catch((error) => {
console.error('Error:', error);
});


var navbtn=document.getElementsByClassName("but")

navbtn[0].addEventListener("click",()=>{
    navbtn[1].classList.remove("active-both-but")
    navbtn[0].classList.add("active-both-but")
    purchase()
})
navbtn[1].addEventListener("click",()=>{
    navbtn[0].classList.remove("active-both-but")
    navbtn[1].classList.add("active-both-but")
    shipment()
})

function purchase(){
  var container=document.getElementsByClassName("leastul")[0]
 for (const iterator of purchases) {
    var html
    if(iterator.payment.ProductDeliveringStatus === "awaitingUser"){
        html=`
        <li>
        <img src="${iterator.images.imageUrl[0]}" alt="">
        <span>
            <h1>
                ${iterator.ProductName}
            </h1>
            <p>
                ${iterator.ProductAuctionPrice}
            </p>
        </span>
        <button class="runApproval">
        <p class="hid">${iterator.payment._id}</p>
            Verify Purchase 
        </button>
        </li>
        `
    }else{
        html=`
    <li>
    <img src="${iterator.images.imageUrl[0]}" alt="">
    <span>
        <h1>
            ${iterator.ProductName}
        </h1>
        <p>
            ${iterator.ProductAuctionPrice}
        </p>
    </span>
    <button>
        Delivered
    </button>
    </li>
    `
    }

    container.insertAdjacentHTML('beforeend',html)
    approved()
}

}
function shipment(){
  var container=document.getElementsByClassName("leastul")[0]
 for (const iterator of shipments) {
    var html=`
    <li>
    <img src="${iterator.images.imageUrl[0]}" alt="">
    <span>
        <h1>
            ${iterator.ProductName}
        </h1>
        <p>
            ${iterator.ProductAuctionPrice}
        </p>
    </span>
    <button>
        Pending
    </button>
    </li>
    `
    container.insertAdjacentHTML('beforeend',html)
 }

}

function approved(){
   var btn=document.getElementsByClassName("runApproval")
   for (let i = 0; i < btn.length; i++) {
    const element = btn[i];
    element.addEventListener("click",(e)=>{
       var pBtn=e.target 
       var itemID=pBtn.getElementsByClassName("hid")[0].innerHTML
       fetch(`${apiUrl}/payments/approved/${itemID}`)
       .then((response) => {
       return response.json();
       })
       .then((data) => {
       }
       )
       .catch((error) => {
       console.error('Error:', error);
       });
    })
   }
}