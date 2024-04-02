import { useEffect, useState } from "react"
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
export default function App() {
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [option1, setOption1] = useState("USD");
  const [option2, setOption2] = useState("IDR");
  const [output, setOutput] = useState("");
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: option2,
  });

  useEffect(function () {
    if (input === "" || input === "0") {
      setOutput("");
      setError(null);
      return;
    }
    const controller = new AbortController();
    async function fetchCurrency() {
      try {
        if(isNaN(Number(input))) throw new Error("Please input a number")
        setError(null);
        setOutput("");
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${input}&from=${option1}&to=${option2}`, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to Fetch");
        const data = await res.json();
        const rate = Object.values(data.rates)[0];
        setOutput(rate);
      } catch (err) {
        if (err.name !== "AbortError")
          setError(err.message);
      }
    }
    fetchCurrency();
    return function () {
      controller.abort()
    }
  }, [input, option1, option2])

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <select value={option1} onChange={(e) => setOption1(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="IDR">IDR</option>
        <option value="CNY">CNY</option>
      </select>
      <select value={option2} onChange={(e) => setOption2(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="IDR">IDR</option>
        <option value="CNY">CNY</option>
      </select>
      <p>
        {error ? error : (output === 0 || output === "" ? "" : formatter.format(output))}
      </p>
    </div>
  )
}
