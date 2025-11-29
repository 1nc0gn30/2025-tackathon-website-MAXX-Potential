import { useCallback, useMemo, useState, useEffect } from 'react'
import './App.css'

const stations = [
  {
    id: 'vhs',
    title: 'VHS Vault TV Guide',
    sprite: '📼',
    flavor: 'Static, horizontal hold issues, and a stack of taped specials.',
    trivia:
      'Which network kicked off the "25 Days of Christmas" marathon in the late 90s?',
    answers: ['abc family', 'fox family', 'freeform'],
    reward: 'Unlocked: Snow Day Broadcast overlay',
    clue: 'The block later rebranded to Freeform.',
    zone: 'North Alley'
  },
  {
    id: 'home-alone',
    title: 'Home Alone Security Desk',
    sprite: '🧤',
    flavor: 'Wet Bandits detected. Macaulay-style booby traps required.',
    trivia: 'What did Kevin swing down the staircase to knock out the burglars?',
    answers: ['paint can', 'paint cans'],
    reward: 'Unlocked: Pop-up booby trap alerts',
    clue: 'It left a major stain and a bigger bruise.',
    zone: 'Lobby'
  },
  {
    id: 'turbo',
    title: 'Turbo Man Toy Kiosk',
    sprite: '🤖',
    flavor: 'Blinking red LEDs and a recorded Arnold one-liner on loop.',
    trivia: 'Name the 1996 holiday movie toy everyone fought for.',
    answers: ['turbo man', 'jingle all the way'],
    reward: 'Unlocked: Turbo glitter boost',
    clue: '"It\'s turbo time!"',
    zone: 'Food Court'
  },
  {
    id: 'tamagotchi',
    title: 'Elf LAN Pet Lab',
    sprite: '🐣',
    flavor: 'Translucent shells, three buttons, and endless beeping.',
    trivia: 'Which virtual pet had kids feeding pixels in 1997?',
    answers: ['tamagotchi'],
    reward: 'Unlocked: Digital snow pet companion',
    clue: 'Came with a keychain and a tiny reset button.',
    zone: 'Arcade'
  },
  {
    id: 'nick-arcade',
    title: 'Nick Arcade Hotline',
    sprite: '📞',
    flavor: 'Rotary phones calling in for slime updates and bonus rounds.',
    trivia: 'Which green goop made winning contestants famous (and messy)?',
    answers: ['slime', 'nickelodeon slime'],
    reward: 'Unlocked: Slime-proof snow boots',
    clue: 'You better duck when the studio audience chants.',
    zone: 'Atrium'
  },
  {
    id: 'arcade-lan',
    title: 'Frosty LAN Party',
    sprite: '🕹️',
    flavor: 'Ethernet cables strung like garland over CRT monitors.',
    trivia: 'Name the classic snowboarding game kids linked up on PlayStation.',
    answers: ['ssx', 'ssx tricky'],
    reward: 'Unlocked: Split-screen peppermint trail',
    clue: 'The announcer yelled “Tricky!” every time you nailed a combo.',
    zone: 'Cyber Deck'
  },
  {
    id: 'y2k',
    title: 'Y2K Countdown Bunker',
    sprite: '⌛',
    flavor: 'Candle-lit basement with printed internet guides and floppy disks.',
    trivia: 'What two-digit fix panicked everyone at midnight 1999?',
    answers: ['y2k', 'millennium bug'],
    reward: 'Unlocked: Millennium-safe sleigh firmware',
    clue: 'Bank clocks and airport boards were supposedly doomed.',
    zone: 'Sublevel'
  },
  {
    id: 'cd-burner',
    title: 'CD Burner Booth',
    sprite: '💿',
    flavor: 'Stacks of blank discs waiting for the ultimate holiday mixtape.',
    trivia: 'Which file-sharing program spread those jingle jams across dial-up?',
    answers: ['napster'],
    reward: 'Unlocked: Lime-green waveform lights',
    clue: 'Its mascot was a cat with headphones.',
    zone: 'Food Court'
  }
]

const cheatSheet = [
  {
    header: 'Mixtape Memories',
    body: 'Mariah dominated 1994, Hanson chimed in 1997 — add both to your boom box and the elves dance faster.'
  },
  {
    header: 'Mall Rat Wisdom',
    body: 'Spencer Gifts stocked fiber-optic trees and lava lamps; pair them to earn a bonus sparkle meter in the scene.'
  },
  {
    header: 'TV Guide Tips',
    body: 'Circle your specials with neon highlighter: Frosty, Rudolph claymation, and the infamous grandma reindeer incident.'
  },
  {
    header: 'Mall Santa Intel',
    body: 'Say “MACY ELF OVERRIDE” at the trivia kiosk to get a reroll on your clue (whispers from a 1998 mall Santa pager).'
  },
  {
    header: 'Arcade Insider',
    body: 'Input ↑ ↑ ↓ ↓ ← → ← → B A when the snow falls to light up the Nick Arcade hotline sprite for 30 seconds.'
  }
]

const christmasApis = [
  {
    name: 'iTunes Search API',
    url: 'https://itunes.apple.com/search?term=christmas+1990s&media=movie',
    description:
      'No key needed; query 1990s Christmas movies and TV specials by keyword, media type, and country to surface nostalgia recs.'
  },
  {
    name: 'TVMaze Search',
    url: 'https://api.tvmaze.com/search/shows?q=christmas',
    description:
      'Open API that lists episodes and shows — filter titles with airdate 1990-1999 in your app to build a retro viewing guide.'
  },
  {
    name: 'Open Library Covers',
    url: 'https://covers.openlibrary.org/b/isbn/0385325770-M.jpg',
    description:
      'Serve free cover art for 90s holiday storybooks without auth (swap ISBNs). Great for decorating kiosks or trivia cards.'
  },
  {
    name: 'Open Meteo Snow Forecast',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.00&hourly=snowfall',
    description:
      'Free weather feed (no signup) to overlay “incoming flurries” text on the plaza when snowfall > 0 around the user city.'
  }
]

const videoOptions = [
  {
    id: 'home-alone-cartoon',
    title: 'Home Alone Animated (1997)',
    description: 'Pilot clips and commercials stitched together — classic 90s cable vibes.',
    embedUrl: 'https://www.youtube.com/embed/6K3V-4Pz0ps'
  },
  {
    id: 'muppets',
    title: 'Muppet Family Christmas (retro TV rip)',
    description: 'Full broadcast with vintage ads to keep the CRT glow authentic.',
    embedUrl: 'https://www.youtube.com/embed/oeo-4Wm0d0M'
  },
  {
    id: 'nicktoons',
    title: 'Nicktoons 1996 Christmas Block',
    description: 'A mash-up of Hey Arnold, Rugrats, and Rocko holiday segments.',
    embedUrl: 'https://www.youtube.com/embed/6V6-hwxKF1Q'
  },
  {
    id: 'peewee',
    title: "Pee-wee's Playhouse Christmas Special",
    description: 'So many guest stars — the set design is peak tacky perfection.',
    embedUrl: 'https://www.youtube.com/embed/1M3x6K36Wkc'
  },
  {
    id: 'garfield',
    title: 'Garfield Christmas (90s TV quality)',
    description: 'Striped sweater comfort with VHS fuzz for extra nostalgia.',
    embedUrl: 'https://www.youtube.com/embed/jg2Y8b-kNOg'
  }
]

const ecardTemplates = [
  {
    id: 'laser-grid',
    name: 'Laser Grid Snow',
    accent: '#ff3a8a',
    background:
      'linear-gradient(135deg, rgba(255, 58, 138, 0.18), rgba(0, 255, 200, 0.22)), repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 8px, transparent 8px 16px)',
    border: '3px double rgba(255, 232, 115, 0.8)'
  },
  {
    id: 'gingham',
    name: 'Gingham Gift Wrap',
    accent: '#ffe873',
    background:
      'repeating-linear-gradient(0deg, rgba(255, 232, 115, 0.3) 0 10px, rgba(0,0,0,0.18) 10px 20px), repeating-linear-gradient(90deg, rgba(255, 71, 87, 0.18) 0 10px, transparent 10px 20px)',
    border: '3px solid rgba(158, 255, 232, 0.9)'
  },
  {
    id: 'frosted',
    name: 'Frosted CRT Glow',
    accent: '#9effe8',
    background: 'radial-gradient(circle at 30% 30%, rgba(158,255,232,0.24), rgba(10,16,28,0.9))',
    border: '3px dashed rgba(255, 47, 210, 0.8)'
  }
]

const TRACKER_API = 'https://api.noradsanta.org/track'
const TRACKER_FALLBACK = {
  city: 'Workshop Airspace (cached)',
  lat: '90.000',
  lon: '135.000',
  speed: 'warp-sleigh',
  eta: 'Loaded after CORS snowstorm'
}

const defaultProfile = {
  alias: '',
  bio: '',
  favoriteGift: '',
  flair: '🎄'
}

const parseSantaPayload = (payload) => {
  if (!payload || typeof payload !== 'object') return null
  const lat =
    payload.lat ?? payload.latitude ?? payload.coords?.lat ?? payload.position?.lat ?? payload.location?.lat ?? null
  const lon =
    payload.lon ??
    payload.lng ??
    payload.longitude ??
    payload.coords?.lng ??
    payload.coords?.lon ??
    payload.position?.lng ??
    payload.position?.lon ??
    payload.location?.lon ??
    null
  const city =
    payload.city ??
    payload.location ??
    payload.region ??
    payload.place ??
    payload.nearest_city ??
    payload.country ??
    payload.next_stop ??
    null
  const speed = payload.speed ?? payload.velocity ?? payload.kph ?? payload.mph ?? payload.speed_kph ?? null
  const eta = payload.eta ?? payload.countdown ?? payload.next_stop_eta ?? payload.next_stop_countdown ?? null
  return { lat, lon, city, speed, eta, raw: payload }
}

function App() {
  const [activeId, setActiveId] = useState(stations[0].id)
  const [answerInput, setAnswerInput] = useState('')
  const [unlocks, setUnlocks] = useState({})
  const [systemMessage, setSystemMessage] = useState(
    'Choose a station, drop a 90s Christmas fact, and light the plaza.'
  )
  const [trackerState, setTrackerState] = useState('loading')
  const [santaSnapshot, setSantaSnapshot] = useState(null)
  const [lastTrackerUpdate, setLastTrackerUpdate] = useState(null)
  const [trackerError, setTrackerError] = useState('')
  const [wishlistName, setWishlistName] = useState('')
  const [wishlistGift, setWishlistGift] = useState('')
  const [wishOutput, setWishOutput] = useState(null)
  const [secretChallenge, setSecretChallenge] = useState('Hunt for CRT snowglobes hidden behind neon tiles.')
  const [selectedVideoId, setSelectedVideoId] = useState(videoOptions[0].id)
  const [ecardTemplateId, setEcardTemplateId] = useState(ecardTemplates[0].id)
  const [ecardMessage, setEcardMessage] = useState('Meet me at the plaza food court for neon cocoa!')
  const [ecardTo, setEcardTo] = useState('Snow Friend')
  const [ecardFrom, setEcardFrom] = useState('Mall Rat 97')
  const [profile, setProfile] = useState(() => {
    if (typeof window === 'undefined') return defaultProfile
    const stored = window.localStorage.getItem('crt-profile')
    try {
      return stored ? { ...defaultProfile, ...JSON.parse(stored) } : defaultProfile
    } catch (error) {
      return defaultProfile
    }
  })

  const activeStation = useMemo(
    () => stations.find((station) => station.id === activeId) || stations[0],
    [activeId]
  )

  const progress = useMemo(() => Math.round((Object.keys(unlocks).length / stations.length) * 100), [unlocks])

  const refreshSanta = useCallback(async () => {
    setTrackerState((prev) => (prev === 'ready' ? 'refreshing' : 'loading'))
    setTrackerError('')
    try {
      const response = await fetch(TRACKER_API, { headers: { accept: 'application/json' } })
      if (!response.ok) throw new Error('Bad response')
      const payload = await response.json().catch(() => null)
      const parsed = parseSantaPayload(payload)
      if (!parsed) throw new Error('No location data')
      setSantaSnapshot(parsed)
      setLastTrackerUpdate(new Date())
      setTrackerState('ready')
    } catch (error) {
      setTrackerState('error')
      setSantaSnapshot((prev) => prev ?? TRACKER_FALLBACK)
      setTrackerError(
        'Live radar is blocked by the browser (CORS snowstorm). Showing cached sleigh vibes until the feed thaws.'
      )
    }
  }, [])

  useEffect(() => {
    refreshSanta()
    const id = setInterval(refreshSanta, 60_000)
    return () => clearInterval(id)
  }, [refreshSanta])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('crt-profile', JSON.stringify(profile))
  }, [profile])

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleaned = answerInput.trim().toLowerCase()
    if (!cleaned) {
      setSystemMessage('Type an answer first — the elves refuse blank VHS labels.')
      return
    }

    const isCorrect = activeStation.answers.some((option) => cleaned.includes(option))

    if (isCorrect) {
      setUnlocks((prev) => {
        if (prev[activeStation.id]) return prev
        return {
          ...prev,
          [activeStation.id]: {
            title: activeStation.title,
            reward: activeStation.reward,
            time: new Date().toLocaleTimeString()
          }
        }
      })
      setAnswerInput('')
      setSystemMessage(`Correct! ${activeStation.reward}. New lights flicker in the plaza.`)
    } else {
      setSystemMessage('Close, but the elf DJ buzzed you. Peek at the clue and try again!')
    }
  }

  const handlePrintWish = (event) => {
    event.preventDefault()
    if (!wishlistName.trim() || !wishlistGift.trim()) {
      setWishOutput('Add your name and dream gift to print a ticket!')
      return
    }
    const glitter = ['✨ Neon snow', '🎄 Fiber-optic sparkle', '🌟 CRT glow', '💿 Hologram gleam'][
      Math.floor(Math.random() * 4)
    ]
    const timecode = new Date().toLocaleTimeString()
    setWishOutput(
      `${wishlistName.trim()} requested ${wishlistGift.trim()} • ${glitter} • queued at ${timecode} — tape this to the plaza kiosk!`
    )
  }

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const selectedVideo = videoOptions.find((video) => video.id === selectedVideoId) ?? videoOptions[0]
  const selectedTemplate = ecardTemplates.find((template) => template.id === ecardTemplateId) ?? ecardTemplates[0]

  const generateEcardMarkup = () => {
    return `<!doctype html><html><head><meta charset="utf-8"><title>CRT Plaza E-Card</title><style>
      body { margin:0; font-family:'Press Start 2P', monospace; background:#0a0f1c; color:#fef9f2; display:flex; align-items:center; justify-content:center; }
      .card { width: 640px; min-height: 420px; padding: 32px; box-sizing:border-box; display:grid; gap:16px;
        background: ${selectedTemplate.background}; border:${selectedTemplate.border}; box-shadow:0 18px 60px rgba(0,0,0,0.35), inset 0 0 0 2px rgba(255,255,255,0.08);
      }
      .title { font-size:24px; color:${selectedTemplate.accent}; text-shadow:0 0 12px rgba(255,255,255,0.4); margin:0; }
      .to { font-size:16px; margin:0; }
      .message { font-size:18px; line-height:1.6; margin:0; }
      .from { font-size:16px; margin:0; text-align:right; }
    </style></head><body><div class="card"><p class="title">CRT Plaza Greetings</p><p class="to">To: ${ecardTo}</p><p class="message">${ecardMessage}</p><p class="from">— ${ecardFrom}</p></div></body></html>`
  }

  const handleDownloadEcard = () => {
    const blob = new Blob([generateEcardMarkup()], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'crt-plaza-ecard.html'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handlePrintEcard = () => {
    const popup = window.open('', '_blank', 'width=720,height=900')
    if (!popup) return
    popup.document.write(generateEcardMarkup())
    popup.document.close()
    popup.focus()
    popup.print()
  }

  return (
    <div className="page">
      <div className="bg-tile" aria-hidden />
      <div className="scanline" aria-hidden />
      <header className="hero">
        <div className="hero__text">
          <p className="eyebrow">MAXX Potential presents</p>
          <h1>North Pole 199X CRT Plaza</h1>
          <p className="lede">
            A tacky, over-saturated Christmas world built like a 90s mall kiosk. Beat quick trivia to
            unlock neon upgrades and secret interactions.
          </p>
          <div className="hero__cta">
            <a className="btn btn-primary" href="#scene">
              Enter the main scene
            </a>
            <a className="btn btn-ghost" href="#cheat-codes">
              View cheat sheet
            </a>
          </div>
          <div className="progress">
            <div className="progress__bar" style={{ width: `${progress}%` }} />
            <div className="progress__label">{Object.keys(unlocks).length} / {stations.length} unlocks</div>
          </div>
        </div>
        <div className="hero__panel">
          <div className="panel__title">CRT Status Monitor</div>
          <div className="panel__body">
            <p className="terminal">&gt; scene warmed up • snow swirl ON</p>
            <p className="terminal">&gt; trivia link cables attached</p>
            <p className="terminal">&gt; unlock threshold: {progress}%</p>
            <p className="terminal">&gt; message: {systemMessage}</p>
          </div>
        </div>
      </header>

      <section className="section scene" id="scene">
        <div className="section__header">
          <h2>Interactive Christmas Plaza</h2>
          <p className="section__sub">
            Click a hotspot to step inside, answer the 90s question, and add more tacky decor to the board.
          </p>
        </div>

        <div className="tracker__wrap" id="tracker">
          <div className="tracker__panel">
            <div className="panel__title">Live Santa Radar (NORAD feed)</div>
            <div className="panel__body tracker__body">
              <div className="tracker__status">
                <span className={`badge ${trackerState === 'ready' ? 'badge--good' : 'badge--pulse'}`}>
                  {trackerState === 'ready'
                    ? 'Online'
                    : trackerState === 'refreshing'
                      ? 'Refreshing'
                      : trackerState === 'error'
                        ? 'Offline'
                        : 'Loading'}
                </span>
                <p className="tracker__hint">
                  Live location from a public NORAD Santa endpoint, refreshed every minute. If the API is shy, hop to the
                  official tracker below while we retry.
                </p>
                {trackerError ? <p className="tracker__alert">{trackerError}</p> : null}
              </div>

              <div className="tracker__grid">
                <div>
                  <p className="panel__label">Current location</p>
                  <p className="tracker__value">{santaSnapshot?.city || 'Somewhere between rooftops'}</p>
                  <p className="tracker__meta">Lat: {santaSnapshot?.lat ?? '—'} | Lon: {santaSnapshot?.lon ?? '—'}</p>
                </div>
                <div>
                  <p className="panel__label">Speed + ETA</p>
                  <p className="tracker__value">{santaSnapshot?.speed ? `${santaSnapshot.speed} kph` : 'Warp sleigh'}</p>
                  <p className="tracker__meta">Next stop in: {santaSnapshot?.eta ?? 'clocking presents'}</p>
                </div>
                <div>
                  <p className="panel__label">Last check</p>
                  <p className="tracker__value">{lastTrackerUpdate ? lastTrackerUpdate.toLocaleTimeString() : '—'}</p>
                  <p className="tracker__meta">Data refreshes automatically.</p>
                </div>
              </div>

              <div className="tracker__actions">
                <button type="button" className="btn btn-primary" onClick={refreshSanta}>
                  Manual refresh
                </button>
                <a className="btn btn-ghost" href="https://www.noradsanta.org/en/" target="_blank" rel="noreferrer">
                  Open official NORAD tracker
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="scene__layout">
          <div className="scene__board" role="grid" aria-label="Retro plaza game board">
            {stations.map((station) => {
              const isUnlocked = Boolean(unlocks[station.id])
              const isActive = station.id === activeId
              return (
                <button
                  key={station.id}
                  role="gridcell"
                  className={`tile ${isActive ? 'tile--active' : ''} ${isUnlocked ? 'tile--unlocked' : ''}`}
                  onClick={() => setActiveId(station.id)}
                  aria-pressed={isActive}
                >
                  <span className="tile__sprite" aria-hidden>
                    {station.sprite}
                  </span>
                  <span className="tile__title">{station.title}</span>
                  <span className="tile__zone">{station.zone}</span>
                  <span className="tile__status">{isUnlocked ? 'Unlocked' : 'Locked'}</span>
                </button>
              )
            })}
            <div className="scene__sparkle">✨</div>
          </div>

          <aside className="scene__panel" aria-live="polite">
            <div className="panel__title">{activeStation.title}</div>
            <p className="panel__lede">{activeStation.flavor}</p>
            <div className="panel__card">
              <p className="panel__label">Trivia to unlock:</p>
              <p className="panel__question">{activeStation.trivia}</p>
              <p className="panel__hint">Clue: {activeStation.clue}</p>
              <form className="panel__form" onSubmit={handleSubmit}>
                <label className="panel__label" htmlFor="answer">
                  Type your answer
                </label>
                <input
                  id="answer"
                  value={answerInput}
                  onChange={(event) => setAnswerInput(event.target.value)}
                  placeholder="Type like a 1997 chat room"
                />
                <div className="panel__actions">
                  <button type="submit" className="btn btn-primary">
                    Submit answer
                  </button>
                  <span className="panel__small">Correct answers add stickers to the plaza.</span>
                </div>
              </form>
            </div>
            <div className="panel__status">{systemMessage}</div>
          </aside>
        </div>
      </section>

      <section className="section api" id="api-ideas">
        <div className="section__header">
          <h2>Free Christmas Data Streams</h2>
          <p className="section__sub">
            Drop-in APIs with no signup to sprinkle live nostalgia data onto your plaza — perfect for 1990s movie trivia or
            snow warnings.
          </p>
        </div>
        <div className="api__grid">
          {christmasApis.map((api) => (
            <article key={api.name} className="api__card">
              <h3>{api.name}</h3>
              <p>{api.description}</p>
              <a className="btn btn-ghost" href={api.url} target="_blank" rel="noreferrer">
                Try sample endpoint
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section video" id="video-lounge">
        <div className="section__header">
          <h2>1990s Christmas Video Lounge</h2>
          <p className="section__sub">Pick a VHS-worthy YouTube embed and let it loop while you tackle plaza trivia.</p>
        </div>
        <div className="video__layout">
          <div className="video__picker">
            {videoOptions.map((video) => (
              <button
                key={video.id}
                className={`video__option ${selectedVideoId === video.id ? 'video__option--active' : ''}`}
                onClick={() => setSelectedVideoId(video.id)}
              >
                <div>
                  <p className="video__title">{video.title}</p>
                  <p className="video__desc">{video.description}</p>
                </div>
                <span aria-hidden>▶</span>
              </button>
            ))}
          </div>
          <div className="video__player" aria-label={`Now playing ${selectedVideo.title}`}>
            <div className="video__frame">
              <iframe
                title={selectedVideo.title}
                src={`${selectedVideo.embedUrl}?rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="panel__hint">YouTube embeds are public rips — queue one as lobby music while unlocking tiles.</p>
          </div>
        </div>
      </section>

      <section className="section ecard" id="ecard-lab">
        <div className="section__header">
          <h2>E-Card Designer Lab</h2>
          <p className="section__sub">Spin up tacky printable greetings and download them as a mini HTML you can save or print.</p>
        </div>
        <div className="ecard__grid">
          <div className="ecard__form">
            <label className="panel__label" htmlFor="ecard-template">
              Template
            </label>
            <select
              id="ecard-template"
              value={ecardTemplateId}
              onChange={(event) => setEcardTemplateId(event.target.value)}
            >
              {ecardTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <label className="panel__label" htmlFor="ecard-to">
              To
            </label>
            <input id="ecard-to" value={ecardTo} onChange={(event) => setEcardTo(event.target.value)} />
            <label className="panel__label" htmlFor="ecard-message">
              Message
            </label>
            <textarea
              id="ecard-message"
              value={ecardMessage}
              onChange={(event) => setEcardMessage(event.target.value)}
              rows={4}
            />
            <label className="panel__label" htmlFor="ecard-from">
              From
            </label>
            <input id="ecard-from" value={ecardFrom} onChange={(event) => setEcardFrom(event.target.value)} />
            <div className="panel__actions">
              <button type="button" className="btn btn-primary" onClick={handleDownloadEcard}>
                Download HTML
              </button>
              <button type="button" className="btn btn-ghost" onClick={handlePrintEcard}>
                Open print view
              </button>
            </div>
            <p className="panel__hint">Your card stays local — the download is a self-contained HTML you can reopen or print.</p>
          </div>
          <div className="ecard__preview" aria-label="E-card preview">
            <div
              className="ecard__canvas"
              style={{
                background: selectedTemplate.background,
                border: selectedTemplate.border
              }}
            >
              <p className="ecard__title" style={{ color: selectedTemplate.accent }}>
                CRT Plaza Greetings
              </p>
              <p className="ecard__to">To: {ecardTo}</p>
              <p className="ecard__message">{ecardMessage}</p>
              <p className="ecard__from">— {ecardFrom}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section unlocks" id="unlocks">
        <div className="section__header">
          <h2>Unlocked Effects</h2>
          <p className="section__sub">Every correct answer flips a switch. Track your upgrades below.</p>
        </div>
        <div className="unlock__grid">
          {stations.map((station) => {
            const reward = unlocks[station.id]
            return (
              <div key={station.id} className={`unlock__card ${reward ? 'unlock__card--on' : ''}`}>
                <div className="unlock__header">
                  <span className="badge">{reward ? 'ON' : 'OFF'}</span>
                  <h3>{station.title}</h3>
                </div>
                <p className="unlock__note">{station.reward}</p>
                <p className="unlock__time">{reward ? `Unlocked at ${reward.time}` : 'Answer the trivia to activate.'}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section utilities" id="santa-tools">
        <div className="section__header">
          <h2>Santa Tools & Retro Utilities</h2>
          <p className="section__sub">Print a plaza wish-slip, spin up a secret challenge, and keep the sleigh in sight.</p>
        </div>
        <div className="utilities__grid">
          <div className="utility__card profile__card">
            <div className="panel__title">Create Your Plaza Profile</div>
            <div className="panel__body utility__body">
              <p className="panel__hint">
                Saved in your browser sleigh-bag (localStorage). Clearing cache yeets it into the snow — JavaScript on,
                Adobe Flash installed (jk lol), and you&apos;re golden.
              </p>
              <label className="panel__label" htmlFor="profile-name">
                Plaza alias
              </label>
              <input
                id="profile-name"
                value={profile.alias}
                onChange={(event) => handleProfileChange('alias', event.target.value)}
                placeholder="e.g., CRTCommander"
              />
              <label className="panel__label" htmlFor="profile-bio">
                Holiday flex
              </label>
              <input
                id="profile-bio"
                value={profile.bio}
                onChange={(event) => handleProfileChange('bio', event.target.value)}
                placeholder="90s snack, favorite mall memory, etc."
              />
              <label className="panel__label" htmlFor="profile-gift">
                Dream haul
              </label>
              <input
                id="profile-gift"
                value={profile.favoriteGift}
                onChange={(event) => handleProfileChange('favoriteGift', event.target.value)}
                placeholder="e.g., translucent Game Boy + snow globe"
              />
              <label className="panel__label" htmlFor="profile-flair">
                Flair emoji
              </label>
              <input
                id="profile-flair"
                value={profile.flair}
                onChange={(event) => handleProfileChange('flair', event.target.value || '🎄')}
                maxLength={4}
              />
              <div className="profile__preview">
                <div className="profile__avatar" aria-hidden>
                  {profile.flair || '🎄'}
                </div>
                <div>
                  <p className="profile__title">{profile.alias || 'Anonymous Mall Elf'}</p>
                  <p className="profile__meta">{profile.bio || 'Type a line to light up your badge.'}</p>
                  <p className="profile__gift">Wishlist: {profile.favoriteGift || 'TBD (wrap it in neon)'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="utility__card">
            <div className="panel__title">Wish-Slip Printer</div>
            <form className="panel__body utility__body" onSubmit={handlePrintWish}>
              <label className="panel__label" htmlFor="wish-name">
                Your 90s alias
              </label>
              <input
                id="wish-name"
                value={wishlistName}
                onChange={(event) => setWishlistName(event.target.value)}
                placeholder="e.g., MallRat97"
              />
              <label className="panel__label" htmlFor="wish-gift">
                Gift you want stamped
              </label>
              <input
                id="wish-gift"
                value={wishlistGift}
                onChange={(event) => setWishlistGift(event.target.value)}
                placeholder="e.g., SNES + neon sled"
              />
              <button type="submit" className="btn btn-primary">Print slip</button>
              <p className="utility__output">{wishOutput || 'Submit to get a printable neon ticket.'}</p>
            </form>
          </div>

          <div className="utility__card">
            <div className="panel__title">Mystery Challenge Deck</div>
            <div className="panel__body utility__body">
              <p className="panel__label">Tonight's dare</p>
              <p className="utility__challenge">{secretChallenge}</p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  setSecretChallenge(
                    [
                      'Drop a Mariah whistle note in the plaza chat to spawn glitter.',
                      'Find the Tamagotchi hotspot and leave it idle — does the snow pet nap?',
                      'Trigger all four unlocks before 11:59 to summon candy-cane scanlines.',
                      'Switch on Turbo Man, then refresh the Santa radar to watch the sleigh race him.'
                    ][Math.floor(Math.random() * 4)]
                  )
                }
              >
                Deal a new challenge
              </button>
              <p className="panel__hint">Complete it to earn bragging rights on the CRT monitor.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cheats" id="cheat-codes">
        <div className="section__header">
          <h2>1990s Christmas Cheat Codes</h2>
          <p className="section__sub">Drop these facts in the plaza chat to impress the elf moderators.</p>
        </div>
        <div className="cheat__grid">
          {cheatSheet.map((item) => (
            <article key={item.header} className="cheat__card">
              <h3>{item.header}</h3>
              <p>{item.body}</p>
            </article>
          ))}
          <article className="cheat__card bonus">
            <h3>Bonus Quest</h3>
            <p>
              Unlock all four hotspots to reveal snowglobe confetti, a Secret Santa VHS frame, and a candy-cane cursor. The
              plaza resets at midnight like a Tamagotchi nap.
            </p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <p>Built for MAXX Potential — 90s Christmas chaos, simplified and interactive.</p>
      </footer>
    </div>
  )
}

export default App
