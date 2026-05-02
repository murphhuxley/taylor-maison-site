export default function WordmarkPreview() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text-primary)',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 3.5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(2.5rem, 4vw, 4rem)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--line)',
          paddingBottom: '1.2rem',
          fontSize: '0.78rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        <span>Wordmark · live preview</span>
        <span>Cabinet Grotesk vs Helvetica Neue</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 4vw, 4rem)',
        }}
      >
        {/* LEFT — Cabinet Grotesk */}
        <section
          style={{
            background: 'var(--bg-strong)',
            border: '1px solid var(--line)',
            padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            minHeight: '520px',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Cabinet Grotesk · 800
          </span>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: "'Cabinet Grotesk', 'Helvetica Neue', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.01em',
              }}
            >
              TAYLOR
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: "'Cabinet Grotesk', 'Helvetica Neue', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.01em',
              }}
            >
              MAISON
            </span>
          </div>
        </section>

        {/* RIGHT — Helvetica Neue */}
        <section
          style={{
            background: 'var(--bg-strong)',
            border: '1px solid var(--line)',
            padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            minHeight: '520px',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Helvetica Neue · Bold
          </span>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.015em',
              }}
            >
              TAYLOR
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.015em',
              }}
            >
              MAISON
            </span>
          </div>
        </section>
      </div>
    </main>
  )
}
