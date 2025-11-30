import { useEffect, useMemo, useState } from 'react'
import './Hero.css'

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

const effectActions = [
  { icon: '🛷', label: 'Santa radar', detail: 'Sleigh spotted over CRT Plaza', id: 'radar' },
  { icon: '🎄', label: 'Tree glow', detail: 'RGB sparkle mode engaged', id: 'tree' },
  { icon: '🍬', label: 'Candy lane boost', detail: 'Peppermint WiFi fully charged', id: 'candy' },
  { icon: '❄️', label: 'Snow machine', detail: 'Turbo swirl engaged', id: 'snow' },
  { icon: '💿', label: 'VHS filter', detail: 'Heavily warped nostalgia', id: 'vhs' }
]

const Hero = ({ progress, unlockCount, totalStations, systemMessage }) => {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [vibeIndex, setVibeIndex] = useState(0)
  const [fortune, setFortune] = useState('Press a glowing button to dial the Santa hotline and pull a tacky fortune.')
  const [effects, setEffects] = useState({ radar: true, tree: false, candy: false, snow: true, vhs: false })

  useEffect(() => {
    const id = setInterval(() => setTickerIndex((prev) => (prev + 1) % tickerLines.length), 3600)
    return () => clearInterval(id)
  }, [])

  const tickerMessage = useMemo(() => tickerLines[tickerIndex], [tickerIndex])
  const vibeMode = useMemo(() => vibeModes[vibeIndex], [vibeIndex])

  const activeEffects = useMemo(() => effectActions.filter((action) => effects[action.id]), [effects])
  const snowflakes = effects.snow ? 34 : 20

  const toggleEffect = (id) => {
    setEffects((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      if (!prev[id]) {
        setVibeIndex((prevIndex) => (prevIndex + 1) % vibeModes.length)
        setFortune('Effect synced — plaza lights match the new vibe mode!')
      }
      return next
    })
  }

  const handleCycleVibe = () => {
    setVibeIndex((prev) => (prev + 1) % vibeModes.length)
  }

  const handlePullFortune = () => {
    const next = fortunes[Math.floor(Math.random() * fortunes.length)]
    setFortune(next)
  }

  return (
    <header
      className={`hero${effects.snow ? ' hero--snowstorm' : ''}${effects.vhs ? ' hero--vhs' : ''}${effects.tree ? ' hero--tree' : ''}${effects.radar ? ' hero--radar' : ''}${effects.candy ? ' hero--candy' : ''}`}
    >
      <div className="hero__ribbon">🎅 Santa certified • Holiday hotline live • Glitter mode steady</div>
      <div className="hero__ornaments" aria-hidden>
        <span>🧦</span>
        <span>🌟</span>
        <span>🍭</span>
      </div>
      <div className="hero__aurora" aria-hidden />
      <div className="hero__halo" aria-hidden />
      <div className="hero__tree-glow" aria-hidden />
      <div className="hero__radar" aria-hidden />
      <div className="hero__candy" aria-hidden />
      <div className="hero__vhs" aria-hidden />
      <div className="hero__snowburst" aria-hidden />
      <div className="hero__garland" aria-hidden>
        {garlandBulbs.map((_, index) => (
          <span key={index} className="garland__bulb" aria-hidden />
        ))}
      </div>
      <div className="hero__snow" aria-hidden>
        {Array.from({ length: snowflakes }).map((_, index) => (
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
          {effectActions.map((moment) => (
            <button
              key={moment.label}
              type="button"
              className="effect-card"
              onClick={() => toggleEffect(moment.id)}
              aria-pressed={effects[moment.id]}
            >
              <span className="effect-card__icon" aria-hidden>
                {moment.icon}
              </span>
              <div>
                <p className="effect-card__label">{moment.label}</p>
                <p className="effect-card__detail">{moment.detail}</p>
              </div>
              <span className="effect-card__pulse" aria-hidden />
            </button>
          ))}
        </div>
        <div className="hero__chips">
          <div className="chip">🧦 Stocking count: +{unlockCount}</div>
          <div className="chip">✨ Active vibes: {activeEffects.length}</div>
        </div>
        <div className="hero__cta">
          <a className="btn btn-primary" href="#scene">
            Enter the main scene
          </a>
          <a className="btn btn-ghost" href="#cheat-codes">
            View cheat sheet
          </a>
          <button className="btn btn-secondary btn-cycle" type="button" onClick={handleCycleVibe}>
            <span>Cycle vibe ➜ {vibeMode}</span>
          </button>
        </div>
        <div className="hero__effect-readout">
          <span aria-hidden>🎛️</span>
          <span>Effect grid synced</span>
          <span className="hero__vibe-tag">{activeEffects.map((action) => action.label).join(' • ') || 'idle'}</span>
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
