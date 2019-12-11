<template>
  <div class="text-center">
    <span class="Progress" v-show="isShowProgress">
      <span class="bg-green" :style="{ width: progress + '%' }"></span>
    </span>
    <vue2-dropzone
      ref="myVueDropzone"
      class="mt-5"
      id="dropzone"
      :options="dropzoneOptions"
      :useCustomSlot="true"
      @vdropzone-file-added="onAddFile"
      @vdropzone-removed-file="onRemoveFile"
    >
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
        <div class="subtitle">
          ...or click to select a file from your computer
        </div>
      </div>
    </vue2-dropzone>

    <div>
      <button
        class="btn ml-2 mt-3"
        type="button"
        :disabled="!file"
        @click="onUpload"
      >
        Upload
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { storage, db } from "@/firebase";
import { mapState, mapActions, mapMutations } from "vuex";
import uuidv1 from "uuid/v1";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  components: {
    vue2Dropzone
  },
  data() {
    return {
      file: null,
      hash: "",
      progress: 0,
      dropzoneOptions: {
        url: "/",
        thumbnailWidth: 250,
        maxFilesize: 10,
        autoProcessQueue: false,
        maxFiles: 1,
        addRemoveLinks: true,
        acceptedFiles: "image/*"
      }
    };
  },
  computed: {
    ...mapState(["user"]),
    isShowProgress() {
      return this.progress > 0 && this.progress <= 100;
    }
  },
  methods: {
    ...mapActions("message", ["showMessage"]),
    ...mapMutations("message", ["clearMessage"]),

    chooseImage() {
      this.$refs.fileInput.click();
    },
    onAddFile(file) {
      if (this.file) {
        this.$refs.myVueDropzone.removeFile(this.file);
      }
      this.file = file;
    },
    onRemoveFile() {
      this.file = null;
    },
    async onUpload() {
      this.hash = uuidv1();
      var storageRef = storage
        .ref()
        .child(`temp/${this.user.uid}/${this.hash}`);
      var uploadTask = storageRef.put(this.file);
      const that = this;
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          this.progress = progress;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        error => {
          console.error(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async downloadURL => {
            console.log("File available at", downloadURL);
            await that.insertToDB(downloadURL);
            this.reset();
            this.showMessage({
              type: "success",
              timeout: 10000,
              message:
                "Thank you for uploading! We will review the image as soon as possible."
            });
          });
        }
      );
    },
    async insertToDB(fileURL) {
      return db
        .ref("temp")
        .child(this.hash)
        .set({
          actualImageUrl: fileURL,
          hash: this.hash,
          id: this.hash,
          uploadedBy: this.user.uid,
          uploadedAt: new Date().toISOString()
        });
    },
    reset() {
      this.hash = "";
      this.progress = 0;
      this.file = null;
      this.imageData = null;
      this.$refs.myVueDropzone.removeAllFiles();
    },
    beforeDestroy() {
      this.clearMessage();
    }
  }
};
</script>

<style lang="scss" scoped>
#dropzone {
  position: relative;
  background: white;
  border-radius: 5px;
  border: 2px dashed rgb(0, 135, 247);
  border-image: none;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
</style>
