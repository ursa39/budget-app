import './App.scss';
import Form from './Form';
import BudgetList from './BudgetList';
import PriceSum from './PriceSum';
import { useState } from 'react';

function App() {
  const [ list, setList ] = useState([]); 
  const listState = {
    list,
    setList
  }

  return (
    <div className="app">
      <h1>Budget</h1>
      <BudgetList listState={listState}></BudgetList>
      <Form listState={listState} ></Form>
      <PriceSum listState={listState} ></PriceSum>
    </div>
  );
}

export default App;
