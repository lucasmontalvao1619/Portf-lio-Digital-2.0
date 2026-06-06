import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { Root } from "./pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "projetos", Component: ProjectsPage },
      { path: "projetos/:slug", Component: ProjectDetailPage },
    ],
  },
]);
