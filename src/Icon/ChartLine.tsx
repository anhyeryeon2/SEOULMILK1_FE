const ChatLine = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="14"
      viewBox="0 0 2 14"
      fill="none"
      className={className} 
    >
      <path
        d="M1 1L0.999999 13"
        stroke="#DADFE7"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChatLine;
