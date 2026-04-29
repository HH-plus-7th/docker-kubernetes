# 🐳🛞 도쿠 스터디 Week 9

프론트 + 백엔드 + DB를 K8s에 배포하고, ArgoCD로 GitOps 흐름을 체험하는 주차예요!

## 📁 폴더 구조

```
week9/
├── front/                  ← 프론트엔드 소스코드 (참고용)
│   ├── index.html
│   ├── nginx.conf
│   └── Dockerfile
├── backend/                ← 백엔드 소스코드 (참고용)
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
├── k8s/                    ← 매니페스트 작성 폴더 (과제!)
│   ├── README.md           ← 난이도 선택 가이드
│   ├── low/                ← 🟢 완성본 제공
│   ├── medium/             ← 🟡 뼈대+주석 제공
│   └── high/               ← 🔴 빈 파일만
└── docker-compose.yml      ← 로컬 테스트용
```

## 🖼️ 배포할 앱 구조

```
[프론트 - nginx]  ← 사용자 UI
      ↕ /api 프록시
[백엔드 - Node.js]  ← 할일 CRUD API
      ↕
[DB - PostgreSQL]  ← 데이터 저장
      ↕
[PVC]  ← 영구 스토리지
```

## 🐳 사용 이미지

| 서비스 | 이미지 |
|------|------|
| 프론트 | `96grappe/doku-front:v1` |
| 백엔드 | `96grappe/doku-backend:v1` |
| DB | `postgres:15` |

## 🔌 포트 정보

| 서비스 | 포트 |
|------|------|
| 프론트 | 80 |
| 백엔드 | 4000 |
| DB | 5432 |

## 🗄️ DB 접속 정보

| 항목 | 값 |
|------|------|
| user | doku |
| password | doku1234 |
| dbname | doku |

## 🚀 로컬에서 테스트하기 (선택사항)

K8s 매니페스트 작성 전에 앱이 어떻게 동작하는지 확인해볼 수 있어요!

```bash
docker-compose up --build
```

브라우저에서 `http://localhost:3000` 접속하면 할일 목록 앱이 떠요.

## 📝 과제 진행 방법
1. `k8s/` 폴더에서 난이도 선택 (low / medium / high)
2. 선택한 폴더의 README 읽기
3. `k8s/members/본인이름/` 폴더에 매니페스트 작성  ← 이 부분 추가
4. `week9` 브랜치에 push
5. ArgoCD UI에서 본인 네임스페이스 배포 상태 확인
