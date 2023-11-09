import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { ImageGallery } from "../ai-search";
import withAuth from "@/hoc/withAuth";
//
interface Apartment {
  apartmentId: number;
  address: string;
  apartmentStructure: string;
  apartmentSize: number;
  floorInfo: FloorInfo;
  roomInfo: RoomInfo;
  customDescription: string;
  apartmentDirection: string;
  maintenanceInfo: MaintenanceInfo;
  optionPossible: OptionPossible;
  availableDate: string;
  facility: string[];
  advantages: string[];
  introduction?: string;
  latitude: number;
  longitude: number;
  transactionMethod: TransactionMethod;
  videoUrl?: string;
  apartmentImgs: string[];
  floorPlanImgs: string[];
  windowOutsideImgs: string[];
}

// 층 정보에 대한 타입 정의
interface FloorInfo {
  totalFloor: number;
  currentFloor: number;
}

// 방 정보에 대한 타입 정의
interface RoomInfo {
  roomCount: number;
  bathRoomCount: number;
}

// 관리 정보에 대한 타입 정의
interface MaintenanceInfo {
  cost: number;
  excludeItems: string[];
  includeItems: string[];
}

// 옵션 가능 정보에 대한 타입 정의
interface OptionPossible {
  loan?: string;
  animal?: string;
  parking?: string;
}

// 거래 방식에 대한 타입 정의
interface TransactionMethod {
  jeonse?: number;
  monthlyRent?: number;
  monthlyRentDeposit?: number;
  tradingPrice?: number;
  depositChangeable: boolean;
  depositChangeableDescription?: string;
}

// ApartmentItem 컴포넌트의 Props 타입 정의
interface ApartmentItemProps {
  apartment: Apartment;
  onToggle: () => void;
  isOpen: boolean;
  handleDelete: (apartmentId: number) => void;
}

function MyPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [toggle, setToggle] = useState<{ [key: number]: boolean }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  // 이름 수정 API 호출 함수
  const updateUserName = async () => {
    const token = getCookie("token");
    try {
      const response = await axios.patch(
        "https://api.ua-apt.com/auth/info",
        { userName: newUserName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserName(newUserName); // 화면에 표시되는 이름 업데이트
      setIsEditing(false); // 입력 필드 숨기기
      // 추가적인 성공 로직...
    } catch (error) {
      console.error("Error updating the user name:", error);
      // 에러 처리 로직...
    }
  };

  const handleDelete = async (apartmentId: number) => {
    const token = getCookie("token");
    if (token) {
      const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
      if (!isConfirmed) return;
      try {
        await axios.delete(
          `https://api.ua-apt.com/apartment?apartmentId=${apartmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // 삭제 성공, 상태 업데이트로 아파트 목록에서 제거
        setApartments((prevApartments) =>
          prevApartments.filter((a) => a.apartmentId !== apartmentId)
        );
      } catch (error) {
        console.error("Error deleting the apartment:", error);
        // 에러 처리 로직을 여기에 구현합니다.
        // 예를 들어, 사용자에게 오류 메시지를 표시할 수 있습니다.
      }
    }
  };

  useEffect(() => {
    const fetchApartments = async () => {
      const token = getCookie("token");
      if (token) {
        try {
          const response = await axios.get("https://api.ua-apt.com/apartment", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userInfo = await axios.get("https://api.ua-apt.com/auth/info", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserName(userInfo.data.userName);
          setApartments(response.data);
          let initialToggleState: { [key: number]: boolean } = {};
          response.data.forEach((apartment: Apartment) => {
            initialToggleState[apartment.apartmentId] = false;
          });
          setToggle(initialToggleState);
        } catch (error) {
          console.error("Error fetching apartments:", error);
        }
      }
    };

    fetchApartments();
  }, []);

  const handleToggle = (apartmentId: number) => {
    setToggle((prevToggle) => ({
      ...prevToggle,
      [apartmentId]: !prevToggle[apartmentId],
    }));
  };

  return (
    <div css={containerCSS}>
      <div>
        <h1
          style={{
            borderBottom: "2px solid #00baf2",
            paddingBottom: "10px",
            color: "#00baf2",
            marginBottom: "20px",
          }}
        >
          내 정보
        </h1>
        {!isEditing ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h2>이름 : {userName}</h2>
            <h3
              style={{
                color: "gray",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() => setIsEditing(true)} // 수정 버튼 클릭 시 isEditing을 true로 설정
            >
              수정
            </h3>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <input
              height="30px"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              style={{
                marginRight: "10px",
                height: "30px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={updateUserName}
              style={{
                marginRight: "10px",
              }}
            >
              확인
            </button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </div>
        )}
      </div>
      <div>
        <h1
          style={{
            borderBottom: "2px solid #00baf2",
            paddingBottom: "10px",
            color: "#00baf2",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          내가 등록한 매물
        </h1>
        <div>
          {apartments.map((apartment: Apartment) => (
            <ApartmentItem
              key={apartment.apartmentId}
              apartment={apartment}
              onToggle={() => handleToggle(apartment.apartmentId)}
              isOpen={toggle[apartment.apartmentId]}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const ApartmentItem: React.FC<ApartmentItemProps> = ({
  apartment,
  onToggle,
  isOpen,
  handleDelete,
}) => {
  // 금액을 보기 좋게 포맷하는 함수, 값이 없으면 '정보 없음' 반환
  const formatPrice = (price: number) => {
    return price ? `${price.toLocaleString()}원` : "정보 없음";
  };

  // JSON 값을 한글로 보기 좋게 변환하는 함수
  const formatFloorInfo = ({ totalFloor, currentFloor }: FloorInfo) => {
    return `${totalFloor}층 / ${currentFloor}층`;
  };

  const formatRoomInfo = ({ roomCount, bathRoomCount }: RoomInfo) => {
    return `방 개수: ${roomCount}개, 욕실 개수: ${bathRoomCount}개`;
  };

  const formatMaintenanceInfo = ({
    cost,
    excludeItems,
    includeItems,
  }: MaintenanceInfo) => {
    let itemsIncluded =
      includeItems.length > 0 ? `포함: ${includeItems.join(", ")}` : "";
    let itemsExcluded =
      excludeItems.length > 0 ? `불포함: ${excludeItems.join(", ")}` : "";
    return `관리비: ${cost.toLocaleString()}원${
      itemsIncluded ? `, ${itemsIncluded}` : ""
    }${itemsExcluded ? `, ${itemsExcluded}` : ""}`;
  };

  const formatOptions = (options: OptionPossible) => {
    let formattedOptions = [];
    for (const [key, value] of Object.entries(options)) {
      if (key === "loan") formattedOptions.push(`대출: ${value}`);
      if (key === "animal") formattedOptions.push(`동물: ${value}`);
      if (key === "parking") formattedOptions.push(`주차: ${value}`);
    }
    return formattedOptions.join(" / ");
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "10px",
        userSelect: "text",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>{apartment.address}</h3>
        <button onClick={() => handleDelete(apartment.apartmentId)}>
          삭제
        </button>
      </div>

      <button onClick={onToggle}>{isOpen ? "정보 숨기기" : "정보 보기"}</button>
      {isOpen && (
        <div style={{ marginTop: "10px" }}>
          <div style={{ marginBottom: "20px" }}>
            <strong>아파트 이미지</strong>
            <ImageGallery images={apartment.apartmentImgs} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <strong>평면도 이미지</strong>
            <ImageGallery images={apartment.floorPlanImgs} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <strong>창밖 전망 이미지</strong>
            <ImageGallery images={apartment.windowOutsideImgs} />
          </div>

          <p>
            <strong>구조:</strong> {apartment.apartmentStructure}
          </p>
          <p>
            <strong>크기:</strong> {apartment.apartmentSize} 제곱미터
          </p>
          <p>
            <strong>층 정보:</strong> {formatFloorInfo(apartment.floorInfo)}
          </p>
          <p>
            <strong>방 정보:</strong> {formatRoomInfo(apartment.roomInfo)}
          </p>
          <p>
            <strong>설명:</strong> {apartment.customDescription}
          </p>
          <p>
            <strong>방향:</strong> {apartment.apartmentDirection}
          </p>
          <p>
            <strong>관리 정보:</strong>{" "}
            {formatMaintenanceInfo(apartment.maintenanceInfo)}
          </p>
          {Object.keys(apartment.optionPossible).length > 0 && (
            <p>
              <strong>옵션:</strong> {formatOptions(apartment.optionPossible)}
            </p>
          )}
          <p>
            <strong>입주 가능일:</strong>{" "}
            {new Date(apartment.availableDate).toLocaleDateString()}
          </p>
          <p>
            <strong>시설:</strong> {apartment.facility.join(", ")}
          </p>
          <p>
            <strong>장점:</strong> {apartment.advantages.join(", ")}
          </p>
          <p>
            <strong>소개:</strong> {apartment.introduction || "없음"}
          </p>
          <p>
            <strong>위도:</strong> {apartment.latitude}
          </p>
          <p>
            <strong>경도:</strong> {apartment.longitude}
          </p>
          <div>
            <strong>거래 방식:</strong>
            {apartment.transactionMethod.jeonse && (
              <p>전세: {formatPrice(apartment.transactionMethod.jeonse)}</p>
            )}
            {apartment.transactionMethod.monthlyRent && (
              <p>
                월세: {formatPrice(apartment.transactionMethod.monthlyRent)}
              </p>
            )}
            {apartment.transactionMethod.monthlyRentDeposit && (
              <p>
                월세 보증금:{" "}
                {formatPrice(apartment.transactionMethod.monthlyRentDeposit)}
              </p>
            )}
            {apartment.transactionMethod.tradingPrice && (
              <p>
                매매 가격:{" "}
                {formatPrice(apartment.transactionMethod.tradingPrice)}
              </p>
            )}
            <p>
              보증금 조정 가능:{" "}
              {apartment.transactionMethod.depositChangeable
                ? "가능"
                : "불가능"}
            </p>
            {apartment.transactionMethod.depositChangeable && (
              <p>
                보증금 조정 설명:{" "}
                {apartment.transactionMethod.depositChangeableDescription}
              </p>
            )}
          </div>
          {apartment.videoUrl && (
            <p>
              <a
                href={apartment.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>비디오 확인</strong>
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const containerCSS = css`
  max-width: ${getRem(500)};
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border-right: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  padding-bottom: ${getRem(20)};
  overflow: auto;
  padding: ${getRem(20)} ${getRem(24)};
`;

export default withAuth(MyPage);
