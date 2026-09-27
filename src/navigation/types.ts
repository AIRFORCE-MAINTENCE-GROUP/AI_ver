import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Register: undefined;
  Chat: undefined;
  My: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Main: NavigatorScreenParams<TabParamList> | undefined;
};
