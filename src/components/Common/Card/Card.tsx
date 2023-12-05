import React, { useState } from 'react';
import { ReactComponent as LogoNameIcon } from '../../../assets/svg/Logo.svg'
import { ReactComponent as VisaLogoIcon } from '../../../assets/svg/VisaLogo.svg'
import { ReactComponent as EyeIcon } from '../../../assets/svg/eye.svg'
import './Card.scss';
import { CardType } from '../../../store/allCards';

const splitCardNumber = (array: string) => {
  return [...Array(4)]
    .map((value, index) => {
      return array.slice(index * 4, (index + 1) * 4)
    })
}

type CardProp = CardType & React.HTMLAttributes<HTMLElement>

const Card = (props: CardProp) => {
  const { name, number, validity, cvv, className, isFreeze, ...restProps } = props;
  const [show, setShow] = useState(false);

  const cardNumbers = splitCardNumber(number);
  const toggleSetShow = () => {
    setShow((prev) => !prev)
  }
  return (
    <div className={`card ${className || ''}`}  data-freeze={isFreeze}  {...restProps}>
      <button className='show-card-button' onClick={toggleSetShow}>
        <EyeIcon className='eye' />
        <span className='show-card-number'> {show ? 'Hide card number': 'Show card number'}</span>
      </button>
      <div className='card-container'>
        <div className='card-logo'><LogoNameIcon /></div>
        <span className='card-name'>{name}</span>
        <div className='card-number'>
          {cardNumbers.map((cardNumber, i, arr) => (
            <span className="card-number-chunks">
              {Array.from(cardNumber).map((num) => (show || i === arr.length - 1)
              ? num
              : <div className='hidden-circle' />)}
            </span>
          ))}
        </div>
        <div className='card-validity-cvv'>
          <span className='card-validity'>Thru: {validity.month}/{validity.year % 100}</span>
          <span className='card-cvv'>
            CVV:&nbsp;{show ? cvv : (<span className='card-cvv-hide'>***</span>)}
          </span>
        </div>
        <div className='card-logo'><VisaLogoIcon /></div>
      </div>
    </div>
  )
}

export default Card