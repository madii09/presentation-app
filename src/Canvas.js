import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Canvas({ slide, role }) {
  const stageRef = useRef();

  useEffect(() => {}, [slide]);

  const exportToPDF = () => {
    const stage = stageRef.current.getStage();

    html2canvas(stage.container()).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('slide.pdf');
    });
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: '#3f51b5',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
        }}
        onClick={exportToPDF}
      >
        Export Slide to PDF
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
      >
        <Layer>
          <Rect
            x={20}
            y={20}
            width={100}
            height={100}
            fill='yellow'
            draggable={role === 'editor'}
          />
          <Text
            text='Slide Content'
            x={150}
            y={150}
            fontSize={20}
            draggable={role === 'editor'}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
