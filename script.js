
//check access token

  function checkAccessToken() {
    return localStorage.getItem("accessToken");
  }
  
  //toggle sections
  function ToggleSections() {
    const signupPage = document.getElementsByClassName("container")[0];
    const profilePage = document.getElementById("profile-page");
    const isAccessTokenAvailable = checkAccessToken();

    signupPage.style.display = isAccessTokenAvailable ? "none" : "block";
    profilePage.style.display = isAccessTokenAvailable ? "block" : "none";
  
    if (isAccessTokenAvailable) {
      displayProfileDetails();
    }
  }
  
  //save user in local storage
  function saveUser(user) {
    const accessToken = genererateAccessToken();
    user.accessToken = accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  }
  
  //generate access token
  
  function genererateAccessToken() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const tokenLength = 16;
    let accessToken = "";
  
    for (let i = 0; i < tokenLength; i++) {
      accessToken += characters.charAt(Math.floor(Math.random() * tokenLength));
    }
    return accessToken;
  }
  
  //getuser to get the data from the LS
  function getuser() {
    return JSON.parse(localStorage.getItem("user")) || null;
  }
    
  // Show data in profile section
  function displayProfileDetails() {
    const user = getuser();
  
    document.getElementById("profile-fullname").textContent = user.fullname;
    document.getElementById("profile-email").textContent = user.email;
    document.getElementById("profile-password").textContent = user.password;
  }
  
  //Clear user data from LS
  function clearUser() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }

  //validate and parent function
  document.getElementById("signup-button").addEventListener("click", function () {
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorElement = document.getElementById("signup-error");
    const successElement = document.getElementById("signup-success");
  
    if (fullname && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const user = { fullname, email, password };
        saveUser(user);
        errorElement.textContent = "";
        successElement.textContent = "Successfully Signed Up!";
        ToggleSections();
        
      } else {
        errorElement.textContent = "Password mismatch";
        successElement.textContent = "";
      }
    } else {
      errorElement.textContent = "Error: All fields are mandatory.";
      successElement.textContent = "";
    }
  });
  
  //logout listener
  document.getElementById("logout-button").addEventListener("click", function () {
    clearUser();
    ToggleSections();
    const fullname = document.getElementById("fullname").value="";
    const email = document.getElementById("email").value="";
    const password = document.getElementById("password").value="";
    const confirmPassword = document.getElementById("confirm-password").value="";
    const successElement = document.getElementById("signup-success").textContent = "";
  });
  
  //load Event Listener
  window.addEventListener("load", ToggleSections);