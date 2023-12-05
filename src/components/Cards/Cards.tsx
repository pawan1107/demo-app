
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Button from '../Common/Button/Button';
import { ReactComponent as  PlusCircleIcon } from '../../assets/svg/PlusCircle.svg'
import { ReactComponent as  FreezeCardIcon } from '../../assets/svg/FreezeCard.svg'
import { ReactComponent as  SetSpendLimitIcon } from '../../assets/svg/SetSpendLimit.svg'
import { ReactComponent as  GPayIcon } from '../../assets/svg/GPay.svg'
import { ReactComponent as  ReplaceCardIcon } from '../../assets/svg/ReplaceCard.svg'
import { ReactComponent as  DeactivateCardIcon } from '../../assets/svg/DeactivateCard.svg'
import { ReactComponent as  DetailIcon } from '../../assets/svg/Detail.svg'
import { ReactComponent as  ListIcon } from '../../assets/svg/List.svg'
import SectionList from '../Common/SectionList';
import CardSlider from './CardsSlider';
import PageDetailMobile from '../Common/PageDetailMobile';
import { useEffect, useRef, useState } from 'react';
import ActionButton from '../Common/ActionButton';
import './Cards.scss';
import Detail from '../Common/Detail';
import TransactionCard, { TransactionType, TransactionTypeEnum } from '../Common/TransactionCard/TransactionCard';
import Divider from '../Common/Divider';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { allCardsAction } from '../../store/allCards';

const TRANSACTIONS: TransactionType[] = [
  {
    name: 'Hamleys',
    date: new Date(),
    amount: 150,
    isDebited: false,
    type: TransactionTypeEnum.STORAGE
  },
  {
    name: 'Hamleys',
    date: new Date(),
    amount: 150,
    isDebited: true,
    type: TransactionTypeEnum.FLIGHT
  },
  {
    name: 'Hamleys',
    date: new Date(),
    amount: 150,
    isDebited: true,
    type: TransactionTypeEnum.MEGAPHONE
  },
  {
    name: 'Hamleys',
    date: new Date(),
    amount: 150,
    isDebited: true,
    type: TransactionTypeEnum.STORAGE
  }
]

const random4DigitNumber = () => Math.floor(1000 + Math.random() * 9000).toString();


const DeactivateCard = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const deleteCard = () => {
    dispatch(allCardsAction.deleteCard());
    onCloseModal();
  };

  return (
  <>
    <ActionButton onClick={onOpenModal}>
      <DeactivateCardIcon />
      <span className='action-name cancel-card'>Cancel card</span>
    </ActionButton>
    <Modal open={open} onClose={onCloseModal} center>
      <div className='input-modal'>
        <span className='input-modal-header'>Delete Card</span>
        <div className='input-modal-info'>Are You sure you want to delete this card?</div>
        <div className='input-modal-action-button'>
          <Button onClick={onCloseModal}>No</Button>
          <Button onClick={deleteCard}>Yes</Button>
        </div>
      </div>
    </Modal>
  </>
  )
}

const AddNewCard = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [name, setName] = useState('')

  const addCard = () => {
    const number = random4DigitNumber() + random4DigitNumber() + random4DigitNumber() + random4DigitNumber();
    const newCardDetails = {
      name,
      number,
      validity: {
        month: parseInt((Math.random() * (12 - 1) + 1).toString()),
        year: parseInt(random4DigitNumber()),
      },
      cvv: random4DigitNumber().slice(1),
      isFreeze: false,
    }
    dispatch(allCardsAction.addCard(newCardDetails));
    onCloseModal();
  }
  return (
  <>
    <Button onClick={onOpenModal}>
      <PlusCircleIcon className='plus-circle-icon' />
      New card
    </Button>
    <Modal open={open} onClose={onCloseModal} center>
      <div className='input-modal'>
        <span className='input-modal-header'>Create New Card</span>
        <div className='input-modal-info'>Enter Your Name</div>
        <input
          autoFocus
          id="name"
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <div className='input-modal-action-button'>
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button onClick={addCard}>Add</Button>
        </div>
      </div>
    </Modal>
  </>
  )
}

const CardsSection = () => {
  const amount = 3000;
  const dispatch = useAppDispatch();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offestTop, setOffestTop] = useState<number>();
  const [_, detailOpenClose] = useState<boolean>();

  useEffect(() => {
    setOffestTop(sectionRef.current?.offsetHeight || 0);
  }, [_])
  const { allCards, currentCard } = useAppSelector((state) => state.cards);
  const freezeCard = () => dispatch(allCardsAction.toggleFreeze());
  const selectedCard = allCards.find((card) => card.number === currentCard);
  return (
    <>
      <div className='cards-section' ref={sectionRef}>
        <div className='cards-section-header'>
          <div className='account-balance'>
            <span className='account-balance-name'>
              Account balance
            </span>
            <div className='account-balance-money'>
              <div className='account-balance-symbol'>S$</div>
              <span className='account-balance-amount'>{amount.toLocaleString('en-UK')}</span>
            </div>
          </div>
          <div className='new-card-btn'>
            <AddNewCard />
          </div>
        </div>
        <SectionList headers={[{ name: "My debit cards", isActive: true }, { name: "All company cards" }]}>
          <CardSlider />
        </SectionList>
      </div>
      <PageDetailMobile className='page-detail' style={{ top: `${offestTop}px`}}>
        <div className='actions-header'>
            <ActionButton onClick={freezeCard}>
              <FreezeCardIcon />
              <span className='action-name freeze-card'>{selectedCard?.isFreeze ? 'Unfreeze Card' : 'Freeze card'}</span>
            </ActionButton>
            <ActionButton>
              <SetSpendLimitIcon />
              <span className='action-name set-spend-limit'>Set spend limit</span>
            </ActionButton>
            <ActionButton>
              <GPayIcon />
              <span className='action-name add-to-gpay'>Add to GPay</span>
            </ActionButton>
            <ActionButton>
              <ReplaceCardIcon />
              <span className='action-name replace-card'>Replace card</span>
            </ActionButton>
            <DeactivateCard />
        </div>
        <div className='page-detail-content'>
          <Detail
            header={{
              icon: <DetailIcon />,
              name: 'Card details'
            }}
            detailOpenClose={detailOpenClose}
          >
            Card Details is Here
          </Detail>
          <Detail
            header={{
              icon: <ListIcon />,
              name: 'Recent transactions'
            }}
            defaultOpen
            footer={
              <div className='recent-transaction'>
                View all card transactions
              </div>
            }
            detailOpenClose={detailOpenClose}
          >
            {
              TRANSACTIONS.map((transaction, i) => (
                <>
                  { i !== 0 && <Divider />}
                  <TransactionCard transaction={transaction} />
                </>
              ))
            }
          </Detail>
        </div>
      </PageDetailMobile>
    </>
  )
}

export default CardsSection