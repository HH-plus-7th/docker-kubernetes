import { defineConfig } from "vite";

// Docker/nginx 루트 서빙 시 base는 "/". GitHub Pages 등 서브경로 배포 시 VITE_BASE 미설정이면 "/front_7th_chapter4-1/vanilla/"
const base =
  process.env.VITE_BASE ??
  (process.env.NODE_ENV === "production" ? "/front_7th_chapter4-1/vanilla/" : "");

export default defineConfig({ base });
