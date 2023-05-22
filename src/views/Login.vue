<!-- Login.vue -->

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      // Perform form validation
      if (!this.email || !this.password) {
        alert('Please fill in all fields');
        return;
      }

      // Prepare the login data to be sent to the server
      const loginData = {
        email: this.email,
        password: this.password,
      };

      // Send the login data to the server
      try {
        const response = await fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (response.ok) {
          // Login successful
          console.log('Login successful:', data.data.token);
          // Save the token to localStorage or Vuex store for future requests
          localStorage.setItem('token', data.data.token);
          // Redirect to a different page or perform additional actions
          // For example, you can use Vue Router to navigate to the dashboard page
          this.$router.push('/dashboard');
        } else {
          // Login failed, display error message to the user
          console.error('Failed to login:', data.error);
          alert('Failed to login. Please check your credentials and try again.');
        }
      } catch (error) {
        // Handle network or server errors
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
      }
    },
  },
};
</script>
