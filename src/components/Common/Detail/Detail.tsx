import './Detail.scss';
import { ReactComponent as  UpArrowIcon } from '../../../assets/svg/UpArrow.svg'
import { ReactComponent as  DownArrowIcon } from '../../../assets/svg/DownArrow.svg'
import { useState } from 'react';

type DetailProp = {
  header: {
    icon?: React.ReactNode;
    name: React.ReactNode;
  };
  defaultOpen?: boolean;
  detailOpenClose: React.Dispatch<React.SetStateAction<boolean | undefined>>
  footer?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>

const Detail = (props: DetailProp) => {
  const { header, children, defaultOpen, footer, detailOpenClose, ...resProps} = props;
  const [open, setOpen] = useState(defaultOpen);
  const toggleSetOpen = () => {
    detailOpenClose((prev) => !prev);
    setOpen((prev) => !prev)
  }
  return (
    <div className='detail' {...resProps}>
      <div className='detail-header' onClick={toggleSetOpen}>
        {header.icon}
        <span className='header-name'>{header.name}</span>
        {open ? <UpArrowIcon /> : <DownArrowIcon />}
      </div>
      {
        open && (
          <div className='detail-body'>
            {children}
          </div>
        )
      }
      {open && footer}
    </div>
  )
}

export default Detail