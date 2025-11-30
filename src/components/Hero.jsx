import { useEffect, useMemo, useState } from 'react'

const tickerLines = [
  '✨ Glitter snow engaged • fiber optics pulsing • mall Santa ETA: soonish',
  '🎄 VHS karaoke night loading • bring your best Mariah Carey cover',
  '🌀 CRT scanlines aligned • phosphor glow at maximum tackiness',
  '🎁 Mystery grab bag hidden near the food court fountain — find the sticker',
  '🔔 Bell choir warming up with 16-bit sleigh bells and SNES reverb'
]

const vibeModes = ['Candy cane rave', 'Mall fountain glow', 'Blizzard of glitter', 'Arcade roof snowstorm']

const fortunes = [
  'Your wishlist gets fast-tracked — Santa hacked the pager.',
  'A neon reindeer will photobomb your next selfie.',
  'Mall pretzel coupons manifest when you shout “HO HO HACK”.',
  'You gain +5 charisma for every string light plugged in tonight.',
  'CRT Plaza disco ball grants one bonus trivia hint — use it wisely.'
]

const garlandBulbs = new Array(18).fill(null)

const santaMoments = [
  { icon: '🛷', label: 'Santa radar', detail: 'Sleigh spotted over CRT Plaza' },
  { icon: '🎄', label: 'Tree glow', detail: 'RGB sparkle mode engaged' },
  { icon: '🍬', label: 'Peppermint WiFi', detail: 'Full bars for elf chat' }
]

const Hero = ({ progress, unlockCount, totalStations, systemMessage }) => {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [vibeIndex, setVibeIndex] = useState(0)
  const [fortune, setFortune] = useState('Press a glowing button to dial the Santa hotline and pull a tacky fortune.')

  useEffect(() => {
    const id = setInterval(() => setTickerIndex((prev) => (prev + 1) % tickerLines.length), 3600)
    return () => clearInterval(id)
  }, [])

  const tickerMessage = useMemo(() => tickerLines[tickerIndex], [tickerIndex])
  const vibeMode = useMemo(() => vibeModes[vibeIndex], [vibeIndex])

  const handleCycleVibe = () => {
    setVibeIndex((prev) => (prev + 1) % vibeModes.length)
  }

  const handlePullFortune = () => {
    const next = fortunes[Math.floor(Math.random() * fortunes.length)]
    setFortune(next)
  }

  return (
    <header className="hero">
      <div className="hero__ribbon">🎅 Santa certified • Holiday hotline live • Glitter mode steady</div>
      <div className="hero__aurora" aria-hidden />
      <div className="hero__halo" aria-hidden />
      <div className="hero__garland" aria-hidden>
        {garlandBulbs.map((_, index) => (
          <span key={index} className="garland__bulb" aria-hidden />
        ))}
      </div>
      <div className="hero__snow" aria-hidden>
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={index} className="snowflake" style={{ animationDelay: `${index * 0.15}s` }} />
        ))}
      </div>
      <div className="hero__text">
        <p className="eyebrow">MAXX Potential presents</p>
        <h1>
          North Pole 199X
          <span className="crt-glow"> CRT Plaza</span>
        </h1>
        <p className="lede">
          A tacky, over-saturated Christmas world built like a 90s mall kiosk. Beat quick trivia to unlock neon upgrades and
          secret interactions.
        </p>
        <div className="hero__meta-grid" aria-label="Santa status and signals">
          {santaMoments.map((moment) => (
            <div key={moment.label} className="meta-card">
              <span className="meta-card__icon" aria-hidden>
                {moment.icon}
              </span>
              <div>
                <p className="meta-card__label">{moment.label}</p>
                <p className="meta-card__detail">{moment.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hero__chips">
          <div className="chip">❄️ Snow machine: turbo swirl</div>
          <div className="chip">💿 VHS filter: heavily warped</div>
          <div className="chip">🧦 Stocking count: +{unlockCount}</div>
        </div>
        <div className="hero__cta">
          <a className="btn btn-primary" href="#scene">
            Enter the main scene
          </a>
          <a className="btn btn-ghost" href="#cheat-codes">
            View cheat sheet
          </a>
          <button className="btn btn-secondary" type="button" onClick={handleCycleVibe}>
            Cycle vibe ➜ {vibeMode}
          </button>
        </div>
        <div className="hero__ticker" role="status" aria-live="polite">
          <div className="ticker__glow" aria-hidden />
          <div className="ticker__content">
            <span className="ticker__label">Mall broadcast</span>
            <div className="ticker__window">
              <div className="ticker__marquee">
                <span className="ticker__message">{tickerMessage}</span>
                <span className="ticker__message ticker__message--ghost">{tickerMessage}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="progress">
          <div className="progress__bar" style={{ width: `${progress}%` }} />
          <div className="progress__label">{unlockCount} / {totalStations} unlocks</div>
        </div>
        <div className="hero__action-grid">
          <div className="action-card">
            <p className="action-card__title">Santa hotline fortune</p>
            <p className="action-card__body">{fortune}</p>
            <div className="hero__controls">
              <button className="btn btn-primary" type="button" onClick={handlePullFortune}>
                Pull tacky fortune
              </button>
            </div>
          </div>
          <div className="action-card action-card--holo">
            <p className="action-card__title">CRT plaza meters</p>
            <div className="meter-row">
              <span className="meter__label">Neon</span>
              <span className="meter__bar">
                <span className="meter__fill" style={{ width: '92%' }} />
              </span>
              <span className="meter__value">92%</span>
            </div>
            <div className="meter-row">
              <span className="meter__label">Snow</span>
              <span className="meter__bar">
                <span className="meter__fill meter__fill--alt" style={{ width: '84%' }} />
              </span>
              <span className="meter__value">84%</span>
            </div>
            <div className="meter-row">
              <span className="meter__label">Glow</span>
              <span className="meter__bar">
                <span className="meter__fill" style={{ width: '100%' }} />
              </span>
              <span className="meter__value">MAX</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__panel">
        <div className="panel__title">CRT Status Monitor</div>
        <div className="panel__body">
          <p className="terminal">&gt; scene warmed up • snow swirl ON</p>
          <p className="terminal">&gt; trivia link cables attached</p>
          <p className="terminal">&gt; unlock threshold: {progress}%</p>
          <p className="terminal">&gt; message: {systemMessage}</p>
          <p className="terminal">&gt; marquee vibe: {vibeMode}</p>
          <p className="terminal">&gt; fortune queue: {fortune}</p>
        </div>
      </div>
      <div className="hero__santa-lane" aria-hidden>
        <div className="sleigh">🦌🦌🦌🛷</div>
        <div className="sleigh sleigh--alt">🎅✨🎄</div>
      </div>
    </header>
  )
}

export default Hero
