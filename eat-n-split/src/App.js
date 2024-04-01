import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [dataUser, setDataUser] = useState([...initialFriends])
  const [activeUser, setActiveUser] = useState(null)
  const user = dataUser.find(u => u.id === activeUser);

  const [openAddForm, setOpenAddForm] = useState(false)

  return (
    <div className="app">
      <div className="sidebar">
        <Friend setActiveUser={setActiveUser} activeUser={activeUser} dataUser={dataUser} />
        {openAddForm && <AddFriendForm setDataUser={setDataUser} setOpenAddForm={setOpenAddForm}/>}
        <button className="button" onClick={() => setOpenAddForm(e => !e)}>
          {openAddForm ? "Close" : "Add friend"}
        </button>
      </div>
      {activeUser && (
        <SplitBillForm user={user} setDataUser={setDataUser} dataUser={dataUser} setActiveUser={setActiveUser} key={user.id}/>
      )}
    </div>
  )
}

function Friend({ setActiveUser, activeUser, dataUser }) {
  return (
    <ul>
      {dataUser.map(friend => {
        return <FriendList key={friend.id} img={friend.image} name={friend.name} id={friend.id} balance={friend.balance} setActiveUser={setActiveUser} activeUser={activeUser} />
      })}
    </ul>
  )
}
function FriendList({ img, name, id, balance, setActiveUser, activeUser }) {
  const money = balance !== 0 ? (balance > 0 ? "green" : "red") : "";
  const desc = balance !== 0 ? (balance > 0 ? `${name} owes you ${balance}$` : `You owes ${name} ${Math.abs(balance)}$`) : `You and ${name} are even`;

  return (
    <li key={id} className={`${activeUser === id ? "selected" : ""}`}>
      <img src={img} alt={img} />
      <h3>{name}</h3>
      <p className={money}>{desc}</p>
      <button className="button" onClick={() => setActiveUser(id)}>{`${activeUser === id ? "Close" : "Select"}`}</button>
    </li>
  )
}
function AddFriendForm({ setDataUser , setOpenAddForm}) {
  const newId = new Date().getTime()
  const [name, setName] = useState("")
  const [image, setImage] = useState(`https://i.pravatar.cc/48?u=${newId}`)
  const handleAddFriend = function(e){
    e.preventDefault()
    console.log();
    setDataUser(data => {
      return [...data, {name, image, balance:0, id:newId}]
    })
    setName("")
    setImage("")
    setOpenAddForm(false)
  }
  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <p>🧑‍🤝‍🧑Friend name</p>
      <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
      <p>🖼️Image Url</p>
      <input type="text" value={image} onChange={(e)=>{setImage(e.target.value)}}/>
      <button className="button">Add</button>
    </form>
  )
}
function SplitBillForm({ user, setDataUser, setActiveUser }) {
  const [bill, setBill] = useState("")
  const [mePay, setMePay] = useState("")
  const friendExp = (bill - mePay) <= 0 ? "" : bill - mePay;
  const [whoPay, setWhoPay] = useState("you");

  function submit(e) {
    e.preventDefault();
    setDataUser(arr => arr.map(data => {
      if (data.id === user.id) {
        if (whoPay === "you")
          return { ...data, balance: data.balance + friendExp }
        if (whoPay === "friend")
          return { ...data, balance: data.balance - mePay }
      }
      return data
    }))
    setBill("")
    setMePay("")
    setWhoPay("you")
    setActiveUser(null)
  }

  return (
    <form className="form-split-bill" onSubmit={submit}>
      <h2>SPLIT A BILL WITH {user.name}</h2>
      <label htmlFor="bill">💰Bill Value</label>
      <input id="bill" type="number" value={bill} min={0} onChange={(e) => setBill(e.target.value)} />
      <label htmlFor="expense">🕴️Your expense :</label>
      <input id="expense" type="number" value={mePay} min={0} max={bill} onChange={(e) => setMePay(e.target.value)} />
      <label>🧑‍🤝‍🧑{user.name}'s expense :</label>
      <input style={{ backgroundColor: "rgb(253, 244, 225)" }} type="number" value={friendExp} readOnly />
      <label>🤑Who is paying the bill?</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{user.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  )
}
