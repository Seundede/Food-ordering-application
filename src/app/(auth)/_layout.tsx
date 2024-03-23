import { AuthContext } from '@/src/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router'
import { useContext } from 'react';

export default function AuthLayout() {
      const { session} = useContext(AuthContext);
      if (session) {
        return <Redirect href={'/'} />
      }
    return <Stack />
}