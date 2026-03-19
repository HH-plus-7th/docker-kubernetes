# Frontend Docker Communication Challenge - 제출 PR

## 1. 요약

이번 제출에서 해결한 문제를 3~5줄로 요약해 주세요.

## 2. 선택한 아키텍처

아래 중 하나를 선택하고 이유를 적어 주세요.

- [ ] Direct Browser-to-API
- [ ] Frontend Runtime + Reverse Proxy
- [ ] Other

선택 이유:

## 3. 요청 흐름 설명

브라우저에서 시작해 최종적으로 백엔드까지 요청이 어떻게 흘러가는지 적어 주세요.

예시 형식:

`Browser -> Frontend Runtime -> /api proxy -> Backend`

또는

`Browser -> Backend API`

실제 제출 구조:

## 4. 초기 실패 원인

starter가 처음 왜 실패했는지 구체적으로 적어 주세요.

- 브라우저 네트워킹 관점:
- Docker 네트워킹 관점:
- 인증 / 쿠키 관점:
- dev / prod 차이 관점:

## 5. 핵심 변경 사항

이번 제출에서 바꾼 핵심 내용을 적어 주세요.

- 프론트엔드 코드:
- Docker / compose:
- 런타임 서버 또는 프록시:
- 환경 변수 / 설정:
- 문서:

## 6. 인증 동작 설명

아래 항목을 기준으로 설명해 주세요.

- 로그인 요청 후 세션이 어떻게 유지되는가
- `credentials: 'include'` 를 어떻게 처리했는가
- HttpOnly 쿠키는 프론트엔드에서 어떻게 다뤄야 하는가
- refresh 이후에도 왜 인증이 유지되는가

## 7. trade-off

이번 아키텍처에서 받아들인 trade-off를 적어 주세요.

- 장점:
- 단점:
- 다른 선택지를 택하지 않은 이유:

## 8. 검증 방법

어떻게 검증했는지 적어 주세요.

- 실행 명령:
- 테스트한 브라우저:
- clean profile 사용 여부:
- 확인한 네트워크 포인트:

## 9. Acceptance Checklist

- [ ] `docker compose up --build` 로 전체 스택이 정상 실행된다
- [ ] 프론트엔드가 브라우저에서 접근 가능하다
- [ ] 로그인에 성공한다
- [ ] `/api/auth/me` 가 로그인 이후 정상 동작한다
- [ ] 상품 목록이 정상 조회된다
- [ ] 장바구니 추가가 정상 동작한다
- [ ] 새로고침 후에도 인증이 유지된다
- [ ] 브라우저 콘솔에 CORS 에러가 없다
- [ ] production frontend build를 사용한다
- [ ] dev server에만 의존하지 않는다
- [ ] 백엔드 앱 로직을 수정하지 않았다
- [ ] 데이터베이스 스키마 / 영속성 로직을 수정하지 않았다

## 10. 제출물 체크

- [ ] `Dockerfile`
- [ ] `docker-compose.yml`
- [ ] `.dockerignore`
- [ ] `README.md`
- [ ] `ADR.md`

추가 생성 파일:

## 11. 문서 링크

- README:
- ADR:

## 12. 리뷰어가 특히 봐야 할 부분

리뷰어가 중점적으로 보면 좋은 파일이나 포인트를 적어 주세요.

## 13. 남아 있는 한계 / known issues

현재 제출물의 한계나 주의할 점이 있으면 적어 주세요.
