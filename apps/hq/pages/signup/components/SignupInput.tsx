interface InputProps {
  name?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}
const SignupInput = ({
  name,
  placeholder,
  value,
  onChange,
  type
}: InputProps) => {
  return (
    <div className="w-full">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="placeholder:font-md-medium flex w-full h-14 p-4 justify-center items-center gap-[10px] rounded-xl border border-solid border-gray-300 text-gray-800 focus:border-primary-500"
      />
    </div>
  );
};

export default SignupInput;
