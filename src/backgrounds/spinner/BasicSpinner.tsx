import { useEffect, useState, useRef } from 'react';
import ShowCodeButton from '../../ShowCodeButton';

const fileContents = '@raw';

const SEGMENTS = 1500 as const;
const BAND_WIDTH = 15 as const;

type Segment = {
  radius: number;
  startAngle: number;
  endAngle: number;
  rotationDirection: number; // -1 for counter-clockwise, 1 for clockwise
};

const colors = [
  'rgba(255, 105, 97, 0.3)', // Coral
  'rgba(255, 179, 71, 0.3)', // Tangerine
  'rgba(255, 209, 102, 0.3)', // Golden rod
  'rgba(6, 214, 160, 0.3)', // Turquoise
  'rgba(27, 154, 170, 0.3)', // Teal
  'rgba(61, 90, 128, 0.3)', // Navy Blue
  'rgba(119, 71, 135, 0.3)', // Purple
];

const drawSegments = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  segments: Segment[],
  angle: number
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.globalCompositeOperation = 'lighter'; // Additive blending

  segments.forEach((segment, index) => {
    const color = colors[index % colors.length];

    ctx.strokeStyle = color;
    ctx.lineWidth = BAND_WIDTH;
    ctx.lineCap = 'round';

    ctx.beginPath();

    // Drawing the arc segment
    ctx.arc(
      0,
      0,
      segment.radius,
      segment.startAngle + angle * segment.rotationDirection,
      segment.endAngle + angle * segment.rotationDirection
    );

    ctx.stroke();
  });

  ctx.restore();
};

const getSegments = () => {
  let currentAngle = 0; // Track the current starting angle

  return Array.from({ length: SEGMENTS }, (_) => {
    const band = Math.floor((300 + Math.random() * 1000) / BAND_WIDTH);
    const radius = band * BAND_WIDTH;

    const segmentLength = 0.25 + Math.random() * 0.25; // Random segment length

    const segment = {
      radius: radius,
      startAngle: currentAngle,
      endAngle: currentAngle + segmentLength,
      rotationDirection: Math.random() > 0.5 ? 1 : -1, // Random rotation direction
    };

    currentAngle += segmentLength; // Adjust the current starting angle for the next segment

    return segment;
  });
};

const BasicSpinner = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [segments] = useState<Segment[]>(getSegments());
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 0.01);
    }, 10);

    // Ensuring canvas size
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    drawSegments(canvasRef, segments, angle);

    return () => clearInterval(intervalId);
  }, [angle, segments]);

  return (
    <>
      <ShowCodeButton code={fileContents} title="BackgroundSpinner" />
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, right: 0 }} />
    </>
  );
};

export default BasicSpinner;
