import "./App.css";
import { Button } from "./button";

function App() {
  return (
    <Button
      fullWidth={{ initial: true, sm: false }}
      variant={{ sm: "bright" }}
    />
  );
}

export default App;
