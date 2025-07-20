interface PaymentIconProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

const PaymentIcon = ({
  primaryColor = '#DADFE7',
  secondaryColor = '#949BA7',
  accentColor = '#B4BBC7'
}: PaymentIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
    >
      <path
        d="M11.0001 0.5H1.83335C0.912868 0.5 0.166668 1.2462 0.166668 2.16668V10.5001L5.16672 15.5002H11.0001C11.9206 15.5002 12.6668 14.754 12.6668 13.8335V2.16668C12.6668 1.2462 11.9206 0.5 11.0001 0.5Z"
        fill={primaryColor}
      />
      <path
        d="M4.33354 10.5H0.166832L5.16689 15.5001V11.3333C5.16689 10.8731 4.79379 10.5 4.33354 10.5Z"
        fill={secondaryColor}
      />
      <rect
        x="1.8335"
        y="3"
        width="9.16677"
        height="0.833342"
        rx="0.416671"
        fill={accentColor}
      />
      <rect
        x="1.8335"
        y="5.5"
        width="7.50008"
        height="0.833342"
        rx="0.416671"
        fill={accentColor}
      />
      <rect
        x="1.8335"
        y="8"
        width="5.8334"
        height="0.833342"
        rx="0.416671"
        fill={accentColor}
      />
    </svg>
  );
};

export default PaymentIcon;
