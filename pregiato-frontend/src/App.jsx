import { useEffect, useState } from 'react';
import api from './services/api/';
import LoginPage from './pages/LoginPage';

function App() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    // Login automático ao abrir o app (teste)
    const fazerLogin = async () => {
      try {
        const response = await api.post('/api/User/register/login', {
          FULLNAME: 'jonathan_silva',
          PASSWORD: 'mpqXGOtZMSiT',
        });

        console.log('✅ Login automático:', response.data);
        setMensagem('Login automático bem-sucedido!');
      } catch (error) {
        console.error('❌ Erro no login automático:', error.response?.data || error.message);
        setMensagem('Erro no login automático.');
      }
    };

    fazerLogin();
  }, []);

  return (
    <LoginPage />
  );
}

export default App;
