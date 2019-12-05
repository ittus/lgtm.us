<template>
  <div class="home">
    <div class="flash flash-success">
      Flash message goes here.
    </div>
    <gallery class="mt-5" />
  </div>
</template>

<script>
// @ is an alias to /src
import Gallery from "@/components/Gallery.vue";

export default {
  name: "home",
  components: {
    Gallery
  }
};
</script>
