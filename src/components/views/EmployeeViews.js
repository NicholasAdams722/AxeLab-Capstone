//Import guitarBuilder function
import { Outlet, Route, Routes } from "react-router-dom";
import { AllOrders } from "../guitars/AllOrders";
import { Messages } from "../guitars/Messages";
export const EmployeeViews = () => {
  return (
    <Routes>

<Route path="/allorders" element={<AllOrders />} />
<Route path="/messages" element={<Messages />} />
    </Routes>
  );
};
