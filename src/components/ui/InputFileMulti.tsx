import React, { VFC, useState } from "react";
import { CloseButton } from "./IconButton";
import { Modal } from "./BasicModal";
import BasicButton from "./BasicButton";

interface Props {
  name?: string; // NOTE:input["file"]とlabelをリンクさせるためのフラグ
  photos: File[] | null;
  setPhotos: (files: File[]) => void;
}

const mineType = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/svg+xml",
];

const PhotosUpload: VFC<Props> = ({
  name = "photos",
  photos,
  setPhotos,
}): React.ReactElement => {
  const [isOpenExecute, setIsOpenExecute] = useState(false);
  const [isSameError, setIsSameError] = useState(false);
  const [isNumberError, setIsNumberError] = useState(false);
  const [isFileTypeError, setIsFileTypeError] = useState(false);

  const handleCancel = (photoIndex: number) => {
    resetErrors();
    if (!photos) return;
    const modifyPhotos = photos.filter((photo, index) => photoIndex !== index);
    setPhotos(modifyPhotos);
    closeModal();
  };

  const openModal = () => {
    setIsOpenExecute(true);
  };
  const closeModal = () => {
    setIsOpenExecute(false);
  };

  const resetErrors = () => {
    setIsSameError(false);
    setIsNumberError(false);
    setIsFileTypeError(false);
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("動いています。");
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }
    const files = Object.values(event.target.files).concat();
    // 初期化することで同じファイルを連続で選択してもonChagngeが発動するように設定し、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応
    event.target.value = "";
    resetErrors();

    // NOTE:filterを通さずに行うとpromiseが帰ってしまう
    const pickedPhotos = files.filter(async (file) => {
      // first validation
      if (!mineType.includes(file.type)) {
        setIsFileTypeError(true);
        return false;
      }
      // second validation
      if (photos) {
        const existsSameSize = photos.some((photo) => photo.size === file.size);
        if (existsSameSize) {
          setIsSameError(true);
          return false;
        }
      }
      return true;
    });

    if (pickedPhotos.length === 0) {
      return;
    }
    // FIXME
    let addedPhotos: File[];
    if (!photos) {
      addedPhotos = [...pickedPhotos];
      if (addedPhotos.length >= 4) {
        setIsNumberError(true);
      }
      //無限に追加することができるがsliceで強制的に3枚にする
      setPhotos(addedPhotos.slice(0, 3));
    }
    if (photos) {
      addedPhotos = [...photos, ...pickedPhotos];
      if (addedPhotos.length >= 4) {
        setIsNumberError(true);
      }
      //無限に追加することができるがsliceで強制的に3枚にする
      setPhotos(addedPhotos.slice(0, 3));
    }
  };
  return (
    <>
      {/* モーダルを別のreturnとして切り出す */}
      <div className="photos-container">
        {[...Array(3)].map((_: number, index: number) =>
          photos !== null && index < photos.length ? (
            <div>
              <CloseButton styleName="close-upload" onClick={openModal} />
              <div className="wrapper" key={index}>
                <Modal
                  title="本当に削除しますか？"
                  open={isOpenExecute}
                  handleOpen={closeModal}
                  footer={
                    <div className="buttons">
                      <BasicButton onClick={() => handleCancel(index)}>
                        はい
                      </BasicButton>
                      <BasicButton onClick={closeModal}>いいえ</BasicButton>
                    </div>
                  }
                />
                {/* 速度改善でfileを直接入れ込む必要あり */}
                <img
                  src={URL.createObjectURL(photos[index])}
                  alt={`あなたの写真 ${index + 1}`}
                  width="200"
                  className="image"
                />
              </div>
            </div>
          ) : (
            <div>
              <CloseButton
                styleName="close-upload -disable"
                onClick={openModal}
              />
              <label className="wrapper" htmlFor={name} key={index}>
                <img
                  src="https://placehold.jp/200x200.png"
                  alt=""
                  className="image"
                />
              </label>
            </div>
          )
        )}
      </div>
      {isSameError && <p>※既に選択された画像と同じものは表示されません</p>}
      {isNumberError && <p>※3枚を超えて選択された画像は表示されません</p>}
      {isFileTypeError && (
        <p>※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません</p>
      )}

      <input
        data-cy="file_upload"
        type="file"
        name={name}
        id={name}
        accept="image/*"
        onChange={handleFile}
        multiple
        hidden
      />
    </>
  );
};

export default PhotosUpload;
