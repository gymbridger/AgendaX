const loginFormHandler = async (event) => {
  console.log("form submitted");
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#loginPageUsername").value.trim();
  const password = document.querySelector("#loginPagePassword").value.trim();
  console.log(username, password);
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
      alert(response.statusText);
    }
  }
};

const loginForm = document.getElementById("loginPageForm");

loginForm.addEventListener("submit", loginFormHandler);

// sign up still does not route
// const signupFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#username-signup').value.trim();
//   const email = document.querySelector('#email-signup').value.trim();
//   const password = document.querySelector('#password-signup').value.trim();

//   if (name && email && password) {
//     const response = await fetch('/api/users/login', {
//       method: 'POST',
//       body: JSON.stringify({ name, email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupFormHandler);
