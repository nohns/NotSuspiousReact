import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import HomePage from "./HomePage";
import BookPage from "./BookPage";
import ListPage from "./ListPage";
import EditPage from "./EditPage";

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/appointments/edit" element={<EditPage />} />
      <Route path="/appointments" element={<ListPage />} />
      <Route path="/book" element={<BookPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </RouterRoutes>
  );
}

export default Routes;
