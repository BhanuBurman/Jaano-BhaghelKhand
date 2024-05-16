import React from 'react';

const DisplayResult = ({ bagheliText }) => {
  return (
    <div>
      {bagheliText && <p>Converted Text: {bagheliText}</p>}
    </div>
  );
};

export default DisplayResult;