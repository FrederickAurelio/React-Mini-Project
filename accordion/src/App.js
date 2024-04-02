import { useState } from "react";
import "./style.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [curOpen, setCurOpen] = useState(null);
  function handleToggle(i) {
    setCurOpen(op => op === i ? null : i)
  }

  return <div className="accordion">
    {faqs.map((faq, i) => {
      return <AccordionItem
        faq={faq}
        index={i}
        curOpen={curOpen}
        onOpen={handleToggle}
        key={i}>
        {/* <p>You can add something in here as children prop 💪</p> */}
      </AccordionItem>
    })}
  </div>;
}

function AccordionItem({ faq, index, curOpen, onOpen, children }) {
  const open = curOpen === (index + 1)

  return <div className={`item ${open ? "open" : ""}`} onClick={() => onOpen(index + 1)}>
    <p className="number">{index > 9 ? (index + 1) : "0" + (index + 1)}</p>
    <p className="title">{faq.title}{/*{children}*/}</p>
    <p className="icon">{open ? "+" : "-"}</p>
    {open && (<div className="content-box">
      <ul>{faq.text}</ul>
    </div>)}
  </div>
}
//   return <div className="item">
// <p className="number">0{index + 1}</p>
// <p className="title">{faq.title}</p>
// <p className="icon">+</p>
// </div>