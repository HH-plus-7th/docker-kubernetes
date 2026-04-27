# 🟢 Low - 완성본 참고하기

yaml 파일이 모두 완성된 상태로 제공돼요.
각 파일을 읽어보고 어떤 구조인지 이해한 뒤, `kubectl apply`로 직접 배포해보세요!

## 파일 구성

| 파일 | 설명 |
|------|------|
| `front-deployment.yaml` | 프론트엔드 디플로이먼트 (replicas: 2) |
| `front-service.yaml` | 프론트엔드 ClusterIP 서비스 |
| `backend-deployment.yaml` | 백엔드 디플로이먼트 + DB 환경변수 |
| `backend-service.yaml` | 백엔드 ClusterIP 서비스 |
| `db-deployment.yaml` | PostgreSQL 디플로이먼트 + PVC 마운트 |
| `db-service.yaml` | DB ClusterIP 서비스 |
| `db-pvc.yaml` | DB 스토리지 PVC |

## 실습 포인트

파일을 읽으면서 아래 질문에 답해보세요!

- 프론트/백엔드/DB가 서로 어떻게 연결되어 있나요?
- `selector`와 `labels`가 왜 일치해야 할까요?
- 백엔드가 DB에 접속할 때 IP 대신 서비스 이름(`doku-db`)을 쓰는 이유가 뭘까요?
- DB에만 PVC가 붙어있는 이유가 뭘까요?
