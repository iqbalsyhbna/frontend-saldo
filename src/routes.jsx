import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SaldoList from "./pages/SaldoList";
import SaldoInput from "./pages/SaldoInput";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/saldo" element={<SaldoList />} />
      <Route path="/saldo/input" element={<SaldoInput />} />
    </Routes>
  );
}
