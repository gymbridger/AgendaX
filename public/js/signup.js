const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document.querySelector('#confirm-password').value.trim();

  console.log("Form values:", username, email, password);

  if (username && email && password === confirmPassword) {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while registering');
    }
  } else {
    alert('Make sure passwords match!')
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", signupFormHandler);
});
