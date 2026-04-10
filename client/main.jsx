import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";
import { BrowserRouter, Routes, Route} from "react-router";
import "./main.css";
import { PrivateRoute } from "../imports/ui/PrivateRoute";
import {Counter} from "../imports/ui/Counter";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  root.render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<App/>}/>
      <Route path="counter" element={
        <PrivateRoute>
          <Counter />
        </PrivateRoute>
      }/>
    </Routes>
  </BrowserRouter>
);
});
