import ProgressBar from "@/components/ProgressBar";
import ConfirmInfoView from "@/components/register-apt/ConfirmInfoView";
import EnterAddressView from "@/components/register-apt/EnterAddress";
import EnterAdvantageView from "@/components/register-apt/EnterAdvantageView";
import EnterAvailableMoveInDateView from "@/components/register-apt/EnterAvailableMoveInDateView";
import EnterExtraInfoView from "@/components/register-apt/EnterExtraInfoView";
import EnterFacilityView from "@/components/register-apt/EnterFacility";
import EnterLocationSummaryView from "@/components/register-apt/EnterLocationSummaryView";
import EnterMaintenanceFeeView from "@/components/register-apt/EnterMaintenanceFeeView";
import EnterRoomImageView from "@/components/register-apt/EnterRoomImageView";
import EnterRoomInfoView from "@/components/register-apt/EnterRoomInfoView";
import EnterTransactionTypeView, {
  TransactionType,
} from "@/components/register-apt/EnterTransactionTypeView";
import EnterRoomIntroductionView from "@/components/register-apt/EnterRoomIntroductionView";
import SelectAptSellerTypeView from "@/components/register-apt/SelectAptSellerTypeView";
import SelectRoomDirectionView from "@/components/register-apt/SelectRoomDirectionView";
import SelectRoomSizeView from "@/components/register-apt/SelectRoomSizeView";
import SelectRoomStructureView from "@/components/register-apt/SelectRoomStructureView";
import SelectVideoView from "@/components/register-apt/SelectVideoView";
import { useRegisterAptStore } from "@/store/register-apt";
import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";

function RegisterAptPage() {
  const [process, setProcess] = useState(RegisterProcess.SELECT_SELLER_TYPE);
  const [isEditing, setIsEditing] = useState(false);

  const {
    aptSellerType,
    roomSize,
    structure,
    totalFloor,
    floor,
    addressInfo,
    transactionType,
    tradingPrice,
    jeonseDeposit,
    monthlyDeposit,
    monthlyRent,
    roomImages,
    video,
    roomDirection,
    facility,
    advantage,
    clearStore,
  } = useRegisterAptStore();
  const getButtonDisabled = () => {
    switch (process) {
      case RegisterProcess.SELECT_SELLER_TYPE:
        return !aptSellerType;
      case RegisterProcess.SELECT_ROOM_SIZE:
        return !roomSize;
      case RegisterProcess.SELECT_ROOM_STRUCTURE:
        return !structure;
      case RegisterProcess.ENTER_ROOM_INFO:
        return !totalFloor || !floor;
      case RegisterProcess.ENTER_ADDRESS:
        return (
          !addressInfo?.address ||
          !addressInfo?.lat ||
          !addressInfo?.lng ||
          !addressInfo?.address
        );
      case RegisterProcess.ENTER_TRANSACTION_TYPE:
        if (transactionType?.includes(TransactionType.월세)) {
          return !monthlyDeposit || !monthlyRent;
        }
        if (transactionType?.includes(TransactionType.전세)) {
          return !jeonseDeposit;
        }
        if (transactionType?.includes(TransactionType.매매)) {
          return !tradingPrice;
        }
        return !transactionType || transactionType.length === 0;
      case RegisterProcess.ENTER_ROOM_IMAGES:
        return !roomImages || roomImages?.length < 3;
      case RegisterProcess.SELECT_VIDEO:
        return !video;
      case RegisterProcess.SELECT_ROOM_DIRECTION:
        return !roomDirection;
      case RegisterProcess.ENTER_FACILITY:
        return !facility || facility.length === 0;
      case RegisterProcess.ENTER_ADVANTAGE:
        return !advantage || advantage.length === 0;
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

  const onEdit = (process: RegisterProcess) => {
    setIsEditing(true);
    setProcess(process);
  };

  const onEditFinish = () => {
    setIsEditing(false);
    setProcess(RegisterProcess.CONFIRM_INFO);
  };

  useEffect(() => {
    return () => {
      clearStore();
    };
  }, []);

  return (
    <main css={containerCSS}>
      {process === RegisterProcess.SELECT_SELLER_TYPE && (
        <SelectAptSellerTypeView />
      )}
      {process === RegisterProcess.SELECT_ROOM_SIZE && <SelectRoomSizeView />}
      {process === RegisterProcess.SELECT_ROOM_STRUCTURE && (
        <SelectRoomStructureView />
      )}
      {process === RegisterProcess.ENTER_ROOM_INFO && <EnterRoomInfoView />}
      {process === RegisterProcess.ENTER_MAINTENANCE_FEE && (
        <EnterMaintenanceFeeView />
      )}
      {process === RegisterProcess.ENTER_ADDRESS && <EnterAddressView />}
      {process === RegisterProcess.ENTER_LOCATION_SUMMARY && (
        <EnterLocationSummaryView />
      )}
      {process === RegisterProcess.ENTER_TRANSACTION_TYPE && (
        <EnterTransactionTypeView />
      )}
      {process === RegisterProcess.ENTER_ROOM_IMAGES && <EnterRoomImageView />}
      {process === RegisterProcess.SELECT_VIDEO && <SelectVideoView />}
      {process === RegisterProcess.SELECT_ROOM_DIRECTION && (
        <SelectRoomDirectionView />
      )}
      {process === RegisterProcess.ENTER_EXTRA_INFO && <EnterExtraInfoView />}
      {process === RegisterProcess.ENTER_AVAILABLE_MOVE_IN_DATE && (
        <EnterAvailableMoveInDateView />
      )}
      {process === RegisterProcess.ENTER_FACILITY && <EnterFacilityView />}
      {process === RegisterProcess.ENTER_ADVANTAGE && <EnterAdvantageView />}
      {process === RegisterProcess.ENTER_ROOM_INTRODUCTION && (
        <EnterRoomIntroductionView />
      )}
      {process === RegisterProcess.CONFIRM_INFO && (
        <ConfirmInfoView onEdit={onEdit} />
      )}

      {process !== RegisterProcess.CONFIRM_INFO && (
        <div>
          <ProgressBar
            progress={processList.length}
            currentProgress={processList.findIndex((v) => v === process) + 1}
          />
          {isEditing ? (
            <div css={buttonContainerCSS}>
              <button
                onClick={onEditFinish}
                css={editButtonCSS(getButtonDisabled())}
              >
                수정하기
              </button>
            </div>
          ) : (
            <div css={buttonContainerCSS}>
              {process !== processList[0] && (
                <button onClick={onClickPreviousButton} css={previousButtonCSS}>
                  이전
                </button>
              )}
              <button
                onClick={onClickNextButton}
                css={nextButtonCSS(
                  getButtonDisabled(),
                  process === processList[0]
                )}
                disabled={getButtonDisabled()}
              >
                다음
              </button>
            </div>
          )}
        </div>
      )}
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
  height: 100%;
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

const editButtonCSS = (disabled: boolean) => () =>
  css`
    border-radius: ${getRem(8)};
    padding: ${getRem(16)} ${getRem(20)};
    width: 100%;
    color: ${disabled ? "gray" : "white"};
    font-size: ${getRem(16)};
    font-weight: 700;
    background-color: ${disabled ? "#e5e5e5" : "#00baf2"};
  `;

export enum RegisterProcess {
  SELECT_SELLER_TYPE = "SELECT_SELLER_TYPE",
  SELECT_ROOM_SIZE = "SELECT_ROOM_SIZE",
  SELECT_ROOM_STRUCTURE = "SELECT_ROOM_STRUCTURE",
  ENTER_ROOM_INFO = "ENTER_ROOM_INFO",
  ENTER_MAINTENANCE_FEE = "ENTER_MAINTENANCE_FEE",
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
  ENTER_ROOM_INTRODUCTION = "ENTER_ROOM_INTRODUCTION",
  CONFIRM_INFO = "CONFIRM_INFO",
}

const processList = Object.values(RegisterProcess);

export default withAuth(RegisterAptPage);
