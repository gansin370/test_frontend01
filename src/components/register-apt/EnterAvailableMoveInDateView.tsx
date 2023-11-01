import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRegisterAptStore } from "@/store/register-apt";

export default function EnterAvailableMoveInDateView() {
  const { availableMoveInDate, setAvailableMoveInDate } = useRegisterAptStore();
  const [isImmediatelyMoveInAvailable, setIsImmediatelyMoveInAvailable] =
    useState(false);

  const handleImmediateButtonClick = () => {
    setIsImmediatelyMoveInAvailable(!isImmediatelyMoveInAvailable);

    if (!isImmediatelyMoveInAvailable) {
      setAvailableMoveInDate(new Date());
    }
  };

  const handleDateChange = (date: Date) => {
    setAvailableMoveInDate(date);
    if (date.getDate() !== new Date().getDate()) {
      setIsImmediatelyMoveInAvailable(false);
    }
  };
  return (
    <div css={containerCSS}>
      <h2>입주 가능 날짜를 선택해주세요</h2>
      <Calendar
        locale="ko-KR"
        minDate={new Date()}
        defaultValue={availableMoveInDate}
        value={availableMoveInDate}
        onChange={(date) =>
          handleDateChange(new Date(date as unknown as string))
        }
      />
      <div
        css={immediatelyMoveInCSS(isImmediatelyMoveInAvailable)}
        onClick={handleImmediateButtonClick}
      >
        <div>
          <FontAwesomeIcon icon={faClock} />
          <span>즉시 입주 가능해요</span>
        </div>
        <span>
          <span />
        </span>
      </div>
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
  display: flex;
  flex-direction: column;

  gap: ${getRem(24)};

  .react-calendar {
    width: 100%;
    max-width: 400px;
    border: 1px solid #e1e1e1;
    background-color: #f9f9f9;
    border-radius: ${getRem(8)};
    font-size: 16px;
    line-height: 1.125;
    margin: 0 auto;
  }

  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
    margin-bottom: ${getRem(8)};
    font-size: ${getRem(11)};
    line-height: 1.5;

    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__tile {
    aspect-ratio: 1/1;
    &:hover {
      border-radius: 50%;
    }
  }

  .react-calendar__tile--now {
    background-color: transparent;
    color: #000;
    border-radius: 50%;
  }

  .react-calendar__tile--active {
    background: #00baf2 !important;
    background-color: #00baf2 !important;
    color: white;
    border-radius: 50%;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #000;
  }
`;

const immediatelyMoveInCSS = (isSelected: boolean) => () =>
  css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e1e1e1;
    background-color: #f9f9f9;
    padding: ${getRem(12)} ${getRem(16)};
    border-radius: ${getRem(8)};
    font-weight: 600;

    div {
      display: flex;
      align-items: center;
      gap: ${getRem(6)};
    }

    > span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${getRem(24)};
      height: ${getRem(24)};
      border-radius: 50%;
      border: 1px solid #e1e1e1;
      background-color: white;
      > span {
        width: ${getRem(16)};
        height: ${getRem(16)};
        border-radius: 50%;
        background-color: ${isSelected ? "#00baf2" : "white"};
      }
    }

    cursor: pointer;
  `;
