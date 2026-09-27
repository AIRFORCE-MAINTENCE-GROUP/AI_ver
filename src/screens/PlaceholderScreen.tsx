import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { colors, s } from '../theme';

const TITLES: Record<string, string> = { Search: '검색', Chat: '채팅', My: '마이' };

/** 디자인이 아직 없는 탭(검색/채팅/마이)용 임시 화면 */
export default function PlaceholderScreen() {
  const route = useRoute();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.center}>
        <Text style={styles.title}>{TITLES[route.name] ?? route.name}</Text>
        <Text style={styles.sub}>준비 중인 화면이에요</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: s(20), fontWeight: '700', color: colors.text },
  sub: { marginTop: s(8), fontSize: s(14), color: colors.textSub },
});
