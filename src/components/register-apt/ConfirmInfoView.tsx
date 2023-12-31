import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { ReactNode, useState } from "react";
import NextImage from "../Image";
import { useRegisterAptStore } from "@/store/register-apt";
import { RegisterProcess } from "@/pages/register-apt";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionType } from "./EnterTransactionTypeView";
import ProgressBar from "../ProgressBar";
import { createApartment } from "@/api/apartment";
import LoadingSpinner from "../LoadingSpinner";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants/route";

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
    maintenanceFee,
    includeMaintenanceItem,
    excludeMaintenanceItem,
    maintenanceDescription,
    roomIntroduction,
  } = useRegisterAptStore();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const roomImageThumbnail =
    roomImages?.map((image) => URL.createObjectURL(image)) || [];
  const floorPlanImageThumbnail = floorPlanImages?.map((image) =>
    URL.createObjectURL(image)
  );
  const viewImageThumbnail = viewImages?.map((image) =>
    URL.createObjectURL(image)
  );

  const getVideoUrl = () => {
    if (!roomSize) return;
    if (10 <= roomSize && roomSize <= 19 && bay === 1) {
     /*  return "https://www.youtube.com/embed/_-jwxfqw27Y?si=-UNLLODy00jXc4_q&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=_-jwxfqw27Y"; */
      return "https://www.youtube.com/embed/GpWGCkWXuE8?si=-UNLLODy00jXc4_q&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=GpWGCkWXuE8";
    }

    if (30 <= roomSize && roomSize <= 35 && bay === 2) {
      /* return "https://www.youtube.com/embed/5-dIuLmRZZA?si=FIWPHecOK_5M2cQ1&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=5-dIuLmRZZA"; */
      return "https://www.youtube.com/embed/TRV-B4DBLP0?si=FIWPHecOK_5M2cQ1&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=TRV-B4DBLP0";
    }

    if (30 <= roomSize && roomSize <= 35 && bay === 4) {
      /* return "https://www.youtube.com/embed/E8nt18KbitQ?si=Mw3WSFU3wf4ugBPk&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=E8nt18KbitQ"; */
      return "https://www.youtube.com/embed/BRLksGhFvlk?si=Mw3WSFU3wf4ugBPk&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=BRLksGhFvlk";
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (
        !aptSellerType ||
        !roomSize ||
        !bay ||
        !structure ||
        !addressInfo?.address ||
        !addressInfo.lat ||
        !addressInfo.lng ||
        !floor ||
        !totalFloor ||
        !roomCount ||
        !bathroomCount ||
        !roomDirection ||
        !facility ||
        !loanAvailable ||
        !petAvailable ||
        !parkingAvailable ||
        !availableMoveInDate ||
        !advantage ||
        !roomImages
      ) {
        return;
      }

      await createApartment({
        params: {
          userType: aptSellerType,
          apartmentSize: roomSize,
          apartmentBay: bay,
          apartmentStructure: structure,
          latitude: Number(addressInfo.lat),
          longitude: Number(addressInfo.lng),
          address: addressInfo.address,
          floorInfo: {
            currentFloor: floor,
            totalFloor,
          },
          roomInfo: {
            roomCount,
            bathRoomCount: bathroomCount,
          },
          customDescription: locationSummary ?? undefined,
          transactionMethod: {
            jeonse: jeonseDeposit ?? undefined,
            monthlyRent: monthlyRent ?? undefined,
            monthlyRentDeposit: monthlyDeposit ?? undefined,
            depositChangeable: monthlyRentDepositAdjustable ?? undefined,
            depositChangeableDescription:
              depositAdjustableDescription ?? undefined,
          },
          apartmentDirection: roomDirection,
          maintenanceInfo: {
            cost: maintenanceFee ?? 0,
            includeItems: includeMaintenanceItem ?? [],
            excludeItems: excludeMaintenanceItem ?? [],
            description: maintenanceDescription ?? undefined,
          },
          optionPossible: {
            loan: loanAvailable,
            animal: petAvailable,
            parking: parkingAvailable,
          },
          facility,
          advantages: advantage,
          introduction: "소개소개",
          availableDate: availableMoveInDate,
          videoUrl: getVideoUrl(),
        },
        images: {
          roomImages,
          floorPlanImages: floorPlanImages ?? undefined,
          viewImages: viewImages ?? undefined,
        },
      });
      alert("등록이 완료되었습니다.");
      router.push(ROUTES.MY_PAGE.HOME);
    } catch (e) {
      console.log(e);
      alert("등록 중 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div css={containerCSS}>
      {loading && <LoadingSpinner />}
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
      <InfoRow
        title="관리비"
        content={maintenanceFee ? `${maintenanceFee}만원` : ""}
        onClick={() => onEdit(RegisterProcess.ENTER_MAINTENANCE_FEE)}
      />
      <InfoColumn
        title="관리비 포함 항목"
        content={includeMaintenanceItem?.join(", ") ?? ""}
        onClick={() => onEdit(RegisterProcess.ENTER_MAINTENANCE_FEE)}
      />
      <InfoColumn
        title="관리비 불포함 항목"
        content={excludeMaintenanceItem?.join(", ") ?? ""}
        onClick={() => onEdit(RegisterProcess.ENTER_MAINTENANCE_FEE)}
      />
      {maintenanceDescription && (
        <InfoColumn
          title="관리비 설명"
          content={maintenanceDescription}
          onClick={() => onEdit(RegisterProcess.ENTER_MAINTENANCE_FEE)}
        />
      )}
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
      {roomIntroduction && (
        <InfoColumn
          title="방 소개"
          content={roomIntroduction}
          onClick={() => onEdit(RegisterProcess.ENTER_ROOM_INTRODUCTION)}
        />
      )}
      <button onClick={handleSubmit} css={bottomButtonCSS} disabled={loading}>
        등록하기
      </button>
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
            <NextImage
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

const bottomButtonCSS = css`
  margin-top: ${getRem(20)};
  border-radius: ${getRem(8)};
  padding: ${getRem(16)} ${getRem(20)};
  width: 100%;
  color: white;
  font-size: ${getRem(16)};
  font-weight: 700;
  background-color: #00baf2;
`;
