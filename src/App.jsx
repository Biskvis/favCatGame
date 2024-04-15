import { useState } from 'react';
import axios from 'axios';
import ShareButtons from './Share';
import './App.css';

function App() {
  const [cat, setCat] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [full, setFull] = useState(false);
  const [winner, setWinner] = useState('');
  const [won, setWon] = useState(false);

  function getImage() {
    axios.get(`https://api.thecatapi.com/v1/images/search?limit=4&api_key=${import.meta.env.VITE_API_KEY}`)
      .then(res => setCat(res.data))
      .catch(err => console.log(err));
  }

  function saveCat(url) {
    if (!full) {
      setFavorite(prevstate => [...prevstate, url]);
      if (favorite.length > 9) {
        setFull(true);
      } else {
        getImage();
      }
    }
  }

  function favoriteCat(index) {
    if (full) {
      setWinner(favorite[index]);
      setWon(true);
    }
  }

  function reset() {
    setFavorite([]);
    setFull(false);
    setWinner('');
    setCat([]);
    setWon(false);
  }

  const display = cat.map((item, index) => (
    <div key={index} className=''>
      <img
        className='h-auto max-w-full rounded-lg cursor-pointer hover:scale-110'
        onClick={() => saveCat(item.url)}
        src={item.url}
      />
    </div>
  ));

  const favorites = favorite.map((item, index) => (
    <img key={index} src={item} onClick={() => favoriteCat(index)} className='rounded-lg hover:scale-110 cursor-pointer' />
  ));

  return (
    <>
      {!full && <div className='p-8 gap-4 h-40 flex flex-row overflow-auto'>{favorites}</div>}
      <h1 className='text-center text-cyan-600 font-bold text-4xl mt-20 p-8'>Cat App</h1>
      <div className='flex justify-center items-center flex-col '>
        {!full && !won ?
          <div className='md:w-6/12  grid grid-cols-2 gap-4'>
            {display}
          </div>
          : !won ?
            <div className='md:w-9/12 grid grid-cols-2 md:grid-cols-4 gap-4'>
              <h1 className='text-xl'>Pick your favorite cat</h1>
              {favorites}
            </div>
            :
            <div className='w-9/12 flex justify-center items-center flex-col'>
              <h1 className='text-2xl p-2'>Winner!!!</h1>
              <img src={winner} className='rounded-lg' />
              <ShareButtons url={winner} title='This cat is a Winner!' />
            </div>
        }
        {cat.length < 1 &&
          <div className=''>
            <h1 className="text-2xl p-4">Cat Picture Elimination Challenge</h1>
            <ul className='p-4 text-xl'>
              <li>Click on your favorite cat in each round.</li>
              <li>Your chosen cat will be added to your favorites list.</li>
              <li>Once you've selected 10 cats, you'll enter the final round to pick your ultimate favorite.</li>
              <li>Choose with care!</li>
            </ul>
          </div>
        }

        {!full &&
          <button
            className='p-4 bg-sky-500 text-white rounded-xl text-xl hover:text-black m-8'
            onClick={getImage}
          >
            {cat.length < 1 ? 'Start' : 'New round'}
          </button>
        }
        {won && <div><button className='p-2 bg-sky-500 text-white rounded-lg m-4' onClick={reset}>Play again</button></div>}
      </div>
    </>
  );
}

export default App;
