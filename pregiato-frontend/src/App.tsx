import { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import api from "./services/api/";
import Home from "./components/home";
import Login from "./components/Login";

function App() {
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    // const fazerLogin = async () => {
    //   try {
    //     const response = await api.post("/api/User/register/login", {
    //       FULLNAME: "jonathan_silva",
    //       PASSWORD: "mpqXGOtZMSiT",
    //     });

    //     console.log("✅ Login automático:", response.data);
    //     setMensagem("Login automático bem-sucedido!");
    //   } catch (error) {
    //     console.error(
    //       "❌ Erro no login automático:",
    //       error.response?.data || error.message,
    //     );
    //     setMensagem("Erro no login automático.");
    //   }
    // };

    // fazerLogin();
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
