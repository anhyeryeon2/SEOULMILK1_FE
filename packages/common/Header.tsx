import StepProgress from '../../apps/cs/pages/TaxUpload/StepProgress';
import MainLine from '../../src/Icon/MainLine';
interface HeaderProps {
  title: string;
  Icon?: React.ComponentType;
  showStepProgress?: boolean;
  children?: React.ReactNode;
}

const Header = ({
  title,
  Icon,
  showStepProgress = false,
  children
}: HeaderProps) => {
  return (
    <>
      <div className="mt-8 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon />}
          <div className="text-gray-800 font-2xl-bold">{title}</div>
        </div>
        {children}
        {showStepProgress && <StepProgress />}
      </div>
      <MainLine />
    </>
  );
};

export default Header;
