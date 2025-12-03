import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div>
      <header style={{ padding: "10px", background: "#ddd" }}>
        <h2>Smart Blog</h2>
      </header>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  )
}
