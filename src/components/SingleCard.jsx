import React from 'react'

const SingleCard = ({card, img, handleChoice, flipped, disabled}) => {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }
  
  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
      <img className='front' src={card.img} alt="" />
    
    <img className='back' src={img} alt=""
      onClick={handleClick}
    />
      </div>
  </div>
  )
}

export default SingleCard