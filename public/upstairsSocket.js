
  let soundEnableButton = document.getElementById("allowSound");

  soundEnableButton.addEventListener("click", ()=>{
    soundEnableButton.style.display = "none";
    // console.log("Turn on sound button clicked");
  });
  
  let doorbellSoundSource = document.getElementById("doorbellSoundPlayer");

  var socket = io.connect('https://ucode-doorbell.herokuapp.com/');
  // var socket = io.connect('localhost:3000');
  socket.on('arrival', function (data) {

    if(data.locationName == localStorage.getItem("location"))
    {
      console.log(data.studentName);
      // socket.emit('my other event', { my: 'data' });
      createStudentCard(data.studentName)
      playSound();
    }

    
  });


  const createStudentCard = (studentName)=>{
    const card = document.createElement("div");
    const title = document.createElement("h2");
    const arrivalName = document.createElement("p");
    const arrivalTime = document.createElement("p");
    const dismissBtn = document.createElement("button")

    title.innerHTML = "Student Arrival";
    arrivalName.innerHTML = studentName;
    
    let time = new Date(Date.now());
    var options = { 
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long'
    };

    arrivalTime.innerHTML = time.toLocaleDateString('en-US', options);
    dismissBtn.innerHTML = "Dismiss"

    card.appendChild(title);
    card.appendChild(arrivalName);
    card.appendChild(arrivalTime);
    card.appendChild(dismissBtn);

    card.classList.add("card");

    dismissBtn.addEventListener("click", ()=>{
        document.getElementById("root").removeChild(card);
    });

    document.getElementById("root").appendChild(card);
  }

  const playSound = ()=>{
    console.log(doorbellSoundSource);
    doorbellSoundSource.play();
  }

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
    currLocation.innerHTML = `Location: ${storedLocation}`;
  }

  getCurrentLocation();

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
