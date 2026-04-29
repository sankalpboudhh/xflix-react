import "./App.css";
import Videos from "./Components/Videos";
import { Switch, Route} from "react-router-dom";
import VideoPage from "./Components/VideoPage";

export const config = {
  endpoint: `https://3ac9b593-3c75-4bc2-a1dc-bc70b4227f0a.mock.pstmn.io/v1/videos`,
};


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Videos />
        </Route>
        <Route path="/video/:id" exact>
          <VideoPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;


