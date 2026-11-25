import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, defineScene} from '../sceneTime';
import {pop} from '../anim';
import {C, FONT_JUDUL} from '../theme';

const Content: React.FC = () => {
  const {t} = useT();
  const k = pop(t, 0.4);
  return (
    <AbsoluteFill style={{background: C.cream}}>
      <div style={{position: 'absolute', left: 200, top: 400, color: C.ink, fontFamily: FONT_JUDUL, fontWeight: 900, fontSize: 96, transform: `scale(${k})`}}>
        CONTOH SCENE 3
      </div>
    </AbsoluteFill>
  );
};

export const Scene3 = defineScene(2, Content);
