import React, { useContext, useEffect } from "react";
import "./App.css";

import Routing from "./Pages/Routing";
import { Type } from "./Utility/action.type";
import { authentication } from "./Utility/Firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { type } from "@testing-library/user-event/dist/type";

function App() {
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    authentication.onAuthStateChanged((loggedIn) => {
      console.log(loggedIn)
      if (loggedIn) {
        dispatch({
          type: Type.SET_USER,
          user: loggedIn,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
