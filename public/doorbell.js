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

    let body = JSON.stringify({studentName: nameValue})

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hideDoorbellButton();
            uCodeOnTheWay();

            setTimeout(()=>{
                hideUCodeOnTheWay();
                showNameForm();
            }, 7000)
        }
    };
    xhttp.open("POST", "/ring", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(body);

}

const showNoConnectionMsg = ()=>{
    console.log("We didn't get a response");
}

let ringer = document.getElementById("ringer");
ringer.addEventListener("click",()=>{
    ring();
    console.log("button clicked");
});

let nameButton = document.getElementById("nameButton");
nameButton.addEventListener("click",()=>{
    
    console.log("Name Entered?");
    hideNameForm();
    showDoorbellButton();
});

const showNameForm = ()=>{
    let nameForm = document.getElementById("nameForm");
    nameForm.style.display = "flex";
}

const hideNameForm = ()=>{
    let nameForm = document.getElementById("nameForm");
    nameForm.style.display = "none";
}

const showDoorbellButton = ()=>{
    let doorbell = document.getElementById("ringer");
    doorbell.style.display = "block";
}

const hideDoorbellButton = ()=>{
    let doorbell = document.getElementById("ringer");
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

