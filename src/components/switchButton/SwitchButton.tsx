import React from 'react';
import './style.scss';

interface ToggleSwitchProps {
  isToggled: boolean;
  onToggle: () => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isToggled, onToggle }) => {
  return (
    <div
      className={`toggle-switch ${isToggled ? 'toggled' : ''}`}
      onClick={onToggle}
    >
      <div className="toggle-dot" />
    </div>
  );
};
