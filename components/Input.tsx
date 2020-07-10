import { ValidationRules } from 'react-hook-form'
import cx from 'classnames'

interface InputProps {
  label: string
  name: string
  placeholder?: string
  isError: boolean
  type: string
  // register: (rules?: ValidationRules) => void,
}

const Input = ({
  label,
  register,
  type,
  name,
  placeholder,
  isError,
}: InputProps) => (
  <>
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      ref={register}
      name={name}
      className={cx(
        'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
        { 'border-red-500': isError }
      )}
      type={type}
      placeholder={placeholder}
    />
    {isError && (
      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
    )}
  </>
)

export default Input
