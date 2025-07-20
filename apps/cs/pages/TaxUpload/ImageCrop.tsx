import { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Rotation1 from '../../../../src/Icon/Rotation1';
import Rotation2 from '../../../../src/Icon/Rotation2';
import Horizontal from '../../../../src/Icon/Horizontal';
import ResetIcon from '../../../../src/Icon/ResetIcon';

interface ImageCropProps {
  initialImage?: string;
  onCropComplete: (croppedImg: string) => void;
}

const ImageCrop = ({ initialImage, onCropComplete }: ImageCropProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });

  // 최종적으로 선택된 크롭 정보
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  // 회전, 반전 상태
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(1);
  const [flipY, setFlipY] = useState(1);
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cropContainerRef = useRef<HTMLDivElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 이미지 초기 로드 시 원본 이미지 정보 설정
  useEffect(() => {
    if (initialImage) {
      setSelectedImage(initialImage);
      setOriginalImage(initialImage);

      const img = new Image();
      img.onload = () => {
        setImageSize({
          width: 0,
          height: 0,
          naturalWidth: img.width,
          naturalHeight: img.height
        });
        setIsImageLoaded(true);
      };
      img.src = initialImage;
    }
  }, [initialImage]);

  // 화면 크기 및 회전 상태에 따라 이미지 크기 업데이트
  useEffect(() => {
    const updateSizes = () => {
      if (cropContainerRef.current && imgRef.current && isImageLoaded) {
        const container = cropContainerRef.current;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // 컨테이너 크기와 이미지 원본 비율을 기준으로 이미지 크기 계산
        const { naturalWidth, naturalHeight } = imageSize;
        const naturalAspectRatio = naturalWidth / naturalHeight;

        // 90도/270도 회전 시 비율 반전
        const isRotated90or270 = Math.abs(rotation % 180) === 90;
        const effectiveRatio = isRotated90or270
          ? 1 / naturalAspectRatio
          : naturalAspectRatio;

        let width, height;
        const scaleFactor = 0.9;

        if (effectiveRatio > containerWidth / containerHeight) {
          // 가로가 더 긴 경우
          width = containerWidth * scaleFactor;
          height = width / effectiveRatio;
        } else {
          // 세로가 더 긴 경우
          height = containerHeight * scaleFactor;
          width = height * effectiveRatio;
        }

        setImageSize((prev) => ({
          ...prev,
          width: Math.round(width),
          height: Math.round(height)
        }));

        // 이미지 크기가 변경되면 크롭 영역도 업데이트
        updateCropArea(effectiveRatio);
      }
    };

    if (isImageLoaded) {
      updateSizes();
    }

    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [
    rotation,
    imageSize.naturalWidth,
    imageSize.naturalHeight,
    isImageLoaded
  ]);

  // 크롭 영역을 업데이트하는 함수
  const updateCropArea = (_aspectRatio: number) => {
    const cropSize = 100; // 기본 크롭 크기 (%)

    // 마지막 completedCrop 정보가 있으면 비율만 유지하면서 위치 조정
    if (completedCrop) {
      // 기존 크롭 영역 중심점 계산
      const centerX = completedCrop.x + completedCrop.width / 2;
      const centerY = completedCrop.y + completedCrop.height / 2;

      // 회전에 따른 새 크기 계산 (단위는 %)
      let newWidth = cropSize;
      let newHeight = cropSize;

      // 새로운 크롭 영역의 왼쪽 상단 좌표 계산
      let x = Math.max(0, centerX - newWidth / 2);
      let y = Math.max(0, centerY - newHeight / 2);

      // 화면 경계를 벗어나지 않도록 조정
      if (x + newWidth > 100) x = 100 - newWidth;
      if (y + newHeight > 100) y = 100 - newHeight;

      setCrop({
        unit: '%',
        width: newWidth,
        height: newHeight,
        x,
        y
      });
    } else {
      // 초기 설정인 경우 중앙에 배치
      setCrop({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0
      });
    }
  };

  // 크롭된 이미지를 캔버스에서 생성
  const cropImage = () => {
    if (!imgRef.current || !completedCrop || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // 원본 이미지에서 크롭할 부분을 계산하기 위한 배율
    const scaleX = imageSize.naturalWidth / image.width;
    const scaleY = imageSize.naturalHeight / image.height;

    let { x, y, width, height } = completedCrop;
    x *= scaleX;
    y *= scaleY;
    width *= scaleX;
    height *= scaleY;

    // 회전 상태에 따른 크롭 좌표 보정
    let newX = x,
      newY = y,
      newWidth = width,
      newHeight = height;
    const isRotated90or270 = Math.abs(rotation % 180) === 90;

    if (rotation === 90) {
      newX = y;
      newY = imageSize.naturalWidth - (x + width);
      newWidth = height;
      newHeight = width;
    } else if (rotation === 180) {
      newX = imageSize.naturalWidth - (x + width);
      newY = imageSize.naturalHeight - (y + height);
    } else if (rotation === 270) {
      newX = imageSize.naturalHeight - (y + height);
      newY = x;
      newWidth = height;
      newHeight = width;
    }

    // 캔버스 크기 설정
    canvas.width = isRotated90or270 ? newHeight : newWidth;
    canvas.height = isRotated90or270 ? newWidth : newHeight;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX, flipY);

    let dx = -newWidth / 2;
    let dy = -newHeight / 2;
    ctx.drawImage(
      image,
      newX,
      newY,
      newWidth,
      newHeight,
      dx,
      dy,
      newWidth,
      newHeight
    );

    ctx.restore();

    // 크롭된 이미지를 Base64로 변환 후 전달
    const croppedImage = canvas.toDataURL('image/png');
    onCropComplete(croppedImage);
  };
  const getTransformedImage = () => {
    if (!imgRef.current || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const isRotated90or270 = Math.abs(rotation % 180) === 90;
    canvas.width = isRotated90or270
      ? imageSize.naturalHeight
      : imageSize.naturalWidth;
    canvas.height = isRotated90or270
      ? imageSize.naturalWidth
      : imageSize.naturalHeight;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX, flipY);

    ctx.drawImage(
      image,
      -imageSize.naturalWidth / 2,
      -imageSize.naturalHeight / 2,
      imageSize.naturalWidth,
      imageSize.naturalHeight
    );

    ctx.restore();

    // 회전된 상태의 이미지 Base64 변환 후 반환
    return canvas.toDataURL('image/png');
  };
  useEffect(() => {
    if (rotation !== 0 || flipX !== 1 || flipY !== 1) {
      const transformedImage = getTransformedImage();
      if (transformedImage) {
        onCropComplete(transformedImage);
      }
    }
  }, [rotation, flipX, flipY]);

  useEffect(() => {
    if (completedCrop) {
      cropImage();
    }
  }, [completedCrop, rotation, flipX, flipY]);

  const rotateLImage = () => {
    const newRotation = (rotation - 90) % 360;
    setRotation(newRotation);
  };

  const rotateRImage = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
  };

  const flipImageX = () => setFlipX((prev) => prev * -1);
  const flipImageY = () => setFlipY((prev) => prev * -1);

  const resetImage = () => {
    setSelectedImage(originalImage);
    setRotation(0);
    setFlipX(1);
    setFlipY(1);
    setCompletedCrop(null);

    const naturalAspectRatio = imageSize.naturalWidth / imageSize.naturalHeight;
    updateCropArea(naturalAspectRatio);
  };

  return (
    <div className="flex flex-col items-center">
      {selectedImage && (
        <div className="relative w-[960px] pt-8">
          <h3 className="py-[12px] text-white bg-gray-800 text-center h-[54px] rounded-t-[32px]">
            세금계산서가 잘 보이도록 사진을 편집해주세요.
          </h3>
          <div
            ref={cropContainerRef}
            className="relative border-none border-gray-300 overflow-hidden text-center h-[534px] flex items-center justify-center bg-white"
            style={{
              position: 'relative',
              backgroundColor: 'white'
            }}
          >
            {isImageLoaded && (
              <>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none"></div>
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  className="relative z-20"
                  style={{ backgroundColor: 'white' }}
                >
                  <img
                    ref={imgRef}
                    src={selectedImage}
                    alt="Upload"
                    className="object-contain"
                    style={{
                      width:
                        imageSize.width > 0 ? `${imageSize.width}px` : 'auto',
                      height:
                        imageSize.height > 0 ? `${imageSize.height}px` : 'auto',
                      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
                      transition: 'transform 0.3s ease'
                    }}
                    onLoad={() => {
                      if (imgRef.current) {
                        const naturalAspectRatio =
                          imageSize.naturalWidth / imageSize.naturalHeight;
                        const isRotated90or270 =
                          Math.abs(rotation % 180) === 90;
                        const effectiveRatio = isRotated90or270
                          ? 1 / naturalAspectRatio
                          : naturalAspectRatio;
                        updateCropArea(effectiveRatio);
                      }
                    }}
                  />
                </ReactCrop>
              </>
            )}
          </div>

          <div className="flex items-center justify-center h-[72px] gap-6 border border-gray-300 rounded-b-[32px] p-4">
            <button
              onClick={rotateLImage}
              className="w-14 h-14 flex items-center justify-center text-gray-500 rounded-full"
            >
              <Rotation1 size={24} />
            </button>
            <button
              onClick={rotateRImage}
              className="w-14 h-14 flex items-center justify-center text-gray-500 rounded-full"
            >
              <Rotation2 size={24} />
            </button>
            <button
              onClick={flipImageX}
              className="w-14 h-14 flex items-center justify-center text-gray-500 "
            >
              <Horizontal />
            </button>
            <button
              onClick={flipImageY}
              className="w-14 h-14 flex items-center justify-center text-gray-500 "
            >
              <Horizontal rotate={90} />
            </button>
            <div className="w-px h-8 bg-gray-400"></div>
            <button
              onClick={resetImage}
              className="h-10 w-[120px] font-md-semibold px-4 py-[6px] text-red-500 bg-warning-50 rounded-[12px] flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <ResetIcon color="#FF433C" />
              <span>원본으로</span>
            </button>
          </div>
        </div>
      )}
      <canvas ref={previewCanvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageCrop;
