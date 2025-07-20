import Speaker from '../../src/Icon/Speaker';
import Line from '../../src/Icon/Line';
import Pin from '../../src/Icon/Pin';

const NoticeBoard = () => {
  return (
    <aside className="h-[275px] bg-white px-5 py-6 flex flex-col items-start gap-4 rounded-3xl">
      <div className="flex flex-row gap-1">
        <div className="flex mt-[3.5px]">
          <Speaker />
        </div>
        <div className="text-gray-800 font-xl-bold">공지사항</div>
      </div>

      <Line />

      <div className="w-[200px] flex flex-col gap-3">
        <div className="flex flex-row">
          <div>
            <Pin />
          </div>
          <div className="overflow-hidden text-ellipsis text-gray-800 font-md-semibold whitespace-nowrap">
            공지사항어쩌구저쩌구공지사항어쩌구저쩌구
          </div>
        </div>
        <div className="gap-3 text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap font-sm-regular">
          공지사항어쩌구저쩌구공지사항어쩌구저쩌구
        </div>
        <div className="gap-3 text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap font-sm-regular">
          공지사항어쩌구저쩌구공지사항어쩌구저쩌구
        </div>
        <div className="gap-3 text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap font-sm-regular">
          공지사항어쩌구저쩌구공지사항어쩌구저쩌구
        </div>
        <div className="gap-3 text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap font-sm-regular">
          공지사항어쩌구저쩌구공지사항어쩌구저쩌구
        </div>
      </div>
    </aside>
  );
};

export default NoticeBoard;
