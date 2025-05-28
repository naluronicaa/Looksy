import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // objeto: { nome, email, token }

  const login = (dados) => setUsuario(dados);
  const logout = () => setUsuario(null);

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook customizado para acessar o contexto
export const useUsuario = () => useContext(UserContext);
