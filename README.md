# Week 7 완성본

7주차 실습에서 만든 결과물의 완성본입니다!
이어서 하시는 분은 건너뛰셔도 되고, 8주차에 새로 시작하는는 분이나 환경이 꼬이신 분은 이 폴더의 yaml을 그대로 적용하시면 됩니다👍

## 📦 파일 구성

| 파일              | 설명                                                   |
| ----------------- | ------------------------------------------------------ |
| `app.js`          | v1 버전 앱 소스코드 (참고용)                           |
| `app-v2.js`       | v2 버전 앱 소스코드 (참고용)                           |
| `Dockerfile`      | 이미지 빌드용 Dockerfile (참고용)                      |
| `deployment.yaml` | doku-app 디플로이먼트 (replicas: 3, 롤링업데이트 설정) |
| `service.yaml`    | ClusterIP + NodePort 서비스                            |
| `pv-pvc.yaml`     | PersistentVolume + PVC (심화 과제용)                   |

> `app.js`, `app-v2.js`, `Dockerfile` 은 어떻게 이미지가 만들어졌는지 보여주기 위한 참고 파일입니다.
> 이미지는 이미 빌드돼서 `96grappe/dokustudy:v1`, `96grappe/dokustudy:v2` 로 Docker Hub에 올라가 있으니 바로 pull 해서 쓰시면 돼요!

## 🚀 적용 방법

```bash
# week7 폴더 전체 한번에 적용
kubectl apply -f week8/

# 또는 개별 적용
kubectl apply -f week8/deployment.yaml
kubectl apply -f week8/service.yaml
kubectl apply -f week8/pv-pvc.yaml  # 심화 과제 하실 분만
```

## ✅ 확인 포인트

### 파드 상태 확인

```bash
kubectl get pods
# doku-app-xxxxx-xxxxx 파드 3개가 Running 상태여야 함
```

### 서비스 확인

```bash
kubectl get svc
# doku-app-clusterip (ClusterIP)
# doku-app-nodeport (NodePort, 30080)
```

### 브라우저 접속

```
http://localhost:30080
```

`v2 - 업데이트 완료! 파드 이름: doku-app-xxxxx-xxxxx` 가 뜨면 성공!

새로고침할 때마다 파드 이름이 바뀌는 것도 확인해보세요 (3개 파드에 로드밸런싱됨).

### PVC 확인 (심화 과제)

```bash
kubectl get pv,pvc
# doku-app-pv, doku-app-pvc 둘 다 Bound 상태여야 함
```

## 🧹 정리

```bash
kubectl delete -f week7/
```

## 🖼️ 사용된 이미지

- `96grappe/dokustudy:v1` - 초기 버전
- `96grappe/dokustudy:v2` - 업데이트 버전

두 이미지는 Docker Hub에 Public으로 공개돼 있어서 별도 로그인 없이 pull 됩니다.
