import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const characters = [
  { id:'gojo', name:'Satoru Gojo', role:'The Honoured One', technique:'Limitless · Six Eyes', image:'/assets/gojo.webp', color:'ice', note:'The strongest modern sorcerer. Infinity turns the space between Gojo and his opponent into an impossible distance.' },
  { id:'sukuna', name:'Ryomen Sukuna', role:'King of Curses', technique:'Shrine · Malevolent Shrine', image:'/assets/sukuna.webp', color:'red', note:'A calamity from another age. Sukuna treats jujutsu as an art of ruthless precision.' },
  { id:'yuji', name:'Yuji Itadori', role:'The Vessel', technique:'Divergent Fist · Black Flash', image:'/assets/itadori.webp', color:'orange', note:'A body built for extraordinary physical ability, carrying a history that keeps rewriting the rules.' },
  { id:'megumi', name:'Megumi Fushiguro', role:'Ten Shadows Heir', technique:'Ten Shadows Technique', image:'/assets/megumi.webp', color:'violet', note:'A technique with enormous tactical range, expressed through shikigami and the medium of shadow.' },
  { id:'nobara', name:'Nobara Kugisaki', role:'Straw Doll Sorcerer', technique:'Resonance · Hairpin', image:'/assets/nobara.webp', color:'pink', note:'A precise, punishing technique that makes a distant connection feel dangerously close.' },
  { id:'geto', name:'Suguru Geto', role:'Curse User', technique:'Cursed Spirit Manipulation', image:'/assets/geto.webp', color:'gold', note:'A sorcerer whose ideology became as dangerous as the spirits he commanded.' },
  { id:'toji', name:'Toji Fushiguro', role:'Sorcerer Killer', technique:'Heavenly Restriction', image:'/assets/toji.webp', color:'steel', note:'A complete absence of cursed energy traded for a body operating beyond ordinary limits.' },
  { id:'nanami', name:'Kento Nanami', role:'Grade 1 Sorcerer', technique:'Ratio Technique', image:'/assets/nanami.webp', color:'sand', note:'A disciplined professional who finds a weak point and makes the arithmetic hurt.' },
];

const domains = [
  { id:'void', name:'Unlimited Void', owner:'Satoru Gojo', kanji:'無量空処', image:'/assets/gojo_domain.webp', type:'Barrier · Sure-hit', detail:'The target is flooded with boundless information. Perception continues, but the ability to act collapses.', accent:'#c7d9e8' },
  { id:'shrine', name:'Malevolent Shrine', owner:'Ryomen Sukuna', kanji:'伏魔御廚子', image:'/assets/sukuna_domain.webp', type:'Open barrier · Sure-hit', detail:'A domain without a closed shell. Its range becomes a relentless execution ground for Cleave and Dismantle.', accent:'#e95b49' },
  { id:'garden', name:'Chimera Shadow Garden', owner:'Megumi Fushiguro', kanji:'嵌合暗翳庭', image:'/assets/megumi_domain.webp', type:'Incomplete · Shadow medium', detail:'An unfinished territory that turns shadow into space, multiplying the possibilities of the Ten Shadows Technique.', accent:'#a7a0d7' },
  { id:'perfection', name:'Self-Embodiment of Perfection', owner:'Mahito', kanji:'自閉円頓裹', image:'/assets/mahito.webp', type:'Barrier · Soul contact', detail:'The domain removes the need for ordinary physical contact. The soul itself becomes the point of contact.', accent:'#a7c9c0' },
];

const incidents = [
  { no:'01', date:'2006', title:'Hidden Inventory', tag:'THE FRACTURE', body:'Two students are assigned to protect the Star Plasma Vessel. A mission becomes the origin of a rupture that will shape the modern jujutsu world.' },
  { no:'02', date:'OCT 31', title:'Shibuya Incident', tag:'THE COLLAPSE', body:'A curtain falls over Shibuya. The plan is designed around one objective: seal Satoru Gojo and turn the city into a battlefield.' },
  { no:'03', date:'NOV 1', title:'The Aftermath', tag:'THE VACUUM', body:'With the strongest removed from the board, old rules fracture. The consequences spread far beyond the station.' },
];

function Icon({name}) {
  const paths = {
    arrow:<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    plus:<><path d="M12 5v14"/><path d="M5 12h14"/></>,
    close:<><path d="m18 6-12 12"/><path d="m6 6 12 12"/></>,
    external:<><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v7h-7"/><path d="M3 10v11h11"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function App() {
  const [active, setActive] = useState('void');
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  const currentDomain = useMemo(() => domains.find(d => d.id === active) || domains[0], [active]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); reveal.unobserve(entry.target); }
    }), { threshold:.12 });
    document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));
    return () => { window.removeEventListener('scroll', onScroll); reveal.disconnect(); };
  }, []);

  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <div className="site-shell">
    <div className="scroll-meter" style={{transform:'scaleX('+scroll+')'}} />
    <header className="topbar">
      <a className="wordmark" href="#top" onClick={closeMenu}><span className="mark-kanji">呪</span><span>CURSED<br/><i>ARCHIVE / 01</i></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><span/><span/></button>
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
        <a href="#system" onClick={closeMenu}>01 / SYSTEM</a>
        <a href="#cast" onClick={closeMenu}>02 / PERSONNEL</a>
        <a href="#domains" onClick={closeMenu}>03 / DOMAINS</a>
        <a href="#incident-log" onClick={closeMenu}>04 / INCIDENTS</a>
        <a className="nav-cta" href="#domain-lab" onClick={closeMenu}>ENTER DOMAIN LAB <Icon name="arrow"/></a>
      </nav>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-backdrop"><img src="/assets/shibuya.webp" alt="Shibuya at night, archive cover artwork"/><div className="hero-wash"/></div>
        <div className="hero-topline"><span>JAPAN / TOKYO</span><span>FIELD DOCUMENT 001—2026</span><span>CLASSIFICATION: RESTRICTED</span></div>
        <div className="hero-layout">
          <div className="hero-index"><span>呪術廻戦</span><b>JUJUTSU KAISEN</b><i>UNOFFICIAL FIELD ARCHIVE</i></div>
          <div className="hero-title-wrap">
            <p className="eyebrow"><span className="eyebrow-dot"/> A STUDY OF CURSED ENERGY & HUMAN NATURE</p>
            <h1>CURSED<br/><em>ARCHIVE</em><sup>®</sup></h1>
            <div className="hero-bottom">
              <p className="hero-description">An archive of the people, techniques and catastrophes shaping the modern age of jujutsu.</p>
              <a className="round-link" href="#system" aria-label="Explore the archive"><Icon name="arrow"/></a>
            </div>
          </div>
          <div className="hero-side-note"><span>SCROLL TO INVESTIGATE</span><b>01 / 05</b></div>
        </div>
        <div className="hero-stamp"><span>東京</span><b>JUJUTSU<br/>HIGH</b><i>FIELD<br/>RECORD</i></div>
        <div className="hero-bottomline"><span>ENERGY IS NEVER WITHOUT A COST.</span><span>EST. IN THE HEIAN ERA · REOPENED 2026</span></div>
      </section>

      <div className="ticker" aria-label="Archive categories"><div className="ticker-track"><span>CURSED ENERGY</span><b>✳</b><span>INNATE TECHNIQUES</span><b>✳</b><span>BINDING VOWS</span><b>✳</b><span>DOMAIN EXPANSION</span><b>✳</b><span>CURSED ENERGY</span><b>✳</b><span>INNATE TECHNIQUES</span><b>✳</b><span>BINDING VOWS</span><b>✳</b><span>DOMAIN EXPANSION</span><b>✳</b></div></div>

      <section className="section system-section" id="system">
        <div className="section-rail"><span>01</span><i/> CORE MECHANICS</div>
        <div className="section-content">
          <div className="section-heading" data-reveal><p className="eyebrow">THE RULES BENEATH THE RUINS</p><h2>POWER HAS<br/><em>A PRICE.</em></h2></div>
          <div className="system-grid">
            <div className="system-lead" data-reveal><span className="big-index">01—04</span><p>Jujutsu is not a simple hierarchy of stronger attacks. It is a system of conditions, trade-offs and interpretation. The rules are part of the weapon.</p><a href="#domain-lab" className="text-link">EXAMINE THE DOMAIN SYSTEM <Icon name="arrow"/></a></div>
            <div className="rule-stack">
              <article className="rule-row" data-reveal><span>01</span><div><h3>Cursed energy</h3><p>Negative emotion made tangible. The raw fuel behind jujutsu.</p></div><b>CE / 001</b></article>
              <article className="rule-row" data-reveal><span>02</span><div><h3>Innate technique</h3><p>An individual ability engraved into the sorcerer's body.</p></div><b>IT / 002</b></article>
              <article className="rule-row" data-reveal><span>03</span><div><h3>Binding vow</h3><p>A restriction that creates leverage through a chosen cost.</p></div><b>BV / 003</b></article>
              <article className="rule-row" data-reveal><span>04</span><div><h3>Domain expansion</h3><p>A technique given territory, rules and a guaranteed-hit condition.</p></div><b>DE / 004</b></article>
            </div>
          </div>
        </div>
      </section>

      <section className="cast-section" id="cast">
        <div className="cast-heading">
          <div className="section-rail light"><span>02</span><i/> PERSONNEL FILES</div>
          <div className="cast-title" data-reveal><p className="eyebrow">THE PEOPLE WHO MOVE THE ERA</p><h2>THE HUMAN<br/><em>FACTOR.</em></h2><p className="cast-intro">Power is personal. Every technique carries the shape of its owner.</p></div>
          <div className="cast-counter"><b>08</b><span>REGISTERED<br/>SUBJECTS</span></div>
        </div>
        <div className="character-grid">
          {characters.map((person,i) => <button key={person.id} className={'character-card tone-'+person.color} onClick={() => setSelected(person)} data-reveal>
            <span className="character-number">SUBJECT / {String(i+1).padStart(2,'0')}</span>
            <span className="character-halo"/>
            <img src={person.image} alt={person.name} loading="lazy"/>
            <span className="character-info"><i>{person.role}</i><b>{person.name}</b><small>{person.technique}</small></span>
            <span className="character-open"><Icon name="plus"/></span>
          </button>)}
        </div>
        <div className="cast-foot"><span>ARCHIVE STATUS: ACTIVE</span><span>SELECT A SUBJECT TO OPEN THEIR FILE <Icon name="arrow"/></span></div>
      </section>

      <section className="domains-section" id="domains">
        <div className="section-rail light"><span>03</span><i/> TERRITORIAL TECHNIQUES</div>
        <div className="domains-head" data-reveal><div><p className="eyebrow">THE ULTIMATE EXPRESSION</p><h2>EXPAND YOUR<br/><em>WORLD.</em></h2></div><p>A Domain Expansion turns a technique into a space with its own logic. These are not backdrops. They are declarations of control.</p></div>
        <div className="domain-grid">
          {domains.map((domain,i) => <button key={domain.id} className="domain-tile" onClick={() => {setActive(domain.id);document.getElementById('domain-lab').scrollIntoView({behavior:'smooth'});}} data-reveal>
            <img src={domain.image} alt="" loading="lazy"/><span className="domain-shade"/><span className="domain-tile-no">DOMAIN / 0{i+1}</span><span className="domain-kanji">{domain.kanji}</span><span className="domain-tile-copy"><i>{domain.owner}</i><b>{domain.name}</b><small>OPEN IN DOMAIN LAB <Icon name="arrow"/></small></span>
          </button>)}
        </div>
      </section>

      <section className="incident-section" id="incident-log">
        <div className="section-rail"><span>04</span><i/> INCIDENT ARCHIVE</div>
        <div className="incident-layout">
          <div className="incident-intro" data-reveal><p className="eyebrow">CHRONOLOGY / TOKYO</p><h2>THE NIGHT<br/>THE WORLD<br/><em>SHIFTED.</em></h2><p>Some events do not end when the fighting stops. They become the conditions of everything that follows.</p><span className="incident-file">FILE REF. TK-1031 / SEALED</span></div>
          <div className="timeline">
            {incidents.map(item => <article className="timeline-item" key={item.no} data-reveal><span className="timeline-no">{item.no}</span><div className="timeline-body"><div className="timeline-meta"><span>{item.date}</span><b>{item.tag}</b></div><h3>{item.title}</h3><p>{item.body}</p></div><span className="timeline-mark">↗</span></article>)}
          </div>
        </div>
        <div className="incident-image"><img src="/assets/shibuya.webp" alt="Shibuya incident visual record" loading="lazy"/><div><span>INCIDENT / 1031</span><b>SHIBUYA<br/>AFTER DARK.</b><i>THE CITY BECAME A BARRIER.</i></div></div>
      </section>

      <section className="lab-section" id="domain-lab">
        <div className="section-rail light"><span>05</span><i/> INTERACTIVE CHAMBER</div>
        <div className="lab-heading" data-reveal><p className="eyebrow">A DOMAIN IS A WORLD WITH TERMS</p><h2>CHOOSE YOUR<br/><em>TERRITORY.</em></h2><p>Change the domain. Study its rules. The sure-hit effect is the signature, not the decoration.</p></div>
        <div className="lab-interface">
          <div className="lab-selector">
            <span className="lab-label">SELECT A DOMAIN</span>
            {domains.map((domain,i)=><button key={domain.id} onClick={()=>setActive(domain.id)} className={active===domain.id?'domain-select active':'domain-select'}><span>0{i+1}</span><b>{domain.name}</b><i>{active===domain.id?'ACTIVE':'SELECT'}</i></button>)}
            <div className="lab-disclaimer">SIMULATED ARCHIVE INTERFACE<br/>NOT AN OFFICIAL JJK PRODUCT</div>
          </div>
          <div className="lab-display" style={{'--domain-accent':currentDomain.accent}}>
            <img key={currentDomain.id} src={currentDomain.image} alt={currentDomain.name}/>
            <div className="lab-display-overlay"/>
            <span className="lab-coordinate">TOKYO / JUJUTSU HIGH / 35°40′N</span>
            <span className="lab-kanji">{currentDomain.kanji}</span>
            <div className="lab-domain-copy"><span>{currentDomain.owner}</span><h3>{currentDomain.name}</h3><p>{currentDomain.detail}</p><b>{currentDomain.type}</b></div>
            <div className="lab-crosshair">✳</div>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="footer-top"><a className="wordmark footer-mark" href="#top"><span className="mark-kanji">呪</span><span>CURSED<br/><i>ARCHIVE / 01</i></span></a><p>AN UNOFFICIAL FIELD ARCHIVE.<br/>BUILT FOR THE CURIOUS, NOT THE COMFORTABLE.</p><a className="back-top" href="#top">BACK TO TOP ↑</a></div>
      <div className="footer-bottom"><span>© 2026 CURSED ARCHIVE / FAN PROJECT</span><span>JUJUTSU KAISEN © GEGE AKUTAMI / SHUEISHA</span><span>DESIGNED AS A FIELD DOCUMENT</span></div>
    </footer>

    {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)} role="presentation"><div className="subject-modal" role="dialog" aria-modal="true" aria-label={selected.name+' file'} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close"><Icon name="close"/></button><div className={'modal-art tone-'+selected.color}><img src={selected.image} alt={selected.name}/><span>SUBJECT FILE / {selected.id.toUpperCase()}</span></div><div className="modal-copy"><p className="eyebrow">PERSONNEL RECORD / ACTIVE</p><h2>{selected.name}</h2><i>{selected.role}</i><h3>{selected.technique}</h3><p>{selected.note}</p><span className="modal-stamp">FIELD<br/>ARCHIVE</span></div></div></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
