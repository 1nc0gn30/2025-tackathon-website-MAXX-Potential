const Hero = ({ progress, unlockCount, totalStations, systemMessage }) => {
  return (
    <header className="hero">
      <div className="hero__text">
        <p className="eyebrow">MAXX Potential presents</p>
        <h1>North Pole 199X CRT Plaza</h1>
        <p className="lede">
          A tacky, over-saturated Christmas world built like a 90s mall kiosk. Beat quick trivia to unlock neon upgrades and
          secret interactions.
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
          <div className="progress__label">{unlockCount} / {totalStations} unlocks</div>
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
  )
}

export default Hero
