# Gameow
<div align="center">
  <img src="https://github.com/user-attachments/assets/05913147-50d1-4f4f-a36c-83f79fe799cf" width="300px"  alt="이미지 로고"/>
</div>

> **🎮 게이머들이 모이고 함께 플레이할 수 있는 게임 크루 플랫폼**</br>
> **[코드잇 스프린트] 단기심화 프론트엔드 11기**</br>
> **개발 기간: 2025.09.11 ~ 2025.11.04**

## 🔗 배포 주소
> **https://gameow.vercel.app/**

## 👥 팀원 소개
<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/103e8154-5792-4de4-aa18-cf2cb7917ae7" alt="이미지 로고" width="full" height="200" rounded="full" /> <br/>
      <b>백승민 (팀장)</b><br/>
      <b>상세 페이지, 찜한 모임, 모임 만들기, 푸터</b><br/>
      <a href="https://github.com/SeungMin-Baek98">GitHub Profile</a>
    </td>
    <td align="center">
      <img width="full" height="200" alt="이미지 로고" src="https://github.com/user-attachments/assets/b068a653-3630-4ef1-ae32-3f94224ff7ae" /><br/>
      <b>김철수</b><br/>
      <b>공통 컴포넌트, 리뷰 페이지</b><br/>
      <a href="https://github.com/annann23">GitHub Profile</a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img width="full" height="200" alt="이미지 로고" src="https://github.com/user-attachments/assets/2e801b30-bf67-41d6-90cb-a4a4e0544842" /><br/>
      <b>노윤지</b><br/>
      <b>로그인 및 회원가입, 메인페이지, GNB</b><br/>
      <a href="https://github.com/y0unj1NoH">GitHub Profile</a>
    </td>
    <td align="center">
      <img width="full" height="200" alt="이미지 로고" src="https://github.com/user-attachments/assets/57977b85-fb14-4ef5-9e3a-b4f3930d3647" /><br/>
      <b>박민수 – Frontend Developer</b><br/>
      <b>마이페이지, 프로젝트 로고 디자인, 자동배포</b><br/>
      <a href="https://github.com/bbagbbagn2">GitHub Profile</a>
    </td>
  </tr>
</table>

## 📘프로젝트 소개
Gameow는 게이머들이 관심 있는 ‘크루(Gathering)’를 생성하고 신청하며 관리할 수 있고, 사이트 내에서 유저 간 게임 아이템을 교환할 수 있는 종합 커뮤니티 기반 웹 애플리케이션입니다.

## 🧩 기술 스택

### 🔧 Environment
| 구분 | 기술 |
|------|------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Build Tool | Create Next App (CNA) |
| Styling Processor | Tailwind CSS v4 |

---

### 🛠️ Development
| 구분 | 기술 |
|------|------|
| UI Library | Shadcn/ui |
| Styling | Tailwind CSS v4 / CVA (Class Variants API) |
| Animation | Framer Motion |
| State Management | Zustand (Global State) |
| Data Fetching | TanStack Query (React Query) |
| Form Validation | React Hook Form + Zod |

---

### 🧪 Testing
| 구분 | 기술 |
|------|------|
| Unit / Component Test | React Testing Library |
| Test Runner | Jest |

---

### ⚙️ Code Quality
| 구분 | 기술 |
|------|------|
| Linting | ESLint |
| Formatting | Prettier |

---

### 💬 Communication

| 구분 | 도구 | 링크|
|------|------|------|
| 회의 | Zep | 
| 문서 관리 | Notion | [노션 주소](https://great-wavelength-86e.notion.site/27d2c6fa0f4c818d8960e9b3b3e16c6a?v=27d2c6fa0f4c81eea4ac000c3c9fce56&source=copy_link)
| 일정 관리| Jira | [지라 주소](https://fesi11-team5.atlassian.net/jira/software/projects/TD/boards/1)


## 📂 폴더 구조
```
src
├── apis                # 서버 API 통신 모듈
│   ├── auths
│   ├── gatherings
│   └── reviews
│
├── app                 # Next.js App Router 페이지
│   ├── (auths)         # 로그인/회원가입
│   ├── (home)          # 메인 페이지
│   ├── gatherings      # 모임 상세 페이지
│   ├── favorites
│   ├── me              # 마이페이지
│   └── reviews
│
├── components          # 공통 및 도메인 컴포넌트
│   ├── auth
│   ├── calendar
│   ├── commons
│   ├── favorites
│   ├── gatherings
│   ├── me
│   ├── reviews
│   └── ui
│
├── constants           # 상수 및 공통 설정 파일
├── hooks               # 커스텀 훅
├── providers           # 글로벌 Provider (React Query, Zustand 등)
├── stores              # Zustand 전역 상태
├── types               # TypeScript 타입 정의
└── utils               # 유틸 함수 모음
 ```
