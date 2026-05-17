import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const res = login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center bg-[#F4F7FB]">
      <div className="w-full max-w-md px-6">
        <Link to="/" className="inline-block mb-8">
          <img src="/logo-sorae.svg" alt="SORAE" className="h-8 w-auto mx-auto" />
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-[#0A0F2C]">Masuk Akun</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Silakan masuk untuk melanjutkan</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-bold p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@contoh.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0A0F2C] text-white py-4 rounded-2xl font-extrabold text-sm hover:bg-black transition flex items-center justify-center gap-2 mt-4"
            >
              <LogIn size={16} /> Masuk
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">Akun Testing Sementara</p>
            <div className="bg-gray-50 rounded-xl p-4 text-xs font-medium text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Admin:</span>
                <span className="font-bold text-[#0A0F2C]">admin@sorae.com / admin123</span>
              </div>
              <div className="flex justify-between">
                <span>Konsumen:</span>
                <span className="font-bold text-[#0A0F2C]">user@sorae.com / user123</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
