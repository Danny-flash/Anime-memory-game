import { useEffect, useState } from 'react';
import img from "./assets/default.jpeg"
import img1 from "./assets/sasuke.png"
import img2 from "./assets/luffy.png"
import img3 from "./assets/soifon.png"
import img4 from "./assets/violet.png"
import img5 from "./assets/yuno.png"
import img6 from "./assets/demon.png"
import './App.css';
import SingleCard from './components/SingleCard';

function App() {

   const pictures = [
     {img: img1, isMatched: false},
     {img: img2 , isMatched: false},
     {img: img3 , isMatched: false},
     {img: img4 , isMatched: false},
     {img: img5 , isMatched: false},
     {img: img6 , isMatched: false},
   ]


  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [time, setTime] = useState(10)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)

    const shufflecards = () => {
        const shuffledcards = [...pictures , ...pictures].sort(() => Math.random() - 0.5)
        .map(card => ({...card, id: Math.random()}))

        setFirstChoice(null)
        setSecondChoice(null)
        setCards(shuffledcards)
        setTime(10)
        setTurns(0)
    }

  const handleChoice = (card) =>{
      firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

 useEffect(()=>{
      if (firstChoice && secondChoice){
        setDisabled(true)
        if(firstChoice.img === secondChoice.img){
            setCards(prevState => {
              return prevState.map(card => {
                if(card.img === firstChoice.img){
                  return {...card, isMatched: true}
                }else{
                  return card
                }
              })
            })
          resetTurn()
        }else if(time === 0){
        }  
        else{
       setTimeout(() => resetTurn(), 1000) 
        }
      }
 },[firstChoice, secondChoice])

const gameOverTime = () => {
  setInterval(() => {
    setTime(prevState => prevState - 1)
 }, 1000);
}


  const resetTurn = () =>{
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevState => prevState + 1)
    setDisabled(false)
    setTime(10)
  }

  useEffect(()=>{
    shufflecards()
   
  }, [])

    return (
    <div className="App">
        <h1>Anime Memory Game </h1>
        <button onClick={shufflecards}>Start game</button>

        <div className='card__grid'>
          {
            cards.map((card) => (
             <SingleCard   key={card.id} 
             card={card} 
             img={img}
             handleChoice={handleChoice}
             flipped={card === firstChoice || card === secondChoice || card.isMatched}
             disabled={disabled}
             />
            ))
          }
        </div>

        <p>Number of  Flips: {turns}</p>
        
    </div>
  );
}

export default App;
