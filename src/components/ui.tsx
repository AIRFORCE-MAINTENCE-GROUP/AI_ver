import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, s } from '../theme';

/* ---------- 상단 헤더 (뒤로가기 + 가운데 제목) ---------- */
export function Header({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12} style={styles.headerBack}>
          <Feather name="chevron-left" size={s(24)} color={colors.text} />
        </Pressable>
      ) : null}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

/* ---------- 라벨 + 입력창 ---------- */
type FieldProps = TextInputProps & {
  label: string;
  right?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Field({ label, right, containerStyle, style, multiline, ...rest }: FieldProps) {
  return (
    <View style={[styles.field, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputBox, multiline && styles.inputBoxMulti]}>
        <TextInput
          placeholderTextColor={colors.placeholder}
          style={[styles.input, multiline && styles.inputMulti, style]}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          autoCorrect={false}
          {...rest}
        />
        {right}
      </View>
    </View>
  );
}

/* ---------- 버튼 ---------- */
type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'kakao';
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ title, onPress, variant = 'primary', icon, disabled, style }: ButtonProps) {
  const variantStyle =
    variant === 'kakao' ? styles.btnKakao : variant === 'outline' ? styles.btnOutline : styles.btnPrimary;
  const textColor =
    variant === 'kakao' ? colors.kakaoText : variant === 'outline' ? colors.text : colors.white;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        variantStyle,
        (pressed || disabled) && { opacity: disabled ? 0.5 : 0.85 },
        style,
      ]}
    >
      {icon}
      <Text style={[styles.btnText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    height: s(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBack: {
    position: 'absolute',
    left: s(16),
    height: '100%',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: s(17),
    fontWeight: '700',
    color: colors.text,
  },
  field: {
    marginBottom: s(16),
  },
  label: {
    fontSize: s(14),
    lineHeight: s(18),
    fontWeight: '600',
    color: colors.text,
    marginBottom: s(10),
  },
  inputBox: {
    height: s(52),
    borderRadius: radius.md,
    backgroundColor: colors.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
  },
  inputBoxMulti: {
    height: s(120),
    alignItems: 'flex-start',
    paddingVertical: s(14),
  },
  input: {
    flex: 1,
    fontSize: s(15),
    color: colors.text,
    padding: 0,
  },
  inputMulti: {
    height: '100%',
    lineHeight: s(22),
  },
  btn: {
    height: s(54),
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(8),
  },
  btnPrimary: { backgroundColor: colors.primary },
  btnKakao: { backgroundColor: colors.kakao },
  btnOutline: {
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
  },
  btnText: {
    fontSize: s(16),
    fontWeight: '700',
  },
});
