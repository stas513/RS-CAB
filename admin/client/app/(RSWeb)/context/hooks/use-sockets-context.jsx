'use client';

import { useContext } from 'react';
//
import { SocketContext } from '../sockets/socket-context';

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) throw new Error('useSocketContext context must be use inside socketProvider');

  return context;
};
