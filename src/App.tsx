import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page";
import RegionalSearch from "./pages/regional-search";
import GeneratePolygon from "./pages/generate-polygon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "regional_search",
    element: <RegionalSearch />,
  },
  {
    path: "generate_polygon",
    element: <GeneratePolygon />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
