import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/types';
import { Button, Field, Header } from '../components/ui';
import { useProducts } from '../context/ProductsContext';
import { colors, radius, s } from '../theme';

type Props = BottomTabScreenProps<TabParamList, 'Register'>;

const CATEGORIES = [
  '디지털기기',
  '생활가전',
  '가구/인테리어',
  '의류',
  '잡화',
  '뷰티/미용',
  '스포츠/레저',
  '취미/게임/음반',
  '도서',
  '기타 중고물품',
];

const MAX_PHOTOS = 10;
const PAD = s(20);

export default function ProductRegistrationScreen({ navigation }: Props) {
  const { addProduct } = useProducts();
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [addressVerified, setAddressVerified] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const pickPhotos = async () => {
    if (photos.length >= MAX_PHOTOS) return;
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('사진 접근 권한', '설정에서 사진 접근을 허용해주세요.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: MAX_PHOTOS - photos.length,
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, ...result.assets.map((a) => a.uri)].slice(0, MAX_PHOTOS));
    }
  };

  const reset = () => {
    setPhotos([]);
    setTitle('');
    setCategory(null);
    setDescription('');
    setAddressVerified(false);
  };

  const onSubmit = () => {
    if (!title.trim()) return Alert.alert('상품 등록', '제목을 입력해주세요.');
    if (!category) return Alert.alert('상품 등록', '카테고리를 선택해주세요.');
    addProduct({
      title: title.trim(),
      price: 0,
      category,
      description,
      image: photos[0] ? { uri: photos[0] } : undefined,
    });
    reset();
    navigation.navigate('Home');
  };

  // 디자인처럼 사진 슬롯이 항상 최소 3칸(등록 버튼 + 2칸) 보이도록 빈 칸 채우기
  const emptySlots = Math.max(0, 2 - photos.length);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header title="상품 등록" onBack={() => navigation.navigate('Home')} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 사진 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoRow}
            style={styles.photoScroll}
          >
            <Pressable style={[styles.photo, styles.photoAdd]} onPress={pickPhotos}>
              <Feather name="camera" size={s(20)} color={colors.text} />
              <Text style={styles.photoAddText}>
                {photos.length ? `${photos.length}/${MAX_PHOTOS}` : '사진 등록'}
              </Text>
            </Pressable>
            {photos.map((uri, i) => (
              <View key={uri + i} style={styles.photo}>
                <Image source={{ uri }} style={styles.photoImg} />
                <Pressable
                  style={styles.photoRemove}
                  hitSlop={6}
                  onPress={() => setPhotos((p) => p.filter((_, idx) => idx !== i))}
                >
                  <Feather name="x" size={s(12)} color={colors.white} />
                </Pressable>
              </View>
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <View key={`empty-${i}`} style={styles.photo} />
            ))}
          </ScrollView>

          <Field
            label="제목"
            placeholder="글 제목을 입력해주세요"
            value={title}
            onChangeText={setTitle}
          />

          {/* 카테고리 */}
          <View style={styles.block}>
            <Text style={styles.label}>카테고리 선택</Text>
            <Pressable style={styles.select} onPress={() => setPickerOpen(true)}>
              <Text style={[styles.selectText, !category && { color: colors.placeholder }]}>
                {category ?? '카테고리를 선택해 주세요'}
              </Text>
              <Feather name="chevron-down" size={s(18)} color={colors.textSub} />
            </Pressable>
          </View>

          <Field
            label="설명"
            placeholder="신뢰할 수 있는 거래를 위해 물품 상태를 자세하게 적어주세요."
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Button
            variant="outline"
            title={addressVerified ? '주소 인증 완료' : '주소 인증하기'}
            icon={
              <Feather
                name={addressVerified ? 'check-circle' : 'map-pin'}
                size={s(16)}
                color={colors.text}
              />
            }
            style={styles.addressBtn}
            onPress={() => {
              // TODO: expo-location 등으로 실제 위치 인증 연동
              setAddressVerified(true);
              Alert.alert('주소 인증', '서교동으로 인증되었어요.');
            }}
          />

          <Button title="등록하기" onPress={onSubmit} style={{ marginTop: s(20) }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 카테고리 선택 바텀시트 */}
      <Modal
        visible={pickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setPickerOpen(false)} />
        <SafeAreaView edges={['bottom']} style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>카테고리 선택</Text>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(c) => c}
            renderItem={({ item }) => (
              <Pressable
                style={styles.sheetItem}
                onPress={() => {
                  setCategory(item);
                  setPickerOpen(false);
                }}
              >
                <Text style={[styles.sheetItemText, item === category && styles.sheetItemOn]}>
                  {item}
                </Text>
                {item === category && (
                  <Feather name="check" size={s(18)} color={colors.primary} />
                )}
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const PHOTO = s(77);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: PAD, paddingTop: s(15), paddingBottom: s(24) },
  photoScroll: { marginHorizontal: -PAD, marginBottom: s(22) },
  photoRow: { paddingHorizontal: PAD, gap: s(9) },
  photo: {
    width: PHOTO,
    height: PHOTO,
    borderRadius: s(10),
    backgroundColor: colors.input,
    overflow: 'hidden',
  },
  photoAdd: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(4),
  },
  photoAddText: { fontSize: s(11), color: colors.text, fontWeight: '500' },
  photoImg: { width: '100%', height: '100%' },
  photoRemove: {
    position: 'absolute',
    top: s(5),
    right: s(5),
    width: s(18),
    height: s(18),
    borderRadius: s(9),
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: { marginBottom: s(16) },
  label: {
    fontSize: s(14),
    lineHeight: s(18),
    fontWeight: '600',
    color: colors.text,
    marginBottom: s(10),
  },
  select: {
    height: s(52),
    borderRadius: radius.md,
    backgroundColor: colors.input,
    paddingHorizontal: s(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: { fontSize: s(15), color: colors.text },
  addressBtn: { height: s(48), marginTop: s(4) },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '60%',
    paddingHorizontal: PAD,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: s(40),
    height: s(4),
    borderRadius: s(2),
    backgroundColor: colors.border,
    marginTop: s(10),
  },
  sheetTitle: {
    fontSize: s(17),
    fontWeight: '700',
    color: colors.text,
    marginVertical: s(16),
  },
  sheetItem: {
    height: s(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  sheetItemText: { fontSize: s(15), color: colors.text },
  sheetItemOn: { fontWeight: '700', color: colors.primary },
});
