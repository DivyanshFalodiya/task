import "./App.css";
import { ThemeModeProvider } from "./context/ThemeModeContext";
import MainComponent from "./components/Main/Main";
import { BrowserRouter } from "react-router-dom";

// App
function App() {
  return (
    <ThemeModeProvider>
      <BrowserRouter basename="/task">
        <MainComponent />
      </BrowserRouter>
    </ThemeModeProvider>
  );
}

export default App;
