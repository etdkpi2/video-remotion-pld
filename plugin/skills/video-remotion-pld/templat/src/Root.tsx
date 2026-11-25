import React from 'react';
import {AbsoluteFill, Audio, Composition, staticFile} from 'remotion';
import {ENABLE_VO} from './flags';
import {VO} from './script';
import {FPS, HEIGHT, MAIN_FRAMES, SLOTS, WIDTH} from './timing';
import {Video} from './Video';
import {Overlay} from './components/Overlay';
import {SCENE_COMPONENTS} from './scenes';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Main" component={Video} durationInFrames={MAIN_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    {SLOTS.map((slot, i) => {
      const SceneComp = SCENE_COMPONENTS[i];
      const Preview: React.FC = () => (
        <AbsoluteFill>
          <SceneComp />
          <Overlay offset={slot.position} />
          {ENABLE_VO && <Audio src={staticFile(VO.file)} startFrom={slot.position} />}
        </AbsoluteFill>
      );
      return (
        <Composition
          key={slot.id}
          id={`Scene${slot.id}`}
          component={Preview}
          durationInFrames={slot.length}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      );
    })}
  </>
);
