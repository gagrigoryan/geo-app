import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page";
import RegionalSearch from "./pages/regional-search";
import GeneratePolygon from "./pages/generate-polygon";
import SegmentIntersection from "./pages/segment-intersection";

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
  {
    path: "segment_intersection",
    element: <SegmentIntersection />,
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
