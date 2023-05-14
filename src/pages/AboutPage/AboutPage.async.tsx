import { lazy } from "react";

export const AboutPageAsync = lazy(
  () =>
    new Promise((resolve) =>
      // @ts-ignore
      // Имитация задержки для курса
      setTimeout(() => resolve(import("./AboutPage")), 1000)
    )
);

// lazy(() => import("./AboutPage"))
