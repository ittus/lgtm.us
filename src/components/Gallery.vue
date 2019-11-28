<template>
  <div
    class="d-flex flex-wrap flex-items-stretch flex-justify-center container-xl gutter-sm-condensed gutter-md mx-auto p-responsive"
  >
    <gallery-item v-for="idx in 8" :key="idx" />
  </div>
</template>

<script>
import GalleryItem from "./GalleryItem.vue";

export default {
  components: {
    GalleryItem
  }
};
</script>

<style lang="scss" scoped></style>
