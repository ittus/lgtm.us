<template>
  <div>
    <form class="pb-2" @submit.prevent="submit">
      <div class="container-md clearfix">
        <div class="col-10 float-left">
          <dl class="form-group" :class="{ errored: !!errorMessage }">
            <dt><label for="image-url">Image URL</label></dt>
            <dd>
              <input
                class="form-control"
                type="text"
                v-model="url"
                id="image-url"
                maxlength="300"
              />
            </dd>
            <dd class="error" id="form-error-text" v-if="errorMessage">
              {{ errorMessage }}
            </dd>
          </dl>
        </div>
        <div class="col-2 float-left">
          <button
            type="submit"
            class="btn btn-primary btn-submit-url ml-2"
            :disabled="isSubmiting"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { db } from "@/firebase";
import uuidv1 from "uuid/v1";

export default {
  data() {
    return {
      url: "",
      errorMessage: "",
      isSubmiting: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions("message", ["showMessage"]),
    isValidURL(url) {
      if (!url || !url.startsWith("http")) {
        return false;
      }
      return true;
    },
    validate() {
      if (!this.isValidURL(this.url)) {
        this.errorMessage = "Please enter a valid url";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
    async submit() {
      if (!this.validate()) {
        return;
      }
      try {
        await this.saveURL();
        this.showMessage({
          type: "success",
          timeout: 10000,
          message:
            "Thank you for submitting! We will review the image as soon as possible."
        });
        this.url = "";
        this.errorMessage = "";
      } catch (err) {
        this.showMessage({
          type: "error",
          timeout: 10000,
          message: "There is an unexpected error. Please contact admin@lgtm.us"
        });
      }
    },
    saveURL() {
      const hash = uuidv1();
      return db
        .ref("temp")
        .push()
        .set({
          actualImageUrl: this.url,
          hash: hash,
          id: hash,
          uploadedBy: this.user.uid,
          uploadedAt: new Date().toISOString()
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#image-url {
  width: 100%;
}

.btn-submit-url {
  margin-top: 42px;
}
</style>
