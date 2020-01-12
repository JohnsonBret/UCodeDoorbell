

async function ring() {

    var nameValue = document.getElementById("nameField").value;
        
    // const rawResponse = await fetch('/ring', {
    //     method: 'POST',
    //     headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({studentName: nameValue})
    // });
    // const content = await rawResponse.json()
    
    // if(rawResponse.status == 200)
    // {
    //     console.log("response status 200");
    //     hideDoorbellButton();
    //     uCodeOnTheWay();

    //     setTimeout(()=>{
    //         hideUCodeOnTheWay();
    //         showNameForm();
    //     }, 7000)
    // }
    // else
    // {
    //     showNoConnectionMsg();
    // }

    let body = JSON.stringify({
        studentName: nameValue,
        locationName: localStorage.getItem("location")
    })

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hideDoorbellButton();
            uCodeOnTheWay();
            clearTimeout(noRingTimeout);

            setTimeout(()=>{
                hideUCodeOnTheWay();
                clearNameInput();
                showNameForm();
            }, 15000)
        }
    };
    xhttp.open("POST", "/ring", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(body);

}

const showNoConnectionMsg = ()=>{
    console.log("We didn't get a response");
}

let doorbell = document.getElementById("doorbellRinger");
doorbell.addEventListener("click",()=>{
    ring();
    console.log("button clicked");
});

let noRingTimeout;

let nameEntryButton = document.getElementById("nameButton");
nameEntryButton.addEventListener("click",()=>{
    
    console.log("Name Entered?");
    hideNameForm();
    showDoorbellButton();
    noRingTimeout = setTimeout(()=>{
        clearNameInput();
        hideDoorbellButton();
        showNameForm();
    }, 10000)
});

let settingsLogo = document.getElementById("topBarImg");
settingsLogo.addEventListener("click", ()=>{
    console.log("Click settings logo");
    showSettings();
});

let settingsBack = document.getElementById("settingsBackBtn");
settingsBack.addEventListener("click", ()=>{
    hideSettings();
});

let locationButton = document.getElementsByClassName("locationButton");
for(let i = 0; i < locationButton.length; i++)
{
    locationButton[i].addEventListener("click", (evt)=>{
        let locationAbv = evt.target.getAttribute("data-location");
        console.log(`Location click ${locationAbv}`);
        localStorage.setItem("location", locationAbv);
        getCurrentLocation();
    });
}

const showNameForm = ()=>{
    let nameForm = document.getElementById("nameForm");
    nameForm.style.display = "flex";
}

const hideNameForm = ()=>{
    let nameForm = document.getElementById("nameForm");
    nameForm.style.display = "none";
}

const showDoorbellButton = ()=>{
    let doorbell = document.getElementById("doorbellRinger");
    doorbell.style.display = "block";
}

const hideDoorbellButton = ()=>{
    let doorbell = document.getElementById("doorbellRinger");
    doorbell.style.display = "none";
}

const uCodeOnTheWay = ()=>{
    let onTheWay = document.getElementById("msgReceived");
    onTheWay.style.display = "flex";
}

const hideUCodeOnTheWay = ()=>{
    let onTheWay = document.getElementById("msgReceived");
    onTheWay.style.display = "none";
}

const clearNameInput = ()=>{
    document.getElementById("nameField").value = "";
};

const showSettings = ()=>{
    let settingsDiv = document.getElementById("settingsContainer");
    settingsDiv.style.display = "grid";
}

const hideSettings = ()=>{
    let settingsDiv = document.getElementById("settingsContainer");
    settingsDiv.style.display = "none";
}

const getCurrentLocation = ()=>{
    let currLocation = document.getElementById("settingsCurrentLocation");
    let storedLocation = localStorage.getItem("location");

    if(storedLocation == null)
    {
        showSettings();
    }

    currLocation.innerHTML = `Location: ${storedLocation}`;
}

getCurrentLocation();
