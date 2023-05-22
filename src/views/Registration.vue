<template>
    <div>
      <h1>Registration</h1>
      <form @submit="register">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      async register(event) {
        event.preventDefault();
  
        // Perform form validation
        if (!this.name || !this.email || !this.password) {
          alert('Please fill in all fields');
          return;
        }
  
        // Send registration request to server
        try {
          const response = await fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              password: this.password
            })
          });
  
          const data = await response.json();
  
          // Check for successful registration
          if (response.ok) {
            alert('Registration successful');
            // Redirect to a different page or perform additional actions
            // For example, you can use Vue Router to navigate to the login page
            this.$router.push('/login');
          } else {
            // Display error message if registration failed
            alert(data.error);
          }
        } catch (error) {
          console.error(error);
          alert('An error occurred while registering');
        }
      }
    }
  };
  </script>
  