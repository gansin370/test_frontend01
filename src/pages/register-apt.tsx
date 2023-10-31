import ProgressBar from "@/components/ProgressBar";
import ConfirmInfoView from "@/components/register-apt/ConfirmInfoView";
import EnterAddressView, {
  Address,
} from "@/components/register-apt/EnterAddress";
import EnterAdvantageView from "@/components/register-apt/EnterAdvantageView";
import EnterAvailableMoveInDateView from "@/components/register-apt/EnterAvailableMoveInDateView";
import EnterExtraInfoView from "@/components/register-apt/EnterExtraInfoView";
import EnterFacilityView from "@/components/register-apt/EnterFacility";
import EnterLocationSummaryView from "@/components/register-apt/EnterLocationSummaryView";
import EnterRoomImageView from "@/components/register-apt/EnterRoomImageView";
import EnterRoomInfoView from "@/components/register-apt/EnterRoomInfoView";
import EnterTransactionTypeView, {
  TransactionType,
} from "@/components/register-apt/EnterTransactionTypeView";
import SelectAptSellerTypeView, {
  AptSellerType,
} from "@/components/register-apt/SelectAptSellerTypeView";
import SelectRoomDirectionView, {
  Direction,
} from "@/components/register-apt/SelectRoomDirectionView";
import SelectRoomSizeView from "@/components/register-apt/SelectRoomSizeView";
import SelectVideoView, {
  Video,
} from "@/components/register-apt/SelectVideoView";
import { getRem } from "@/styles/commonStyle";
import { Theme, css } from "@emotion/react";
import { useState } from "react";

export default function RegisterAptPage() {
  const [process, setProcess] = useState(RegisterProcess.SELECT_SELLER_TYPE);
  const [aptSellerType, setAptSellerType] = useState<
    AptSellerType | undefined
  >();
  const [roomSize, setRoomSize] = useState<number | undefined>();
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [totalFloor, setTotalFloor] = useState<number | undefined>();
  const [floor, setFloor] = useState<number | undefined>();
  const [addressInfo, setAddressInfo] = useState<Address | undefined>();
  const [locationSummary, setLocationSummary] = useState<string>("");
  const [transactionType, setTransactionType] = useState<TransactionType>();
  const [roomImages, setRoomImages] = useState<File[]>();
  const [floorPlanImages, setFloorPlanImages] = useState<File[]>();
  const [viewImages, setViewImages] = useState<File[]>();
  const [selectedVideo, setSelectedVideo] = useState<Video>();
  const [roomDirection, setRoomDirection] = useState<Direction>();

  const getButtonDisabled = () => {
    switch (process) {
      case RegisterProcess.SELECT_SELLER_TYPE:
        return !aptSellerType;
      case RegisterProcess.SELECT_ROOM_SIZE:
        return !roomSize;
      case RegisterProcess.ENTER_ROOM_INFO:
        return !totalFloor || !floor;
      case RegisterProcess.ENTER_ADDRESS:
        return (
          !addressInfo?.address ||
          !addressInfo?.detailAddress ||
          !addressInfo?.lat ||
          !addressInfo?.lng ||
          !addressInfo?.address
        );
      case RegisterProcess.ENTER_LOCATION_SUMMARY:
        return !locationSummary;
      case RegisterProcess.ENTER_TRANSACTION_TYPE:
        return !transactionType;
      case RegisterProcess.ENTER_ROOM_IMAGES:
        return !roomImages || roomImages?.length < 3;
      case RegisterProcess.SELECT_VIDEO:
        return !selectedVideo;
      case RegisterProcess.SELECT_ROOM_DIRECTION:
        return !roomDirection;
      default:
        return false;
    }
  };

  const onClickNextButton = () => {
    const nextProcessIndex = processList.findIndex((v) => v === process) + 1;
    if (nextProcessIndex >= processList.length) {
      return;
    } else {
      setProcess(processList[nextProcessIndex]);
    }
  };

  const onClickPreviousButton = () => {
    const previousProcessIndex =
      processList.findIndex((v) => v === process) - 1;
    if (previousProcessIndex < 0) {
      return;
    } else {
      setProcess(processList[previousProcessIndex]);
    }
  };

  return (
    <main css={containerCSS}>
      {process === RegisterProcess.SELECT_SELLER_TYPE && (
        <SelectAptSellerTypeView
          selectedType={aptSellerType}
          onSelectType={setAptSellerType}
        />
      )}
      {process === RegisterProcess.SELECT_ROOM_SIZE && (
        <SelectRoomSizeView
          selectedRoomSize={roomSize}
          onSelectRoomSize={setRoomSize}
        />
      )}
      {process === RegisterProcess.ENTER_ROOM_INFO && (
        <EnterRoomInfoView
          roomSize={roomSize}
          onChangeRoomCount={setRoomCount}
          onChangeBathroomCount={setBathroomCount}
          totalFloor={totalFloor}
          onChangeTotalFloor={setTotalFloor}
          floor={floor}
          onChangeFloor={setFloor}
        />
      )}
      {process === RegisterProcess.ENTER_ADDRESS && (
        <EnterAddressView
          address={addressInfo}
          onChangeAddress={setAddressInfo}
        />
      )}
      {process === RegisterProcess.ENTER_LOCATION_SUMMARY && (
        <EnterLocationSummaryView
          locationSummary={locationSummary}
          onChangeLocationSummary={setLocationSummary}
        />
      )}
      {process === RegisterProcess.ENTER_TRANSACTION_TYPE && (
        <EnterTransactionTypeView
          transactionType={transactionType}
          onChangeTransactionType={setTransactionType}
        />
      )}
      {process === RegisterProcess.ENTER_ROOM_IMAGES && (
        <EnterRoomImageView
          roomImage={roomImages}
          floorPlanImage={floorPlanImages}
          viewImage={viewImages}
          onChangeRoomImage={setRoomImages}
          onChangeFloorPlanImage={setFloorPlanImages}
          onChangeViewImage={setViewImages}
        />
      )}
      {process === RegisterProcess.SELECT_VIDEO && (
        <SelectVideoView
          selectedVideo={selectedVideo}
          onChangeVideo={setSelectedVideo}
        />
      )}
      {process === RegisterProcess.SELECT_ROOM_DIRECTION && (
        <SelectRoomDirectionView
          direction={roomDirection}
          onChangeDirection={setRoomDirection}
        />
      )}
      {process === RegisterProcess.ENTER_EXTRA_INFO && <EnterExtraInfoView />}
      {process === RegisterProcess.ENTER_AVAILABLE_MOVE_IN_DATE && (
        <EnterAvailableMoveInDateView />
      )}
      {process === RegisterProcess.ENTER_FACILITY && <EnterFacilityView />}
      {process === RegisterProcess.ENTER_ADVANTAGE && <EnterAdvantageView />}
      {process === RegisterProcess.CONFIRM_INFO && <ConfirmInfoView />}

      <div>
        <ProgressBar
          progress={processList.length}
          currentProgress={processList.findIndex((v) => v === process) + 1}
        />
        <div css={buttonContainerCSS}>
          {process !== processList[0] && (
            <button onClick={onClickPreviousButton} css={previousButtonCSS}>
              이전
            </button>
          )}
          <button
            onClick={onClickNextButton}
            css={nextButtonCSS(getButtonDisabled(), process === processList[0])}
            disabled={getButtonDisabled()}
          >
            다음
          </button>
        </div>
      </div>
    </main>
  );
}

const containerCSS = css`
  max-width: ${getRem(500)};
  margin: 0 auto;
  width: 100%;
  border-right: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: ${getRem(20)};
  overflow: hidden;
`;

const buttonContainerCSS = css`
  display: flex;
  justify-content: space-between;
  margin-top: ${getRem(20)};
  padding: 0 ${getRem(24)};
`;

const nextButtonCSS = (disabled: boolean, isFirst: boolean) => () =>
  css`
    border-radius: ${getRem(8)};
    padding: ${getRem(16)} ${getRem(20)};
    width: ${isFirst ? "100%" : "50%"};
    color: ${disabled ? "gray" : "white"};
    font-size: ${getRem(16)};
    font-weight: 700;
    background-color: ${disabled ? "#e5e5e5" : "#00baf2"};
  `;

const previousButtonCSS = css`
  border-radius: ${getRem(8)};
  padding: ${getRem(16)} ${getRem(20)};
  width: 40%;
  color: #000;
  font-size: ${getRem(16)};
  font-weight: 700;
  background-color: lightgray;
`;

enum RegisterProcess {
  SELECT_SELLER_TYPE = "SELECT_SELLER_TYPE",
  SELECT_ROOM_SIZE = "SELECT_ROOM_SIZE",
  ENTER_ROOM_INFO = "ENTER_ROOM_INFO",
  ENTER_ADDRESS = "ENTER_ADDRESS",
  ENTER_LOCATION_SUMMARY = "ENTER_LOCATION_SUMMARY",
  ENTER_TRANSACTION_TYPE = "ENTER_TRANSACTION_TYPE",
  ENTER_ROOM_IMAGES = "ENTER_ROOM_IMAGES",
  SELECT_VIDEO = "SELECT_VIDEO",
  SELECT_ROOM_DIRECTION = "SELECT_ROOM_DIRECTION",
  ENTER_EXTRA_INFO = "ENTER_EXTRA_INFO",
  ENTER_AVAILABLE_MOVE_IN_DATE = "ENTER_AVAILABLE_MOVE_IN_DATE",
  ENTER_FACILITY = "ENTER_FACILITY",
  ENTER_ADVANTAGE = "ENTER_ADVANTAGE",
  CONFIRM_INFO = "CONFIRM_INFO",
}

const processList = Object.values(RegisterProcess);
