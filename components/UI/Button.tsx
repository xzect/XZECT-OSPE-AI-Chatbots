interface ButtonProps {
  btnText?: string
  btnType?: React.HTMLInputTypeAttribute
  icon?: React.ReactElement
  onClick?: () => void
  customStyles?: string
}

const Button: React.FC<ButtonProps> = ({
  btnText,
  btnType,
  icon,
  onClick,
  customStyles,
}) => {
  return (
    <button
      className={`px-4 py-2 flex justify-center items-center gap-2 bg-slate-200 text-slate-900 rounded-full ${customStyles}`}
      onClick={onClick}
    >
      {icon && icon}
      <span className="font-semibold">{btnText}</span>
    </button>
  )
}

export default Button
