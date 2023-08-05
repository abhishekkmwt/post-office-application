const userIp=JSON.parse(localStorage.getItem('ip'));

console.log(userIp);

let data=[];

async function ipDetails(){
    let response=await fetch(`http://ip-api.com/json/${userIp}`);
    let result=await response.json();
    console.log(result);
    renderData(result);
    pincodeData(result.zip);
}

ipDetails();


async function pincodeData(pincode){
    let response=await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    let result=await response.json();
    console.log(result);
    data=result[0].PostOffice;
    renderPinCodeData(data);
}

function renderData(data){
    let ipDetailSpan=document.getElementById('ip-detail');
    ipDetailSpan.innerText=data.query;

    let latitude=document.getElementById('lat');
    latitude.innerText=data.lat;

    let longitude=document.getElementById('long');
    longitude.innerText=data.lon;

    let City=document.getElementById('city');
    City.innerText=data.city;

    let Region=document.getElementById('region');
    Region.innerText=data.region;

    let Organistion=document.getElementById('org');
    Organistion.innerText=data.org;

    let host=window.location.hostname;
    let hostName=document.getElementById('hostname');
    hostName.innerText=host;

    let datetime_str = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });
    let date_chicago = new Date(datetime_str);

    const mapFrameDiv=document.getElementsByClassName('mapFrame')[0];
    mapFrameDiv.innerHTML=`<iframe src="https://maps.google.com/maps?q=${data.lat}, ${data.lon}&z=15&output=embed"></iframe>`
    
    let timezone=document.getElementById('time');
    timezone.innerText=data.timezone;

    let dateAndTime=document.getElementById('date');
    dateAndTime.innerText=date_chicago;

    let pincode=document.getElementById('pin');
    pincode.innerText=data.zip;
}

let neraMeDetailsDiv=document.getElementsByClassName('neraMe-details')[0];



function renderPinCodeData(data){
    let mssg=document.getElementById('mssg');
    mssg.innerText=data.length;
    renderCards(data);
}

   

function renderCards(postOfficeArray){
    for(let x=0;x<postOfficeArray.length;x++){
        let po=postOfficeArray[x];
        let card=document.createElement('div');
        card.className='card';
        card.innerHTML=`<div class="name">
        Name: <span id="name">${po.Name}</span>
        </div>
        <div class="bType">
            Branch Type: <span id="bType">${po.BranchType}</span>
        </div>
        <div class="status">
            Delivery Status: <span id="status">${po.DeliveryStatus}</span>
        </div>
        <div class="district">
            District: <span id="district">${po.District}</span>
        </div>
        <div class="division">
            Division: <span id="division">${po.Division}</span>
        </div>`
        neraMeDetailsDiv.appendChild(card);
    }
    
}

let searchBar=document.getElementById('search');
searchBar.addEventListener('keyup',()=>{
    console.log(data);
    neraMeDetailsDiv.innerHTML='';
    let inputVal=searchBar.value.toLowerCase().trim();
    if(inputVal===''){
        renderPinCodeData(data);
        return;
    }

    neraMeDetailsDiv.innerHTML='';
    let finalArray=data.filter(item=>{
        let elementName=item.Name.toLowerCase();
        console.log(inputVal);
       return elementName.includes(inputVal);
    })
    console.log(finalArray)
    renderPinCodeData(finalArray);
})


