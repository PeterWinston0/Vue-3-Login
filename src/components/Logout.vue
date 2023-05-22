<template>
    <div>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Clear the stored token from local storage or cookies
        localStorage.removeItem('token'); // Example: remove from local storage
  
        // Redirect the user to the login page or any other appropriate page
        this.$router.push('/login');
      }
    }
  };
  </script>