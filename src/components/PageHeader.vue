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
        :to="{ name: 'uploadImage' }"
      >
        Upload
      </router-link>
    </div>
    <div class="Header-item">
      <router-link
        tag="a"
        class="Header-link f4 d-flex flex-items-center"
        :to="{ name: 'how-to-use' }"
      >
        How to use
      </router-link>
    </div>
    <div class="Header-item mr-0" v-if="isLoggedIn">
      <div class="Header-item position-relative mr-0">
        <details class="details-overlay details-reset">
          <summary
            class="Header-link"
            aria-label="View profile and more"
            aria-haspopup="menu"
            role="button"
          >
            <img
              alt="@ittus"
              class="avatar"
              :src="user.photoURL"
              height="20"
              width="20"
            />
            <span class="ml-1 dropdown-caret"></span>
          </summary>
          <div
            class="dropdown-menu dropdown-menu-sw mt-2"
            style="width: 180px"
            role="menu"
          >
            <div class="header-nav-current-user css-truncate">
              <div class="text-gray px-3 pt-2 pb-2 mb-n2 mt-n1">
                Signed in as
                <strong class="css-truncate-target">
                  {{ user.displayName }}
                </strong>
              </div>
            </div>
            <div role="none" class="dropdown-divider"></div>
            <div
              role="menuitem"
              class="dropdown-item cursor-pointer"
              @click="logOut"
            >
              Sign out
            </div>
          </div>
        </details>
      </div>
    </div>
    <div class="Header-item mr-0" v-else>
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

<script>
import { mapGetters, mapState } from "vuex";
import { auth } from "@/firebase";
import { mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapMutations(["signOut"]),
    logOut() {
      auth.signOut().then(() => {
        this.signOut();
        this.$router.push("/");
      });
    }
  }
};
</script>
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

.details-overlay {
  .Header-link {
    outline: none !important;
  }
}

.cursor-pointer:hover {
  cursor: pointer;
}
</style>
