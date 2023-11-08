import { ROUTES } from "@/constants/route";
import useToken from "@/hook/useToken";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/router";
import { ComponentType, ReactElement, useEffect } from "react";

export default function withAuth<P extends object>(
  Component: ComponentType<P>
) {
  const WrappedComponent = (props: P): ReactElement => {
    // const { user } = useUserStore();
    const { token } = useToken();
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        if (
          confirm("로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?")
        ) {
          router.replace(ROUTES.LOGIN);
        } else {
          router.back();
        }
      }
    }, [token]);
    return <Component {...props} />;
  };
  return WrappedComponent;
}
