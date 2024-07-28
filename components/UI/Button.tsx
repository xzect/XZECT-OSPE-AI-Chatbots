interface ButtonProps {
  btnText?: string
  btnType?: React.HTMLInputTypeAttribute
  icon?: React.ReactElement
  onClick?: () => void
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  btnText,
  btnType,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      className={`px-5 py-2 flex justify-center items-center gap-2 bg-slate-200 text-slate-900 rounded-full font-semibold ${className}`}
      onClick={onClick}
    >
      {icon && icon}
      <span>{btnText}</span>
    </button>
  )
}

export default Button
