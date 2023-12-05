import React from 'react';
import './PageDetailMobile.scss';

type PageDetailMobileProps = React.HTMLAttributes<HTMLElement>

const PageDetailMobile = React.forwardRef<HTMLDivElement, PageDetailMobileProps>((props, ref) => {
  const { children, className, ...restProps}  = props;
  return (
    <div className={`page-detail-mobile ${className || ''}`} ref={ref} {...restProps}>
      {children}
      <div className='space-bottom' />
    </div>
  )
})

export default PageDetailMobile