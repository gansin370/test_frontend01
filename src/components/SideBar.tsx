import { navList } from "@/constants/navigation";
import useMounted from "@/hook/useMounted";
import { Theme, css } from "@emotion/react";
import Link from "next/link";
import { createPortal } from "react-dom";
import Image from "./Image";
import Logo from "public/images/UaLogo.png";
import { Z_INDEX } from "@/constants/zIndex";
import { getRem } from "@/styles/commonStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser as solidUser,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { faUser as regularUser } from "@fortawesome/free-regular-svg-icons";
import { useUserStore } from "@/store/user";
import { ROUTES } from "@/constants/route";
import useToken from "@/hook/useToken";
import { useRouter } from "next/router";

interface SideBarProps {
  open: boolean;
  close: () => void;
}

export default function SideBar({ open, close }: SideBarProps) {
  const isMounted = useMounted();
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { token, removeToken } = useToken();

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      setUser(null);
      removeToken();
      alert("로그아웃 되었습니다.");
      router.push("/");
    }
  };

  if (!isMounted || !open) {
    return null;
  }

  return createPortal(
    <div css={backgroundCSS} onClick={close}>
      <div css={containerCSS}>
        <button css={closeButtonCSS}>
          <FontAwesomeIcon icon={faClose} onClick={close} size="xl" />
        </button>
        <div css={logoNavAreaCSS}>
          <Image src={Logo} alt="로고" width={130} />

          <nav css={navContainerCSS}>
            {navList.map((navItem) => (
              <Link key={navItem.name} css={navItemCSS} href={navItem.link}>
                {navItem.name}
              </Link>
            ))}
          </nav>
        </div>
        {!!token ? (
          <button css={loginButtonCSS} onClick={handleLogout}>
            <FontAwesomeIcon icon={solidUser} />
            <span>로그아웃</span>
          </button>
        ) : (
          <Link href={ROUTES.LOGIN} css={loginButtonCSS}>
            <FontAwesomeIcon icon={regularUser} />
            <span>로그인</span>
          </Link>
        )}
      </div>
    </div>,
    document.getElementById("side-bar") as HTMLElement
  );
}

const closeButtonCSS = css`
  position: absolute;
  top: ${getRem(16)};
  right: ${getRem(16)};

  cursor: pointer;
`;

const backgroundCSS = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${Z_INDEX.SIDE_BAR};
  display: flex;
  justify-content: flex-end;
`;

const containerCSS = css`
  position: relative;
  width: ${getRem(300)};
  height: 100%;
  background-color: white;

  padding: ${getRem(64)} ${getRem(40)};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const logoNavAreaCSS = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${getRem(80)};
  width: 100%;
`;

const navContainerCSS = css`
  display: flex;
  flex-direction: column;
  gap: ${getRem(24)};
  align-items: flex-end;
`;

const navItemCSS = css`
  cursor: pointer;
`;

const loginButtonCSS = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${getRem(8)};
  font-size: ${getRem(16)};
  color: #3d3d3d;
  text-decoration: none;
  cursor: pointer;
`;
