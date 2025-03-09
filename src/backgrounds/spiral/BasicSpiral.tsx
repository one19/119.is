import React, { useRef, useEffect, useState } from 'react';
import generateFloatLookup from '../generateFloatLookup';
import ShowCodeButton from '../../ShowCodeButton';

// our magic vite plugin transforms this into the raw code of this file
const fileContents = '@raw';

const SPIRAL_LINES = 2500 as const;
const SPIRAL_SEGMENTS = 300 as const;
const SKEW = -0.3 as const;

// This function takes a position value between 0 (center) and 1 (outermost)
// and returns an opacity value based on the exponential distribution.
const getOpacity = (position: number, randomFloat: number): number => {
  const lambda = 5; // Adjust this parameter to control the rate at which opacity increases.
  // the 0.1 is to make the center of the spiral more empty
  // TODO: normalize position to be independent from spiral segment length
  const opacity = 1 - Math.exp(-lambda * (position - 0.1));

  return randomFloat > opacity ? 0 : 1;
};

const drawSpiral = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  randomFloats: number[],
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (!randomFloats.length) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const drawSpiralSegment = (
    startAngle: number,
    endAngle: number,
    opacity: number,
  ) => {
    ctx.beginPath();
    for (let a = startAngle; a < endAngle; a += 0.01) {
      const r = 2 * a;

      const skewedX = centerX + r * Math.cos(a) - SKEW * r * Math.sin(a);
      const y = centerY + r * Math.sin(a) * 0.7;

      ctx.lineTo(skewedX, y);
    }
    ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
    ctx.stroke();
  };

  const segmentAngle = (0.4 * SPIRAL_LINES) / SPIRAL_SEGMENTS;

  for (let segment = 0; segment < SPIRAL_SEGMENTS; segment++) {
    const position = segment / SPIRAL_SEGMENTS; // Normalize the segment position between 0 and 1
    const opacity = getOpacity(position, randomFloats[segment]);
    drawSpiralSegment(
      segment * segmentAngle,
      (segment + 1) * segmentAngle,
      opacity,
    );
  }
};

const BasicSpiral: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [randomFloats, setRandomFloats] = useState<number[]>([]);

  // lifecycle methods for drawing the spiral on resize
  useEffect(() => {
    const onResize = () => drawSpiral(canvasRef, randomFloats);
    drawSpiral(canvasRef, randomFloats);
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [randomFloats]);

  // lifecycle methods for generating a lookup table
  useEffect(() => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const setFloats = async (): Promise<void> => {
      const floats = await generateFloatLookup(SPIRAL_LINES, dateString);
      setRandomFloats(floats);
    };

    setFloats()
      .then(() => console.log("Generated today's floats"))
      .catch(console.error);
  }, []);

  return (
    <>
      <ShowCodeButton code={fileContents} title="BackgroundSpiral" />
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, right: 0 }} />
    </>
  );
};

export default BasicSpiral;
