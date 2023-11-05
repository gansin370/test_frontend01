import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import AddressButton from "../AddressButton";
import Input from "../Input";
import { ChangeEvent } from "react";
import axios from "axios";
import { useRegisterAptStore } from "@/store/register-apt";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export interface Address {
  address?: string;
  detailAddress?: string;
  lat?: string;
  lng?: string;
}

type KakaoMapProps = {
  lat: number;
  lng: number;
};

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng }) => {
  return (
    <div style={{ zIndex: 1, marginTop: "30px" }}>
      <Map
        center={{ lat, lng }}
        style={{ width: "450px", height: "400px", zIndex: 1 }}
        level={3}
        draggable={false}
      >
        <MapMarker position={{ lat, lng }} clickable={true} />
      </Map>
    </div>
  );
};

export default function EnterAddressView() {
  const { addressInfo, setAddressInfo } = useRegisterAptStore();
  console.log(addressInfo);
  const onSelectAddress = async (_address: string) => {
    try {
      // 위경도 데이터를 가져오기 위해 필요
      const addressData = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${_address}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        }
      );

      const document = addressData.data.documents[0];
      if (!document) {
        alert("주소 정보 요청 중 에러가 발생했습니다.");
        return;
      }
      setAddressInfo({
        ...addressInfo,
        address: _address,
        lat: document.y,
        lng: document.x,
      });
    } catch (e) {
      alert("주소 정보 요청 중 에러가 발생했습니다.");
    }
  };

  const onChangeDetailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressInfo({
      ...addressInfo,
      detailAddress: e.target.value,
    });
  };
  return (
    <div css={containerCSS}>
      <h2>주소를 입력해주세요.</h2>
      <div css={rowCSS}>
        <Input
          disabled
          placeholder="주소를 입력해주세요."
          css={inputCSS}
          value={addressInfo?.address}
        />
        <AddressButton onSelectAddress={onSelectAddress} />
      </div>
      <Input
        value={addressInfo?.detailAddress}
        onChange={onChangeDetailAddress}
        placeholder="상세주소를 입력해주세요."
        css={inputCSS}
      />
      {addressInfo?.lat && addressInfo?.lng && (
        <KakaoMap
          lat={Number(addressInfo?.lat)}
          lng={Number(addressInfo?.lng)}
        />
      )}
    </div>
  );
}

const containerCSS = css`
  padding: ${getRem(20)} ${getRem(24)};
`;

const rowCSS = css`
  display: flex;
  gap: ${getRem(8)};
  margin-top: ${getRem(24)};
`;

const inputCSS = css`
  padding: ${getRem(10)} ${getRem(12)};
  height: ${getRem(41)};
  margin-bottom: ${getRem(8)};
`;
