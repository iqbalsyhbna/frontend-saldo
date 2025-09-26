import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
