import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Button, Field, Header } from '../components/ui';
import { colors, s, SCREEN_PADDING } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const onLogin = () => {
    if (!id.trim() || !password) {
      Alert.alert('로그인', '이메일(아이디)과 비밀번호를 입력해주세요.');
      return;
    }
    // TODO: 실제 로그인 API 연동
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Header title="로그인" onBack={navigation.goBack} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Field
            label="이메일 또는 아이디"
            placeholder="example@email.com"
            value={id}
            onChangeText={setId}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={{ marginBottom: s(18) }}
          />
          <Field
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            autoCapitalize="none"
            right={
              <Pressable onPress={() => setSecure((v) => !v)} hitSlop={10}>
                <Feather name={secure ? 'eye' : 'eye-off'} size={s(18)} color={colors.meta} />
              </Pressable>
            }
          />

          <Button title="로그인" onPress={onLogin} style={styles.loginBtn} />

          <Pressable
            style={styles.forgot}
            onPress={() => Alert.alert('비밀번호 찾기', '준비 중인 기능이에요.')}
          >
            <Text style={styles.forgotText}>비밀번호를 잊으셨나요? (Forgot password?)</Text>
          </Pressable>
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
  loginBtn: { marginTop: s(19) },
  forgot: { alignSelf: 'center', marginTop: s(16) },
  forgotText: {
    fontSize: s(12),
    color: colors.textSub,
    textDecorationLine: 'underline',
  },
});
