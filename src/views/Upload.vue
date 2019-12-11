<template>
  <div class="container-xl px-3 px-md-6 my-4 my-lg-4">
    <div class="tabnav mt-3">
      <nav class="tabnav-tabs" aria-label="Foo bar">
        <router-link
          tag="a"
          :to="{ name: 'uploadImage' }"
          class="tabnav-tab"
          active-class="selected"
          >Upload Image</router-link
        >
        <router-link
          tag="a"
          :to="{ name: 'uploadUrl' }"
          class="tabnav-tab"
          active-class="selected"
          >Upload by URL</router-link
        >
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {}
};
</script>
