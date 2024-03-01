import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from '@emotion/styled';

const Button = styled.button`
  background: none;
  cursor: pointer;
  z-index: 1000;
  border: none;
  position: fixed;
  left: 0;
  top: 0;
`;
const Modal = styled.div`
  height: calc(0.9 * 100vh);
  position: fixed;
  overflow: scroll;
  margin-left: 5%;
  z-index: 1000;
  width: 90%;
  left: 0;
  top: 0;
`;

type Props = {
  code: string;
  title: string;
};

const ShowCodeButton = ({ code, title }: Props) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div>
      <Button
        type="button"
        onClick={() => setShowCode(!showCode)}
        aria-label={`Show the code for the ${title} component`}
      >
        {showCode ? 'x' : '>'}
      </Button>
      {showCode && (
        <Modal>
          <h2>{`// Path: src/${title}.tsx`}</h2>
          <SyntaxHighlighter language="tsx" style={dracula}>
            {code}
          </SyntaxHighlighter>
        </Modal>
      )}
    </div>
  );
};

export default ShowCodeButton;
