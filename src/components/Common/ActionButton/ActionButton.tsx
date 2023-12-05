import './ActionButton.scss';

type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const ActionButton = ({ children, ...restProps }: ActionButtonProps) => {
  return (
    <button className="action-button"  {...restProps}>
      {children}
    </button>
  )
}

export default ActionButton