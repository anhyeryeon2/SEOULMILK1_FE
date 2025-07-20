const Check = ({ stroke = '#009856' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
    >
      <path
        d="M1 4.33268L4.75 8.33268L11 1.66602"
        stroke={stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Check;
