# Kkumuljji Tools 공개 안내 페이지

기존 React/Vite 사이트를 유지하고 빌드 마지막에 독립적인 한국어 정적 HTML 두 개를 생성한다. Instagram 도구의 서버·토큰·데이터는 이 저장소로 복사하지 않는다.

## 미리보기와 공개 빌드

```sh
corepack pnpm install --frozen-lockfile
npm run build:draft
npm run preview -- --host 127.0.0.1 --port 4173
```

- http://127.0.0.1:4173/kkumuljji/privacy/
- http://127.0.0.1:4173/kkumuljji/data-deletion/

`legal/config.json`에서 운영자명, 실제 문의 이메일, 실제 공개일(YYYY-MM-DD)을 설정한다. 운영자가 아래 사실관계와 이메일 요청 처리 절차를 확인한 뒤 `operationsConfirmed`를 true로 설정한다. 그 후 `npm run build`를 실행한다. 필수값이 없으면 공개 빌드가 실패한다. 초안은 noindex이며 초안 배너가 표시된다. `build:draft` 결과는 배포하지 않는다.

## 확인된 실제 구현과 PRD 차이

2026-10-10 기준 별도 로컬 프로젝트 `kkumuljji-instagram-tools`의 `lib/instagram.ts`, API routes, `app/page.tsx`, `app/styles.css`를 확인했다.

- 계정 식별자·사용자 이름, 게시물·미디어 URL, 본문, 유형, 게시 시각, 댓글 식별자·내용·시각·작성자 정보를 요청한다.
- 조회 결과는 서버 요청 메모리와 React 화면 상태에서 사용한다. 데이터베이스/CSV 저장, 별도 대댓글 수집, 통계·관심사 분석 기능은 확인되지 않았다. 이를 현재 기능으로 기재하지 않았다.
- 액세스 토큰은 로컬 환경 설정에 보관한다. 원격 API 접근에 사용하되 안내 사이트에 포함하지 않는다.
- 로컬 도구는 Google Fonts와 미디어 URL을 요청한다. 공개 안내 페이지는 시스템 폰트만 사용한다.
- 이메일 삭제 요청 처리는 코드로 자동 구현된 기능이 아니라 운영자가 수행해야 할 절차다. 실제 수행 가능 여부를 확인해야 한다. 처리 기한의 임의 약속은 넣지 않았다.

## 공개 전 운영자 확인

2026-10-10 운영자가 공개 운영자명 `꾸물찌`, 이메일 `solppulia@gmail.com`, 개인 로컬 데이터 관리, 이메일 삭제 요청 직접 처리 가능을 확인했다. 이에 따라 공개 빌드용 설정을 채웠다. CSV 자동 저장 기능이 추가됐다는 답변은 없으므로 확인한 코드와 별도 로컬 사본을 구분한 문구를 유지한다. 아래 법적 검토·추가 운영 항목까지 모두 확인됐다는 의미는 아니다. 공개 승인은 별도로 받아야 하며 공개일이 달라지면 시행일도 실제 공개일에 맞게 변경한다.

- 공개할 운영자명과 문의 이메일, 공개일.
- 확인한 로컬 프로젝트 외에 CSV/분석/대댓글/서버 저장 기능이나 다른 외부 처리업체가 있는지.
- 수동 저장 자료, 백업, 클라우드 동기화, 로그에 개인정보가 남는지와 실제 파기 방식.
- 데이터 판매·광고 목적 이용을 하지 않는다는 운영 방침.
- 이메일로 열람·정정·삭제·처리정지 요청을 접수하고 확인·회신할 수 있는지; 문의 메일의 보관·파기 방식과 필요한 고지 사항.
- 개인정보 보호법 적용 범위, 처리 근거, 국외 이전·처리위탁 등 추가 고지 필요 여부. 코드 검토만으로 법률적 적합성을 확정하지 않는다.
- Google Fonts 등 로컬 앱의 외부 요청과 운영 이메일 서비스가 고지와 일치하는지.

## 문서 검토 근거 및 한계

- 개인정보 보호법 제30조: https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1029335711 (2026-10-10 열람). 처리 목적, 항목, 보관, 파기, 외부 서비스, 권리와 문의처를 구분하였다.
- Meta Platform Terms: https://developers.facebook.com/terms/ . 공식 페이지가 접근 제한되어 최신 원문 전체 대조를 완료하지 못했다. 공개 접근 가능한 방침과 실제 데이터 처리 내용 및 삭제 안내를 준비했지만, Meta 약관 전체 준수나 심사 통과를 보장하지 않는다. 제출 전 운영자가 로그인한 브라우저에서 확인한다.
- Meta 데이터 삭제: https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback/ . 공식 페이지 접근 제한으로 최신 원문 대조 미완료. 이번 구현은 정적 안내 URL이며 콜백 서버가 아니다.
- GitHub 호스팅 개인정보 안내: https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement

## 배포와 Meta 입력값

사용자가 실제 배포 전 승인을 요청했으므로 승인 전에는 원격 push, Actions 실행, Pages 설정 변경을 하지 않는다. 기존 `.github/workflows/deploy.yml`은 main push 시 자동 배포한다. 승인 후 공개 설정으로 빌드하고 변경 파일만 검토·커밋하여 main에 반영한다. 기존 Pages workflow를 그대로 사용하며 GitHub Pages 계정 설정 변경은 필요하지 않을 것으로 예상한다. 실제 설정과 배포 결과는 확인해야 한다.

배포 후 아래 주소의 HTTP 성공 응답, 로그인 불필요, 실제 문서 본문 및 CSS 로딩을 확인한다. GitHub 프로젝트 사이트의 `/kkumuljji/` 접두사는 유지한다. `dist/privacy/index.html`, `dist/data-deletion/index.html`로 생성하므로 SPA 404 fallback 없이 직접 접근과 새로고침이 가능하다.

| Meta 입력란 | 배포 후 등록할 주소 |
| --- | --- |
| Privacy Policy URL | https://solppulia.github.io/kkumuljji/privacy/ |
| User data deletion → Data deletion instructions URL | https://solppulia.github.io/kkumuljji/data-deletion/ |

데이터 삭제 필드에서 **안내 URL** 유형을 선택한다. **Data Deletion Callback URL**에 정적 페이지를 등록하지 않는다. 해당 앱에서 콜백을 필수로 요구한다면 별도 서버 설계와 Meta 서명 검증, 응답 요구사항 확인이 필요하다. 이번 범위에는 포함하지 않는다.

연락처 이메일, 앱 아이콘 등 Meta가 추가로 요구하는 설정은 개발자 콘솔에서 실제 요건을 확인한다. 공개 페이지 제공은 앱 공개나 검수 승인을 보장하지 않는다.
