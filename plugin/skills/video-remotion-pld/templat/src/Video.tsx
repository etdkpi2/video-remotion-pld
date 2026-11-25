import React from 'react';
import {AbsoluteFill, Audio, Easing, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {SCENES, VO} from './script';
import {ENABLE_MUSIC, ENABLE_OUTRO, ENABLE_SFX, ENABLE_VO, MUSIC_FILE, MUSIC_VOLUME, OUTRO_FILE} from './flags';
import {FPS, OUTRO_FRAMES, SLOTS, TOTAL_FRAMES, TRANS} from './timing';
import {C} from './theme';
import {irisWipe} from './transitions';
import {Overlay} from './components/Overlay';
import {SCENE_COMPONENTS} from './scenes';
import sfx from './data/sfx.json';

const presentationFor = (kind: string) => {
  if (kind === 'iris') return irisWipe(C.accent);
  if (kind === 'push') return slide({direction: 'from-right'});
  return fade();
};

/**
 * Efek suara dari src/data/sfx.json: [{at: detik, file: '12_pop.wav', volume: 0.3, durasi: 0.5}].
 * File ada di public/sfx/. durasi (detik) opsional untuk memotong efek yang panjang.
 */
const Sfx: React.FC = () => (
  <>
    {(sfx as {at: number; file: string; volume?: number; durasi?: number}[]).map((s, i) => (
      <Sequence
        key={i}
        from={Math.max(0, Math.round(s.at * FPS))}
        durationInFrames={s.durasi ? Math.max(1, Math.round(s.durasi * FPS)) : undefined}
      >
        <Audio src={staticFile(`sfx/${s.file}`)} volume={s.volume ?? 0.3} />
      </Sequence>
    ))}
  </>
);

const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: o, backgroundColor: '#000'}}>
      <OffthreadVideo src={staticFile(OUTRO_FILE)} />
    </AbsoluteFill>
  );
};

export const Video: React.FC = () => {
  const kids: React.ReactElement[] = [];
  SLOTS.forEach((slot, i) => {
    const kind = SCENES[i].kind;
    if (i > 0 && kind !== 'cut') {
      kids.push(
        <TransitionSeries.Transition
          key={`t${slot.id}`}
          presentation={presentationFor(kind) as never}
          timing={linearTiming({durationInFrames: TRANS, easing: Easing.inOut(Easing.cubic)})}
        />,
      );
    }
    const SceneComp = SCENE_COMPONENTS[i];
    kids.push(
      <TransitionSeries.Sequence key={`s${slot.id}`} durationInFrames={slot.length}>
        <SceneComp />
      </TransitionSeries.Sequence>,
    );
  });
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <Sequence durationInFrames={TOTAL_FRAMES}>
        <AbsoluteFill>
          <TransitionSeries>{kids}</TransitionSeries>
          <Overlay />
        </AbsoluteFill>
      </Sequence>
      {ENABLE_VO && <Audio src={staticFile(VO.file)} />}
      {ENABLE_MUSIC && <Audio src={staticFile(MUSIC_FILE)} volume={MUSIC_VOLUME} loop />}
      {ENABLE_SFX && <Sfx />}
      {ENABLE_OUTRO && OUTRO_FRAMES > 0 && (
        <Sequence from={TOTAL_FRAMES} durationInFrames={OUTRO_FRAMES}>
          <Outro />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
