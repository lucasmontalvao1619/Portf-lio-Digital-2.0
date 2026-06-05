import { createBrowserRouter } from "react-router";
import { Root, HomePage, ProjectsPage, ProjectDetailPage } from "./Portfolio";

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
