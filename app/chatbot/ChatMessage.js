import React from 'react';

function processText(text) {
  if (typeof text === 'string') {

    let processedText = text.replace(/\*/g, '');

    processedText = processedText.replace(/\.\s*/g, '.\n');
    return processedText;
  }
  return text;
}

const ChatMessage = ({ type, text }) => {
  const processedText = processText(text);

  return (
    <div style={{ textAlign: type === 'user' ? 'right' : 'left', margin: '10px 0' }}>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        <strong>{type === 'user' ? 'You' : 'ChatBot'}:</strong>
        <br />
        {processedText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default ChatMessage;
