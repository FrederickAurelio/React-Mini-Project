import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// function Test() {
//   const [movieRating, setMovieRating] = useState(0)
//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
//       <p>Rating : {movieRating}</p>
//     </div>
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRaing={5} />
    <StarRating maxRating={5} size={30} color="red" className="test" />
    <Test /> */}
  </React.StrictMode>
);