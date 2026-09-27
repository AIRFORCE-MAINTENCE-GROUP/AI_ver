import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Button, Field, Header } from '../components/ui';
import { colors, s, SCREEN_PADDING } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PW_RE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export default function SignUpScreen({ navigation }: Props) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(true);

  const onSubmit = () => {
    if (!nickname.trim()) return Alert.alert('회원가입', '닉네임을 입력해주세요.');
    if (!EMAIL_RE.test(email)) return Alert.alert('회원가입', '올바른 이메일을 입력해주세요.');
    if (!PW_RE.test(password))
      return Alert.alert('회원가입', '비밀번호는 영문, 숫자, 특수문자 조합 8자 이상이어야 해요.');
    if (password !== confirm) return Alert.alert('회원가입', '비밀번호가 일치하지 않아요.');
    if (!agreed) return Alert.alert('회원가입', '이용약관에 동의해주세요.');
    // TODO: 실제 회원가입 API 연동
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header title="회원가입" onBack={navigation.goBack} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Field
            label="닉네임"
            placeholder="동네에서 사용할 이름을 입력하세요"
            value={nickname}
            onChangeText={setNickname}
          />
          <Field
            label="이메일"
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Field
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자 조합 8자 이상"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <Field
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력하세요"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            autoCapitalize="none"
          />

          <Pressable style={styles.agreeRow} onPress={() => setAgreed((v) => !v)} hitSlop={6}>
            <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
              {agreed && <Feather name="check" size={s(14)} color={colors.white} />}
            </View>
            <Text style={styles.agreeText}>이용약관 및 개인정보 처리방침에 동의합니다</Text>
          </Pressable>

          <Button title="가입하기" onPress={onSubmit} style={styles.submit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: s(17),
    paddingBottom: s(24),
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(9),
    gap: s(10),
  },
  checkbox: {
    width: s(20),
    height: s(20),
    borderRadius: s(4),
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.primary },
  agreeText: { fontSize: s(13), color: colors.text },
  submit: { marginTop: s(39) },
});
