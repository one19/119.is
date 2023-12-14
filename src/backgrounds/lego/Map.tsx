import { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import file from './map.txt?raw'; // https://policyviz.com/2021/06/14/lego-world-map-excel-edition/
import mapImageUrl from '../..//assets/equirectangular-projection.jpg';

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

// const _drawSquareMap = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
//   const canvas = canvasRef.current;
//   const ctx = canvas?.getContext('2d');

//   if (ctx && canvas) {
//     // Set canvas size
//     canvas.width = window.innerWidth;
//     canvas.height = (window.innerWidth * 80) / 128;
//     const width = window.innerWidth / 128;

//     // Draw on canvas
//     file.split('\n').forEach((line, y) => {
//       line.split(',').forEach((colorIndex, x) => {
//         ctx.fillStyle = colors[parseInt(colorIndex) - 1];
//         ctx.fillRect(x * width, y * width, width, width);
//       });
//     });
//   }
// };

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  z-index: -10;
`;

const ImageContainer = styled.div<{ width: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width}px;
  height: 100%;
  overflow: hidden;
`;

const Divider = styled.div<{ left: number }>`
  position: absolute;
  top: 0;
  left: ${(props) => props.left}px;
  height: 100%;
  width: 5px;
  background-color: black;
  cursor: ew-resize;
  z-index: 500;
`;

const drawMap = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');

  if (ctx && canvas) {
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = (window.innerWidth * 80) / 128;
    const radius = window.innerWidth / 256; // Half of the width for a full circle

    // Draw on canvas
    file.split('\n').forEach((line, y) => {
      line.split(',').forEach((colorIndex, x) => {
        const parsedIndex = parseInt(colorIndex) - 1;
        ctx.fillStyle = colors[parsedIndex];

        // Draw base circle
        ctx.beginPath();
        ctx.arc(x * radius * 2 + radius, y * radius * 2 + radius, radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw raised circle for colorIndex === 1
        if (parsedIndex === 0) {
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(x * radius * 2 + radius, y * radius * 2 + radius, radius / 2, 0, Math.PI * 2);
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
  const [dividerPosition, setDividerPosition] = useState(window.innerWidth / 20);

  useEffect(() => {
    const onResize = () => drawMap(canvasRef);
    drawMap(canvasRef);
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
    <Wrapper>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', opacity: 0.05 }} />
      <ImageContainer width={dividerPosition}>
        <img
          src={mapImageUrl}
          style={{
            width: canvasRef.current?.width,
            height: canvasRef.current?.height,
            left: 0,
            top: 0,
            opacity: 0.15,
            userSelect: 'none',
          }}
        />
      </ImageContainer>
      <Divider left={dividerPosition} onMouseDown={handleMouseDown}></Divider>
    </Wrapper>
  );
};

export default LegoMap;
