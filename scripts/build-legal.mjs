import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(await readFile(path.join(root, 'legal/config.json'), 'utf8'));
const draft = process.argv.includes('--draft');
const base = '/kkumuljji/';
const origin = 'https://solppulia.github.io';
const parsedDate = new Date(config.effectiveDate);
const validDate = /^\d{4}-\d{2}-\d{2}$/.test(config.effectiveDate) && Number.isFinite(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === config.effectiveDate;
const ready = config.operator.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email) && validDate && config.operationsConfirmed === true;
if (!draft && !ready) throw new Error('공개 전 legal/config.json의 운영자명, 이메일, 실제 공개일, 운영 사실 확인을 완료하세요. 로컬 검토는 npm run build:draft를 사용하세요.');
const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const operator = escape(config.operator || '운영자 확인 전');
const email = config.email ? `<a href="mailto:${escape(config.email)}">${escape(config.email)}</a>` : '문의 이메일 확인 전';
const contact = `<div class="contact"><p><strong>Kkumuljji Tools</strong></p><p>운영자 및 개인정보 문의 담당: ${operator}</p><p>문의: ${email}</p></div>`;
const section = (id, title, body) => `<section id="${id}"><h2>${title}</h2>${body}</section>`;

const privacy = [
section('scope','1. 서비스와 적용 범위',`<p>Kkumuljji Tools는 계정 소유자가 자신의 Instagram 게시물과 댓글을 조회하기 위해 사용하는 개인용 내부 도구입니다. 외부 사용자의 가입이나 다른 사람의 Instagram 계정 연결을 받지 않습니다.</p><p>이 방침은 Kkumuljji Tools의 데이터 처리에 적용됩니다. 공개된 안내 페이지에서는 Instagram 데이터 조회 기능을 제공하지 않습니다. 꾸물찌 사이트의 다른 도구 전체를 대상으로 하는 방침은 아닙니다.</p>`),
section('data','2. 처리하는 데이터와 목적',`<dl><dt>계정 정보</dt><dd>계정 식별자와 사용자 이름을 조회하여 연결된 본인 계정을 확인합니다.</dd><dt>게시물 정보</dt><dd>게시물 식별자, 본문, 게시물 유형, 게시물·미디어·썸네일 URL, 게시 시각을 조회하여 게시물 목록을 표시합니다.</dd><dt>댓글 정보</dt><dd>댓글 식별자, 내용, 작성 시각과 API가 제공하는 작성자 식별자·사용자 이름을 조회하여 선택한 게시물의 댓글을 표시합니다. 댓글에는 계정 소유자 외의 작성자에 관한 정보가 포함될 수 있습니다.</dd><dt>인증 정보</dt><dd>Instagram API에 접근하기 위한 액세스 토큰을 사용합니다. 토큰은 로컬 서버에서 처리하며 공개 페이지나 브라우저 코드에 포함하지 않습니다.</dd></dl><p>현재 구현에는 대댓글 별도 수집, 댓글 통계·관심사 분석, CSV 내보내기가 포함되어 있지 않습니다. 해당 기능을 추가하면 처리 항목과 목적, 보관 방식을 확인하여 이 방침을 개정합니다.</p>`),
section('retention','3. 보관 위치와 파기',`<p>현재 도구는 조회 결과를 로컬 서버의 요청 처리 메모리와 브라우저 화면 상태에서 사용합니다. Instagram 조회 결과를 데이터베이스나 CSV 파일에 자동으로 저장하는 기능은 없습니다. 별도의 클라우드 데이터베이스 또는 외부 공개 서버에 조회 결과를 저장하는 기능도 구현되어 있지 않습니다.</p><p>브라우저의 조회 결과는 페이지를 새로고침하거나 닫으면 화면 상태에서 제거됩니다. 로컬 서버를 종료하면 프로세스 메모리의 상태도 종료됩니다. 이는 사용자가 별도로 저장한 파일, 화면 캡처 또는 운영체제·브라우저가 관리하는 기록까지 삭제한다는 의미는 아닙니다.</p><p>액세스 토큰은 계정 소유자의 로컬 환경 설정 파일에 보관되며 자동 삭제 기능은 없습니다. 연동을 종료할 때 권한을 철회하고 로컬 설정의 토큰도 제거합니다. 별도로 복사하거나 저장한 자료가 있다면 사용 목적이 끝났을 때 운영자가 해당 파일과 불필요한 사본을 삭제합니다.</p><p>고정된 일수의 자동 보관·삭제 정책은 구현되어 있지 않습니다. 자세한 절차는 <a href="${base}data-deletion/">사용자 데이터 삭제 안내</a>에서 확인할 수 있습니다.</p>`),
section('third-parties','4. 제3자 제공과 외부 서비스',`<p>Instagram 데이터는 계정 소유자가 승인한 범위에서 Meta의 Instagram API를 통해 가져옵니다. Meta가 자체 서비스에서 처리하는 정보에는 Meta의 정책이 적용됩니다. Kkumuljji Tools는 조회 데이터를 판매하거나 광고 목적으로 이용하지 않습니다.</p><p>이 공개 안내 페이지는 GitHub Pages에서 호스팅합니다. 페이지 접속 시 GitHub가 IP 주소 등 접속 정보를 처리할 수 있으며, 이는 <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub 개인정보처리방침</a>에 따릅니다. 이 페이지에는 별도의 분석 도구, 광고 스크립트, 입력 폼, 외부 폰트를 추가하지 않습니다.</p><p>로컬 도구는 화면의 미디어를 표시하기 위해 Meta의 미디어 주소에 접속하며, 현재 스타일시트는 Google Fonts를 요청합니다. 요청 과정에서 해당 서비스에 접속 정보가 전달될 수 있습니다. 이메일로 문의하면 사용자가 이용하는 이메일 서비스와 운영자의 이메일 서비스를 통해 문의 내용이 전달됩니다.</p>`),
section('rights','5. 열람·정정·삭제 및 처리정지 요청',`<p>자신의 댓글 등 개인정보가 이 도구에서 처리되는 경우, 아래 문의처로 열람, 정정, 삭제 또는 처리정지를 요청할 수 있습니다. 필요한 경우 요청 대상과 본인 여부를 확인할 최소한의 정보를 요청합니다. 액세스 토큰, 비밀번호 또는 신분증을 먼저 보내지 마세요.</p><p>요청은 운영자가 직접 확인합니다. 관련 법령에 따라 처리하고 결과 또는 제한 사유를 회신합니다. 현재 자동 접수·삭제 시스템이나 별도로 확정한 처리 소요일은 없습니다. 이 도구의 사본 삭제와 Instagram 원본 댓글 삭제는 별개입니다.</p>`),
section('security','6. 보안 조치',`<ul><li>액세스 토큰은 로컬 서버의 환경 설정에서 관리하고 공개 코드에 포함하지 않습니다.</li><li>환경 설정 파일, API 키 및 토큰은 공개 Git 저장소에 커밋하지 않습니다.</li><li>로컬 컴퓨터와 데이터에 대한 불필요한 제3자 접근을 제한합니다.</li><li>연동을 종료하면 Meta 측 권한 철회와 로컬 토큰 제거를 함께 수행합니다.</li></ul>`),
section('contact','7. 담당자와 문의처',contact),
section('changes','8. 방침의 변경',`<p>처리 목적, 보관 방식, 외부 서비스 또는 문의처가 변경되면 이 페이지와 시행일을 갱신합니다. 향후 CSV 내보내기, 분석 또는 서버 저장 기능을 추가하는 경우 실제 처리 방식에 맞게 방침을 먼저 검토·개정합니다.</p>`),
].join('');

const deletion = [
section('scope','1. 삭제 대상과 범위',`<p>Kkumuljji Tools는 계정 소유자가 자신의 Instagram 게시물과 댓글을 조회하는 개인용 도구입니다. 현재 조회 결과를 데이터베이스나 CSV 파일에 자동 저장하지 않으며, 공개 안내 사이트에도 Instagram 데이터를 저장하지 않습니다.</p><p>아래 절차는 도구의 접근 권한, 로컬 인증 정보 및 별도로 저장한 사본을 정리하기 위한 안내입니다. Instagram에 게시된 원본 게시물이나 댓글 자체를 삭제하는 절차는 아닙니다.</p>`),
section('disconnect','2. Instagram 연동 해제',`<ol><li>연결한 Instagram 계정으로 로그인합니다.</li><li>설정에서 연결된 앱·웹사이트 또는 앱 권한을 관리하는 항목을 찾습니다. 메뉴 이름과 위치는 앱 버전에 따라 달라질 수 있습니다.</li><li>Kkumuljji Tools가 표시되면 해당 앱을 선택하여 접근 권한을 제거합니다.</li><li>앱이 표시되지 않거나 해제가 어려우면 운영자에게 문의합니다.</li></ol><p>권한 철회는 이후 접근을 제한하기 위한 조치이며, 이미 로컬에 별도로 저장한 자료까지 삭제하지는 않습니다.</p>`),
section('local','3. 조회 화면과 로컬 파일 삭제',`<ol><li>댓글 조회 화면을 닫고 로컬 도구 서버를 종료합니다.</li><li>현재 버전에는 CSV 내보내기 기능이 없습니다. 사용자가 별도 방법으로 CSV, JSON, 화면 캡처 등을 저장했다면 해당 파일을 찾아 삭제합니다.</li><li>불필요한 복사본과 휴지통도 정리합니다. 클라우드 동기화나 백업을 직접 설정했다면 해당 위치의 사본도 별도로 확인합니다.</li></ol><p>도구가 사용자의 파일이나 백업을 자동으로 찾아 삭제하는 기능은 없습니다.</p>`),
section('token','4. 저장된 액세스 토큰 폐기',`<ol><li>위의 연동 해제 절차로 Meta 측 접근 권한을 철회합니다.</li><li>로컬 프로젝트의 환경 설정 파일에서 <code>INSTAGRAM_ACCESS_TOKEN</code> 값을 제거합니다.</li><li>토큰을 별도로 저장한 임시 파일이나 사본이 있으면 함께 삭제합니다. 터미널 변수로 보관했다면 해당 변수도 해제합니다.</li><li>이미 실행 중인 서버에는 토큰이 남아 있을 수 있으므로 서버를 종료합니다.</li></ol><p>로컬 파일에서 토큰을 지우는 것만으로 Meta 측 토큰이 취소되는 것은 아닙니다. 토큰이나 비밀번호를 이메일로 보내지 마세요.</p>`),
section('request','5. 댓글 작성자의 삭제 요청과 문의',`<p>본인의 댓글 등 개인정보에 대해 삭제를 요청하려면 아래 이메일로 연락해 주세요. 제목은 ‘Kkumuljji Tools 데이터 삭제 요청’으로 작성하고, 요청 대상 게시물 URL과 본인의 Instagram 사용자 이름, 삭제를 원하는 데이터 범위를 알려주세요.</p><p>비밀번호, 액세스 토큰, 불필요한 신분증이나 다른 사람의 개인정보는 보내지 마세요. 운영자는 요청 대상을 식별하고 본인 여부를 확인하는 데 필요한 최소한의 정보만 추가로 요청합니다.</p>${contact}`),
section('process','6. 요청 처리와 결과 안내',`<p>운영자가 이메일을 직접 확인하고, 도구 및 운영자가 관리하는 사본에 요청 대상 데이터가 있는지 확인합니다. 삭제 대상이 확인되면 관련 법령에 따라 삭제하거나 필요한 조치를 하고 이메일로 결과를 안내합니다. 보관된 사본이 없거나 Instagram 원본 삭제가 필요한 경우에는 그 사실과 처리 범위를 안내합니다.</p><p>자동 삭제 기능, 접수 번호 발급 또는 처리 상태 조회 시스템은 없습니다. 별도로 확정한 처리 소요일은 없으며, 접수 후 예상 일정과 지연 사유가 있으면 안내합니다. 법령상 보존 의무 등으로 삭제가 제한되면 그 사유를 설명합니다.</p><p>자세한 데이터 처리 내용은 <a href="${base}privacy/">개인정보처리방침</a>에서 확인할 수 있습니다.</p>`),
].join('');

for (const [slug,title,description,body] of [
 ['privacy','개인정보처리방침','Kkumuljji Tools가 처리하는 Instagram 데이터, 보관 방식과 개인정보 권리를 안내합니다.',privacy],
 ['data-deletion','사용자 데이터 삭제 안내','Instagram 연동 해제, 로컬 데이터 및 액세스 토큰 삭제와 문의 절차를 안내합니다.',deletion],
]) {
 const nav = `<a href="${base}privacy/"${slug === 'privacy' ? ' aria-current="page"' : ''}>개인정보처리방침</a><a href="${base}data-deletion/"${slug === 'data-deletion' ? ' aria-current="page"' : ''}>데이터 삭제 안내</a>`;
 const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | Kkumuljji Tools</title><meta name="description" content="${description}">${draft ? '<meta name="robots" content="noindex,nofollow">' : `<link rel="canonical" href="${origin}${base}${slug}/">`}<link rel="stylesheet" href="${base}legal.css"></head>
<body><a class="skip" href="#content">본문 바로가기</a><header class="topbar"><div class="topbar-inner"><a class="brand" href="${base}privacy/">Kkumuljji Tools</a><a class="home-link" href="${base}">꾸물찌 홈으로 →</a></div></header><div class="layout"><aside class="sidebar"><p>KKUMULJJI TOOLS / 안내</p><nav aria-label="법적 고지">${nav}</nav></aside><main id="content" tabindex="-1">${draft ? '<div class="draft"><strong>운영자 검토용 초안 · 아직 시행되지 않았습니다</strong><p>운영자·연락처·공개일 및 실제 운영 방식 확인 후 공개합니다.</p></div>' : ''}<p class="eyebrow">${slug === 'privacy' ? 'PRIVACY POLICY' : 'DATA DELETION'}</p><h1>${title}</h1><p class="date">시행일: ${draft ? '공개 승인 후 확정' : escape(config.effectiveDate)}</p><p class="lead">${description}</p><div class="summary"><strong>내 계정의 데이터를 위한 개인용 도구</strong><p>이곳은 공개 안내 페이지입니다. Instagram 데이터 조회나 계정 연결 기능을 제공하지 않습니다.</p></div>${body}</main></div><footer class="bottom"><div><strong>Kkumuljji Tools</strong><br>${operator} · ${email}</div><nav aria-label="하단 안내">${nav}</nav></footer></body></html>`;
 const dir = path.join(root,'dist',slug);
 await mkdir(dir,{recursive:true});
 await writeFile(path.join(dir,'index.html'),html);
}
await copyFile(path.join(root,'legal/legal.css'),path.join(root,'dist/legal.css'));
console.log(`Legal pages built (${draft ? 'DRAFT, not for publication' : 'release'}).`);
