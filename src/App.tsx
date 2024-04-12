import "./App.css";
import { ExamplePage } from "./pages";
import {
  ConnectionProvider,
  QlikApplicationIntanciationProvider,
} from "./module/qlilk";

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
