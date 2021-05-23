import "./App.scss";
import Form from "./app/Form";
import CurrentList from "./features/current/CurrentList";
import Controller from "./app/Controller";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Budget</h1>
        <Controller></Controller>
      </header>
      <Form></Form>
      <CurrentList></CurrentList>
    </div>
  );
}

export default App;
