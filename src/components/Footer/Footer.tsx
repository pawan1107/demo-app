import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as  CardIcon } from '../../assets/svg/Card.svg'
import { ReactComponent as  LogoIcon } from '../../assets/svg/Logo_Icon.svg'
import { ReactComponent as  PaymentsIcon } from '../../assets/svg/Payments.svg'
import { ReactComponent as  CreditIcon } from '../../assets/svg/Credit.svg'
import { ReactComponent as  AccountIcon } from '../../assets/svg/Account.svg'
import './Footer.scss';

type FooterType = {
  icon: React.ReactNode,
  name: string,
  to: string
}

const FOOTER_LIST = [
  {
    icon: <LogoIcon />,
    name: "Home",
    to: 'home'
  },
  {
    icon: <CardIcon />,
    name: "Cards",
    to: 'cards'
  },
  {
    icon: <PaymentsIcon />,
    name: "Payments",
    to: 'payments'
  },
  {
    icon: <CreditIcon />,
    name: "Credit",
    to: 'credit'
  },
  {
    icon: <AccountIcon />,
    name: "Profile",
    to: 'profile'
  },
]

const FooterNav = (props: FooterType) => {
  const { to, icon, name, ...restProps} = props;
  const location = useLocation();
  const [,path] = location.pathname.split('/')
  return (
    <Link to={to} className='footer-nav' data-active={path === to} {...restProps}>
      {icon}
      <span>
        {name}
      </span>
    </Link>
  )
}

const Footer = () => {
  return (
    <div className='footer'>
      {FOOTER_LIST.map((footer) => (
        <FooterNav {...footer} />
      ))}
    </div>
  )
}

export default Footer