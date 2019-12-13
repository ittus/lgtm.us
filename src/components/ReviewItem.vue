<template>
  <article class="Box-row d-flex" id="pa-styfle">
    <a class="text-gray f6 text-center" href="#pa-styfle" style="width: 16px;">
      {{ index + 1 }}
    </a>

    <div class="mx-3">
      <a class="d-inline-block" target="_blank" :href="item.actualImageUrl"
        ><img
          class="rounded-1"
          :src="item.actualImageUrl"
          width="48"
          height="48"
          alt="@styfle"
      /></a>
    </div>

    <div class="d-sm-flex flex-auto">
      <div class="col-sm-8 d-md-flex">
        <div class="col-md-6">
          <h1 class="h3 lh-condensed">
            <span>
              {{ item.uploadedBy }}
            </span>
          </h1>

          <p class="f4 text-normal mb-1">
            <span class="link-gray">
              {{ item.uploadedAt }}
            </span>
          </p>
        </div>
      </div>

      <div class="col-sm-4 d-flex flex-sm-justify-end ml-sm-3">
        <div class="mr-2">
          <button
            @click="onDelete"
            :disabled="isProcessing"
            name="commit"
            class="btn btn-sm btn-block btn-danger"
          >
            Delete
          </button>
        </div>
        <div>
          <button
            class="btn btn-sm btn-primary btn-block "
            @click="onAccept"
            :disabled="isProcessing"
          >
            <span class="ml-1">
              Accept
            </span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { db, getNextIndex } from "@/firebase";
import { mapActions } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        actualImageUrl: "https://i.imgur.com/Yx8TSFc.gif",
        uploadedBy: "An User",
        uploadedAt: new Date().toISOString()
      })
    },
    index: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      isProcessing: false
    };
  },
  methods: {
    ...mapActions("message", ["showMessage"]),
    async checkDuplicate() {
      const duplicated = (
        await db
          .ref("images")
          .orderByChild("actualImageUrl")
          .equalTo(this.item.actualImageUrl)
          .once("value")
      ).val();
      if (duplicated) {
        console.log("Exist item", duplicated);
        this.showMessage({
          type: "error",
          timeout: 5000,
          message: `URL exists`
        });
        return true;
      }

      return false;
    },
    async onAccept() {
      try {
        this.isProcessing = true;
        const duplicated = await this.checkDuplicate();
        if (duplicated) {
          return;
        }
        // TODO: Solve concurrency issue
        const nextIndex = await getNextIndex();
        if (!nextIndex) {
          throw new Error("Can't not find index");
        }
        const dataToSave = { ...this.item, key: null, index: nextIndex };
        await db
          .ref("images")
          .child(this.item.key)
          .set(dataToSave);
        await this.onDelete();
        this.showMessage({
          type: "success",
          timeout: 5000,
          message: `Inserted item ${nextIndex + 1}`
        });
      } finally {
        this.isProcessing = false;
      }
    },
    async onDelete() {
      this.isProcessing = true;
      await db
        .ref("temp")
        .child(this.item.key)
        .remove();
      this.$emit("remove", this.item);
      this.isProcessing = false;
    }
  }
};
</script>
