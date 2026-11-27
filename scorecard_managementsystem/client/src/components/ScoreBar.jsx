function ScoreBar({ label, percent, color }) {
  return (
    <div className="score-bar">
      <div className="score-bar-header">
        <span>{label}</span>
        <span className="score-bar-value">{percent}%</span>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${percent}%`, backgroundColor: color || '#4f46e5' }}
        />
      </div>
    </div>
  )
}

export default ScoreBar
