import { useState, useId } from 'react';
import { LoginDeleteIcon } from '../../../../src/Icon/LoginDeleteIcon';

interface LabelInputProps {
  placeholder: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showDeleteButton?: boolean;
}

const LabelInput = ({
  placeholder,
  type = 'text',
  className = '',
  value,
  onChange,
  showDeleteButton = true
}: LabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange({
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>);
    }
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          font-md-medium w-full h-[59px] px-[16px] py-[16px] border rounded-[12px] 
          focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all
          ${isFocused || value ? 'pt-[26.5px] pb-[8.5px] pr-[40px]' : ''}
          ${className}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-[16px] cursor-text top-[50%] transform -translate-y-1/2 text-gray-500 transition-all 
          ${
            isFocused || value
              ? 'mt-[8px] top-[8.5px] font-xs-medium text-gray-500'
              : 'font-md-medium'
          }
        `}
      >
        {placeholder}
      </label>
      {showDeleteButton && value && value.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-[16px] top-[50%] transform -translate-y-1/2"
        >
          <LoginDeleteIcon />
        </button>
      )}
    </div>
  );
};

export default LabelInput;
