import React from "react";
import ContextProvider from "./contexts";
import RootRoutes from "./routes";
import '../src/styles/global.scss';

function App(): JSX.Element {
  return (
    <ContextProvider>
     <RootRoutes />
    </ContextProvider>
  );
}

export default App;
