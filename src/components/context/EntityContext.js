import React, { createContext, useContext, useState } from 'react';
import tokenService from '../../services/token.service';

const EntityContext = createContext();

export const useEntity = () => useContext(EntityContext);

export const EntityProvider = ({ children }) => {
  const [entity, setEntity] = useState(tokenService.getEntityName() || null);

  return (
    <EntityContext.Provider value={{ entity, setEntity }}>
      {children}
    </EntityContext.Provider>
  );
};
