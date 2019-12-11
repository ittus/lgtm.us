import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { auth } from "@/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/how-to-use",
    name: "how-to-use",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HowToUse.vue")
  },
  {
    path: "/upload",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Upload.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "image",
        name: "uploadImage",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/UploadImage.vue")
      },
      {
        path: "uploadUrl",
        name: "uploadUrl",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/UploadByUrl.vue")
      },
      {
        path: "",
        redirect: { name: "uploadImage" }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next({ name: "login" });
  else next();
});

export default router;
