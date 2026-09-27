import { Dimensions } from 'react-native';

/**
 * 디자인 기준: iPhone 16 (393 x 852 pt)
 * s(n): 디자인 값(n)을 현재 기기 너비에 맞게 비례 변환합니다.
 * iPhone 16 에서는 s(n) === n 이므로 디자인과 1:1로 일치합니다.
 */
const DESIGN_WIDTH = 393;
const { width } = Dimensions.get('window');
const ratio = width / DESIGN_WIDTH;

export const s = (n: number) => Math.round(n * ratio * 10) / 10;

export const colors = {
  background: '#FBF9F4',
  surface: '#FFFFFF',
  input: '#F3EFE7',
  primary: '#6E4E3A',
  primaryDark: '#5B3F2E',
  text: '#2B211A',
  textSub: '#6F655D',
  placeholder: '#B4ABA2',
  meta: '#A89E94',
  border: '#EFE9E0',
  borderStrong: '#6E4E3A',
  kakao: '#FEE500',
  kakaoText: '#191600',
  tabInactive: '#8C8279',
  white: '#FFFFFF',
};

export const radius = {
  sm: s(8),
  md: s(12),
  lg: s(16),
  xl: s(24),
};

export const SCREEN_PADDING = s(24);
