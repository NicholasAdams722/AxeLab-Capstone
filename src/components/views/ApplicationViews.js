//Import guitarBuilder function
import { Outlet, Route, Routes } from "react-router-dom";
import { GuitarBuilder } from "../guitars/guitarBuilder"
import { DisplayMyGuitar } from "../guitars/myGuitars";
import {GuitarSearch} from "../guitars/guitarSearch"
import { GuitarContainer } from "../guitars/guitarContainer";
export const ApplicationViews = () => {
	return (
<Routes>
      <Route
        path="/" element={
          <>
            <h1>AxeLab Guitar Builder</h1>
            <div>Forge your Axe</div>

            <Outlet />
          </>
        } >

            
		<Route path="/myguitars" element={ <GuitarContainer />
    } />
    
    <Route path="/builder" element={ <GuitarBuilder />} />
      </Route>
    </Routes>
  );

}

