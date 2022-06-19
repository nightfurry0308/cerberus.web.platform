import Layout from "./pages/layout";
import 'antd/dist/antd.dark.min.css'
import { BrowserRouter } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { AppContext } from "./providers";
import { getGlobalSetting } from "./components/Setting/services";
import { GlobalSettingStateType } from "./common/DataType";
import { changeResponseToClient } from "./common/Utility";

function App() {
  const {appState, setAppState} = useContext(AppContext)

  useEffect(() => {
    getGlobalSetting().then((params: GlobalSettingStateType) => {      
      setAppState({
        globalSetting: {
          botTableAutoUpdateTime: changeResponseToClient(params).botTableTime,
          urls: changeResponseToClient(params).urls
        }
      })
    })
  }, [])

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
