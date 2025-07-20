// < 이 아이콘
interface ArrowIconProps {
  strokeColor?: string;
  className?: string;
}

const ArrowIcon = ({ strokeColor = '#DADFE7', className }: ArrowIconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15 17L9 12L15 7"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
