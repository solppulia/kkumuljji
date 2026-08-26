import type { Lesson } from "./types";

export const BRAND = "꾸물찌 AI LAB";
export const markdownLessons: Lesson[] = [
  {
    id: "intro",
    part: "markdown",
    order: 0,
    title: "Markdown이 무엇인가요?",
    eyebrow: "시작하기",
    description:
      "Markdown은 글을 예쁘게 꾸미는 도구라기보다, 생각을 제목·소제목·목록으로 나누어 문서의 구조를 만드는 방법입니다. 이 구조는 사람이 읽기에도 좋고, AI에게 정보를 전달할 때도 큰 도움이 됩니다. 이 레슨에서는 문법을 외우기보다 ‘내용에 구조를 붙이면 읽는 사람이 더 쉽게 이해한다’는 감각을 먼저 가져가요.",
    takeaway:
      "Markdown은 기호를 외우는 일이 아니라, 복잡한 내용을 역할별로 나누어 전달하는 방법입니다. 다음 레슨부터 제목·강조·목록을 하나씩 직접 연습합니다.",
    example: "# 오늘 할 일\n\n## 가장 중요한 일\n\n- 자료 조사\n- 초안 작성",
    prompt:
      "채워진 예시를 마음껏 지우고 바꿔보세요. 오른쪽 미리보기의 변화를 관찰해보세요.",
    initialValue:
      "# 오늘 할 일\n\n## 가장 중요한 일\n\n- 자료 조사\n- 초안 작성",
    hints: ["기호와 글을 함께 입력하면 오른쪽에 결과가 나타나요."],
    validationType: "intro",
  },
  {
    id: "heading",
    part: "markdown",
    order: 1,
    title: "제목 만들기",
    eyebrow: "01 · 제목",
    description:
      "문장 맨 앞에 #을 붙이면 제목이 됩니다. #의 개수로 제목의 크기와 문서의 층위를 표현할 수 있어요. 중요한 규칙은 # 뒤에 반드시 한 칸을 띄우는 것입니다. #과 글자를 붙여 쓰면 제목으로 인식되지 않을 수 있어요.",
    example: "# 제목\n## 소제목\n### 하위 제목",
    prompt: "`오늘의 계획`을 가장 큰 제목으로 만들어보세요.",
    initialValue: "오늘의 계획",
    hints: [
      "가장 큰 제목은 문장 맨 앞에 # 하나를 사용합니다.",
      "# 뒤에 공백 한 칸을 넣고 제목을 적어보세요.",
    ],
    validationType: "heading",
    answer: "# 오늘의 계획",
  },
  {
    id: "emphasis",
    part: "markdown",
    order: 2,
    title: "강조하기",
    eyebrow: "02 · 강조",
    description:
      "별표 하나는 기울임, 별표 두 개는 굵게 보여줍니다. 강조할 문장의 양쪽에 같은 기호를 붙여야 해요. 기호 안쪽에 불필요한 공백을 넣지 않는 것도 중요합니다.",
    example: "*기울임*\n\n**굵게**",
    prompt:
      "예시를 보고 `중요합니다`는 굵게, `살펴보기`는 기울임으로 표시해주세요.",
    initialValue: "",
    hints: [
      "강조할 글자의 양쪽에 같은 기호를 감싸보세요.",
      "굵게는 `**글자**`, 기울임은 `*글자*`처럼 공백 없이 작성합니다.",
    ],
    validationType: "emphasis",
  },
  {
    id: "list",
    part: "markdown",
    order: 3,
    title: "목록 만들기",
    eyebrow: "03 · 목록",
    description:
      "- 또는 *을 줄 앞에 붙이면 순서 없는 목록이 됩니다. 순서가 필요할 땐 1. 2. 3.처럼 번호를 붙여요. 목록 기호 뒤에는 반드시 공백 한 칸을 넣고, 각 항목은 새 줄에 적어야 합니다.",
    example: "- 사과\n- 바나나\n- 딸기\n\n1. 자료 조사\n2. 초안 작성",
    prompt: "예시를 보고 세 항목을 목록으로 바꿔보세요: 사과, 바나나, 딸기",
    initialValue: "",
    hints: [
      "각 항목을 새 줄에 놓고 목록 기호와 글자 사이를 띄워보세요.",
      "`- 사과`처럼 - 뒤에 공백 한 칸을 넣어보세요.",
    ],
    validationType: "list",
  },
  {
    id: "quote",
    part: "markdown",
    order: 4,
    title: "인용문 만들기",
    eyebrow: "04 · 인용",
    description:
      "다른 사람의 말이나 기억해두고 싶은 문장을 > 뒤에 적으면 인용문이 됩니다. > 기호는 줄의 맨 앞에 두고, 뒤에는 공백 한 칸을 넣어 문장을 시작하세요.",
    example: "> 기록하지 않으면 잊어버립니다.",
    prompt: "다음 문장을 인용문으로 변경하세요: 기록하지 않으면 잊어버립니다.",
    initialValue: "기록하지 않으면 잊어버립니다.",
    hints: [
      "문장 맨 앞에 > 기호와 공백 한 칸을 사용합니다.",
      "`> 기록하지 않으면…`처럼 > 뒤를 띄워보세요.",
    ],
    validationType: "blockquote",
  },
  {
    id: "link",
    part: "markdown",
    order: 5,
    title: "링크 걸기",
    eyebrow: "05 · 링크",
    description:
      "[보여줄 글자](주소) 구조로 링크를 만들 수 있습니다. 대괄호와 괄호의 순서를 지키고, 주소에는 https:// 같은 전체 주소를 넣어야 합니다.",
    example: "[꾸물찌 AI LAB](https://example.com)",
    prompt: "`CommonMark`라는 글자에 https://commonmark.org 링크를 연결하세요.",
    initialValue: "CommonMark",
    hints: [
      "보여줄 글자는 대괄호 안에 넣습니다.",
      "주소는 괄호 안에 넣습니다.",
    ],
    validationType: "link",
  },
  {
    id: "image",
    part: "markdown",
    order: 6,
    title: "이미지 넣기",
    eyebrow: "06 · 이미지",
    description:
      "링크 문법 앞에 !를 붙이면 이미지 문법이 됩니다. 대괄호 안의 글자는 이미지가 보이지 않을 때 읽는 설명(대체 텍스트)이므로 이미지 내용을 짧고 구체적으로 적어주세요.",
    example:
      "![작은 꽃](https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500)",
    prompt:
      "다음 주소의 이미지를 `작은 꽃`이라는 설명과 함께 넣어보세요: https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
    initialValue: "",
    hints: [
      "링크 문법의 시작 부분에 기호 하나를 더합니다.",
      "!를 [ 앞에 붙여보세요.",
    ],
    validationType: "image",
  },
  {
    id: "code",
    part: "markdown",
    order: 7,
    title: "코드 구분하기",
    eyebrow: "07 · 코드",
    description:
      "짧은 명령어는 백틱 하나로 양쪽을 감싸고, 여러 줄의 원문은 백틱 세 개를 각각 별도 줄에 적어 감쌉니다. AI에게 수정하면 안 되는 텍스트를 구분할 때도 유용해요.",
    example: "`npm install`\n\n```text\n여러 줄을 그대로 보여줍니다.\n```",
    prompt: "`npm install`을 인라인 코드로 표시하세요.",
    initialValue: "npm install",
    hints: [
      "키보드에서 물결표와 함께 있는 기호를 찾아보세요.",
      "백틱 하나를 글자 양쪽에 사용합니다.",
    ],
    validationType: "code",
  },
  {
    id: "structure",
    part: "markdown",
    order: 8,
    title: "구분선과 문단",
    eyebrow: "08 · 문단",
    description:
      "빈 줄 하나는 문단을 나눕니다. 구분선은 하이픈 세 개 이상을 줄의 맨 앞에 단독으로 적어야 하며, 앞뒤에 빈 줄을 두면 더 읽기 좋습니다. 여백도 문서의 구조가 됩니다.",
    example: "첫 번째 문단입니다.\n\n---\n\n두 번째 문단입니다.",
    prompt: "두 문단 사이에 구분선을 넣어보세요.",
    initialValue: "첫 번째 문단입니다.\n\n두 번째 문단입니다.",
    hints: [
      "구분선은 기호를 반복해서 단독 줄에 적습니다.",
      "- 기호 세 개를 단독 줄에 적어보세요.",
    ],
    validationType: "hr",
  },
  {
    id: "final",
    part: "markdown",
    order: 9,
    title: "종합 문제",
    eyebrow: "09 · 종합",
    description:
      "이번에는 메모를 읽기 좋은 문서로 바꿔봅니다. 정답 문장과 완전히 같지 않아도 구조가 만들어졌다면 충분해요.",
    example:
      "# 프로젝트 회의\n\n## 일정\n\n다음 주 월요일\n\n## 참석자\n\n- 민지\n- 현수\n- 지수",
    prompt:
      "다음 메모를 읽기 좋은 Markdown 문서로 바꿔보세요: 다음주 월요일 회의이고 참석자는 민지 현수 지수고 목적은 새 프로젝트 일정 정하기 해야 할 일은 자료조사랑 기획안 만들기",
    initialValue:
      "다음주 월요일 회의이고 참석자는 민지 현수 지수고 목적은 새 프로젝트 일정 정하기 해야 할 일은 자료조사랑 기획안 만들기",
    hints: [
      "큰 제목과 여러 소제목으로 내용을 나눠보세요.",
      "제목 2개 이상과 목록을 넣어보세요.",
    ],
    validationType: "final",
    required: ["heading", "list"],
  },
];

export const aiLessons: Lesson[] = [
  {
    id: "ai-1",
    part: "ai",
    order: 0,
    title: "긴 요청을 나누기",
    eyebrow: "AI 01 · 구조화",
    description:
      "AI에게 하고 싶은 말을 한 문장에 모두 넣는 대신, 목표·독자·조건·출력 형식으로 나눠보세요. 구조가 생기면 빠뜨리는 내용이 줄어듭니다.",
    example:
      "# 목표\n\n블로그 글 작성\n\n## 독자\n\n초보자\n\n## 조건\n\n- 약 1,000자\n- 사례 포함\n\n## 출력 형식\n\n마지막에 세 줄 요약",
    prompt:
      "다음 요청을 Markdown으로 나눠보세요: 블로그 글 써줘 1000자 정도고 초보자가 읽을 거고 어려운 말은 쓰지 말고 사례도 넣고 마지막에 세 줄로 요약해줘",
    initialValue: "",
    hints: [
      "먼저 가장 중요한 일을 # 목표 아래 적어보세요.",
      "목표·독자·조건·출력 형식을 제목으로 나눠보세요.",
    ],
    validationType: "ai",
    required: ["목표", "조건", "출력 형식"],
  },
  {
    id: "ai-2",
    part: "ai",
    order: 1,
    title: "목표와 조건 구분하기",
    eyebrow: "AI 02 · 분류",
    description:
      "문장을 성격에 따라 나누면 AI가 무엇을 해야 하는지 더 선명해집니다. 목표는 일, 조건은 지켜야 할 약속입니다.",
    example:
      "## 목표\n\n블로그 게시글 작성\n\n## 조건\n\n- 1,000자 이내\n- 전문용어 최소화",
    prompt: "목표와 조건을 제목으로 나누고, 조건은 목록으로 정리해보세요.",
    initialValue:
      "블로그 게시글을 작성해주세요.\n1000자 이내입니다.\n전문용어를 최소화해주세요.",
    hints: [
      "문장들을 목표와 조건이라는 두 묶음으로 나눠보세요.",
      "## 목표와 ## 조건을 만들고 조건 앞에는 -를 붙여보세요.",
    ],
    validationType: "ai",
    required: ["목표", "조건"],
  },
  {
    id: "ai-3",
    part: "ai",
    order: 2,
    title: "엉킨 프롬프트 고치기",
    eyebrow: "AI 03 · 정리",
    description:
      "여러 정보가 섞여 있어도 여행자, 이동, 조건, 출력 형식으로 분류하면 후속 수정이 쉬워집니다.",
    example:
      "# 목표\n\n제주도 2박 3일 여행 일정 만들기\n\n## 여행자\n\n어머니와 함께 여행합니다.\n\n## 조건\n\n- 걷는 시간이 긴 일정은 피합니다.\n- 맛집을 포함합니다.",
    prompt: "제주도 여행 요청을 Markdown으로 구조화해보세요.",
    initialValue:
      "제주도 가는데 엄마랑 가고 2박3일이고 렌터카 쓸 거고 너무 많이 걷는 건 싫고 맛집도 넣어주고 여행 일정 만들어줘",
    hints: [
      "여행의 목표를 가장 위에 적고 정보를 소제목으로 분리하세요.",
      "목표·여행자·이동·조건·출력 형식을 활용해보세요.",
    ],
    validationType: "ai",
    required: ["목표", "조건", "출력 형식"],
  },
  {
    id: "ai-4",
    part: "ai",
    order: 3,
    title: "참고자료와 지시사항 구분하기",
    eyebrow: "AI 04 · 원문",
    description:
      "AI가 해야 할 일과 참고할 원문을 분리하면 원문을 멋대로 바꾸는 일을 줄일 수 있습니다. 원문은 코드 블록 안에 보관해보세요.",
    example:
      "# 요청\n\n아래 글을 세 문장으로 요약해주세요.\n\n## 조건\n\n- 핵심 주장 유지\n- 새로운 정보 추가 금지\n\n## 원문\n\n```text\n여기에 원문이 들어갑니다.\n```",
    prompt: "요청·조건·원문을 분리하고, 원문은 코드 블록 안에 넣어보세요.",
    initialValue:
      "이 글을 세 문장으로 요약해주세요.\n핵심 주장은 유지해주세요.\n새로운 정보는 추가하지 마세요.\n여기에 원문이 들어갑니다.",
    hints: [
      "해야 할 일과 참고자료에 각각 제목을 달아보세요.",
      "## 원문 아래에 ```text 코드 블록을 만들어보세요.",
    ],
    validationType: "ai",
    required: ["요청", "조건", "원문"],
  },
  {
    id: "ai-5",
    part: "ai",
    order: 4,
    title: "수정하기 쉬운 프롬프트",
    eyebrow: "AI 05 · 후속 요청",
    description:
      "Markdown의 제목 구조는 첫 요청뿐 아니라 수정에도 강합니다. 특정 섹션만 가리켜 바꿔달라고 할 수 있어요.",
    example: "# 목표\n\n## 배경\n\n## 조건\n\n- 조건 1\n\n## 출력 형식",
    prompt:
      "목표·배경·조건·출력 형식을 포함한 수정 가능한 프롬프트 뼈대를 작성하세요.",
    initialValue: "",
    hints: [
      "빈 제목도 괜찮으니 섹션부터 만들어보세요.",
      "# 목표와 ## 배경, ## 조건, ## 출력 형식을 넣어보세요.",
    ],
    validationType: "ai",
    required: ["목표", "배경", "조건", "출력 형식"],
  },
];

export const templates = {
  기본형: "# 목표\n\n\n## 배경\n\n\n## 조건\n\n- \n- \n- \n\n## 출력 형식\n",
  글쓰기:
    "# 작성할 글\n\n\n## 독자\n\n\n## 핵심 내용\n\n- \n- \n- \n\n## 문체\n\n\n## 분량\n\n\n## 출력 형식\n",
  공부: "# 목표\n\n\n## 현재 수준\n\n\n## 학습 기간\n\n\n## 조건\n\n- 하루 학습 시간: \n- 주당 학습일: \n- 선호 방식: \n\n## 출력 형식\n",
  "자료 분석":
    "# 목표\n\n\n## 확인할 내용\n\n- \n- \n\n## 원문\n\n```text\n\n```\n\n## 출력 형식\n",
};
