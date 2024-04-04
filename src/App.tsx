import "./App.css";
import { ExamplePage } from "./pages";
import {
  QlikConnectionProvider,
  QlikApplicationIntanciationProvider,
} from "./context";

function App() {
  return (
    <QlikConnectionProvider>
      <QlikApplicationIntanciationProvider>
        <ExamplePage />
      </QlikApplicationIntanciationProvider>
    </QlikConnectionProvider>
  );
}

export default App;
