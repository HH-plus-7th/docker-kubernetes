# Storefront Backend

이 백엔드는 Frontend Docker Communication Challenge를 지원하기 위한 용도입니다.

과제 기준으로는 이 서비스를 black box처럼 취급해야 합니다.

## 참가자 규칙

참가자는 다음을 수정하면 안 됩니다.

- 인증 로직
- 상품 API 동작
- 장바구니 API 동작
- Prisma 스키마
- 시드 데이터 동작
- 영속성 로직

코드를 읽고 계약을 이해하는 것은 가능하지만, 제출물은 백엔드 수정이 아니라 프론트엔드와 런타임 아키텍처 변경으로 문제를 해결해야 합니다.

## 로컬 실행 참고

운영자 또는 검증자가 Docker 없이 백엔드를 직접 실행해야 한다면 다음 순서로 진행합니다.

1. PostgreSQL 데이터베이스를 준비합니다.
2. `.env.example` 을 `.env` 로 복사합니다.
3. 의존성을 설치합니다.
4. `npx prisma generate` 를 실행합니다.
5. `npx prisma db push` 를 실행합니다.
6. `npm run prisma:seed` 를 실행합니다.
7. `npm run start:dev` 를 실행합니다.

기본 로컬 주소:

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/docs`

## 테스트 계정

- Email: `participant@example.com`
- Password: `Password123!`

## API 개요

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/products`
- `GET /api/cart`
- `POST /api/cart/items`

## 쿠키 동작

- 인증은 HttpOnly `session` 쿠키를 사용합니다.
- 로그인 시 쿠키가 설정되고, 로그아웃 시 제거됩니다.
- 로컬 과제 기본값은 `SameSite=Lax`, `Secure=false` 입니다.
- 실제 HTTPS production 환경에서는 다른 쿠키 설정이 필요할 수 있습니다.

## Swagger를 포함한 이유

이 과제는 shared contracts 패키지를 통한 FE/BE 타입 공유 과제가 아니라, black box backend와 통신하는 프론트엔드 런타임 아키텍처 과제입니다.

그래서 이 저장소는 타입 공유 대신 Swagger UI와 OpenAPI 문서를 제공해 API 계약을 확인할 수 있게 했습니다.
