import React, { useState } from 'react';
import { platformOptions } from '../../constants';
import './select-platform.scss';

type Props = {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
};

export const SelectPlatform: React.FC<Props> = ({
  selectedPlatform,
  setSelectedPlatform,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlatform(event.target.value);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="select-platform">
      <div id="select-platform__box">
        <input
          type="checkbox"
          className="select-platform__options-view-button"
          checked={isOpen}
          onChange={toggleOptions}
        />
        <div className="select-platform__select-button">
          <div className="select-platform__selected-value">
            <span style={{ opacity: 1 }}>
              {selectedPlatform ? selectedPlatform : 'Select a platform'}
            </span>
          </div>
        </div>
        <div className={`select-platform__options ${isOpen ? 'open' : ''}`}>
          {platformOptions.map((option) => (
            <div key={option.value} className="select-platform__option">
              <input
                className="select-platform__s-c select-platform__top"
                type="radio"
                name="platform"
                value={option.value}
                onChange={handleSelectChange}
              />
              <input
                className="select-platform__s-c select-platform__bottom"
                type="radio"
                name="platform"
                value={option.value}
                onChange={handleSelectChange}
              />
              <i className={option.icon}></i>
              <span className="select-platform__label">{option.label}</span>
            </div>
          ))}
          <div className="select-platform__option-bg"></div>
        </div>
      </div>
    </div>
  );
};
