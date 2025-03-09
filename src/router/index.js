import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PreventionView from "@/views/PreventionView.vue";
import InvestigationView from "@/views/InvestigationView.vue";
import InquiryView from "@/views/InquiryView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/prevention",
    name: "prevention",
    component: PreventionView,
  },
  {
    path: "/investigation",
    name: "investigation",
    component: InvestigationView,
  },
  {
    path: "/inquiry",
    name: "inquiry",
    component: InquiryView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
