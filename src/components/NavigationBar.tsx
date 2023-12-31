import { getRem } from "@/styles/commonStyle";
import { css, Theme } from "@emotion/react";
import Logo from "public/images/UaLogo.png";
import Image from "./Image";
import { ROUTES } from "@/constants/route";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as solidUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser as regularUser } from "@fortawesome/free-regular-svg-icons";
import { useUserStore } from "@/store/user";
import { navList } from "@/constants/navigation";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import useToken from "@/hook/useToken";
import { useRouter } from "next/router";

export default function NavigationBar() {
  const { user, setUser } = useUserStore();
  const { token, removeToken } = useToken();
  const router = useRouter();

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      setUser(null);
      removeToken();
      alert("로그아웃 되었습니다.");
      router.push("/");
    }
  };

  useEffect(() => {
    // 클라이언트 측에서만 실행될 코드
  }, []);

  return (
    <div css={containerCSS}>
      <Link href="/">
        <Image src={Logo} css={logoCSS} alt="로고" width={130} />
      </Link>
      <nav css={navContainerCSS}>
        {navList.map((navItem) => (
          <Link key={navItem.name} css={navItemCSS} href={navItem.link}>
            {navItem.name}
          </Link>
        ))}
      </nav>

      <button css={menuCSS} onClick={() => setIsSideBarOpen(true)}>
        <FontAwesomeIcon icon={faBars} size="lg" color={"#00baf2"} />
      </button>

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
      <SideBar open={isSideBarOpen} close={() => setIsSideBarOpen(false)} />
    </div>
  );
}

const containerCSS = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;

  align-items: center;
  padding: ${getRem(16)} ${getRem(40)};
  padding-right: ${getRem(12)};
  border-bottom: 1px solid #e5e5e5;

  ${theme.media.desktop} {
    padding-right: ${getRem(80)};
  }

  ${theme.media.mobile} {
    padding: ${getRem(16)} ${getRem(24)};
    padding-right: ${getRem(8)};
  }
`;

const logoCSS = css`
  object-fit: cover;
`;

const navContainerCSS = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: ${getRem(40)};

  ${theme.media.mobileAndTablet} {
    display: none;
  }
`;

const navItemCSS = css`
  font-size: ${getRem(17)};
  color: #2b2b2b;
  text-decoration: none;
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

  ${theme.media.mobileAndTablet} {
    display: none;
  }
`;

const menuCSS = (theme: Theme) =>
  css`
    display: none;

    ${theme.media.mobileAndTablet} {
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${getRem(40)};
      height: ${getRem(40)};
    }
  `;
