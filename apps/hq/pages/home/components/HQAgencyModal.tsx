import { useState, useEffect, useRef } from 'react';
import DeleteXIcon from '../../../../../src/Icon/DeleteXIcon';
import TagIcon from '../../../../../src/Icon/TagIcon';
import api from '../../../../../packages/hooks/api';

interface AgencyProps {
  csId?: number;
  csName: string;
}

const HQAgencyModal = ({ onClose }: { onClose: () => void }) => {
  const [tags, setTags] = useState<AgencyProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [csList, setCsList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const fetchTags = async () => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await api.get('/hq/manage/cs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTags(response.data.result.responseList || []);
    } catch (error) {
      console.error('태그 데이터 불러오기 에러:', error);
      setTags([]);
    }
  };

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await api.get('/auth/search/cs');
        setCsList(
          response.data.result.responseList.map(
            (agency: { csName: string }) => agency.csName
          )
        );
      } catch (error) {
        console.error('대리점 목록 불러오기 실패:', error);
      }
    };

    fetchTags();
    fetchAgencies();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = csList.filter((name) =>
    name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const addTag = async (csName: string) => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await api.post(
        '/hq/manage/cs',
        { csNames: [csName] },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log(response.data);
      await fetchTags();
      setInputValue('');
      setIsOpen(false);
    } catch (error) {
      console.error('태그 추가 에러:', error);
    }
  };

  const handleSelect = (csName: string) => {
    if (!tags.some((tag) => tag.csName === csName)) {
      addTag(csName);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.some((tag) => tag.csName === newTag)) {
        addTag(newTag);
      }
    }
  };

  const removeTag = async (csId: number) => {
    try {
      const token = localStorage.getItem('accesstoken');
      await api.delete(`/hq/manage/cs/${csId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTags((prevTags) => prevTags.filter((t) => t.csId !== csId));
    } catch (error) {
      console.error('태그 삭제 에러:', error);
    }
  };

  const handleCheckClick = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="flex w-[480px] px-8 py-[42px] flex-col justify-center items-start gap-2 rounded-[32px] bg-white drop-shadow-elevation1">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-2">
            <p className="text-gray-800 font-2xl-semibold">담당 대리점</p>
            <p className="text-center font-2xl-semibold text-primary-700">
              {tags.length}
            </p>
          </div>
          <button onClick={onClose} className="p-[7px] flex items-center">
            <DeleteXIcon stroke="#949BA7" />
          </button>
        </div>

        <div className="relative w-full" ref={inputRef}>
          <input
            className="w-full flex mt-4 h-14 p-4 justify-center items-center gap-[10px] rounded-xl border border-solid border-gray-300 bg-white placeholder:text-gray-500 placeholder:font-md-medium"
            placeholder="입력 후 엔터를 눌러 추가하세요"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
          />

          {isOpen && filteredOptions.length > 0 && (
            <ul className="absolute w-full max-h-[224px] overflow-y-auto py-3 px-2 bg-white rounded-xl drop-shadow-elevation1 mt-1 z-10 font-md-medium text-gray-500 custom-scrollbar">
              {filteredOptions.map((name) => (
                <li
                  key={name}
                  className="py-2 px-4 hover:bg-primary-50 hover:text-primary-700 cursor-pointer hover:font-md-semibold"
                  onClick={() => handleSelect(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap items-start gap-3 mt-4">
            {tags.map((tag) => (
              <div
                key={tag.csName}
                className="flex h-8 items-center pl-3 pr-2 py-1 rounded-lg bg-primary-50 text-primary-700 font-md-medium"
              >
                {tag.csName}
                {tag.csId && (
                  <button onClick={() => removeTag(tag.csId!)} className="ml-2">
                    <TagIcon />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          className={`mt-10 w-full flex h-14 px-7 justify-center items-center gap-[10px] rounded-xl ${
            tags.length > 0 ? 'bg-green-600' : 'bg-gray-300'
          } text-white font-xl-semibold`}
          onClick={handleCheckClick}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default HQAgencyModal;
