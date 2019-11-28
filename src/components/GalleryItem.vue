<template>
  <article
    class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column py-2 py-md-3"
  >
    <div
      class="Bump-link customer-story-card bg-white rounded-1 px-3 pt-3 no-underline d-flex flex-column position-relative height-full"
    >
      <div
        class="customer-story-card-hero position-relative rounded-1"
        style="background-image: url(https://i.imgur.com/Qjqgpr3.gif);"
      >
        <div
          class="customer-story-btn position-absolute top-0 right-0 mt-2 mr-2"
          role="button"
        >
          <span class="btn-mktg mx-auto py-2 px-3" role="button">
            <span class="f2">↗</span>
          </span>
        </div>
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
          <button class="btn" type="button">
            Copy
          </button>
          <span class="Bump-link-symbol"></span>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
.customer-story-card {
  box-shadow: 0 2px 4px rgba(27, 31, 35, 0.15);
}
.customer-story-card-hero {
  height: 200px;
  background-position: 50%;
  background-size: cover;
}
</style>
