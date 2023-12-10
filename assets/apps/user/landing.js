


var searchBTN=document.getElementsByClassName("searchBTN")[0]


searchBTN.addEventListener(("click"),()=>{
    var searchInput=document.getElementsByClassName("searchInput")[0].value
    if (searchInput.length>0) {
        window.location = `${winUrl}/user/landing.html?search=${searchInput}`
    }
})


var searchBTNn=document.getElementsByClassName("intitbtn")[0]


searchBTNn.addEventListener(("click"),()=>{
    var searchInput=document.getElementsByClassName("intit")[0].value
    if (searchInput.length>0) {
        window.location = `${winUrl}/user/landing.html?search=${searchInput}`
    }
})


// Get the current URL
const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("search")
document.getElementsByClassName("tit")[0].innerHTML=`Results of: ${itemId}`


fetch(apiUrl + `/products/search/${itemId}`)
.then((res)=>res.json())
.then((data)=>{
   for (let i = 0; i < data.length; i++) {
      dataIn(data[i])
       }
})










function dataIn(data){
    var container=document.getElementsByClassName("resultCont")[0]
    var html=`
    <div class="item">
    <img src="${data.images[0].imageUrl}" alt="">
    <div class="dit">
        <div class="left">
            <h2>
                ${data.ProductName}
            </h2>
            <span>
                <p>
                    Current Bid
                </p>
                <h3>
                    ${data.ProductAuctionPrice}      
                </h3>
            </span>
            <span>
                <p>
                    Bid End Time
                </p>
                <h3>
                    ${data.ProductAuctionEndData}
                </h3>
            </span>
        </div>
        <button class="btnactiveit" >
        <h2 class="hid">${data._id}</h2>
            Bid
        </button>
    </div>
    </div>
    `
    container.insertAdjacentHTML('beforeend',html)
    isActive()
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