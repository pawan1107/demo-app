import { ReactComponent as  StorageIcon } from '../../../assets/svg/Storage.svg'
import { ReactComponent as  FlightsIcon } from '../../../assets/svg/Flights.svg'
import { ReactComponent as  MegaPhoneIcon } from '../../../assets/svg/MegaPhone.svg'
import { ReactComponent as  CardIcon } from '../../../assets/svg/Card.svg'
import { ReactComponent as  NextIcon } from '../../../assets/svg/Next.svg'
import './TransactionCard.scss';

export enum TransactionTypeEnum {
  STORAGE,
  FLIGHT,
  MEGAPHONE
}

export type TransactionType =  {
  name: string,
  date: Date,
  amount: number,
  isDebited: boolean,
  type: TransactionTypeEnum
}

const getIconOfTransactionType = (type: TransactionTypeEnum) => {
  switch (type) {
    case TransactionTypeEnum.STORAGE:
      return <StorageIcon />;
    case TransactionTypeEnum.FLIGHT:
      return <FlightsIcon />;
    case TransactionTypeEnum.MEGAPHONE:
      return <MegaPhoneIcon />;
    default:
      break;
  }
}

type TransactionCardProps = {
  transaction: TransactionType
} & React.HTMLAttributes<HTMLElement>

const TransactionCard = ({ transaction, ...restProps}: TransactionCardProps) => {
  return (
    <div className='transaction-card' {...restProps}>
      <div className={`transaction-type-icon center-align transaction-icon-${transaction.type}`}>
        {getIconOfTransactionType(transaction.type)}
      </div>
      <div className='transaction-details'>
        <div className='transaction-name'>{transaction.name}</div>
        <div className='transaction-date'>
          {transaction.date.toLocaleDateString('en-uk', {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
        <div className='transaction-summary center-align'>
          <div className='transaction-summary-icon center-align'>
            <CardIcon fill="#fff" />
          </div>
          {transaction.isDebited ? 'Refund on debit card' : 'Charged to debit card'}
        </div>
      </div>
      <div className='transaction-amount' data-debited={transaction.isDebited}>
        {`${transaction.isDebited ? '-' : '+'} S$ ${transaction.amount}`}
        <NextIcon className='next-icon' />
      </div>
    </div>
  )
}

export default TransactionCard