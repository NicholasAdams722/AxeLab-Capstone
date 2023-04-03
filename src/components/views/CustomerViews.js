//Import guitarBuilder function
import { Outlet, Route, Routes } from "react-router-dom";
import { GuitarBuilder } from "../guitars/guitarBuilder";
import { GuitarContainer } from "../guitars/guitarContainer";
import { CreateContact } from "../Contact/contact";

export const CustomerViews = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/myguitars" element={<GuitarContainer />} />

        <Route path="/builder" element={<GuitarBuilder />} />

        <Route path="/contact" element={<CreateContact />} />
      </Route>
    </Routes>
  );
};
