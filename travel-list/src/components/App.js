import { useState } from "react";
import Logo from "./Logo.js"
import Form from "./Form.js"
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";

export default function App() {
  const [items, setItem] = useState([]);

  function handleAddItems(item) {
    setItem(i => [...i, item])
  }
  function handleDeleteItem(id) {
    setItem(items => items.filter(i => i.id !== id)) // Basically pien exclude khi
  }

  function handleItemPacked(id) {
    setItem(item => item.map(i => i.id === id ? { ...i, packed: !i.packed } : i));
  }
  function handleClearList() {
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if (confirmed) setItem([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onItemPacked={handleItemPacked} onClearList={handleClearList} />
      <Stats items={items} />
    </div>
  )
}