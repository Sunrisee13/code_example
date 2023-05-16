import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import { RouteConfig } from "shared/config/RouteConfig/RouteConfig";

const AppRouter = () => {
  const {t} = useTranslation()
  return (
    <Suspense fallback={<div>{t("Загрузка")} ...</div>}>
      <Routes>
        {Object.values(RouteConfig).map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={<div className="page-wrapper">{element}</div>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
