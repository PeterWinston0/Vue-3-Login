<template>
  <header>
    <div class="wrapper">
      <nav v-if="showNav">
        <RouterLink to="/dashboard" class="px-4">Dashboard</RouterLink>
        <RouterLink to="/createproject" class="px-4">Create</RouterLink>
        <button @click="logout">Logout</button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  computed: {
    showNav() {
      return !['/login', '/registration'].includes(this.$route.path);
    },
    methods: {
      logout() {
        // Clear the stored token from local storage or cookies
        localStorage.removeItem('token'); // Example: remove from local storage
  
        // Redirect the user to the login page or any other appropriate page
        this.$router.push('/login');
      }
    }
  },
};
</script>

<style scoped>

</style>
