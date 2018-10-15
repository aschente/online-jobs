<template>
  <div id="main">
    <div class="content">
      <Header/>
      <router-view/>
    </div>
  </div>
</template>

<script>

    import Header from './layouts/Header.vue';

    export default {
       name: 'main-app',
       components: {Header}
    }
</script>
