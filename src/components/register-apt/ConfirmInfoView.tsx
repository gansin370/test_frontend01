import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { ReactNode } from "react";
import Image from "../Image";
import { useRegisterAptStore } from "@/store/register-apt";
import { RegisterProcess } from "@/pages/register-apt";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionType } from "./EnterTransactionTypeView";

interface ConfirmInfoViewProps {
  onEdit: (process: RegisterProcess) => void;
}

export default function ConfirmInfoView({ onEdit }: ConfirmInfoViewProps) {
  const {
    aptSellerType,
    roomSize,
    bay,
    structure,
    roomCount,
    bathroomCount,
    totalFloor,
    floor,
    addressInfo,
    locationSummary,
    transactionType,
    tradingPrice,
    jeonseDeposit,
    monthlyDeposit,
    monthlyRent,
    monthlyRentDepositAdjustable,
    depositAdjustableDescription,
    roomImages,
    floorPlanImages,
    viewImages,
    video,
    roomDirection,
    loanAvailable,
    petAvailable,
    parkingAvailable,
    availableMoveInDate,
    facility,
    advantage,
  } = useRegisterAptStore();
  const roomImageThumbnail =
    roomImages?.map((image) => URL.createObjectURL(image)) || [];
  const floorPlanImageThumbnail = floorPlanImages?.map((image) =>
    URL.createObjectURL(image)
  );
  const viewImageThumbnail = viewImages?.map((image) =>
    URL.createObjectURL(image)
  );

  return (
    <div css={containerCSS}>
      <h2 css={titleCSS}>입력한 정보를 확인해주세요.</h2>
      <InfoRow
        title="글 작성자"
        content={aptSellerType ?? ""}
        onClick={() => onEdit(RegisterProcess.SELECT_SELLER_TYPE)}
      />
      <InfoRow
        title="형태"
        content={`${bay}베이 ${roomSize}평`}
        onClick={() => onEdit(RegisterProcess.SELECT_ROOM_SIZE)}
      />
      <InfoRow
        title="구조"
        content={`${structure}`}
        onClick={() => onEdit(RegisterProcess.SELECT_ROOM_STRUCTURE)}
      />
      <InfoRow
        title="방 개수"
        content={`${roomCount}개`}
        onClick={() => onEdit(RegisterProcess.ENTER_ROOM_INFO)}
      />
      <InfoRow
        title="욕실 개수"
        content={`${bathroomCount}개`}
        onClick={() => onEdit(RegisterProcess.ENTER_ROOM_INFO)}
      />
      <InfoRow
        title="층수"
        content={`${floor}층 / 전체 ${totalFloor}층`}
        onClick={() => onEdit(RegisterProcess.ENTER_ROOM_INFO)}
      />
      <InfoColumn
        title="주소"
        content={addressInfo?.address ?? ""}
        onClick={() => onEdit(RegisterProcess.ENTER_ADDRESS)}
      />
      <InfoColumn
        title="위치 설명"
        content={locationSummary}
        onClick={() => onEdit(RegisterProcess.ENTER_LOCATION_SUMMARY)}
      />
      <InfoRow title="거래 유형" content={transactionType?.join(", ") ?? ""} />
      {transactionType?.includes(TransactionType.매매) && (
        <InfoRow
          title="매매 거래금액"
          content={`${tradingPrice}만원`}
          onClick={() => onEdit(RegisterProcess.ENTER_TRANSACTION_TYPE)}
        />
      )}
      {transactionType?.includes(TransactionType.전세) && (
        <InfoRow
          title="전세 보증금"
          content={`${jeonseDeposit}만원`}
          onClick={() => onEdit(RegisterProcess.ENTER_TRANSACTION_TYPE)}
        />
      )}
      {transactionType?.includes(TransactionType.월세) && (
        <>
          <InfoRow
            title="월세 보증금"
            content={`${monthlyDeposit}만원`}
            onClick={() => onEdit(RegisterProcess.ENTER_TRANSACTION_TYPE)}
          />
          <InfoRow
            title="월세"
            content={`${monthlyRent}만원`}
            onClick={() => onEdit(RegisterProcess.ENTER_TRANSACTION_TYPE)}
          />
          <InfoRow
            title="월세 보증금 조정 가능 여부"
            content={monthlyRentDepositAdjustable ? "가능" : "불가능"}
            onClick={() => onEdit(RegisterProcess.ENTER_TRANSACTION_TYPE)}
          />
          {monthlyRentDepositAdjustable && (
            <InfoRow
              title="월세 보증금 조정 설명"
              content={depositAdjustableDescription ?? ""}
              onClick={() => onEdit(RegisterProcess.ENTER_TRANSACTION_TYPE)}
            />
          )}
        </>
      )}

      <ImageRow
        title="방 이미지"
        imageList={roomImageThumbnail}
        onClick={() => onEdit(RegisterProcess.ENTER_ROOM_IMAGES)}
      />
      {floorPlanImageThumbnail && (
        <ImageRow
          title="평면도 이미지"
          imageList={floorPlanImageThumbnail}
          onClick={() => onEdit(RegisterProcess.ENTER_ROOM_IMAGES)}
        />
      )}
      {viewImageThumbnail && (
        <ImageRow
          title="뷰 이미지"
          imageList={viewImageThumbnail}
          onClick={() => onEdit(RegisterProcess.ENTER_ROOM_IMAGES)}
        />
      )}
      {video && (
        <div
          css={infoColumnCSS}
          onClick={() => onEdit(RegisterProcess.SELECT_VIDEO)}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: getRem(18),
              }}
            >
              <span>메타버스 비디오</span>
              <FontAwesomeIcon icon={faChevronRight} color="#828282" />
            </div>

            <video css={videoCSS} autoPlay loop muted>
              <source src={video.url} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
      <InfoRow
        title="방향"
        content={roomDirection ?? ""}
        onClick={() => onEdit(RegisterProcess.SELECT_ROOM_DIRECTION)}
      />
      <InfoRow
        title="대출 가능 여부"
        content={loanAvailable}
        onClick={() => onEdit(RegisterProcess.ENTER_EXTRA_INFO)}
      />
      <InfoRow
        title="반려동물 가능 여부"
        content={petAvailable}
        onClick={() => onEdit(RegisterProcess.ENTER_EXTRA_INFO)}
      />
      <InfoRow
        title="주차 가능 여부"
        content={parkingAvailable}
        onClick={() => onEdit(RegisterProcess.ENTER_EXTRA_INFO)}
      />
      <InfoRow
        title="입주 가능일"
        content={availableMoveInDate.toLocaleDateString()}
        onClick={() => onEdit(RegisterProcess.ENTER_AVAILABLE_MOVE_IN_DATE)}
      />
      <InfoColumn
        title="시설"
        content={facility?.map((item) => item).join(", ")}
        onClick={() => onEdit(RegisterProcess.ENTER_FACILITY)}
      />
      <InfoColumn
        title="장점"
        content={advantage?.map((v) => (
          <p key={v}>{v}</p>
        ))}
        onClick={() => onEdit(RegisterProcess.ENTER_ADVANTAGE)}
      />
    </div>
  );
}

interface InfoRowProps {
  title: string;
  content: string;
  onClick?: () => void;
}

function InfoRow({ title, content, onClick }: InfoRowProps) {
  return (
    <div css={infoRowCSS} onClick={onClick}>
      <span>{title}</span>
      <div>
        <span>{content}</span>
        <FontAwesomeIcon icon={faChevronRight} color="#828282" />
      </div>
    </div>
  );
}

interface InfoColumnProps {
  title: string;
  content: ReactNode;
  onClick?: () => void;
}

function InfoColumn({ title, content, onClick }: InfoColumnProps) {
  return (
    <div css={infoColumnCSS} onClick={onClick}>
      <div>
        <span>{title}</span>
        {typeof content === "string" ? <span>{content}</span> : content}
      </div>
      <FontAwesomeIcon icon={faChevronRight} color="#828282" />
    </div>
  );
}

interface ImageRowProps {
  title: string;
  imageList: string[];
  onClick?: () => void;
}

function ImageRow({ title, imageList, onClick }: ImageRowProps) {
  return (
    <>
      <div
        onClick={onClick}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span css={imageLabelCSS}>{title}</span>
        <FontAwesomeIcon icon={faChevronRight} color="#828282" />
      </div>
      <div css={thumbnailListCSS}>
        {imageList.map((image) => (
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
    </>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
  overflow-x: hidden;
  overflow-y: scroll;
`;

const titleCSS = css`
  margin-bottom: ${getRem(24)};
`;

const infoRowCSS = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: ${getRem(24)} 0;
  cursor: pointer;

  > span {
    font-weight: 700;
  }
  > div {
    display: flex;
    align-items: center;
    gap: ${getRem(8)};
    > span {
      color: #828282;
    }
  }
`;

const infoColumnCSS = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  > div {
    display: flex;
    flex-direction: column;
    gap: ${getRem(8)};
    span:nth-of-type(1) {
      font-weight: 700;
    }

    span:nth-of-type(2) {
      color: #828282;
    }

    > p {
      color: #828282;
    }
  }

  border-bottom: 1px solid #ddd;
  padding: ${getRem(24)} 0;
`;

const imageLabelCSS = css`
  display: inline-block;
  font-weight: 700;
  margin-top: ${getRem(24)};
  margin-bottom: ${getRem(8)};
`;

const thumbnailListCSS = css`
  display: flex;
  gap: ${getRem(12)};
  overflow-x: scroll;
  padding-top: ${getRem(12)};
  padding-bottom: ${getRem(24)};
  border-bottom: 1px solid #ddd;
`;

const imageWrapCSS = css`
  width: ${getRem(120)};
  height: ${getRem(120)};
  border-radius: ${getRem(8)};
  border: 1px solid #e5e5e5;
`;

const videoCSS = css`
  width: 100%;
  object-fit: cover;
`;
