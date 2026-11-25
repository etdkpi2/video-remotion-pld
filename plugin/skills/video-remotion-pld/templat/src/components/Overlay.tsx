import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {CUES} from '../subtitles';
import {META} from '../script';
import {ENABLE_LOGO, FONT_SUB} from '../theme';
import {clamp01} from '../anim';

const esc = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ISTILAH =
  META.istilahAsing.length > 0
    ? new RegExp(`\\b(${META.istilahAsing.map(esc).join('|')})\\b`, 'gi')
    : null;

/** Pecah teks menjadi bagian tegak dan bagian miring (istilah asing). */
const parts = (text: string): {t: string; it: boolean}[] => {
  if (!ISTILAH) return [{t: text, it: false}];
  const out: {t: string; it: boolean}[] = [];
  let last = 0;
  for (const m of text.matchAll(ISTILAH)) {
    const i = m.index ?? 0;
    if (i > last) out.push({t: text.slice(last, i), it: false});
    out.push({t: m[0], it: true});
    last = i + m[0].length;
  }
  if (last < text.length) out.push({t: text.slice(last), it: false});
  return out;
};

/**
 * Subtitle (putih, garis tepi hitam 3 px, tanpa kotak, satu baris, baseline y=1000) dan logo.
 * offset = frame awal sequence bila dipakai di komposisi per-scene.
 */
export const Overlay: React.FC<{offset?: number}> = ({offset = 0}) => {
  const abs = useCurrentFrame() + offset;
  const cue = CUES.find((c) => abs >= c.from && abs < c.to);
  const fade = cue ? clamp01(Math.min((abs - cue.from) / 5 + 0.3, (cue.to - abs) / 5 + 0.3)) : 0;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {ENABLE_LOGO && (
        <Img
          src={staticFile('Logo_Indomaret.png')}
          style={{position: 'absolute', right: 60, top: 60, width: 223, height: 78, objectFit: 'contain'}}
        />
      )}
      {cue && (
        <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0, opacity: fade}}>
          <defs>
            <filter id="subShadow" x="-10%" y="-50%" width="120%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>
          <text
            x={960}
            y={1000}
            textAnchor="middle"
            fontFamily={FONT_SUB}
            fontWeight={600}
            fontSize={34}
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth={6}
            strokeLinejoin="round"
            paintOrder="stroke fill"
            filter="url(#subShadow)"
          >
            {parts(cue.text).map((p, i) => (
              <tspan key={i} fontStyle={p.it ? 'italic' : 'normal'}>
                {p.t}
              </tspan>
            ))}
          </text>
        </svg>
      )}
    </AbsoluteFill>
  );
};
