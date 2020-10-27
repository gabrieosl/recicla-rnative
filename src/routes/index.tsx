import React from 'react';
import 'react-native-gesture-handler';

import { useAuth } from '../context/Auth';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const Navigation: React.FC = () => {
  const auth = useAuth();

  const { userName } = auth;
  return userName ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Navigation;
