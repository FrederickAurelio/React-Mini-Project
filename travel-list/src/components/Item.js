export default function Item({ item, onDeleteItem, onItemPacked }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onItemPacked(item.id)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
