<template>
  <div class="home">
    <div class="flash flash-success" v-if="message">
      {{ message }}
    </div>
    <gallery class="mt-5" />
  </div>
</template>

<script>
// @ is an alias to /src
import Gallery from "@/components/Gallery.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Gallery
  },
  computed: {
    ...mapState("message", ["message", "type"])
  }
};
</script>
