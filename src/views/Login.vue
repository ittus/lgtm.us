<template>
  <div class="mt-5">
    <div class="auth-form px-3" id="login">
      <!-- '"` --><!-- </textarea></xmp> -->
      <div>
        <div class="auth-form-header p-0">
          <h1>Sign in to lgtm.us</h1>
        </div>

        <div class="auth-form-body mt-3">
          <button
            @click="onSignInWithGithub"
            tabindex="3"
            class="btn btn-primary btn-block"
            data-disable-with="Signing in…"
          >
            Sign in with Github
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { auth } from "@/firebase";

export default {
  methods: {
    onSignInWithGithub() {
      console.log("sign in");
      const provider = new firebase.auth.GithubAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(result => {
          var user = result.user;
          console.log(user);
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.auth-form-header {
  margin-bottom: 15px;
  color: #333;
  text-align: center;
  text-shadow: none;
  background-color: initial;
  border: 0;
  margin: 0;
  border-radius: 3px 3px 0 0;

  h1 {
    font-size: 24px;
    font-weight: 300;
    letter-spacing: -0.5px;
  }
}
.auth-form {
  width: 340px;
  margin: 0 auto;
}

.auth-form-body {
  border-top: 1px solid #d8dee2;
  border-radius: 5px;
  padding: 20px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #d8dee2;
}
</style>
