interface ResetIconProps {
  color?: string;
}
const ResetIcon = ({ color = '#10AB63' }: ResetIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M15.7204 5.66667C14.4931 3.19714 11.9448 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5C12.5693 16.5 15.5563 14.0066 16.3142 10.6667M15.7204 5.66667H11.5M15.7204 5.66667V1.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default ResetIcon;
