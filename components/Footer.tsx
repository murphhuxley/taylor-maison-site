export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__block">
          <span className="footer__wordmark">Taylor Maison</span>
          <p className="footer__note">
            Brand direction, custom websites, and practical AI workflows.
          </p>
        </div>

        <div className="footer__block footer__block--right">
          <a href="mailto:hello@taylor.maison" className="footer__link">
            hello@taylor.maison
          </a>
          <div className="footer__links">
            <a href="https://x.com/tMAIS0N" target="_blank" rel="noopener noreferrer" className="footer__link">
              X
            </a>
            <a
              href="https://linkedin.com/in/taylor-florio-07a65036/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              LinkedIn
            </a>
            <a href="#top" className="footer__link">
              Back to top
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copyright">
          &copy; {new Date().getFullYear()} Taylor Maison.
        </span>
      </div>
    </footer>
  )
}
