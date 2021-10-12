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
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/admin/Admin.vue"),
    redirect: "/admin/participants",
    children: [
      {
        path: "participants",
        name: "MParticipants",
        component: () => import("../views/admin/MParticipants.vue"),
      },
      {
        path: "companies",
        name: "MCompanies",
        component: () => import("../views/admin/MCompanies.vue"),
      },
      {
        path: "job-title",
        name: "MJobTitle",
        component: () => import("../views/admin/MJobTitle.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
