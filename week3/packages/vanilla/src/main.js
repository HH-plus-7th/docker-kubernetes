import { initRender } from "./render";
import { createRouter, initRoutes } from "./router";
import { createStores, getInitStates } from "./stores";
import { BASE_URL } from "./constants";

const enableMocking = async () => {
  // 프로덕션(실제 API 연동)에서는 MSW 비활성화
  if (import.meta.env.PROD) return;
  const { worker } = await import("./mocks/browser.js");
  await worker.start({
    serviceWorker: { url: `${BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: "bypass",
  });
};

const router = createRouter();
router.query = { current: undefined };
const stores = createStores(getInitStates(window.__INITIAL_DATA__));
initRoutes(router);

function main() {
  initRender({ router, stores });
}

enableMocking().then(main);
