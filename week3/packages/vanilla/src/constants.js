// Vite base와 동기화 (Docker 빌드 시 VITE_BASE=/ 이면 "/", GitHub Pages 등은 "/front_7th_chapter4-1/vanilla/")
export const BASE_URL = import.meta.env.BASE_URL;
