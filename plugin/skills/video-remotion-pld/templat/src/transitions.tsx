import React from 'react';
import {AbsoluteFill} from 'remotion';
import type {TransitionPresentation, TransitionPresentationComponentProps} from '@remotion/transitions';

type IrisProps = {color: string};

const Iris: React.FC<TransitionPresentationComponentProps<IrisProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill>{children}</AbsoluteFill>;
  const maxR = Math.hypot(960, 540) + 20;
  const r = presentationProgress * maxR;
  const ring = 56;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: 2 * (r + ring), height: 2 * (r + ring), borderRadius: '50%', background: passedProps.color}} />
      </AbsoluteFill>
      <AbsoluteFill style={{clipPath: `circle(${r}px at 50% 50%)`}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Iris wipe: lingkaran berwarna `color` membuka scene baru dari tengah. */
export const irisWipe = (color: string): TransitionPresentation<IrisProps> => ({
  component: Iris,
  props: {color},
});
