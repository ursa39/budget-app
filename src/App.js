import './App.scss';
import Form from './app/Form';
import CurrentList from './features/current/CurrentList';

function App() {  
  return (
    <div className="app">
      <h1>Budget</h1>
      <Form ></Form>
      <CurrentList></CurrentList>
    </div>
  );
}

export default App;
