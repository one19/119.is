import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ShowCodeButton.css';

type Props = {
  code: string;
  title: string;
  className: string;
};

const ShowCodeButton = ({ code, title, className }: Props) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div>
      <button
        type="button"
        className={`show-code ${className}`}
        onClick={() => setShowCode(!showCode)}
        aria-label={`Show the code for the ${title} component`}
      >
        {showCode ? 'x' : '>'}
      </button>
      {showCode && (
        <div className="modal">
          <h2>{`// Path: src/${title}.tsx`}</h2>
          <SyntaxHighlighter language="tsx" style={dracula}>
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default ShowCodeButton;
