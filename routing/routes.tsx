import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationManager } from "./NavigationManager";
import App from "../src/pages/App";

export const routes = [
  {
    path: "/",
    element: (
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "app",
        element: <App />,
      },
    ],
  },
];
