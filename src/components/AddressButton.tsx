import { getRem } from "@/styles/commonStyle";
import { css } from "@emotion/react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  Address,
  postcodeScriptUrl,
} from "react-daum-postcode/lib/loadPostcode";

interface AddressButtonProps {
  onSelectAddress: (address: string) => void;
}

export default function AddressButton({ onSelectAddress }: AddressButtonProps) {
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: Address) => {
    const fullAddress = data.address;
    const roadAddress = data.roadAddress;
    onSelectAddress(roadAddress ?? fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  return (
    <button type="button" onClick={handleClick} css={buttonCSS}>
      주소찾기
    </button>
  );
}

const buttonCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: ${getRem(41)};
  min-width: ${getRem(80)};
  border-radius: ${getRem(10)};
  background-color: #00baf2;
  color: white;
  font-size: ${getRem(14)};
  font-weight: 700;
`;
