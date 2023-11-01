import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import Image from "../Image";
import { useRegisterAptStore } from "@/store/register-apt";

export default function EnterRoomImageView() {
  const {
    roomImages,
    setRoomImages,
    floorPlanImages,
    setFloorPlanImages,
    viewImages,
    setViewImages,
  } = useRegisterAptStore();
  const roomImageThumbnail =
    roomImages?.map((image) => URL.createObjectURL(image)) || [];
  const floorPlanImageThumbnail =
    floorPlanImages?.map((image) => URL.createObjectURL(image)) || [];
  const viewImageThumbnail =
    viewImages?.map((image) => URL.createObjectURL(image)) || [];

  const _onChangeRoomImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files?.length < 3) {
        alert("이미지는 최소 3장 이상 업로드해야 합니다.");
        return;
      }
      if (e.target.files?.length > 20) {
        alert("이미지는 최대 20장까지 업로드 가능합니다.");
        return;
      }
      setRoomImages(Array.from(e.target.files));
    }
  };
  const _onChangeFloorPlanImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files?.length > 20) {
        alert("이미지는 최대 20장까지 업로드 가능합니다.");
        return;
      }
      setFloorPlanImages(Array.from(e.target.files));
    }
  };
  const _onChangeViewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files?.length > 20) {
        alert("이미지는 최대 20장까지 업로드 가능합니다.");
        return;
      }
      setViewImages(Array.from(e.target.files));
    }
  };

  return (
    <div css={containerCSS}>
      <h2>
        매물을 잘 드러내는 사진을
        <br />
        올려주세요.
      </h2>
      <div css={infoTextCSS}>
        매물을 효과적으로 보여줄 수 있는 가장 적합한 사진을 대표 이미지로
        선택해주세요.
      </div>

      <div css={imageUploadWrapCSS}>
        <h4>
          대표 이미지 <span css={essentialOptionTextCSS}>(3장 이상)</span>
        </h4>
        <div css={thumbnailListCSS}>
          {roomImageThumbnail.map((image) => (
            <div key={image} css={imageWrapCSS}>
              <Image
                src={image}
                alt="thumbnail"
                width={120}
                height={120}
                css={imageWrapCSS}
              />
            </div>
          ))}
        </div>
        <label css={fileInputCSS}>
          + 대표 이미지 올리기{" "}
          <input type="file" multiple onChange={_onChangeRoomImage} />
        </label>
      </div>

      <div css={imageUploadWrapCSS}>
        <h4>
          평면도 사진 <span css={selectOptionTextCSS}>(선택)</span>
        </h4>
        <div css={thumbnailListCSS}>
          {floorPlanImageThumbnail.map((image) => (
            <div key={image} css={imageWrapCSS}>
              <Image
                src={image}
                alt="thumbnail"
                width={120}
                height={120}
                css={imageWrapCSS}
              />
            </div>
          ))}
        </div>
        <label css={fileInputCSS}>
          + 평면도 사진 올리기{" "}
          <input type="file" multiple onChange={_onChangeFloorPlanImage} />
        </label>
      </div>

      <div css={imageUploadWrapCSS}>
        <h4>
          창밖 뷰 <span css={selectOptionTextCSS}>(선택)</span>
        </h4>
        <div css={thumbnailListCSS}>
          {viewImageThumbnail.map((image) => (
            <div key={image} css={imageWrapCSS}>
              <Image
                src={image}
                alt="thumbnail"
                width={120}
                height={120}
                css={imageWrapCSS}
              />
            </div>
          ))}
        </div>
        <label css={fileInputCSS}>
          + 창밖 뷰 사진 올리기{" "}
          <input type="file" multiple onChange={_onChangeViewImage} />
        </label>
      </div>
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
  overflow-y: scroll;
`;

const infoTextCSS = css`
  margin-top: ${getRem(24)};
  font-size: ${getRem(14)};
  line-height: ${getRem(20)};
  background-color: #00baf230;
  padding: ${getRem(12)} ${getRem(16)};
  border-radius: ${getRem(8)};
`;

const imageUploadWrapCSS = css`
  margin-top: ${getRem(24)};
  display: flex;
  flex-direction: column;
  gap: ${getRem(12)};
`;

const fileInputCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${getRem(50)};
  background-color: lightgray;
  border-radius: ${getRem(8)};
  cursor: pointer;

  input {
    display: none;
  }
`;

const essentialOptionTextCSS = css`
  font-size: ${getRem(12)};
  font-weight: 700;
  color: #00baf2;
`;

const selectOptionTextCSS = css`
  font-size: ${getRem(12)};
  font-weight: 400;
  color: gray;
`;

const thumbnailListCSS = css`
  display: flex;
  gap: ${getRem(12)};
  margin-top: ${getRem(12)};
  overflow-x: scroll;
  padding: ${getRem(12)} 0;
`;

const imageWrapCSS = css`
  width: ${getRem(120)};
  height: ${getRem(120)};
  border-radius: ${getRem(8)};
  border: 1px solid #e5e5e5;
`;
