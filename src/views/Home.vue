<template>
  <div class="home">
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
  },
  computed: {}
};
</script>
