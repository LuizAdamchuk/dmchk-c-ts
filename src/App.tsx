import "./App.css";
import { ExamplePage } from "./pages";
import {
  ConnectionProvider,
  QlikApplicationIntanciationProvider,
} from "./context";

function App() {
  return (
    <ConnectionProvider>
      <QlikApplicationIntanciationProvider>
        <ExamplePage />
      </QlikApplicationIntanciationProvider>
    </ConnectionProvider>
  );
}

export default App;
