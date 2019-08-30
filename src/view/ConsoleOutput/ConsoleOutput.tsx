import React from 'react';
import PropTypes from 'prop-types';
import './ConsoleOutput.scss';

interface ConsoleOutputProps {
  output: Array<String>;
}

const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  output,
}) => {
  const orderedOutput = [...output].reverse();

  return (
    <div className="ConsoleOutput">
      <ul className="ConsoleOutput__messages messages">
        {
          orderedOutput.map(message => (
            <li className="messages__message">{ message }</li>
          ))
        }
      </ul>
    </div>
  )
};

ConsoleOutput.propTypes = {
  output: PropTypes.any,
};

export default ConsoleOutput;