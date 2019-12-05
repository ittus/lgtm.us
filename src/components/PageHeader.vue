<template>
  <div class="Header">
    <div class="Header-item">
      <a href="#" class="Header-link f4 d-flex flex-items-center">
        <!-- <%= octicon "mark-github", class: "mr-2", height: 32 %> -->
        <img src="../assets/images/logo.png" class="img-logo" />
        <span>LGTM.US</span>
      </a>
    </div>
    <!-- <div class="Header-item">
      <input type="search" class="form-control input-dark" />
    </div> -->
    <div class="Header-item Header-item--full"></div>
    <div class="Header-item mr-0">
      <a href="/login" class="HeaderMenu-link no-underline mr-3">
        Sign&nbsp;in
      </a>
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
