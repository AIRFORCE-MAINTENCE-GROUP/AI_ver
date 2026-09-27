# 중고마켓 (React Native / Expo)

## 실행 방법

```bash
npm install
npx expo install --fix   # 설치된 Expo SDK에 맞게 패키지 버전 자동 정렬
npx expo start           # QR코드를 아이폰 카메라로 찍어 Expo Go에서 실행
```

## 화면 구성

| 디자인 | 파일 |
| --- | --- |
| main-welcome | `src/screens/WelcomeScreen.tsx` |
| login | `src/screens/LoginScreen.tsx` |
| sign-up | `src/screens/SignUpScreen.tsx` |
| product-list | `src/screens/ProductListScreen.tsx` (하단 탭 "홈") |
| product-registration | `src/screens/ProductRegistrationScreen.tsx` (하단 탭 "등록") |

흐름: 웰컴 → 로그인/회원가입 → 메인(하단 탭). 상품 등록 시 목록 맨 위에 추가됩니다.

## 화면 크기 (iPhone 16 기준)

- 모든 크기는 `src/theme.ts`의 `s()` 함수를 거칩니다. 디자인 기준 너비 393pt(iPhone 16)에서는 디자인 값 그대로,
  다른 기기에서는 너비 비율만큼 자동으로 확대/축소됩니다.
- 상단 노치(Dynamic Island)와 하단 홈 인디케이터 영역은 SafeArea로 처리하고, 나머지 영역을 화면이 가득 채웁니다.
- 웰컴 화면의 일러스트는 남는 세로 공간을 채우도록 되어 있어 어떤 기기에서도 빈 공간 없이 꽉 찹니다.

## 교체가 필요한 것

- `assets/images/` 의 이미지(웰컴 일러스트, 상품 사진)는 첨부된 디자인 캡처에서 잘라낸 저해상도 임시 이미지입니다.
  Figma에서 원본을 export 해서 같은 파일명으로 덮어쓰세요.
- 폰트는 시스템 폰트(iOS: SF Pro / Apple SD Gothic Neo)를 사용합니다. Pretendard 등을 쓰려면 `expo-font`로 추가하세요.
- 카카오 로그인, 주소 인증, 로그인/회원가입 API는 `TODO` 주석 위치에 연동하면 됩니다.
