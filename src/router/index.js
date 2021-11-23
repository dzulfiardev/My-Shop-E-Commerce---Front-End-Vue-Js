import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Category from "../views/Category.vue";
import SearchPage from "../views/SearchPage.vue";
import CheckOut from "../views/CheckOut.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import Dashboard from "../views/Main/Dashboard.vue";
import Product from "../views/Main/Product.vue";
import AppSettings from "../views/Main/AppSettings.vue";
import Profile from "../views/Main/Profile.vue";
import UserManagement from "../views/Main/UserManagement.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/category/:category_slug",
    name: "Category",
    component: Category,
  },
  {
    path: "/product-detail/:product_slug",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/search/:keyword",
    name: "SearchPage",
    component: SearchPage,
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: CheckOut,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/app-settings",
    name: "AppSettings",
    component: AppSettings,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user-management",
    name: "UserManagement",
    component: UserManagement,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let loggedIn = localStorage.getItem("loggedIn");
  if (to.name === "Login" && loggedIn) {
    next({ name: "Dashboard" });
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// router.beforeEach((to,from,next) => {
//   const publicPages     = ['/login', '/register', '/', '/checkout'];
//   const authPages       = ['/login', '/register'];
//   const loggedRequired  = authPages.includes(to.path);
//   const authRequired    = !publicPages.includes(to.path);
//   const loggedIn        = localStorage.getItem('loggedIn');

//   if(authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }

//   if (loggedRequired && loggedIn) {
//     next('/');
//   } else {
//     next();
//   }
// })

export default router;
