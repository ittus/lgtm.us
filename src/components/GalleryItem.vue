<template>
  <article
    class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column py-2 py-md-3"
  >
    <div
      class="Bump-link customer-story-card bg-white rounded-1 px-3 pt-3 no-underline d-flex flex-column position-relative height-full"
    >
      <div
        class="customer-story-card-hero position-relative rounded-1"
        :style="bgStyle"
      >
        <!-- <div
          class="customer-story-btn position-absolute top-0 right-0 mt-2 mr-2"
          role="button"
        >
          <span class="btn-mktg mx-auto py-2 px-3" role="button">
            <span class="f2">↗</span>
          </span>
        </div> -->
        <h4 class="loading-indicator" v-if="!isLoaded">
          <span>Loading</span><span class="AnimatedEllipsis"></span>
        </h4>
      </div>

      <div class="pt-3 d-flex flex-column flex-auto">
        <!-- <h1 class="h4-mktg text-gray-dark mb-1">MGM Resorts International</h1>

        <p class="text-gray f6 flex-auto">
          <span class="d-block mb-2">
            Hospitality
          </span>
        </p> -->

        <div
          class="d-flex width-full f5 border-top flex-justify-between py-3 text-blue-mktg"
        >
          <button
            class="btn"
            type="button"
            @click="onCopy"
            :disabled="!imageURL || !this.isLoaded"
          >
            Copy
          </button>
          <span class="Bump-link-symbol"></span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import copy from "copy-to-clipboard";
import { randomImage } from "../firebase";
import { getMarkdown } from "../helpers/markdownGenerator";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      imageURL: null,
      isLoaded: false
    };
  },
  computed: {
    bgStyle() {
      if (!this.imageURL || !this.isLoaded) {
        return null;
      }
      return {
        backgroundImage: `url(${this.imageURL})`
      };
    }
  },
  created() {
    this.getImage();
  },
  methods: {
    ...mapActions("message", ["showMessage"]),
    async getImage() {
      this.isLoaded = false;
      const data = await randomImage();
      if (data) {
        this.imageURL = Object.values(data)[0].actualImageUrl;
      }
      this.isLoaded = true;
    },
    onCopy() {
      if (!this.imageURL) {
        return;
      }
      const copyStr = getMarkdown(this.imageURL);
      copy(copyStr);
      this.showMessage({
        type: "success",
        timeout: 5000,
        message: "Copied to clipboard successfully!"
      });
    }
  }
};
</script>
<style lang="scss">
.customer-story-card {
  box-shadow: 0 2px 4px rgba(27, 31, 35, 0.15);
}
.customer-story-card-hero {
  height: 200px;
  background-position: 50%;
  background-size: cover;
}
.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
