interface NumberProps {
  type: 'one' | 'two';
}

const CircleNumber = ({ type }: NumberProps) => {
  const isOne = type === 'one';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <div
          className={`flex w-6 h-6 items-center justify-center rounded-[18px] ${
            type === 'one'
              ? 'bg-primary-700 text-white'
              : 'border-[1.6px] border-solid border-gray-300 text-gray-300 '
          }`}
        >
          <span
            className={`font-md-semibold ${
              type === 'one' ? 'text-white' : ' text-gray-300 '
            }`}
          >
            1
          </span>
        </div>

        <div
          className={`flex w-6 h-6 items-center justify-center rounded-[18px] ${
            type === 'two'
              ? 'bg-primary-700 text-white'
              : 'border-[1.6px] border-solid border-gray-300 text-gray-300'
          }`}
        >
          <span
            className={`font-md-semibold ${
              type === 'two' ? 'text-white' : 'text-gray-300'
            }`}
          >
            2
          </span>
        </div>
      </div>

      <div className="text-gray-800 font-3xl-bold">
        {isOne ? '가입 정보 입력' : '회원 정보 입력'}
        <div className="text-gray-500 font-2xl-medium">
          {isOne ? '아래 내용을 입력해주세요.' : '아래 내용을 입력해주세요.'}
        </div>
      </div>
    </div>
  );
};

export default CircleNumber;
