import React from "react";
import { Converter } from "./components/Converter";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Layout>
      <Converter />
    </Layout>
  );
};

export default App;
