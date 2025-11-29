import './App.css'

const vibeShots = [
  {
    title: 'Blinding Bling',
    note: 'Neon gradients, lens flares, and drop shadows straight out of 1995 screensavers.',
    tag: 'Glow Mode'
  },
  {
    title: 'Cyber Caroling',
    note: 'Mash MIDI jingles, clicky buttons, and cheeky tooltips into one joyful noise.',
    tag: 'Audio Optional'
  },
  {
    title: 'Tinsel Tech',
    note: 'CRT-inspired cards, pixel snow, and glitter borders that Santa would double-tap.',
    tag: 'UI Flair'
  },
  {
    title: 'Office Party Lore',
    note: 'Show MAXX Potential spirit: celebrate scrappy ideas, teamwork, and bold experiments.',
    tag: 'Culture'
  }
]

const schedule = [
  { time: 'Jan 3', detail: 'Kickoff call + 90s nostalgia icebreakers' },
  { time: 'Jan 6-10', detail: 'Build sprint — ship something gloriously tacky' },
  { time: 'Jan 13', detail: 'Submissions freeze at midnight sharp (no Y2K excuses)' },
  { time: 'Jan 14', detail: 'Live demo + crowd voting' }
]

const prizeTracks = [
  {
    name: 'Snow Globe Showstopper',
    blurb: 'Most over-the-top visuals — the louder the better.'
  },
  {
    name: 'Elf Engineer',
    blurb: 'Smartest technical trick hiding inside a cozy sweater.'
  },
  {
    name: 'Retro Rizz',
    blurb: 'Pure 90s attitude: sassy copy, playful interactions, and unapologetic charm.'
  },
  {
    name: 'Frostbite Finish',
    blurb: 'Tightest polish across responsiveness, accessibility, and performance.'
  }
]

function App() {
  return (
    <div className="page">
      <div className="scanline" />
      <div className="light-rope" aria-hidden />
      <div className="ticker">
        <div className="ticker__inner">
          <span>MAXX Potential Tackathon · 1990s Christmas Remix · Build Wild · Ship Bold · Impress Santa&apos;s QA ·</span>
          <span>MAXX Potential Tackathon · 1990s Christmas Remix · Build Wild · Ship Bold · Impress Santa&apos;s QA ·</span>
        </div>
      </div>

      <header className="hero">
        <div className="hero__glow" />
        <div className="hero__content">
          <p className="eyebrow">MAXX Potential Presents</p>
          <h1>1995 Tinsel Tech Tackathon</h1>
          <p className="lede">
            Unleash your inner 90s webmaster. Combine MS Paint chaos, early-internet optimism,
            and MAXX Potential wit to craft the most delightfully tacky holiday site on the planet.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#prizes">See Prize Tracks</a>
            <a className="btn btn-ghost" href="#schedule">Add the dates</a>
          </div>
          <div className="hero__meta">
            <div className="meta-card">
              <span className="meta-label">Theme</span>
              <span className="meta-value">1990s Christmas Variety Show</span>
            </div>
            <div className="meta-card">
              <span className="meta-label">Judging</span>
              <span className="meta-value">Creativity · Execution · Tacky Joy</span>
            </div>
            <div className="meta-card">
              <span className="meta-label">Bring</span>
              <span className="meta-value">Retro polish, new-school craft</span>
            </div>
          </div>
        </div>
        <div className="hero__window">
          <div className="window__title">Holiday Console v95.exe</div>
          <div className="window__body">
            <p className="terminal">&gt; booting sleigh... ✔</p>
            <p className="terminal">&gt; loading glitter... ✔</p>
            <p className="terminal">&gt; syncing MAXX spirit... ✔</p>
            <p className="terminal highlight">&gt; ready to tack!</p>
          </div>
          <div className="window__footer">Press START to deploy joy</div>
        </div>
      </header>

      <section className="section vibes" id="vibes">
        <div className="section__header">
          <h2>Make It Tacky &amp; Proud</h2>
          <p className="section__sub">Lean into everything delightfully loud — your only limit is your imagination (and maybe good taste).</p>
        </div>
        <div className="grid vibe-grid">
          {vibeShots.map((vibe) => (
            <article key={vibe.title} className="card vibe-card">
              <div className="tag">{vibe.tag}</div>
              <h3>{vibe.title}</h3>
              <p>{vibe.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section challenges">
        <div className="retro-pane">
          <div className="pane__header">Tinsel Tech Challenge Board</div>
          <div className="pane__body">
            <ul className="list">
              <li><span>🎄</span>Create a home page that feels like a living-room TV guide.</li>
              <li><span>🧊</span>Add frosty hover states and playful cursors.</li>
              <li><span>💾</span>Hide an easter egg (Konami code? hidden link? surprise gif?).</li>
              <li><span>📟</span>Include at least one “download” style button that does something fun.</li>
              <li><span>🎁</span>Show a MAXX Potential value baked into the story.</li>
            </ul>
          </div>
        </div>

        <div className="mix-card">
          <div className="mix-card__header">Snowy Mixtape</div>
          <div className="mix-card__tracks">
            <div className="track">
              <span className="bubble">01</span>
              <div>
                <p className="track__title">Glitter Intro</p>
                <p className="track__note">Add an entrance animation that screams 1995 desktop.</p>
              </div>
            </div>
            <div className="track">
              <span className="bubble">02</span>
              <div>
                <p className="track__title">Snowfall Loop</p>
                <p className="track__note">Animate snow or confetti — subtle or chaotic.</p>
              </div>
            </div>
            <div className="track">
              <span className="bubble">03</span>
              <div>
                <p className="track__title">Dial-Up Outro</p>
                <p className="track__note">End with a CTA that feels like a vintage popup (but nicer).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="schedule">
        <div className="section__header">
          <h2>Retro Roadmap</h2>
          <p className="section__sub">Mark your wall calendar with sparkly stickers — these dates matter.</p>
        </div>
        <div className="timeline">
          {schedule.map((item) => (
            <div key={item.time} className="timeline__item">
              <div className="timeline__dot" />
              <div className="timeline__content">
                <p className="timeline__time">{item.time}</p>
                <p className="timeline__detail">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section prizes" id="prizes">
        <div className="section__header">
          <h2>Prize Tracks</h2>
          <p className="section__sub">Four ways to land on Santa&apos;s leaderboard.</p>
        </div>
        <div className="grid prize-grid">
          {prizeTracks.map((prize) => (
            <div key={prize.name} className="card prize-card">
              <h3>{prize.name}</h3>
              <p>{prize.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta__content">
          <div>
            <p className="eyebrow">Ready Player One</p>
            <h2>Boot your tackathon build</h2>
            <p>Pair with a teammate, sketch wild ideas, and let the pixels fly. The 90s called — they want their sparkle back.</p>
          </div>
          <div className="cta__actions">
            <a className="btn btn-primary" href="#vibes">Brainstorm Prompts</a>
            <a className="btn btn-ghost" href="#">Ping the elves</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__marquee">No boring allowed. Bring the glitter. Build it with heart.</div>
      </footer>
    </div>
  )
}

export default App
