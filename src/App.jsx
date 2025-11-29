import { useEffect, useRef, useState } from 'react'
import './App.css'

const tickerMessages = [
  { icon: '📟', text: 'Santa hotline blinking — pager code 1995.', tag: 'Elf Desk' },
  { icon: '💽', text: 'VHS rewind alert: Snow Day marathon queued.', tag: 'Channel 25' },
  { icon: '🧊', text: 'CRT frost mode toggled. Glitter storm incoming.', tag: 'Weather Net' },
  { icon: '🎶', text: 'Boom box battle: drop your cheesiest .wav.', tag: 'Mixtape' },
  { icon: '🧝‍♂️', text: 'Elf LAN party online. Trade cursors, earn stickers.', tag: 'LAN 95' },
  { icon: '🕹️', text: 'Arcade high score: 999,999 candy canes.', tag: 'Game Zone' }
]

const vibeShots = [
  {
    title: 'Mall Santa Glam',
    note: 'Glitter GIF borders + boombox sleigh bells.',
    tag: 'Bedazzle'
  },
  {
    title: 'Netscape North Pole',
    note: 'Candy-cane bevels and starry underline loops.',
    tag: 'Browser Wars'
  },
  {
    title: 'Snow Day Stickers',
    note: 'Pixel stockings, animated icicles, 640x480 pride.',
    tag: 'Desktop Ready'
  },
  {
    title: 'Channel 25 Cheer',
    note: 'TV guide crawls, sweepstakes, VHS promos.',
    tag: 'Retro Copy'
  }
]

const schedule = [
  { time: 'Dec 5', detail: 'Kickoff + sweater runway' },
  { time: 'Dec 12-16', detail: 'Build sprint — glitter everything' },
  { time: 'Dec 22', detail: 'Submissions freeze' },
  { time: 'Dec 23', detail: 'Live demo + VHS voting' }
]

const prizeTracks = [
  {
    name: 'Yule Log Overload',
    blurb: 'Most gloriously over-the-top visuals.'
  },
  {
    name: 'Elf Engineer',
    blurb: 'Smartest 90s tech throwback.'
  },
  {
    name: 'Retro Rizz',
    blurb: 'Pure mall-rat charm and pop-up delight.'
  },
  {
    name: 'Frostbite Finish',
    blurb: 'Tackiness with polish and speed.'
  }
]

const santaStops = [
  {
    city: 'New York City',
    time: '11:00 PM EST',
    detail: 'Sleigh circles Radio City — Rockettes in sync.'
  },
  {
    city: 'Chicago',
    time: '11:45 PM CST',
    detail: 'Hot cocoa stop near State Street windows.'
  },
  {
    city: 'Denver',
    time: '12:20 AM MST',
    detail: 'Tube TV reruns while reindeer refuel.'
  },
  {
    city: 'Anchorage',
    time: '12:50 AM AKST',
    detail: 'Aurora unlocked for a frosty Polaroid.'
  }
]

const toyAds = [
  {
    name: 'Jingle Jam Boombox',
    price: '$19.95',
    img: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=640&q=80',
    pitch: 'Blast cassette carols and watch the equalizer dance.',
    store: 'Snow Mall Music Hut',
    bonus: 'Includes glow-in-the-dark batteries.'
  },
  {
    name: 'Reindeer Talkies',
    price: '$14.99',
    img: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=640&q=80',
    pitch: 'Crystal-clear backyard comms with candy antennas.',
    store: 'Holiday Super K',
    bonus: 'Sticker sheet + “Call Santa” hotline card.'
  },
  {
    name: 'Pixel Pet Caroler',
    price: '$24.50',
    img: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=640&q=80',
    pitch: '8-bit jingles you can clip to your denim backpack.',
    store: 'North Pole Outlet',
    bonus: 'Batteries and glitter lanyard included.'
  }
]

const pixelNotes = [
  {
    title: 'Aurora CRT Snowstorm',
    detail: 'Screensaver gradients with blinking pixel stars.',
    badge: 'Parallax 01'
  },
  {
    title: 'Arcade Tree Farm',
    detail: 'Chunky pines wobble like joystick sprites.',
    badge: 'Parallax 02'
  },
  {
    title: 'Snowman LAN Party',
    detail: '8-bit buddies trading floppy disks and cocoa.',
    badge: 'Parallax 03'
  }
]

const popupAds = [
  {
    title: 'Dial-Up Turbo Sleigh Locator',
    reference: 'NORAD + 1-800-SANTA hotline',
    copy: 'Press *67 to reserve a turbo reindeer. Free jingles cassette while you buffer.',
    extra: 'Buffering elves: 56kbps'
  },
  {
    title: 'Home Alone Security Suite',
    reference: 'Kevin-approved booby traps',
    copy: 'Download paint can blueprints + jingle alarms.',
    extra: 'Recommended browser: Netscape 3.0'
  },
  {
    title: 'Buddy the Elf Cookie Pop-Up',
    reference: 'North Pole sugar rush',
    copy: 'Enable toaster notifications for syrup cookies + free “sing loud” .wav.',
    extra: 'Certified Y2-OK'
  }
]

const floatingProps = [
  {
    alt: 'Home Alone ornament',
    src: 'https://images.unsplash.com/photo-1608889175130-8dcf9c7e7f1e?auto=format&fit=crop&w=320&q=80',
    size: 120
  },
  {
    alt: 'Elf floppy disk',
    src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=320&q=80',
    size: 110
  },
  {
    alt: 'Vintage Christmas game box',
    src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=320&q=80',
    size: 130
  },
  {
    alt: 'Tinsel-wrapped controller',
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=320&q=80',
    size: 115
  }
]

const ecardStickers = ['🎄', '🎁', '🧦', '❄️', '🕹️']

function App() {
  const [chatMessages, setChatMessages] = useState([])
  const [chatName, setChatName] = useState('Elf Hotline Hero')
  const [chatInput, setChatInput] = useState('')
  const [chatStatus, setChatStatus] = useState('Connecting sleigh bells...')
  const chatBoxRef = useRef(null)
  const [ecardMessage, setEcardMessage] = useState('Merry pixels and neon cheer!')
  const [ecardSignature, setEcardSignature] = useState('- The Retro Crew')
  const [ecardSticker, setEcardSticker] = useState(ecardStickers[0])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/.netlify/functions/chat')
      if (!res.ok) throw new Error('Network')
      const data = await res.json()
      setChatMessages(data.messages || [])
      setChatStatus('Live via Netlify Functions')
    } catch (error) {
      setChatStatus('Offline — jingles paused')
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [chatMessages])

  const shuffleSticker = () => {
    const index = Math.floor(Math.random() * ecardStickers.length)
    setEcardSticker(ecardStickers[index])
  }

  const ecardPreview = `${ecardSticker} ${ecardMessage} ${ecardSticker}\n${ecardSignature}`

  const sendMessage = async (event) => {
    event.preventDefault()
    if (!chatInput.trim()) return

    const body = {
      name: chatName.trim() || 'Mystery Elf',
      message: chatInput.trim()
    }

    setChatStatus('Sending sparkle...')
    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error('Send failed')
      setChatInput('')
      fetchMessages()
      setChatStatus('Message delivered!')
    } catch (error) {
      setChatStatus('Delivery failed — try again?')
    }
  }

  return (
    <div className="page">
      <div className="scanline" />
      <div className="light-rope" aria-hidden />
      <div className="snow-overlay" aria-hidden />
      <div className="floating-props" aria-hidden>
        {floatingProps.map((prop, index) => (
          <img
            key={prop.alt}
            className={`floating-props__item floating-props__item--${index}`}
            src={prop.src}
            alt={prop.alt}
            style={{ width: prop.size, height: prop.size }}
            loading="lazy"
          />
        ))}
      </div>
      <div className="ticker" role="banner" aria-label="Holiday news ticker">
        <div className="ticker__label">1995 Live</div>
        <div className="ticker__inner">
          {[...tickerMessages, ...tickerMessages].map((item, index) => (
            <div key={`${item.text}-${index}`} className="ticker__item">
              <span className="ticker__icon" aria-hidden>{item.icon}</span>
              <span className="ticker__text">{item.text}</span>
              <span className="ticker__tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>

      <header className="hero">
        <div className="hero__glow" />
        <div className="hero__content">
          <p className="eyebrow">Broadcasting from the North Pole ISP</p>
          <h1>1995 Tacky Christmas Cyber Plaza</h1>
          <p className="lede">All signal, no filler — pure neon Christmas chaos.</p>
          <div className="hero__chips">
            <span className="chip">Candy-cane cursor lab</span>
            <span className="chip">CRT snow filter</span>
            <span className="chip">Blink tag dance floor</span>
          </div>
          <div className="cta-row">
            <a className="btn btn-primary" href="#prizes">See Prize Tracks</a>
            <a className="btn btn-ghost" href="#schedule">Add the dates</a>
          </div>
          <div className="hero__meta">
            <div className="meta-card">
              <span className="meta-label">Theme</span>
              <span className="meta-value">1990s American Christmas Special</span>
            </div>
            <div className="meta-card">
              <span className="meta-label">Judging</span>
              <span className="meta-value">Creativity · Execution · Chaos</span>
            </div>
            <div className="meta-card">
              <span className="meta-label">Bring</span>
              <span className="meta-value">Retro polish, peppermint pop</span>
            </div>
          </div>
        </div>
        <div className="hero__window">
            <div className="window__title">Holiday Console v95.exe</div>
          <div className="window__body">
            <p className="terminal">&gt; booting sleigh... ✔</p>
            <p className="terminal">&gt; loading glitter GIFs... ✔</p>
            <p className="terminal">&gt; syncing elf pager... ✔</p>
            <p className="terminal highlight">&gt; ready to tack!</p>
          </div>
          <div className="window__footer">
            <span>Press START to deploy joy</span>
            <a className="btn btn-start" href="#santa-tracker">Start the sleigh tracker</a>
          </div>
        </div>
      </header>

      <section className="section pixel-yard" id="pixel-yard">
        <div className="section__header">
          <h2>Pixel Snowglobe Plaza</h2>
          <p className="section__sub">Pixel trees, LAN snowmen, auroras that wobble like CRT glass.</p>
        </div>

        <div className="pixel-yard__scene" aria-hidden>
          <div className="pixel-layer pixel-layer--stars" />
          <div className="pixel-layer pixel-layer--aurora" />
          <div className="pixel-layer pixel-layer--mountains" />
          <div className="pixel-layer pixel-layer--trees">
            <div className="pixel-tree tree--left" />
            <div className="pixel-tree tree--center" />
            <div className="pixel-tree tree--right" />
          </div>
          <div className="pixel-layer pixel-layer--snowmen">
            <div className="pixel-snowman snowman--left" />
            <div className="pixel-snowman snowman--right" />
          </div>
          <div className="pixel-layer pixel-layer--foreground">
            <div className="pixel-path" />
            <div className="pixel-hud">
              <div className="hud__chip">CRT SNOW MODE</div>
              <div className="hud__badge">Parallax: ON</div>
              <div className="hud__badge">Snow depth: 16-bit</div>
            </div>
          </div>
        </div>

        <div className="pixel-yard__callouts grid">
          {pixelNotes.map((note) => (
            <article key={note.title} className="card pixel-card">
              <div className="tag">{note.badge}</div>
              <h3>{note.title}</h3>
              <p>{note.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section vibes" id="vibes">
        <div className="section__header">
          <h2>Make It Tacky &amp; Proud</h2>
          <p className="section__sub">Loud pixels only. Christmas morning in 1995 on repeat.</p>
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
              <li><span>🎄</span>Living-room TV guide vibes.</li>
              <li><span>🧊</span>Frosty hover states and playful cursors.</li>
              <li><span>💾</span>Hide a Konami-style easter egg.</li>
              <li><span>📟</span>One loud download pop-up.</li>
              <li><span>🎁</span>Show one MAXX Potential value.</li>
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
          <p className="section__sub">Mark these with a Santa-sticker calendar.</p>
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

      <section className="section santa" id="santa-tracker">
        <div className="section__header">
          <h2>Watch Santa Fly Around the World</h2>
          <p className="section__sub">Flashy stripes, VHS static, and a Santa cam that never sleeps.</p>
        </div>

        <div className="santa__layout">
          <div className="santa__viewer">
            <div className="viewer__frame">
              <iframe
                src="https://www.youtube.com/embed/-pRYW0d9ibw?autoplay=0&mute=1"
                title="Santa tracker livestream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="viewer__badge">Live-ish • Christmas Eve Control</div>
            </div>
            <p className="viewer__caption">Hit play to watch Santa glide across the globe — hotline lights flicker when he moves.</p>
            <div className="tracker-actions">
              <a className="btn btn-primary" href="https://www.noradsanta.org/en/" target="_blank" rel="noreferrer">
                Launch NORAD Tracker
              </a>
              <a
                className="btn btn-ghost"
                href="https://www.youtube.com/results?search_query=santa+live+tracker"
                target="_blank"
                rel="noreferrer"
              >
                See Live Cameras
              </a>
            </div>
          </div>

          <div className="santa__details">
            <div className="card santa__card">
              <div className="tag">Realtime Sleigh Board</div>
              <ul className="santa__list">
                {santaStops.map((stop) => (
                  <li key={stop.city}>
                    <div className="santa__time">{stop.time}</div>
                    <div>
                      <p className="santa__city">{stop.city}</p>
                      <p className="santa__note">{stop.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card santa__card secondary">
              <div className="tag">Elf Hotline</div>
              <p className="santa__note">
                Green lights = moving. Pink lights = cookie break. Gold lights = selfie moment.
              </p>
              <div className="tracker-actions">
                <a className="btn btn-primary" href="#schedule">Sync your time zones</a>
                <a className="btn btn-ghost" href="#contact">Ask the Elf Desk</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section prizes" id="prizes">
        <div className="section__header">
          <h2>Prize Tracks</h2>
          <p className="section__sub">Four fast tracks to Santa&apos;s leaderboard.</p>
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

      <section className="section mall" id="mall">
        <div className="section__header">
          <h2>Turbo Tinsel Toy Mall</h2>
          <p className="section__sub">Peak 90s mall energy: loud colors, louder deals.</p>
        </div>
        <div className="mall__grid">
          {toyAds.map((toy) => (
            <article key={toy.name} className="mall__card">
              <div className="mall__image-frame">
                <img src={toy.img} alt={toy.name} />
                <div className="mall__price-tag">{toy.price}</div>
              </div>
              <div className="mall__content">
                <div className="mall__eyebrow">{toy.store}</div>
                <h3>{toy.name}</h3>
                <p className="mall__pitch">{toy.pitch}</p>
                <p className="mall__bonus">{toy.bonus}</p>
                <button className="btn btn-primary btn-start">Add to neon cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section ecard" id="ecard">
        <div className="section__header">
          <h2>Pixel Christmas E-Card Maker</h2>
          <p className="section__sub">Spin up a tacky card, sign it, and beam it to your team.</p>
        </div>
        <div className="ecard__layout">
          <div className="ecard__form card">
            <div className="tag">Maker Lab</div>
            <label className="ecard__label">
              Message
              <input value={ecardMessage} onChange={(e) => setEcardMessage(e.target.value)} maxLength={80} />
            </label>
            <label className="ecard__label">
              Signature
              <input value={ecardSignature} onChange={(e) => setEcardSignature(e.target.value)} maxLength={40} />
            </label>
            <div className="ecard__stickers">
              {ecardStickers.map((sticker) => (
                <button
                  key={sticker}
                  type="button"
                  className={`sticker ${sticker === ecardSticker ? 'is-active' : ''}`}
                  onClick={() => setEcardSticker(sticker)}
                >
                  {sticker}
                </button>
              ))}
              <button type="button" className="btn btn-ghost" onClick={shuffleSticker}>
                Shuffle
              </button>
            </div>
          </div>
          <div className="ecard__preview card">
            <div className="ecard__preview-header">
              <span className="tag">Shareware Preview</span>
              <span className="ecard__hint">Pixel edges: ON</span>
            </div>
            <div className="ecard__screen">
              {ecardPreview.split('\n').map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="ecard__footer">Right-click to save or screenshot for your squad.</p>
          </div>
        </div>
      </section>

      <section className="section popups" id="popup-ads">
        <div className="section__header">
          <h2>Chaotic 90s Christmas Pop-Ups</h2>
          <p className="section__sub">Neon borders, blinking headers, Christmas movie nods.</p>
        </div>
        <div className="popup-grid">
          {popupAds.map((ad) => (
            <div key={ad.title} className="popup-card">
              <div className="popup-card__chrome">
                <span className="popup-dot" />
                <span className="popup-dot" />
                <span className="popup-dot" />
                <p className="popup-card__ref">{ad.reference}</p>
              </div>
              <h3>{ad.title}</h3>
              <p className="popup-card__copy">{ad.copy}</p>
              <div className="popup-card__actions">
                <button className="btn btn-primary">Click loudly</button>
                <button className="btn btn-ghost">Pretend to close</button>
              </div>
              <div className="popup-card__ticker">{ad.extra}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section chat" id="chat">
        <div className="section__header">
          <h2>Live Elf Chatroom</h2>
          <p className="section__sub">Powered by Netlify Functions and relentless holiday optimism.</p>
        </div>
        <div className="chat__layout">
          <div className="chat__panel">
            <div className="chat__status">{chatStatus}</div>
            <div className="chat__window" ref={chatBoxRef}>
              {chatMessages.length === 0 ? (
                <p className="chat__empty">Booting the hotline... drop the first message!</p>
              ) : (
                chatMessages.map((entry) => (
                  <div key={entry.id} className="chat__bubble">
                    <div className="chat__meta">
                      <span className="chat__name">{entry.name}</span>
                      <span className="chat__time">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p>{entry.message}</p>
                  </div>
                ))
              )}
            </div>

            <form className="chat__form" onSubmit={sendMessage}>
            <div className="chat__row">
              <label className="chat__label">
                Handle
                  <input value={chatName} onChange={(e) => setChatName(e.target.value)} placeholder="Elf codename" />
                </label>
                <label className="chat__label">
                  Message
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your festive update"
                  />
                </label>
              </div>
              <div className="chat__actions">
                <p className="chat__hint">Updates every 3.5s — perfect for gif swaps and quick debugging.</p>
                <button type="submit" className="btn btn-primary">
                  Drop message
                </button>
              </div>
            </form>
          </div>

          <aside className="chat__aside card">
            <div className="tag">Netlify Function Flow</div>
            <ul className="chat__list">
              <li>
                <strong>POST</strong> to <code>/.netlify/functions/chat</code> with your handle + note.
              </li>
              <li>
                Messages live in-memory on the function — lightweight, quick, and delightfully ephemeral.
              </li>
              <li>
                Frontend polls on a 90s style interval so you always see the latest sleigh-side banter.
              </li>
            </ul>
            <p className="chat__cta">Ship to Netlify and this room lights up instantly for your crew.</p>
          </aside>
        </div>
      </section>

      <section className="cta">
        <div className="cta__content">
          <div>
            <p className="eyebrow">Ready Santa One</p>
            <h2>Boot your tackathon build</h2>
            <p>Pair up, sketch wild pixels, and ship sparkle.</p>
          </div>
          <div className="cta__actions">
            <a className="btn btn-primary" href="#vibes">Brainstorm Prompts</a>
            <a className="btn btn-ghost" href="#contact">Ping the elves</a>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="section__header">
          <h2>Elf Support Desk</h2>
          <p className="section__sub">No dead ends here: choose a path and an elf will answer with bells on.</p>
        </div>
        <div className="contact__grid">
          <div className="card contact__card">
            <div className="tag">Email</div>
            <p className="contact__note">Send a note with your team name and which nostalgic Christmas gag you&apos;re coding.</p>
            <a className="btn btn-primary" href="mailto:elves@maxxpotential.com?subject=Tackathon%20Help">Email the elves</a>
          </div>
          <div className="card contact__card">
            <div className="tag">Calendar</div>
            <p className="contact__note">Book 15 minutes for design feedback or code pairing — Santa hats welcome.</p>
            <a
              className="btn btn-ghost"
              href="https://calendly.com/"
              target="_blank"
              rel="noreferrer"
            >
              Reserve office hours
            </a>
          </div>
          <div className="card contact__card">
            <div className="tag">Chat</div>
            <p className="contact__note">Jump into the #tinsel-tech channel for quick answers, GIF trades, and mixtape swaps.</p>
            <a
              className="btn btn-primary"
              href="https://discord.com/channels/@me"
              target="_blank"
              rel="noreferrer"
            >
              Open the chat room
            </a>
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
