


var searchBTN=document.getElementsByClassName("searchBTN")[0]


searchBTN.addEventListener(("click"),()=>{
    var searchInput=document.getElementsByClassName("searchInput")[0].value
    if (searchInput.length>0) {
        window.location = `${winUrl}/user/landing.html?search=${searchInput}`
    }
})



fetch(`${apiUrl}/vendor`)
.then((response) => {
return response.json();
})
.then((data) => {
for (let i = 0; i < data.length; i++) {
    const element = data[i];
    dataInForVendors(element)
}
})
.catch((error) => {

console.error('Error:', error);
});

function dataInForVendors(data){
   var container=document.getElementsByClassName("storcont")[0]
   var html=`
            <li>
                <img src="${data.vendorStoreIcon}" alt="">
                ${data.vendorStoreName}
            </li>
            `

            container.insertAdjacentHTML("beforeend",html)
}


fetch(`${apiUrl}/user/products`)
.then((response) => {
return response.json();
})
.then((data) => {
productActive(data.ProductWithActiveAuction)
productToCome(data.ProductWithAuctionAboutToStart)
hotDeals(data.ProductWithPumpingAuction)
})
.catch((error) => {

console.error('Error:', error);
});


function productActive(data){
    var container=document.getElementsByClassName("activeAuction")[0]
   for (let i = 0; i < data.length; i++) {
    const element = data[i];
     var html=`
     <div class="item new">
            <img src="${element.images[0].imageUrl}" alt="">
            <div class="dit">
                <div class="left">
                <h2>
                ${element.ProductName}
                    </h2>
                    <span>
                        <p>
                            Current Bid
                        </p>
                        <h3>
                            ${element.ProductAuctionPrice}     
                        </h3>
                    </span>
                    <span>
                        <p>
                            Bid End Time
                        </p>
                        <h3>
                            ${element.ProductAuctionEndData}
                        </h3>
                    </span>
                </div>
                <button class="btnactiveit">
                <h2 class="hid">${element._id}</h2>
                    Bid
                </button>
            </div>
        </div>
     `
     container.insertAdjacentHTML('beforeend',html)
   }
   isActive()
}


function hotDeals(data){
    var container=document.getElementsByClassName("hotAuction")[0]
    var idLink=document.getElementsByClassName("id")[0]
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var html=`
     <div class="hot-items">
     <img src="${element.images[0].imageUrl}" alt="">
     <div class="overlay"></div>
     <div class="detals">
         <div class="write">
             <h1>
             ${element.ProductName}
             </h1>
             <div class="timezoon">
                 <span>
                     <h2>
                         Current Bid
                     </h2>
                     <p>
                     ${element.ProductAuctionPrice}
                     </p>
                 </span>
                 <span>
                     <h2>
                        Bid End Time
                     </h2>
                     <p>
                     ${element.ProductAuctionEndData}
                     </p>
                 </span>
             </div>
         </div>
         <button class="joinBid btnactiveit" >
         <h2 class="hid">${element._id}</h2>
             Join In Bid
         </button>
         </div>
         </div>
         `
     var html2=`<span class="btn-id" > </span>`
         idLink.insertAdjacentHTML('beforeend',html2)
         container.insertAdjacentHTML('beforeend',html)
    }
    isActive()
    manual()
}
function isActive(){
    var btn =document.getElementsByClassName("btnactiveit")
    
        for (let i = 0; i < btn.length; i++) {
            const element = btn[i];
            element.addEventListener("click",(e)=>{
                var btnB=e.target
                var id=btnB.getElementsByClassName("hid")[0].innerHTML
                if (userID) {
                    window.location = `${winUrl}/user/AuctionRoom.html?id=${id}`
                }else{
                    window.location = `${winUrl}/logs/login.html`
                }
            })
        }
     
}

var countUp=0
var items
var itembtn

function manual(){
    items=document.getElementsByClassName("hot-items")
    itembtn=document.getElementsByClassName("btn-id") 
    items[0].classList.add("see-hot")
     itembtn[0].classList.add("active")
    for (let i = 0; i < items.length; i++) {
        const element = itembtn[i];
        element.addEventListener("click",()=>{
            countUp=i
            for (let i = 0; i < items.length; i++) {
                itembtn[i].classList.remove("active")
            }
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove("see-hot")
            }
            items[i].classList.add("see-hot")
            itembtn[i].classList.add("active")
        })
    }
    cal()
}
function cal() {
    console.log(items,itembtn);
    setInterval(nestimg, 5000);
    
}
function nestimg(){
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("see-hot")
    }
    countUp++
    if (countUp === items.length){
        countUp=0
    }
    
    items[countUp].classList.add("see-hot")
    for (let i = 0; i < items.length; i++) {
        itembtn[i].classList.remove("active")
    }
   itembtn[countUp].classList.add("active")
   
}

function productToCome(data){
    var container=document.getElementsByClassName("toComeAuction")[0]
   for (let i = 0; i < data.length; i++) {
    const element = data[i];
     var html=`
     <div class="item new">
            <img src="${element.images[0].imageUrl}" alt="">
            <div class="dit">
                <div class="left">
                    <h2 class="hid">${element._id}</h2>
                    <h2>
                       ${element.ProductName}
                    </h2>
                    <span>
                        <p>
                            Current Bid
                        </p>
                        <h3>
                            ${element.ProductAuctionPrice}     
                        </h3>
                    </span>
                    <span>
                    <p>
                            Bid Start Time
                        </p>
                        <h3>
                            ${element.ProductAuctionEndData}
                        </h3>
                    </span>
                </div>
            </div>
        </div>
     `
     container.insertAdjacentHTML('beforeend',html)

   }
}




var searchBTNn=document.getElementsByClassName("intitbtn")[0]


searchBTNn.addEventListener(("click"),()=>{
    var searchInput=document.getElementsByClassName("intit")[0].value
    if (searchInput.length>0) {
        window.location = `${winUrl}/user/landing.html?search=${searchInput}`
    }
})

