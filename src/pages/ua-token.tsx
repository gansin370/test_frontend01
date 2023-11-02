import useToken from "@/hook/useToken";
import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter();
  const { accessToken } = router.query;
  const { setToken } = useToken();

  if (typeof accessToken === "string") {
    setToken(accessToken);
    router.replace("/");
  }
  return <div />;
}
