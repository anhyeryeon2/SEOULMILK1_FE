interface HorizontalProps {
  rotate?: number;
}

const Horizontal = ({ rotate = 0 }: HorizontalProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      style={{
        transform: `rotate(${rotate}deg)`,
        transition: '0.2s ease-in-out'
      }}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.5 3C13.0523 3 13.5 3.44772 13.5 4L13.5 20C13.5 20.5523 13.0523 21 12.5 21C11.9477 21 11.5 20.5523 11.5 20L11.5 4C11.5 3.44772 11.9477 3 12.5 3ZM16.7787 12L20.5 14.8646V9.13536L16.7787 12ZM14.5294 11.2076C14.0094 11.6079 14.0094 12.3921 14.5294 12.7924L20.89 17.6888C21.5476 18.195 22.5 17.7263 22.5 16.8964V7.10358C22.5 6.27374 21.5476 5.80497 20.89 6.31117L14.5294 11.2076ZM4.5 14.8646L8.22128 12L4.5 9.13536V14.8646ZM10.4706 12.7924C10.9906 12.3921 10.9906 11.6079 10.4706 11.2076L4.10999 6.31117C3.45242 5.80497 2.5 6.27374 2.5 7.10358V16.8964C2.5 17.7263 3.45243 18.195 4.10999 17.6888L10.4706 12.7924Z"
        fill="#B4BBC7"
      />
    </svg>
  );
};

export default Horizontal;
