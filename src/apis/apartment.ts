import { axiosMethod } from "@/network/axiosUtils";
import oaRequest from "@/network/oaRequest";
import axios from "axios";

interface CreateApartmentParams {
  userType: string; // 세입자, 집주인
  apartmentSize: number; // 평수
  apartmentBay: number; // 베이
  apartmentStructure: string; // 구조 (타워형, 판상형, 혼합형)
  latitude: number; // 위도
  longitude: number; // 경도
  floorInfo: {
    currentFloor: number; // 현재 층
    totalFloor: number; // 전체 층
  };
  roomInfo: {
    roomCount: number; //방 개수
    bathRoomCount: number; // 욕실 개수
  };
  address: string;
  customDescription?: string; // 위치 설명
  transactionMethod: {
    // transactionMethod은 입력된 것만 보내주시고 없으면 null 보내주시면 됩니다.
    jeonse?: number; // 전세 가격
    monthlyRent?: number; // 월세 가격
    monthlyRentDeposit?: number; // 보증금 (월세일 경우)
    tradingPrice?: number; // 매매 가격
    depositChangeable?: boolean; // 보증금 조정 가능 여부 (월세일 경우)
    depositChangeableDescription?: string; // 보증금 조정 가능 설명 여부 (월세일 경우)
  };
  apartmentDirection: string; // 방향, 북서, 동남..
  maintenanceInfo: {
    cost: number; // 관리비
    includeItems: string[]; // 관리비에 포함된 항목
    excludeItems: string[]; // 관리비와 별도인 항목
    description?: string; // 설명
  };
  optionPossible: {
    loan: string; // 가능 불가능 확인필요
    animal: string;
    parking: string;
  };
  videoUrl?: string; // 동영상 링크
  availableDate: Date; // 입주 가능일
  facility: string[]; // 내외부 시설
  advantages: string[]; // 장점
  introduction?: string; // 매물 소개
  roomImages: File[]; // 방 사진
  floorPlanImages?: File[]; // 평면도 사진
  viewImages?: File[]; // 전경 사진
}

export const createApartment = async ({
  params,
  images,
}: {
  params: Omit<CreateApartmentParams, "roomImages">;
  images: {
    roomImages: File[];
    floorPlanImages?: File[];
    viewImages?: File[];
  };
}) => {
  const formData = new FormData();
  formData.append("createApartment", JSON.stringify(params));

  if (images.roomImages) {
    images.roomImages.forEach((image) => {
      formData.append("apartmentImgs", image);
    });
  }
  if (images.floorPlanImages) {
    images.floorPlanImages.forEach((image) => {
      formData.append("floorPlanImgs", image);
    });
  }
  if (images.viewImages) {
    images.viewImages.forEach((image) => {
      formData.append("windowOutsideImgs", image);
    });
  }
  const response = await oaRequest({
    method: axiosMethod.POST,
    url: "/apartment/create",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImV4cCI6MTczMDE4NjY4My42NjksImlhdCI6MTY5ODY1MDY4My42Njl9.TuYAi2NDdm9d_ZE-OF5xTaia27YXokJj9uJKuLCtVfw",
    },
    requestBody: formData,
  });

  return response.data;
};
