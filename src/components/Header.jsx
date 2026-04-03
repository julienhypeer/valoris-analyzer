export default function Header() {
  return (
    <header className="header">
      <div className="header-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      </div>
      <div>
        <h1 className="header-title">Valoris Analyzer</h1>
        <p className="header-subtitle">Transcription audio intelligente</p>
      </div>
      <div className="header-links">
        <a href="https://drive.google.com/drive/folders/1Ea0on8DlWNPVtIHXR4Ja4eilXgNeDDre?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto" target="_blank" rel="noopener noreferrer" className="header-link" title="Google Drive">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          Drive
        </a>
        <a href="https://airtable.com/appF5Y24bRsQ34Ef6" target="_blank" rel="noopener noreferrer" className="header-link" title="Leads Airtable">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          Leads
        </a>
        <a href="https://claude.ai/chat/82dccd51-ddd3-4046-a190-546317b66d75" target="_blank" rel="noopener noreferrer" className="header-link" title="Discours commercial">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Discours
        </a>
      </div>
    </header>
  );
}
