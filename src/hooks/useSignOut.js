import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    // Remove the access token from storage first
    await authStorage.removeAccessToken();
    
    // Reset the Apollo Client's store to clear all cached data
    await apolloClient.resetStore();
    
    // Navigate to home page after sign out
    navigate('/');
  };

  return signOut;
};

export default useSignOut;
