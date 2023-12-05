import './Button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, ...restProps }: ButtonProps) => {
  return (
    <button className="button-style"  {...restProps}>
      {children}
    </button>
  )
}

export default Button