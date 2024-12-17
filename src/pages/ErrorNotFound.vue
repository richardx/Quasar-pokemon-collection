<template>
  <div class="error-not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'ErrorNotFound',
}
</script>

<style scoped>
.error-not-found {
  text-align: center;
  margin-top: 50px;
}

.error-not-found h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.error-not-found p {
  margin-bottom: 20px;
}

.error-not-found a {
  color: #42b983;
  text-decoration: none;
}
</style>
