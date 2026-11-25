import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, defineScene} from '../sceneTime';
import {pop} from '../anim';
import {C, FONT_JUDUL} from '../theme';

const Content: React.FC = () => {
  const {t} = useT();
  const k = pop(t, 0.4);
  return (
    <AbsoluteFill style={{background: C.accent}}>
      <div style={{position: 'absolute', left: 200, top: 400, color: C.white, fontFamily: FONT_JUDUL, fontWeight: 900, fontSize: 96, transform: `scale(${k})`}}>
        CONTOH SCENE 2
      </div>
    </AbsoluteFill>
  );
};

export const Scene2 = defineScene(1, Content);
