import { ArrowUpRight, BookOpen, FileSearch, Sparkles } from "lucide-react";
import "./home.css";

const base = import.meta.env.BASE_URL;

export default function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <a className="home-logo" href={base} aria-label="꾸물찌 홈">
          <span className="home-logo-mark"><Sparkles size={17} /></span>
          꾸물찌 <i>LAB</i>
        </a>
        <span className="home-header-note">작은 실험이 큰 변화를 만들어요</span>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="home-eyebrow">KKUMULJJΙ / CREATOR SPACE</p>
            <h1>꾸물꾸물,<br /><em>같이 만들어가요.</em></h1>
            <p className="home-intro">콘텐츠를 만들고, 실험하고, 성장하는 사람들을 위한 꾸물찌의 작은 작업실이에요.</p>
            <div className="home-hero-actions">
              <a className="home-primary-link" href={`${base}mentoring`}>멘토링 보러가기 <ArrowUpRight size={17} /></a>
              <a className="home-text-link" href={`${base}checker`}>AI 파일 검사기 <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="home-hero-art">
            <div className="home-art-circle" />
            <img src={`${base}assets/kkumuljji/go.png`} alt="힘차게 나아가는 꾸물찌" />
            <span className="home-art-sticker">LET'S<br />GO!</span>
            <span className="home-art-caption">천천히, 하지만<br /><b>분명하게</b></span>
          </div>
        </section>

        <section className="home-tools" aria-labelledby="home-tools-title">
          <div className="home-section-heading">
            <p className="home-eyebrow">WHAT'S INSIDE</p>
            <h2 id="home-tools-title">지금 필요한 공간으로<br />들어가보세요.</h2>
          </div>
          <div className="home-card-grid">
            <a className="home-tool-card mentoring" href={`${base}mentoring`}>
              <div className="home-card-top"><span>01</span><BookOpen size={21} /></div>
              <img src={`${base}assets/kkumuljji/study.png`} alt="공부하는 꾸물찌" />
              <div><p>MENTORING</p><h3>인스타툰 멘토링</h3><span className="home-card-description">한 달 동안 5개의 게시물을 만들며<br />나만의 계정 방향을 찾아가요.</span></div>
              <span className="home-card-cta">자세히 보기 <ArrowUpRight size={17} /></span>
            </a>
            <a className="home-tool-card checker" href={`${base}checker`}>
              <div className="home-card-top"><span>02</span><FileSearch size={21} /></div>
              <img src={`${base}assets/kkumuljji/challenge.png`} alt="도전하는 꾸물찌" />
              <div><p>AI METADATA CHECKER</p><h3>AI 파일 사전 검사</h3><span className="home-card-description">SNS 업로드 전 이미지 파일 속<br />AI 관련 출처 정보를 확인해요.</span></div>
              <span className="home-card-cta">검사하러 가기 <ArrowUpRight size={17} /></span>
            </a>
          </div>
        </section>

        <section className="home-note"><img src={`${base}assets/kkumuljji/idea.png`} alt="아이디어를 떠올리는 꾸물찌" /><p>정답을 찾는 것보다<br /><b>직접 올려보고 알아가는 과정</b>을 믿어요.</p></section>
      </main>

      <footer className="home-footer"><span>KKUMULJJI LAB</span><span>작은 실험이 큰 변화를 만들어요.</span></footer>
    </div>
  );
}

