import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { formatPrice, Product, useProducts } from '../context/ProductsContext';
import { colors, radius, s } from '../theme';

function ProductCard({ item }: { item: Product }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}>
      {item.image ? (
        <Image source={item.image} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.thumbEmpty]}>
          <Feather name="image" size={s(24)} color={colors.meta} />
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.meta}>
          {item.location} • {item.time}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
    </Pressable>
  );
}

export default function ProductListScreen() {
  const { products } = useProducts();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.logo}>중고마켓</Text>
        <View style={styles.headerIcons}>
          <Pressable hitSlop={8}>
            <Feather name="search" size={s(22)} color={colors.text} />
          </Pressable>
          <Pressable hitSlop={8}>
            <Feather name="bell" size={s(22)} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: s(13) }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    height: s(48),
    paddingHorizontal: s(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { fontSize: s(22), fontWeight: '800', color: colors.primaryDark },
  headerIcons: { flexDirection: 'row', gap: s(18) },
  list: { paddingHorizontal: s(16), paddingTop: s(4), paddingBottom: s(16) },
  card: {
    height: s(110),
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(11),
  },
  thumb: {
    width: s(88),
    height: s(88),
    borderRadius: s(10),
    backgroundColor: colors.input,
  },
  thumbEmpty: { alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, marginLeft: s(13), justifyContent: 'center' },
  title: { fontSize: s(16), fontWeight: '700', color: colors.text },
  meta: { fontSize: s(12), color: colors.meta, marginTop: s(4) },
  price: { fontSize: s(18), fontWeight: '800', color: colors.primaryDark, marginTop: s(6) },
});
