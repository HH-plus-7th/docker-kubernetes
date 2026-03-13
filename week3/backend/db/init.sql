CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    lprice BIGINT NOT NULL,
    category1 VARCHAR(100),
    category2 VARCHAR(100),
    description TEXT,
    rating INT DEFAULT 0,
    review_count INT DEFAULT 0,
    stock INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO products (product_id, title, brand, image, lprice, category1, category2, description, rating, review_count, stock)
VALUES
  ('11124150101', '방충망 미세먼지 롤 창문 모기장 DIY 100cmx10cm', '메쉬코리아', 'https://shopping-phinf.pstatic.net/main_1112415/11124150101.10.jpg', 450, '생활/건강', '생활용품', '방충과 미세먼지 차단 기능을 가진 롤 타입 창문용 모기장입니다.', 4, 120, 50),
  ('80285861246', '일체형 자석 방충망 현관 베란다 창문 안방 모기장 베이직 90X210', '다샵', 'https://shopping-phinf.pstatic.net/main_8028586/80285861246.19.jpg', 9900, '생활/건강', '생활용품', '현관과 베란다에 설치하는 일체형 자석 방충망입니다.', 5, 320, 80),
  ('84183051836', '고농축 알칼리세탁세제 3L 4개 빨래 찌든때 수건 쉰내 냄새제거', '쥬블릭', 'https://shopping-phinf.pstatic.net/main_8418305/84183051836.2.jpg', 20900, '생활/건강', '생활용품', '찌든때와 냄새 제거에 효과적인 고농축 알칼리 세탁세제입니다.', 4, 210, 100),
  ('82803508510', '원캠 스마트 무선 현관 CCTV 실시간 가정용 홈캠', '원캠', 'https://shopping-phinf.pstatic.net/main_8280350/82803508510.4.jpg', 98000, '생활/건강', '생활용품', '현관과 실내를 실시간으로 확인할 수 있는 무선 CCTV입니다.', 5, 85, 30),
  ('8440812714', '리빙위키 현관 방충망 롤방충망 자동 현관문 출입문 방충문', '리빙홈데코', 'https://shopping-phinf.pstatic.net/main_8440812/8440812714.4.jpg', 51900, '생활/건강', '생활용품', '자동 롤타입 현관문 방충망으로 간편하게 설치할 수 있습니다.', 4, 64, 40);

