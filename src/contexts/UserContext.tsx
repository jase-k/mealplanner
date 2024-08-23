'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type UserState = {
  user: { id: number; name: string; role: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
};

type UserAction =
  | { type: 'SET_USER'; payload: { id: number; name: string; role: string } }
  | { type: 'SET_TOKENS'; payload: { accessToken: string; refreshToken: string } }
  | { type: 'LOGOUT' };

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKENS':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
} | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};