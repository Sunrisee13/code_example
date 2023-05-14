import { lazy } from "react";

export const MainPageAsync = lazy(
  () =>
    new Promise((resolve) =>
      // @ts-ignore
      // Имитация задержки для курса
      setTimeout(() => resolve(import("./MainPage")), 1000)
    )
);

// lazy(() => import("./MainPage"))
