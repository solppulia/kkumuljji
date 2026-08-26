import { renderMarkdown } from "./markdown";
import type { Lesson } from "./types";
export function validateLesson(lesson: Lesson, value: string) {
  const html = renderMarkdown(value);
  const checks: { label: string; ok: boolean }[] = [];
  if (lesson.validationType === "heading")
    checks.push({ label: "큰 제목이 있습니다.", ok: /<h1>/.test(html) });
  if (lesson.validationType === "strong")
    checks.push({ label: "굵은 글씨가 있습니다.", ok: /<strong>/.test(html) });
  if (lesson.validationType === "emphasis")
    checks.push(
      { label: "굵은 글씨가 있습니다.", ok: /<strong>/.test(html) },
      { label: "기울임 글씨가 있습니다.", ok: /<em>/.test(html) },
    );
  if (lesson.validationType === "list")
    checks.push({
      label: "세 항목이 목록으로 정리되었습니다.",
      ok: (html.match(/<li>/g) || []).length >= 3,
    });
  if (lesson.validationType === "blockquote")
    checks.push({
      label: "인용문으로 표현되었습니다.",
      ok: /<blockquote>/.test(html),
    });
  if (lesson.validationType === "link")
    checks.push({ label: "링크가 연결되었습니다.", ok: /<a /.test(html) });
  if (lesson.validationType === "image")
    checks.push({ label: "이미지 문법이 있습니다.", ok: /<img /.test(html) });
  if (lesson.validationType === "code")
    checks.push({
      label: "인라인 코드로 구분되었습니다.",
      ok: /<code>/.test(html),
    });
  if (lesson.validationType === "hr")
    checks.push({ label: "구분선이 있습니다.", ok: /<hr \/>/.test(html) });
  if (lesson.validationType === "final")
    checks.push(
      { label: "제목 구조가 있습니다.", ok: /<h1>|<h2>/.test(html) },
      { label: "목록이 있습니다.", ok: /<ul>|<ol>/.test(html) },
      {
        label: "두 개 이상의 섹션이 있습니다.",
        ok: (html.match(/<h[1-6]>/g) || []).length >= 2,
      },
    );
  if (lesson.validationType === "intro")
    checks.push({
      label: "Markdown 결과를 확인했습니다.",
      ok: value.trim().length > 0,
    });
  if (lesson.validationType === "ai") {
    for (const item of lesson.required || [])
      checks.push({
        label: `${item} 구조가 있습니다.`,
        ok:
          new RegExp(`^#{1,6}\\s+.*${item}`, "mi").test(value) ||
          new RegExp(`\\b${item}\\b`, "i").test(value),
      });
    if (lesson.id === "ai-1" || lesson.id === "ai-3")
      checks.push({
        label: "조건이 목록으로 정리되었습니다.",
        ok: /^\s*[-*+]\s+/m.test(value),
      });
  }
  return { passed: checks.every((c) => c.ok), checks };
}
