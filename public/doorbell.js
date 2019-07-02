async function ring() {

    // var mail = document.getElementById("email").value;
    // var pass = document.getElementById("pass").value;
        
    const rawResponse = await fetch('/ring', {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        // body: JSON.stringify({email: mail, password: pass})
        // body: "DoorBell Ring"
    });
    const content = await rawResponse.json()
    
    if(rawResponse.status == 200)
    {
        console.log("response status 200");
        // window.location = '/dashboard';
    }
    else
    {
        window.location = '/callUp';
    }



}

let ringer = document.getElementById("ringer");
ringer.addEventListener("click",()=>{
    ring();
    console.log("button clicked");
});