<template>
  <div id="app">
    <div class="content-wrap">
      <page-header />
      <router-view />
    </div>
    <footer class="footer mt-6">
      <div class="bg-gray-light">
        <div
          class="container-xl p-responsive f6 py-4 d-sm-flex flex-justify-between flex-row-reverse flex-items-center"
        >
          <ul
            class="list-style-none d-flex flex-items-center mb-3 mb-sm-0 lh-condensed-ultra"
          >
            <li>
              <a
                href="https://github.com/ittus"
                style="color: #959da5;"
                target="_blank"
                ><svg
                  height="20"
                  class="octicon octicon-mark-github d-block"
                  alt="GitHub"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  ></path></svg
              ></a>
            </li>
          </ul>
          <ul class="list-style-none d-flex text-gray">
            <li class="mr-3">© 2019 Lgtm.us</li>
            <li>
              <a
                href="https://www.buymeacoffee.com/8buMYCOog"
                target="_blank"
                class="link-gray"
                >Support us</a
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: {
    PageHeader
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
}

.content-wrap {
  padding-bottom: 4.25rem; /* Footer height */
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4.25rem; /* Footer height */
}
</style>
