import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // useState(1)- 1 si ie data, ie return cekai array isi [1, f];
  const [obj, setObj] = useState({ name: "Diki", age: "12" });

  const handlePrevious = function () {
    if (step > 1)
      setStep((s) => s - 1)
    // setStep(step - 1)
    // You shouldn’t change objects that you hold in the React state directly. 
    // Instead, when you want to update an object, you need to create a new one 
    // (or make a copy of an existing one), and then set the state to use that copy.
    setObj({ ...obj, name: "Diki" })
  }
  const handleNext = function () {
    if (step < 3)
      setStep(s => s + 1)
    setObj({ ...obj, name: "Dikkyy" })
  }

  return (
    <>
      <button className="close" onClick={() => { setIsOpen(cur => !cur) }}>&times;</button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">Step {step}: {messages[step - 1]} {obj.name} - {obj.age}</p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            // onMouseEnter={()=>alert('12')}
            >Previous</button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >Next</button>
          </div>
        </div >
      )}
    </>
  )
}