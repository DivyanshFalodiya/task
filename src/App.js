import "./App.css";
import { ThemeModeProvider } from "./context/ThemeModeContext";
import MainComponent from "./components/Main/Main";

// App
function App() {
  return (
    <ThemeModeProvider>
      <MainComponent />
    </ThemeModeProvider>
  );
}

export default App;
