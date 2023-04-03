//Import guitarBuilder function
import { Outlet, Route, Routes } from "react-router-dom";
import { GuitarBuilder } from "../guitars/guitarBuilder";
import { GuitarContainer } from "../guitars/guitarContainer";
import { CreateContact } from "../Contact/contact";
import { EmployeeViews } from "./EmployeeViews";
import { CustomerViews } from "./CustomerViews";

export const ApplicationViews = () => {


  const localGuitarUser =localStorage.getItem("guitar_user")
  const guitarUserObject = JSON.parse(localGuitarUser)
  

  if (guitarUserObject.isAdmin) {
//Return employee Views
return <EmployeeViews />
  }
  else {
    //Return Customer Views
    return <CustomerViews />
  }

}
