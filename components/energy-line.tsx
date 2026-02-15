"use client"

export function EnergyLine() {
  return (
    <div className="w-full flex justify-center pointer-events-none" aria-hidden="true">
      <svg
        width="2"
        height="200"
        viewBox="0 0 2 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-40"
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="200"
          stroke="url(#energyGradient)"
          strokeWidth="2"
          strokeDasharray="8 8"
          style={{ animation: "dash-flow 2s linear infinite" }}
        />
        <defs>
          <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C0FF00" stopOpacity="0" />
            <stop offset="30%" stopColor="#C0FF00" stopOpacity="1" />
            <stop offset="70%" stopColor="#520097" stopOpacity="1" />
            <stop offset="100%" stopColor="#520097" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
