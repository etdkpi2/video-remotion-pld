// CONTOH pola scene. Ganti seluruh isi file scene dengan visual gaya yang dipilih.
// Aturan: semua momen animasi dalam detik sejak kata pertama scene (t), tanpa Math.random dan tanpa animasi CSS.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, defineScene} from '../sceneTime';
import {pop, ramp} from '../anim';
import {C, FONT_JUDUL} from '../theme';

const Content: React.FC = () => {
  const {t} = useT();
  const k = pop(t, 0.3);
  const o = ramp(t, 0.2, 0.6);
  return (
    <AbsoluteFill style={{background: `linear-gradient(${C.bg}, ${C.bg2})`}}>
      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 380,
          padding: '24px 56px',
          background: C.accent,
          color: C.white,
          fontFamily: FONT_JUDUL,
          fontWeight: 900,
          fontSize: 96,
          transform: `scale(${0.6 + 0.4 * k}) rotate(-3deg)`,
          opacity: o,
        }}
      >
        CONTOH SCENE 1
      </div>
    </AbsoluteFill>
  );
};

export const Scene1 = defineScene(0, Content);
