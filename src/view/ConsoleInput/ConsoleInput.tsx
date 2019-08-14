import React, {KeyboardEvent} from 'react';
import './ConsoleInput.scss';

interface IConsoleInputProps {
    onCommand?: Function;
}

const ConsoleInput: React.FC<IConsoleInputProps> = ({
    onCommand = () => {},
}) => {
    const defaultValue: string = 'mv ';

    const handleInput = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.target) {
            const input = event.target as HTMLInputElement;
            onCommand(input.value);
            input.value = defaultValue;
        }
    }

    return (
        <div className="ConsoleInput">
            <input
                type="text"
                onKeyPress={handleInput}
                defaultValue={defaultValue}
            />
        </div>
    );
};

export default ConsoleInput;