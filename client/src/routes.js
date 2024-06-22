import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
// pages
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import VideoUploadPage from "./pages/VideoUploadPage";
import VideosPage from "./pages/VideosPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import UserCreatePage from './sections/@dashboard/user/new';
import MonitorsPage from "./pages/MonitorsPage";
import UserUpdatePage from "./sections/@dashboard/user/edit";
// components
import ProtectedRoute from './components/ProtectedRoutes';
import RoomCreatePage from "./sections/@dashboard/rooms/new";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: (
        // <ProtectedRoute>
          <DashboardLayout />
        //  </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "room", element: <VideosPage /> },
        {path: "room/new", element: <RoomCreatePage />},
        { path: "edit/:id", element: <UserUpdatePage /> },
        { path: 'user/new', element: <UserCreatePage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "video-upload", element: <VideoUploadPage /> },
        { path: "room/:id", element: <MonitorsPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "videos/upload",
      element: <VideoUploadPage />,
    },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
