import './Section.scss';

type SectionHeaderProps = {
  isActive?: boolean;
} & React.HTMLAttributes<HTMLElement>

const SectionHeader = (props: SectionHeaderProps) => {
  const { children, isActive, ...restProps } = props;
  return (
    <div className='section-header' data-active={isActive} { ...restProps}>
      {children}
    </div>
  )
}

export default SectionHeader