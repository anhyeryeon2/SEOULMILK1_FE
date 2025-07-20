import { useEffect, useState } from 'react';
import ToggleIcon from '../../../../../src/Icon/ToggleIcon';
import api from '../../../../../packages/hooks/api';

interface Agency {
  csId: number;
  csName: string;
}

interface Props {
  selectedId: number | null;
  onSelect: (csId: number) => void;
}

const CsDropDown = ({ selectedId, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [csList, setCsList] = useState<Agency[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await api.get('/auth/search/cs');

        // console.log('111', response.data);
        // console.log('222', response.data.result.responseList);
        setCsList(response.data.result.responseList);

        if (selectedId) {
          const selectedAgency = response.data.result.responseList.find(
            (agency: Agency) => agency.csId === selectedId
          );

          if (selectedAgency) {
            setInputValue(selectedAgency.csName);
          } else {
            setInputValue('');
          }
        }
      } catch (error) {
        console.error('대리점 목록 불러오기 실패:', error);
      }
    };

    fetchAgencies();
  }, [selectedId]);

  const filteredOptions = Array.isArray(csList)
    ? csList.filter((opt) =>
        opt.csName.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  const handleSelect = (csId: number, csName: string) => {
    setInputValue(csName);
    onSelect(csId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center w-full border border-gray-300 rounded-xl p-4 bg-white">
        <input
          type="text"
          placeholder="선택"
          className="w-full outline-none text-gray-700"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <div
            className={`transform transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <ToggleIcon fill={isOpen ? '#009856' : '#DADFE7'} />
          </div>
        </button>
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute w-full h-[224px] overflow-y-scroll py-3 px-2 bg-white rounded-xl drop-shadow-elevation1 mt-1 z-10 font-md-medium text-gray-500 custom-scrollbar">
          {filteredOptions.map((agency) => (
            <li
              key={agency.csId}
              className="py-2 px-4 hover:bg-primary-50 hover:text-primary-700 cursor-pointer hover:font-md-semibold"
              onClick={() => handleSelect(agency.csId, agency.csName)}
            >
              {agency.csName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CsDropDown;
