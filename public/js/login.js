async function loginFormHandler(event) {
  event.preventDefault();

  // collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log("Submitting login form");

  if (username && password) {
    //  POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("received login");
    if (response.ok) {
      // success, redirect to profile
      document.location.replace("/profile");
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  // event listener runs loginFormHandler function
  loginForm.addEventListener("submit", loginFormHandler);
});
