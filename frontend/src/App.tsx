import React from 'react';
import Layout from "./pages/layout";
import 'antd/dist/antd.dark.min.css'
import { BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}

export default App;
