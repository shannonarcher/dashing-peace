import React, { KeyboardEvent } from 'react';
import PropTypes from 'prop-types';
import './ConsoleInput.scss';

interface ConsoleInputProps {
  onCommand?: Function;
}

const ConsoleInput: React.FC<ConsoleInputProps> = ({
  onCommand = (): void => {}
}) => {
  const defaultValue = 'mv ';

  const handleInput = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && event.target) {
      const input = event.target as HTMLInputElement;
      onCommand(input.value);
      input.value = defaultValue;
    }
  };

  return (
    <div className="ConsoleInput">
      <input type="text" onKeyPress={handleInput} defaultValue={defaultValue} />
    </div>
  );
};

ConsoleInput.propTypes = {
  onCommand: PropTypes.func,
};

export default ConsoleInput;
