const DeleteXIcon = ({ stroke = '#FF2B15' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M1 1L11 11"
        stroke={stroke}
        stroke-width="1.66667"
        stroke-linecap="round"
      />
      <path
        d="M11 1L1 11"
        stroke={stroke}
        stroke-width="1.66667"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default DeleteXIcon;
