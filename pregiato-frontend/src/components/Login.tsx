// src/components/Login.tsx
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./login/LoginForm";
import { UserIcon } from "lucide-react";
import modelImage from "../assets/images/model.jpg";

const Login: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleTouchStart = useCallback(() => setIsHovered(true), []);
  const handleTouchEnd = useCallback(() => setIsHovered(false), []);

  const handleLogin = useCallback(async () => {
    try {
      setIsLoggingIn(true);
      setLoginError(null);
      setLoginSuccess(false);

      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoginSuccess(true);
    } catch (err) {
      setLoginError("Erro ao realizar login. Tente novamente.");
    } finally {
      setIsLoggingIn(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row w-full max-w-[1600px] rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative w-full lg:w-1/2 order-1 lg:order-2 h-72 sm:h-96 md:h-[600px] lg:h-[90vh]"
        >
          <motion.img
            src={modelImage}
            alt="Retrato de Moda"
            initial={{ filter: "brightness(100%)" }}
            animate={{ filter: isHovered ? "brightness(110%)" : "brightness(100%)" }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover object-center"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-3xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full lg:w-1/2 order-2 lg:order-1 bg-gradient-to-br from-indigo-600/60 to-purple-700/40 backdrop-blur-lg px-10 py-14 sm:px-14 md:px-20 flex flex-col items-center justify-center gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white/10 flex items-center justify-center shadow-inner border border-white/20 mb-5">
              <UserIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wide drop-shadow-xl">
              Bem-vindo de volta
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/80 max-w-md">
              Faça login com sua conta para acessar o painel de controle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-6"
          >
            <motion.div whileFocus={{ scale: 1.02 }} whileTap={{ scale: 1.01 }} className="space-y-4">
              <LoginForm isSignUp={true} onLogin={handleLogin} />
            </motion.div>
            <AnimatePresence>
              {isLoggingIn && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white text-center font-medium animate-pulse"
                >
                  Entrando em sua conta...
                </motion.div>
              )}
              {loginSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-green-300 text-center font-bold"
                >
                  Login realizado com sucesso!
                </motion.div>
              )}
              {loginError && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-center font-semibold"
                >
                  {loginError}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
