import { Suspense } from "react";
import AdminLoginClient from "./login-client";

export default function Page() {
  return (
    <Suspense>
      <AdminLoginClient />
    </Suspense>
  );
}