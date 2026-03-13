# 🐳🛞 도쿠 스터디 Week 3 발제

안녕하세요 안녕하세요

## 개요

이번 주차는 Dockerfile을 직접 작성하고, 프론트엔드 / 백엔드 / DB를 각각 컨테이너로 띄워 연동한 뒤, 같은 구성을 Docker Compose 파일로 정리해 한 번에 실행해보는 주차입니다.

## 학습 범위

- Chapter05

## 기대효과

컨테이너 3개를 직접 손으로 하나씩 연결해보면서, 실제 서비스 배포 구조가 어떻게 동작하는지 경험해보아요.

---

## 기본 과제

### 사전 준비
- [ ] `https://github.com/HH-plus-7th/docker-kubernetes.git` clone 후 `week3` 브랜치 pull 받기

### 1단계: Dockerfile 작성 + 개별 컨테이너 연동

> Dockerfile은 제공되지 않습니다. 아래 요구사항을 만족하도록 직접 작성하고, 세 컨테이너를 `docker run`으로 띄워 연동해보세요.

#### Backend
- [ ] Django 앱을 실행할 수 있는 Dockerfile 작성하기
- [ ] 작성한 Dockerfile로 이미지를 빌드하고 컨테이너 실행하기

#### Database
- [ ] PostgreSQL 컨테이너를 실행하고 Django와 연동하기
- [ ] 컨테이너를 삭제해도 DB 데이터가 유지되도록 볼륨 설정하기

#### Frontend
- [ ] 프론트엔드 앱을 빌드하고, 그 결과를 Nginx가 서빙하는 Dockerfile 작성하기
- [ ] Nginx가 `/`는 프론트 앱, `/api`는 Django 백엔드로 프록시하도록 설정하기
- [ ] 작성한 Dockerfile로 이미지를 빌드하고 컨테이너 실행하기

#### 연동
- [ ] 사용자 정의 네트워크로 세 컨테이너를 연결하기
- [ ] 브라우저에서 프론트 앱과 API가 정상 동작하는지 확인하기

---

## 심화 과제

### 2단계: Docker Compose로 한 번에 실행하기

> 1단계에서 손으로 하나씩 연결했던 구성을 `docker-compose.yml` 하나로 옮겨서, 한 줄로 실행할 수 있게 만들어보세요.

- [ ] 1단계 구성(db, backend, frontend)을 `docker-compose.yml`로 작성하기
- [ ] `docker compose up` 한 줄로 전체 스택을 실행하고 정상 동작 확인하기
- [ ] `docker run` 방식과 비교해서 달라진 점 스터디 때 공유하기 🎉