# 🔴 High - 처음부터 직접 작성하기

yaml 파일이 완전히 비어있어요. 공식 문서와 지난 주차 실습을 참고해서 처음부터 작성해보세요!

## 작성해야 할 파일

| 파일 | 설명 |
|------|------|
| `front-deployment.yaml` | 프론트엔드 디플로이먼트 |
| `front-service.yaml` | 프론트엔드 서비스 |
| `backend-deployment.yaml` | 백엔드 디플로이먼트 + DB 환경변수 |
| `backend-service.yaml` | 백엔드 서비스 |
| `db-deployment.yaml` | DB 디플로이먼트 + PVC 연결 |
| `db-service.yaml` | DB 서비스 |
| `db-pvc.yaml` | DB 스토리지 PVC |

## 알아야 할 정보

- 사용 이미지: `96grappe/doku-front:v1`, `96grappe/doku-backend:v1`, `postgres:15`
- 프론트 포트: `80` / 백엔드 포트: `4000` / DB 포트: `5432`
- DB 접속 정보: user `doku` / password `doku1234` / dbname `doku`
- DB volumeMount 시 `subPath: pgdata` 필수!

## 참고 링크

- [쿠버네티스 Deployment 공식 문서](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [쿠버네티스 Service 공식 문서](https://kubernetes.io/docs/concepts/services-networking/service/)
- [쿠버네티스 PVC 공식 문서](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
