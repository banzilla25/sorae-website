import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load from localStorage on mount
    const storedUser = localStorage.getItem('sorae_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    // Dummy authentication
    if (email === 'admin@sorae.com' && password === 'admin123') {
      const adminUser = { email, role: 'admin', name: 'Admin SORAE' };
      setUser(adminUser);
      localStorage.setItem('sorae_user', JSON.stringify(adminUser));
      return { success: true };
    } 
    
    if (email === 'user@sorae.com' && password === 'user123') {
      const customerUser = { email, role: 'customer', name: 'Konsumen Dummy' };
      setUser(customerUser);
      localStorage.setItem('sorae_user', JSON.stringify(customerUser));
      return { success: true };
    }

    return { success: false, message: 'Email atau password salah. Coba: admin@sorae.com / admin123' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sorae_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
