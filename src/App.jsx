import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/layout/Navbar";

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Jika login page, tampilkan tanpa navbar & footer
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    );
  }

  // Layout normal dengan navbar & footer
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar fixed */}
      <Navbar />

      {/* kasih padding-top setara tinggi Navbar */}
      <main className="flex-1 p-6 pt-20">
        <AppRoutes />
      </main>

      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} PoSaldo
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;