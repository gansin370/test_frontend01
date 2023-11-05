import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { css } from "@emotion/react";
import { getCookie } from "cookies-next";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Image from "next/image";
import UserIconImg from "./userIconImg.jpg";
import LoadingGif from "./loading.gif";
import VideoPlayer from "@/components/Video";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getRem } from "@/styles/commonStyle";

Modal.setAppElement("#__next");

type ApartmentData = {
  apartmentId: number;
  userId: number;
  userType: string;
  apartmentStructure: string;
  apartmentBay: number;
  apartmentSize: number;
  floorInfo: {
    currentFloor: number;
    totalFloor: number;
  };
  roomInfo: {
    roomCount: number;
    bathRoomCount: number;
  };
  address: string;
  customDescription: string | null;
  apartmentImgs: string[];
  floorPlanImgs: string[];
  windowOutsideImgs: string[];
  apartmentDirection: string;
  maintenanceInfo: {
    cost: number;
    includeItems: string[];
    excludeItems: string[];
  };
  optionPossible: {
    loan: string;
    animal: string;
    parking: string;
  };
  videoUrl: string | null;
  availableDate: Date;
  transactionMethod: {
    transactionMethodId: number;
    apartmentId: number;
    jeonse: number;
    monthlyRent: number;
    monthlyRentDeposit: number;
    tradingPrice: number;
    depositChangeable: boolean;
    depositChangeableDescription: string;
  };
  facility: string[];
  advantages: string[];
  introduction: string | null;
  latitude: number;
  longitude: number;
};

type Message = {
  text?: string;
  sender: "user" | "computer";
  isMap?: boolean;
  lat?: number;
  lng?: number;
  data?: ApartmentData;
};

type KakaoMapProps = {
  lat: number;
  lng: number;
  hide: boolean;
};

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng, hide }) => {
  return (
    <div style={{ zIndex: 1, opacity: hide ? 0 : 1 }}>
      <Map
        center={{ lat, lng }}
        style={{ width: "300px", height: "200px", zIndex: 1 }}
        level={3}
        draggable={false}
      >
        <MapMarker position={{ lat, lng }} clickable={true} />
      </Map>
    </div>
  );
};

const callApi = async (text: string): Promise<Message[]> => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      "https://api.ua-apt.com/apartment/ai/search",
      { userRequest: text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const apiResults: ApartmentData[] | string = await response.data.result;

    if (typeof apiResults === "string") {
      return [
        {
          text: apiResults,
          sender: "computer",
        },
      ];
    }

    const mapArray: Message[] = apiResults.map((apiData) => ({
      isMap: true,
      sender: "computer",
      lat: apiData.latitude,
      lng: apiData.longitude,
      data: apiData,
    }));

    return mapArray;
  } catch (error) {
    console.error("API 호출 실패:", error);
    return [
      {
        text: "API 호출에 실패했습니다.",
        sender: "computer",
      },
    ];
  }
};

// 이미지 슬라이더의 props에 대한 타입을 정의합니다.
interface ImageSliderProps {
  images: string[];
}

const sliderStyle = {
  display: "flex", // Flexbox를 사용하여 내용을 가운데 정렬합니다.
  justifyContent: "center", // 가로 방향 중앙 정렬
  alignItems: "center", // 세로 방향 중앙 정렬
  maxWidth: "50%", // 슬라이더의 너비를 부모의 너비만큼으로 설정
  height: "100%", // 슬라이더의 높이를 부모의 높이만큼으로 설정
};

const galleryStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  overflowX: "auto", // 이제 올바른 타입으로 인식됩니다.
  gap: "10px",
};

const imageStyle = {
  maxHeight: "200px", // 이미지의 최대 높이를 제한
  maxWidth: "100%", // 이미지의 최대 너비를 제한
  borderRadius: "10px", // 이미지의 모서리를 둥글게
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
};

const thumbnailListCSS = css`
  display: flex;
  gap: ${getRem(12)};
  margin-top: ${getRem(12)};
  overflow-x: scroll;
  padding: ${getRem(12)} 0;
  &::-webkit-scrollbar {
    height: 8px; /* 스크롤바의 높이 */
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2); /* 스크롤바 썸(움직이는 부분)의 색상 */
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1); /* 스크롤바 트랙(바탕)의 색상 */
    border-radius: 4px;
  }
`;

const imageWrapCSS = css`
  width: ${getRem(120)};
  height: ${getRem(120)};
  border-radius: ${getRem(8)};
  border: 1px solid #e5e5e5;
`;

export const ImageGallery: React.FC<ImageSliderProps> = ({ images }) => (
  <div css={thumbnailListCSS}>
    {images.map((src, index) => (
      <div key={index} css={imageWrapCSS}>
        <Image
          width={120}
          height={120}
          css={imageWrapCSS}
          src={"https://ua-apt.s3.ap-northeast-2.amazonaws.com/imgs/" + src}
          alt={`Slide ${index}`}
        />
      </div>
    ))}
  </div>
);

export default function ChatPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<ApartmentData | null>(null);

  const closeModal = () => {
    setModalIsOpen(false);
    // document.body.style.overflow = "unset";

    setTimeout(() => {
      setModalIsOpen(true);
      setTimeout(() => {
        setModalIsOpen(false);
      }, 10);
    }, 10);
  };

  const ModalContent = ({ data }: { data: ApartmentData | null }) => {
    const [showVideo, setShowVideo] = useState(false);
    if (data === null) {
      return null;
    }
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Apartment Information Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(205, 230, 237, 0.75)",
          },
          content: {
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            border: "none",
          },
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              borderBottom: "2px solid #00baf2",
              paddingBottom: "10px",
              color: "#00baf2",
            }}
          >
            아파트 정보
          </h1>
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            userSelect: "text",
          }}
        >
          {data.videoUrl && showVideo && (
            <div style={{ marginBottom: "20px" }}>
              <VideoPlayer
                src={
                  "https://ua-apt.s3.ap-northeast-2.amazonaws.com/videos/uavideo-t1/uavideo_01.m3u8"
                }
              />
            </div>
          )}
          <div>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#00baf2",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px",
              }}
              onClick={() => setShowVideo(!showVideo)}
            >
              {showVideo ? "비디오 숨기기" : "비디오 보기"}
            </button>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <strong>아파트 이미지</strong>
            <ImageGallery images={data.apartmentImgs} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <strong>평면도 이미지</strong>
            <ImageGallery images={data.floorPlanImgs} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <strong>창밖 전망 이미지</strong>
            <ImageGallery images={data.windowOutsideImgs} />
          </div>
          <strong>주소:</strong> {data.address}
          <div>
            <strong>장점:</strong> {data.advantages.join(", ")}
          </div>
          <div>
            <strong>아파트 방향:</strong> {data.apartmentDirection}
          </div>
          <div>
            <strong>구조:</strong> {data.apartmentStructure}
          </div>
          <div>
            <strong>입주 가능 날짜:</strong>{" "}
            {new Date(data.availableDate).toLocaleDateString()}
          </div>
          <div>
            <strong>설명:</strong> {data.customDescription}
          </div>
          <div>
            <strong>편의 시설:</strong> {data.facility.join(", ")}
          </div>
          <div>
            <strong>층 정보:</strong> {data.floorInfo.currentFloor}층 / 총{" "}
            {data.floorInfo.totalFloor}층
          </div>
          <div>
            <strong>관리 정보:</strong> 비용: {data.maintenanceInfo.cost}원,
            포함 항목: {data.maintenanceInfo.includeItems.join(", ")}, 제외
            항목: {data.maintenanceInfo.excludeItems.join(", ")}
          </div>
          <div>
            <strong>거래 방식:</strong>
            <div>
              {data.transactionMethod.jeonse ? (
                <p>전세: {data.transactionMethod.jeonse.toLocaleString()}원</p>
              ) : null}
              {data.transactionMethod.monthlyRent ? (
                <p>
                  월세: {data.transactionMethod.monthlyRent.toLocaleString()}원
                  {data.transactionMethod.monthlyRentDeposit ? (
                    <span>
                      {" "}
                      (보증금:{" "}
                      {data.transactionMethod.monthlyRentDeposit.toLocaleString()}
                      원)
                    </span>
                  ) : null}
                </p>
              ) : null}
              {data.transactionMethod.tradingPrice ? (
                <p>
                  매매가: {data.transactionMethod.tradingPrice.toLocaleString()}
                  원
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <button
          onClick={() => closeModal()}
          style={{
            marginLeft: "80%",
            marginTop: "20px",
            padding: "10px 20px",
            height: "40px",
            backgroundColor: "#00baf2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>X</h2>
        </button>
      </Modal>
    );
  };

  const handleCardClick = (data: ApartmentData) => {
    setSelectedData(data);
    setTimeout(() => {
      setModalIsOpen(true);
      document.body.style.overflow = "hidden";
    }, 10);
  };

  const handleSend = async () => {
    if (userInput.trim() === "") {
      return;
    }

    const newUserMessage: Message = { text: userInput, sender: "user" };
    setMessages((messages) => [...messages, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const apiResults = await callApi(userInput);
      setMessages((messages) => [...messages, ...apiResults]);
    } catch (error) {
      console.error("API 호출 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div css={WrapperCSS}>
      <ModalContent data={selectedData} />
      <h2 css={titleCss}>우아한 AI 아파트 검색</h2>
      <div css={chatContainerCSS}>
        <div css={messagesContainerCSS}>
          {messages.map((message, index) => (
            <div key={index} css={messageCSS(message.sender)}>
              {message.isMap ? (
                <div
                  css={cardCss}
                  onClick={() => handleCardClick(message.data as ApartmentData)}
                >
                  <KakaoMap
                    lat={message.lat || 0}
                    lng={message.lng || 0}
                    hide={modalIsOpen}
                  />

                  <h3
                    css={css`
                      margin-top: 12px;
                      font-size: 1.2em;
                      font-weight: bold;
                      color: #333;
                    `}
                  >
                    {message.data?.address}
                  </h3>
                  <p
                    css={css`
                      margin-top: 8px;
                      font-size: 1em;
                      color: #666;
                      line-height: 1.5;
                    `}
                  >
                    {message.data?.customDescription}
                  </p>

                  <div
                    css={css`
                      width: 100%;
                      margin-top: 12px;
                      height: 2px;
                      background: #eee;
                    `}
                  />
                </div>
              ) : (
                <>
                  <div css={bubbleCSS(message.sender)}>
                    <p>{message.text}</p>
                    <div css={tailCSS(message.sender)} />
                  </div>

                  {message.sender === "user" && (
                    <Image
                      alt="User icon"
                      src={UserIconImg}
                      width="40"
                      height="40"
                    />
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          ))}
          {isLoading && (
            <div css={loadingCSS}>
              <Image src={LoadingGif} alt="Loading..." width={50} height={50} />
            </div>
          )}
        </div>
        <div css={inputContainerCSS}>
          <input
            css={inputFieldCSS}
            type="text"
            placeholder="메시지를 입력하세요..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button css={sendButtonCSS} onClick={handleSend}>
            보내기
          </button>
        </div>
      </div>
    </div>
  );
}

const cardCss = css`
  width: 325px;
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #ddd;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const messageCSS = (sender: string) => css`
  display: flex;
  justify-content: ${sender === "user" ? "flex-end" : "flex-start"};
  margin: 5px 0;
  margin-top: 12px;
`;

const bubbleCSS = (sender: string) => css`
  display: inline-block;
  background-color: ${sender === "user" ? "#cde6ed;" : "#e5e5ea"};
  color: ${sender === "user" ? "black" : "black"};
  border-radius: 18px;
  padding: 10px 15px;
  max-width: 70%;
  margin-right: ${sender === "user" ? "10px" : "0"};
  margin-left: ${sender === "computer" ? "10px" : "0"};
  position: relative;
  word-wrap: break-word;
`;

const tailCSS = (sender: string) => css`
  content: "";
  position: absolute;
  top: 0;
  right: ${sender === "user" ? "-6px" : "auto"};
  left: ${sender === "computer" ? "-6px" : "auto"};
  width: 10px;
  height: 0;
  border: 12px solid transparent;
  border-bottom-color: ${sender === "user" ? " #cde6ed;" : "#e5e5ea"};
  transform: translate(0, -5%);
`;

const loadingCSS = css`
  width: 100%;
  height: 100%;
  display: flex;
`;

const WrapperCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const titleCss = css`
  color: #00baf2;
  margin-top: 20px;
`;

const chatContainerCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between; // 메시지 목록과 입력 필드 사이에 공간을 분배
  align-items: center; // 가로축 중앙 정렬
  width: 100%;
  max-width: 600px; // 최대 가로 크기 설정
  height: 100%;
  margin-top: 20px; // 상단 마진
  margin-left: auto; // 가운데 정렬을 위한 설정
  margin-right: auto; // 가운데 정렬을 위한 설정
  padding: 20px; // 안쪽 여백
  box-sizing: border-box; // 패딩과 보더가 너비에 포함되도록 설정
  overflow: hidden; // 오버플로우 숨김
  border-left: 1px solid #e5e5e5; // 왼쪽 보더 설정
  border-right: 1px solid #e5e5e5; // 오른쪽 보더 설정
`;

const messagesContainerCSS = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const inputContainerCSS = css`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  position: fixed; // 고정 위치
  bottom: 0; // 화면 하단
  left: 0; // 화면 왼쪽
  right: 0; // 화면 오른쪽
  max-width: 600px; // 최대 너비 설정
  margin-left: auto; // 자동 마진으로 가운데 정렬
  margin-right: auto; // 자동 마진으로 가운데 정렬
  background: white; // 입력 필드 배경 색
`;

const inputFieldCSS = css`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
`;

const sendButtonCSS = css`
  padding: 10px 20px;
  background-color: #00baf2;
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
