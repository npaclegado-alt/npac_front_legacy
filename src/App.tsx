import React from "react";
import ContextProvider from "./contexts";
import RootRoutes from "./routes";

function App(): JSX.Element {
  return (
    <ContextProvider>
     <RootRoutes />
    </ContextProvider>
  );
}

export default App;
