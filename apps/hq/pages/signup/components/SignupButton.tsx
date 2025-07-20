interface ButtonProps {
  text: string;
  prevonClick?: () => void;
  onClick?: () => void;
}
const SignupButton = ({ text, onClick, prevonClick }: ButtonProps) => {
  return (
    <div className="flex flex-row pt-8 items-start gap-4 w-full">
      <button
        className="flex w-full h-14 px-7 justify-center items-center gap-[10px] rounded-xl border border-solid border-primary-600 bg-white text-primary-600 font-xl-semibold text-center cursor-pointer"
        onClick={prevonClick}
      >
        이전
      </button>
      <button
        className="flex w-full h-14 px-7 justify-center items-center gap-[10px] rounded-xl bg-primary-700 text-white font-xl-semibold text-center cursor-pointer"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default SignupButton;
