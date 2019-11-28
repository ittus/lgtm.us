<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <gallery />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Gallery from "@/components/Gallery.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Gallery
  }
};
</script>
