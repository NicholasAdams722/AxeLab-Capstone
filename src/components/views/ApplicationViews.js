//Import guitarBuilder function
import { Outlet, Route, Routes } from "react-router-dom";
import { GuitarBuilder } from "../guitars/guitarBuilder";
import { GuitarContainer } from "../guitars/guitarContainer";
import { CreateContact } from "../Contact/contact";
export const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <> <h1>AxeLab Guitar Builder</h1><div>Forge Your Axe</div><Outlet /></>}
      >
        <Route path="/myguitars" element={<GuitarContainer />} />

        <Route path="/builder" element={<GuitarBuilder />} />

        <Route path="/contact" element={<CreateContact />} />
      </Route>
    </Routes>
  );
};
