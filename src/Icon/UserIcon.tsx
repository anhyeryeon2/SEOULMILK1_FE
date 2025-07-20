const UserIcon = ({
  primaryColor = '#949BA7',
  secondaryColor = '#B4BBC7'
}: {
  primaryColor?: string;
  secondaryColor?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
    >
      <circle cx="12.412" cy="4.64788" r="3.04436" fill={secondaryColor} />

      <path
        d="M12.3428 7C10.0739 7 8.19737 9.01626 7.88967 11.6371C7.84066 12.0546 8.18621 12.3968 8.60655 12.3968H16.0791C16.4994 12.3968 16.845 12.0546 16.796 11.6371C16.4883 9.01626 14.6118 7 12.3428 7Z"
        fill={secondaryColor}
      />

      <circle cx="6.62861" cy="4.14351" r="3.80952" fill={primaryColor} />

      <path
        d="M6.62867 7C3.74934 7 1.36739 9.48454 0.972017 12.7163C0.908143 13.2384 1.34079 13.6667 1.86677 13.6667H11.3906C11.9166 13.6667 12.3492 13.2384 12.2853 12.7163C11.89 9.48454 9.50801 7 6.62867 7Z"
        fill={primaryColor}
      />
    </svg>
  );
};

export default UserIcon;
