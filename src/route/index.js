import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
      },
      {
        path: "upload",
        name: "Upload",
        component: () => import("../views/Upload.vue"),
      },
      {
        path: "meetings/:id/",
        name: "Meetings",
        component: () => import("../views/Meetings.vue"),
        props: true,
      },
      {
        path: "participants",
        name: "MParticipants",
        component: () => import("../views/MParticipants.vue"),
      },
      {
        path: "companies",
        name: "MCompanies",
        component: () => import("../views/MCompanies.vue"),
      },
      {
        path: "job-titles",
        name: "MJobTitles",
        component: () => import("../views/MJobTitle.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
