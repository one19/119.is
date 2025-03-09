import { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import file from './map.txt?raw'; // https://policyviz.com/2021/06/14/lego-world-map-excel-edition/
import mapImageUrl from '../../assets/equirectangular-projection.jpg';
import ShowCodeButton from '../../ShowCodeButton';

const fileContents = '@raw';

const colors = [
  '#EEEEEE',
  '#00355E',
  '#00BAD6',
  '#009B95',
  '#00A51E',
  '#97C800',
  '#E7C987',
  '#FFA800',
  '#FF6D00',
  '#FE5F6B',
];

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div<{ width: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width}px;
  height: 100%;
  overflow: hidden;
  user-select: none;
`;

const Divider = styled.div<{ left: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: ${(props) => props.left}px;
  height: 100%;
  width: 5px;
  background-color: black;
  cursor: ew-resize;
  user-select: none;
`;

type CanvasDimensions = {
  width: number;
  height: number;
};

const drawMap = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  setCanvasDimensions: (dims: CanvasDimensions) => void,
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas?.getContext('2d');

  if (ctx && canvas) {
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = (window.innerWidth * 80) / 128;
    setCanvasDimensions({ width: canvas.width, height: canvas.height });
    const radius = window.innerWidth / 256; // Half of the width for a full circle

    // Draw on canvas
    file.split('\n').forEach((line, y) => {
      line.split(',').forEach((colorIndex, x) => {
        const parsedIndex = parseInt(colorIndex) - 1;
        ctx.fillStyle = colors[parsedIndex];

        // Draw base circle
        ctx.beginPath();
        ctx.arc(
          x * radius * 2 + radius,
          y * radius * 2 + radius,
          radius,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Draw raised circle for colorIndex === 1
        if (parsedIndex === 0) {
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(
            x * radius * 2 + radius,
            y * radius * 2 + radius,
            radius / 2,
            0,
            Math.PI * 2,
          );
          ctx.fill();

          // Draw rotated "LEGO" text
          ctx.save();
          ctx.translate(x * radius * 2 + radius, y * radius * 2 + radius);
          ctx.rotate(Math.random() * 2 * Math.PI); // Random rotation
          ctx.font = `${radius / 2.5}px Arial`;
          ctx.fillStyle = '#666'; // Text color
          ctx.fillText('LEGO', -ctx.measureText('LEGO').width / 2, radius / 4);
          ctx.restore();
        }
      });
    });
  }
};

const LegoMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dividerPosition, setDividerPosition] = useState(
    window.innerWidth / 20,
  );
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onResize = () => drawMap(canvasRef, setCanvasDimensions);
    drawMap(canvasRef, setCanvasDimensions);
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleMouseDown = () => {
    const handleMouseMove = (moveEvent: MouseEvent) => {
      setDividerPosition(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <ShowCodeButton code={fileContents} title="BackgroundLego" />
      <Wrapper>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', opacity: 0.05 }}
        />
        <ImageContainer width={dividerPosition}>
          <img
            src={mapImageUrl}
            style={{
              width: canvasDimensions.width,
              height: canvasDimensions.height,
              left: 0,
              top: 0,
              opacity: 0.15,
            }}
          />
        </ImageContainer>
        <Divider left={dividerPosition} onMouseDown={handleMouseDown}>
          ◀▶
        </Divider>
      </Wrapper>
    </>
  );
};

export default LegoMap;
