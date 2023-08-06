// handle user logout link if session expires so alert showing "Not Found" isn't displayed if logout is clicked after user session times out
async function logout() {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 404) {
      // handle session timeout, redirect back to the homepage
      window.location.href = '/home';
      return;
    }

    if (response.ok) {
      // success, reload page
      document.location.reload();
    } else {
      alert('Failed to logout');
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred while logging out');
  }
}

// event listener for the logout button
const logoutButton = document.getElementById('logout');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
