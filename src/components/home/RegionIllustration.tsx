/**
 * Stylised, NOT-TO-SCALE illustration of the two states served.
 * It is intentionally abstract: it does not mark real coordinates, offices
 * or branches. The base marker simply represents "based in Rajasthan".
 */
export function RegionIllustration({ rajasthan, gujarat, base }: { rajasthan: string; gujarat: string; base: string }) {
  // Pseudo-random but deterministic dot fields for each region.
  const rajDots = [
    [210, 70], [262, 98], [318, 86], [366, 124], [236, 140], [296, 150], [350, 182], [196, 196],
    [258, 214], [324, 232], [382, 236], [230, 268], [292, 284], [354, 292], [270, 330], [318, 352],
  ];
  const gujDots = [
    [104, 352], [150, 334], [196, 362], [126, 398], [176, 410], [222, 404], [92, 436], [150, 456], [204, 452], [244, 440],
  ];
  const hub = [276, 300];

  return (
    <figure className="relative">
      <svg viewBox="0 0 460 500" className="h-auto w-full" role="img" aria-label={`${rajasthan} · ${gujarat}`}>
        <defs>
          <pattern id="dotgrid" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="var(--line)" />
          </pattern>
        </defs>
        <rect width="460" height="500" fill="url(#dotgrid)" opacity="0.7" />

        {/* Rajasthan — abstract silhouette */}
        <path
          d="M186 40 C240 22 300 30 344 52 C392 76 424 118 420 170 C416 214 432 252 410 290 C390 326 352 344 334 378 C314 412 270 404 250 372 C232 344 196 330 176 298 C156 266 168 232 160 198 C150 156 146 112 160 82 C166 66 174 48 186 40 Z"
          fill="var(--paper-2)"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeDasharray="4 5"
        />
        {/* Gujarat — abstract silhouette */}
        <path
          d="M70 330 C104 312 150 312 186 326 C214 338 238 350 256 372 C270 392 262 420 246 440 C226 466 192 478 156 474 C120 470 98 452 74 444 C48 436 34 410 44 384 C50 362 54 340 70 330 Z"
          fill="var(--paper-3)"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeDasharray="4 5"
        />

        {/* Reach lines from base */}
        {[...rajDots.filter((_, i) => i % 3 === 0), ...gujDots.filter((_, i) => i % 3 === 0)].map(([x, y], i) => (
          <path
            key={`l${i}`}
            d={`M${hub[0]} ${hub[1]} Q ${(hub[0] + x) / 2} ${Math.min(hub[1], y) - 30} ${x} ${y}`}
            fill="none"
            stroke="var(--accent-soft)"
            strokeWidth="1"
            className="region-line"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}

        {rajDots.map(([x, y], i) => (
          <circle key={`r${i}`} cx={x} cy={y} r="3" fill="var(--accent)" opacity="0.55" />
        ))}
        {gujDots.map(([x, y], i) => (
          <circle key={`g${i}`} cx={x} cy={y} r="3" fill="var(--accent)" opacity="0.55" />
        ))}

        {/* Base marker */}
        <g>
          <circle cx={hub[0]} cy={hub[1]} r="18" fill="var(--accent)" opacity="0.15" className="region-pulse" />
          <circle cx={hub[0]} cy={hub[1]} r="7" fill="var(--accent)" />
          <circle cx={hub[0]} cy={hub[1]} r="2.5" fill="var(--paper)" />
        </g>

        <text x="436" y="30" textAnchor="end" className="fill-ink font-display" fontSize="30">
          {rajasthan}
        </text>
        <text x="20" y="306" className="fill-ink font-display" fontSize="26">
          {gujarat}
        </text>
        <text x={hub[0] + 16} y={hub[1] + 30} className="fill-accent font-body" fontSize="13" fontWeight="700" letterSpacing="1.5">
          {base.toUpperCase()}
        </text>
      </svg>
    </figure>
  );
}
