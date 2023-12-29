const apiUrl="https://si-server.onrender.com"
const winUrl="https://smaster.live"

// Get the current URL
const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const userId=searchParams.get("ID")


if(!userId){
    window.location=`${winUrl}/logs/login.html`
}

localStorage.setItem('AWByNAZAVendorID',userId);

fetch(`${apiUrl}/vendor/${userId}`)
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




function dataIn(data){
    document.getElementsByClassName("vendorName")[0].innerHTML=`
    Hello,<b>${data.vendorName}</b>
    `
    

    // account section 

    var html1=`
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
            ${data.vendorAB + data.vendorEarning}
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
            ${data.vendorAB}
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
            ${data.vendorEarning}
        </p>
    </span>
    </div>
    `

    document.getElementsByClassName("vendorAccount")[0].innerHTML=html1

}

// Assuming you have an array to store the selected files
const selectedFiles = [];

// Function to update image previews
function updateImagePreviews() {
    const imagePreviews = document.getElementsByClassName('imagePreviews');

    for (let i = 0; i < selectedFiles.length; i++) {
        if (i >= 5) {
            break; // Display up to 5 images only
        }

        const file = selectedFiles[i];
        if (file.type.startsWith('image/')) {
            const imageSrc = URL.createObjectURL(file);
            imagePreviews[i].src = imageSrc;
        }
    }
}
const imageInput = document.getElementsByClassName('imageInput')[0]
// Input change event handler
imageInput.addEventListener('change', (event) => {
    const newFiles = event.target.files;

    // Clear the previously selected files if needed
    if (selectedFiles.length === 5) {
        selectedFiles.pop(); // Remove the oldest file
    }

    // Add the new files to the selectedFiles array
    for (const file of newFiles) {
        selectedFiles.unshift(file); // Add to the beginning of the array
    }

    // Update image previews with the latest selections
    updateImagePreviews();
});

const products=[]
const puchProducts=[]

fetch(`${apiUrl}/products/vendorProducts/${userId}`)
.then((response) => {
return response.json();
})
.then((data) => {
console.log(data);
for (let i = 0; i < data.length; i++) {
    const element = data[i];
   if (element.images.length>0) {
    if(element.ProductPurchased){
        puchProducts.push(element)
    }else{
        products.push(element)
    }
   }
}
myProducts()
}
)
.catch((error) => {

console.error('Error:', error);
});



var but=document.getElementsByClassName("but")




but[0].addEventListener("click",()=>{
    but[0].classList.add("active-both-but")
    but[1].classList.remove("active-both-but")
    myProducts()
})

but[1].addEventListener("click",()=>{
    but[1].classList.add("active-both-but")
    but[0].classList.remove("active-both-but")
    purchasedItems()
})
const bodyForList=document.getElementsByTagName("ul")[0]
function myProducts(){
    bodyForList.innerHTML=""
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        var html=`
        <li>
        <img src="${element.images[0].imageUrl}" alt="">
        <span>
            <h1>
                ${element.ProductName}
            </h1>
            <p>
                ${element.ProductPrice}
            </p>
        </span>
      </li>
  
        `
        bodyForList.insertAdjacentHTML('beforeend',html)
    }
}

function purchasedItems(){
    bodyForList.innerHTML=""
    for (let i = 0; i < puchProducts.length; i++) {
        const element = puchProducts[i];
        var html=`
        <li>
        <img src="${element.images[0].imageUrl}" alt="">
        <span>
            <h1>
                ${element.ProductName}
            </h1>
            <p>
                ${element.ProductPrice}
            </p>
        </span>
      </li>
  
        `
        bodyForList.insertAdjacentHTML('beforeend',html)
    }
}




var addForm=document.getElementsByClassName("form")[0]
addForm.addEventListener("submit",(e)=>{
    e.preventDefault()


    document.querySelector(".load_body").classList.add("loader_out")
 

    var input=document.getElementsByTagName("input")


    const params={
            VendorID:userId,
            ProductName:input[1].value,
            ProductPrice: input[2].value,
            ProductAuctionPrice: input[2].value,
            ProductAuctionStartData:  input[3].value + " " +input[4].value,
            ProductAuctionEndData: input[5].value + " " +input[6].value,
            ProductDescription: document.getElementsByTagName("textarea")[0].value,
        }
    
             // Create the fetch options
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };
      
            fetch(`${apiUrl}/products`, requestOptions)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
            
                console.log(data);
              for (let i = 0; i < selectedFiles.length; i++) {
                const element = selectedFiles[i];
                const formData= new FormData()
                formData.append("imageUrl",element)
                formData.append("itemID",data._id)
                   
                  const requestOptionsForImg = {
                      method: 'POST',
                       body: formData,
                    };
                    var errorIs=false

               fetch(`${apiUrl}/productImage`, requestOptionsForImg)
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  console.log(data);
                  document.querySelector(".load_body").classList.remove("loader_out")
                  document.getElementsByClassName("addproduct")[0].classList.remove("out")
                  
                   window.location=window.location
                })
                .catch((error) => {
                  // Handle any errors
                  console.error('Error:', error);
                });
              }
  
              })
              .catch((error) => {
                // Handle any errors
                console.error('Error:', error);
              });
            
            
    
   
    
})







function runAdd(){
    document.getElementsByClassName("addproduct")[0].classList.add("out")
}