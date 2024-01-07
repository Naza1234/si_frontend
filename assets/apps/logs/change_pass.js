const apiUrl="https://si-server.onrender.com"
const winUrl="https://smaster.live"


var form=document.getElementsByTagName("form")[0]
var btn=form.getElementsByTagName("button")[0]
var input
var otp
var userEmail
var changeType 
console.log(input);

form.addEventListener("submit",(e)=>{
    input=form.getElementsByTagName("input")
    e.preventDefault()
    if(btn.textContent==="send otp"){
        sendOtp()
    }
    else if(btn.textContent==="verify otp"){
        verifyUser()
    }else{
        changePassword()

    }
    console.log(btn);
})

function sendOtp(){
    const selectedUse = document.querySelector('input[name="si_user"]:checked');
    form.getElementsByTagName("h6")[0].innerHTML=""
    fetch(`${apiUrl}/user/emailVerification/${input[2].value}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        otp=data.code
        btn.innerHTML="verify otp"
        userEmail=input[2].value
        changeType=selectedUse.value
        form.getElementsByTagName("h6")[0].innerHTML="otp sent"
    }
    )
    .catch((error) => {
    console.error('Error:', error);
    form.getElementsByTagName("h6")[0].innerHTML=error
    btn.innerHTML="send otp" 
    });
}
function verifyUser(){
    if (input[3].value===otp) {
        btn.innerHTML="change password"     
        form.innerHTML=`
        <form>
        <h6>
            
        </h6>
        <h1>
            change  you password
        </h1>
         <ul>
            <li>
                
                    new password
                    <input type="email" placeholder="@example.com">
                
            </li>
           
        </ul>
        
        <button class="button yb">change password</button>
        
        <script src="../assets/apps/logs/change_pass.js"></script>
      </form>
        `
    }else{
        form.getElementsByTagName("h6")[0].innerHTML="rung otp"
        btn.innerHTML="send otp" 
    }
}

async function changePassword(){
    input=form.getElementsByTagName("input")[0].value
   if(changeType==="user"){
    const dataToUpdate = {
        // Your data to be updated
        UserPassword: input,
        // Add more key-value pairs as needed
      };

      try {
        const response = await fetch(`${apiUrl}/user/${userEmail}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed (e.g., authentication headers)
          },
          body: JSON.stringify(dataToUpdate),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedData = await response.json();
        form.getElementsByTagName("h6")[0].innerHTML="updated"
        window.location=winUrl+"/logs/login.html"
      } catch (error) {
        console.error('Error updating data:', error.message);
        form.getElementsByTagName("h6")[0].innerHTML=error
      }
   }
   else{
    const dataToUpdate = {
        // Your data to be updated
        vendorPassword: input,
        // Add more key-value pairs as needed
      };

      try {
        const response = await fetch(`${apiUrl}/vendor/${userEmail}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed (e.g., authentication headers)
          },
          body: JSON.stringify(dataToUpdate),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedData = await response.json();
        form.getElementsByTagName("h6")[0].innerHTML="updated"
        window.location=winUrl+"/logs/login.html"
      } catch (error) {
        console.error('Error updating data:', error.message);
        form.getElementsByTagName("h6")[0].innerHTML=error
      }
   }
}