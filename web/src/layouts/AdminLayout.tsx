import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 py-3 pb-40">
      <Outlet />
    </section>
  )
}
