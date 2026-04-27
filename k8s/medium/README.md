# 🟡 Medium - 뼈대 채우기

yaml 파일의 구조는 잡혀있어요. `#` 주석을 읽고 직접 값을 채워서 완성해보세요!

## 파일 구성

| 파일 | 작성 포인트 |
|------|------|
| `front-deployment.yaml` | 이름/이미지/포트/레이블 채우기 |
| `front-service.yaml` | 서비스 이름이 nginx.conf와 일치해야 함 |
| `backend-deployment.yaml` | DB 환경변수를 올바르게 설정해야 DB 연결 가능 |
| `backend-service.yaml` | 서비스 이름이 backend-deployment의 DB_HOST와 일치해야 함 |
| `db-deployment.yaml` | PVC 연결 + subPath 설정 필수 |
| `db-service.yaml` | DB는 외부 노출 불필요 |
| `db-pvc.yaml` | claimName과 반드시 일치 |

## 핵심 규칙

1. `selector.matchLabels`와 파드의 `labels`는 반드시 일치해야 해요
2. 서비스 이름이 곧 DNS 이름이에요 (백엔드 → DB 연결 시 IP 대신 서비스 이름 사용)
3. PVC `name`과 Deployment의 `claimName`은 반드시 일치해야 해요
4. DB Deployment의 `volumeMounts.name`과 `volumes.name`은 반드시 일치해야 해요

## 참고 링크

- [쿠버네티스 Deployment 공식 문서](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [쿠버네티스 Service 공식 문서](https://kubernetes.io/docs/concepts/services-networking/service/)
- [쿠버네티스 PVC 공식 문서](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
