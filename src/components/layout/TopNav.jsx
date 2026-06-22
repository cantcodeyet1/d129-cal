export default function TopNav() {
  return (
    <header className="topnav">
      <div className="topnav-inner">
        <img src={`${process.env.PUBLIC_URL}/tm-logo-workmark.png`} alt="Toastmasters District 129" className="topnav-wordmark" />
        <div className="topnav-divider" />
        <div className="topnav-brand topnav-brand-desktop">
          <span className="topnav-district-name">District 129</span>
          <span className="topnav-theme">Elevate Together: One Voice, Many Nations</span>
        </div>
      </div>
    </header>
  );
}
