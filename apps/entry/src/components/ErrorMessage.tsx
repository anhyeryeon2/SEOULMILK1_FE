import WarningIcon from '../../../../src/Icon/WarningIcon';

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="font-xs-regular flex text-warning-700 text-start py-[16px]">
    <WarningIcon /> {message}
  </div>
);

export default ErrorMessage;
