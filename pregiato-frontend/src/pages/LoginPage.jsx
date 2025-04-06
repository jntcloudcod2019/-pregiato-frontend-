import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import loginBg from '../assets/images/model.jpeg';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login enviado:', { username, password });
    // Depois você chama sua API aqui...
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Coluna da imagem (escondida em telas muito pequenas) */}
      <div className="hidden w-1/2 md:flex">
        <img
          src={loginBg}
          alt="Login Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Coluna do formulário */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
            Bem-vindo de volta
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Entre com suas credenciais para acessar sua conta
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Usuário */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Usuário
              </label>
              <input
                type="text"
                placeholder="Digite seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Senha */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-700"
                aria-label="Toggle Password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Lembrar-me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="lembrar"
                className="accent-blue-600"
              />
              <label htmlFor="lembrar" className="text-sm text-gray-700">
                Lembrar-me
              </label>
            </div>

            {/* Botão de login */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
