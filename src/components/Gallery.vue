<template>
  <div>
    <div class="d-flex flex-row-reverse mx-4">
      <button class="btn mr-2" type="button" @click="refresh">Refresh</button>
    </div>
    <div
      class="d-flex flex-wrap flex-items-stretch flex-justify-center container-xl gutter-sm-condensed gutter-md mx-auto p-responsive"
    >
      <gallery-item v-for="idx in 8" :key="idx" ref="galleryItem" />
    </div>
  </div>
</template>

<script>
import GalleryItem from "./GalleryItem.vue";

export default {
  components: {
    GalleryItem
  },
  methods: {
    refresh() {
      if (!this.$refs.galleryItem) {
        return;
      }
      this.$refs.galleryItem.forEach(item => item.getImage());
    }
  }
};
</script>

<style lang="scss" scoped></style>
