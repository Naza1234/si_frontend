


const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("id")


var time

fetch(apiUrl + `/products/${itemId}`)
.then((res)=>res.json())
.then((data)=>{
      time=data.ProductAuctionEndData
      dataIn(data)
})

function dataIn(data){
  var containerImg=document.getElementsByClassName("imageList")[0]
  var containerForDit=document.getElementsByClassName("detalURL")[0]
  var htmlIMG=``
  if (data.images.length>5) {
    for (let i = 1; i < 5; i++) {
        document.getElementsByClassName("headingimg")[0].src=data.images[0].imageUrl
        const element = data.images[i];
        htmlIMG=`
        <li class="subimg"><img src="${element.imageUrl}" alt="" class="subimgbtn"></li>
        `
        containerImg.insertAdjacentHTML('beforeend',htmlIMG)
        imagesSwap()
    }
  }else{
    for (let i = 0; i < data.images.length; i++) {
        document.getElementsByClassName("headingimg")[0].src=data.images[0].imageUrl
        const element = data.images[i];
        htmlIMG=`
        <li class="subimg"><img src="${element.imageUrl}" alt="" class="subimgbtn" ></li>
        `
        containerImg.insertAdjacentHTML('beforeend',htmlIMG)
        imagesSwap()
    }
  }
  var html1=`
   <h1>
   ${data.ProductName}
</h1>
<p>
${data.ProductAuctionPrice}
</p>
<details>
   <br><br>
   <h2>
       Bid End Time
   </h2>
   
   <h4>
   ${data.ProductAuctionEndData}
   </h4>
<br>
   <h2>
        Description 
   </h2>
   
   <h4>
   ${data.ProductDescription}
   </h4>
</details>
   `
containerForDit.innerHTML=html1
}


function imagesSwap(){
    var imgBTN=document.getElementsByClassName("subimgbtn")
    for (let i = 0; i < imgBTN.length; i++) {
        const element = imgBTN[i];
        element.addEventListener("click",(e)=>{
            var btn=e.target
            var imgP=document.getElementsByClassName("headingimg")[0].src=btn.src
    })
}
}


fetch(apiUrl + `/Auction/GetById/${itemId}`)
.then((res)=>res.json())
.then((data)=>{
      console.log(data);
})

function actiondit(data){
     var container = document.getElementsByClassName("ulList")[0]
     var html=`
     <li class="${itemId === data.userID ? "me":"notme"}">${data.Amount}</li>
     `
     container.insertAdjacentHTML('beforeend',html)
}




var bnt=document.getElementsByClassName("setAuction")[0]

bnt.addEventListener("click",()=>{
    const combinedDataAndImages = [];
    const ProductWithActiveAuction=[]
    const ProductWithPumpingAuction=[]
    const ProductWithAuctionAboutToStart=[]
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const month = Math.floor(currentDate.getMonth().toString().padStart(2, '0'))+1; // Months are 0-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    var input=document.getElementsByClassName("setAuctionInput")[0].value
    if (input) {
        if (time > formattedDateTime) {
            var params={
                ProductID:itemId,
                    userID:userID,
                    Amount:input,
                   
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
              };
        
          fetch(`${apiUrl}/Auction`, requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
           window.location=window.location
          })
          .catch((error) => {
            // Handle any errors
            console.error('Error:', error);
          });
        }
    }
})