import { createContext, useContext, useState } from "react";

//1. Create a Context
const CounterContext = createContext();

// 2. Create parent Component
function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount(c => c + 1);
  const decrease = () => setCount(c => c - 1);
  return <CounterContext.Provider value={{ count, increase, decrease }}>
    <span>{children}</span>
  </CounterContext.Provider>
}

//3. Create Child Component to help implementing the common tasks
function Count() {
  const { count } = useContext(CounterContext)
  return <span>{count}</span>
}

function Label({ children }) {
  return <span>{children}</span>
}

function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>
}

function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>
}
//4. Add Child components as properties to parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;