import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 py-3">
      <Outlet />
    </section>
  )
}
