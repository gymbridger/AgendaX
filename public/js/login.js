// Define the loginFormHandler function
async function loginFormHandler(event) {
  console.log("form submitted");
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  console.log("Submitting login form");

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("recieved login");
      // If successful, redirect the browser to the profile page
      document.location.replace("/profile");
    } else {
      alert("Invalid credentials. Please try again."); // Display an error message
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  // Attach the named function as the event listener
  loginForm.addEventListener("submit", loginFormHandler);
});
