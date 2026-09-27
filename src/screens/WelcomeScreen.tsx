import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Button } from '../components/ui';
import { colors, radius, s, SCREEN_PADDING } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* 로고 + 타이틀 */}
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Feather name="shopping-bag" size={s(30)} color={colors.white} />
          </View>
          <Text style={styles.title}>중고마켓</Text>
          <Text style={styles.tagline}>우리 동네 따뜻한 중고 거래</Text>
        </View>

        {/* 일러스트 (남는 세로 공간을 채움 → 기기별로 화면 가득) */}
        <Image
          source={require('../../assets/images/welcome.png')}
          style={styles.illustration}
          resizeMode="cover"
        />

        {/* 버튼 */}
        <View style={styles.actions}>
          <Button
            variant="kakao"
            title="카카오톡으로 로그인하기"
            icon={<Ionicons name="chatbubble-outline" size={s(18)} color={colors.kakaoText} />}
            onPress={() => Alert.alert('카카오 로그인', '카카오 SDK 연동 후 사용할 수 있어요.')}
          />
          <Button
            title="회원가입하기"
            style={{ marginTop: s(12) }}
            onPress={() => navigation.navigate('SignUp')}
          />
          <View style={styles.loginRow}>
            <Text style={styles.loginHint}>이미 회원이신가요?</Text>
            <Pressable onPress={() => navigation.navigate('Login')} hitSlop={8}>
              <Text style={styles.loginLink}>로그인</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: s(53),
    paddingBottom: s(49),
  },
  brand: { alignItems: 'center' },
  logo: {
    width: s(70),
    height: s(70),
    borderRadius: s(16),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: s(9),
    fontSize: s(32),
    lineHeight: s(40),
    fontWeight: '800',
    color: colors.primaryDark,
  },
  tagline: {
    marginTop: s(15),
    fontSize: s(15),
    lineHeight: s(20),
    color: colors.textSub,
  },
  illustration: {
    flex: 1,
    width: '100%',
    marginTop: s(35),
    borderRadius: radius.xl,
  },
  actions: { marginTop: s(50) },
  loginRow: {
    marginTop: s(18),
    height: s(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: s(10),
  },
  loginHint: { fontSize: s(13), color: colors.textSub },
  loginLink: {
    fontSize: s(13),
    fontWeight: '700',
    color: colors.text,
    textDecorationLine: 'underline',
  },
});
