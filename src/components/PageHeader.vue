<template>
  <div class="Header">
    <div class="Header-item">
      <router-link
        tag="a"
        class="Header-link f4 d-flex flex-items-center"
        to="/"
      >
        <img src="../assets/images/logo.png" class="img-logo" />
        <span>LGTM.US</span>
      </router-link>
    </div>

    <!-- <div class="Header-item">
      <input type="search" class="form-control input-dark" />
    </div> -->
    <div class="Header-item Header-item--full"></div>
    <div class="Header-item">
      <router-link
        tag="a"
        class="Header-link f4 d-flex flex-items-center"
        :to="{ name: 'how-to-use' }"
      >
        How to use
      </router-link>
    </div>
    <div class="Header-item mr-0">
      <router-link
        tag="a"
        to="/login"
        class="HeaderMenu-link no-underline border border-gray-dark rounded-1 px-2 py-1 mr-3"
      >
        Sign&nbsp;in
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.HeaderMenu-link {
  color: #fff;
  transition: 0.4s;
  font-size: 1rem;
  font-weight: 600;
}

.img-logo {
  width: 32px;
  margin-right: 0.5rem;
}
</style>
