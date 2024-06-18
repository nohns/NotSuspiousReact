/** @format */

import MainPage from "@/views/MainPage";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";

function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default Routes;
