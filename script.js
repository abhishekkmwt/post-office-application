async function fetchIp(){
    try{
        let response=await fetch('https://api.ipify.org?format=json');
        let result=await response.json();
        localStorage.setItem('ip',JSON.stringify(result.ip));
        displayIp(result.ip);
    }
    catch{
        alert('Error in Fetching IP Address');
    }
}

fetchIp();


function displayIp(ip){
    const ipAddDiv=document.getElementsByClassName('ipAdd')[0];
    ipAddDiv.innerText=ip;
}

let submitBtn=document.getElementById('submitBtn');
submitBtn.addEventListener('click',()=>{
    window.location.href='./details.html'
})