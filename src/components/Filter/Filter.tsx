import React, { memo, useState } from 'react';
import cn from 'classnames';
import { sortOptions } from '../../constants';
import { SelectedSort } from '../../types/SelectSort';
import './filter.scss';

type Props = {
  onFilterChange: (sortBy: string, sortOrder: string) => void;
};

export const Filter: React.FC<Props> = memo(({ onFilterChange }) => {
  const [selectedSort, setSelectedSort] = useState<SelectedSort>({
    sortBy: '',
    sortByPreview: '',
    sortOrder: '',
    sortOrderPreview: '',
  });
  const [isSortByOpen, setSortByOpen] = useState(false);
  const [isSortOrderOpen, setSortOrderOpen] = useState(false);

  const isFilterSelected =
    selectedSort.sortBy !== '' && selectedSort.sortOrder !== '';

  const handleSortByChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedPreview: string
  ) => {
    const sortBy = event.target.value;
    setSelectedSort((prevSelectedSort) => ({
      ...prevSelectedSort,
      sortBy,
      sortByPreview: selectedPreview,
    }));
    toggleSortByOptions();
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedPreview: string
  ) => {
    const sortOrder = event.target.value;
    setSelectedSort((prevSelectedSort) => ({
      ...prevSelectedSort,
      sortOrder,
      sortOrderPreview: selectedPreview,
    }));
    toggleSortOrderOptions();
  };

  const toggleSortByOptions = () => {
    setSortByOpen(!isSortByOpen);
  };

  const toggleSortOrderOptions = () => {
    setSortOrderOpen(!isSortOrderOpen);
  };

  const applyFilter = () => {
    onFilterChange(selectedSort.sortBy, selectedSort.sortOrder);
  };

  return (
    <div className="filter">
      <div className="filter__filter-box">
        <div id="filter__filter-box__box">
          <input
            type="checkbox"
            className="filter__filter-box__options-view-button"
            checked={isSortByOpen}
            onChange={toggleSortByOptions}
          />
          <div className="filter__filter-box__select-button filter__filter-box__border">
            <div className="filter__filter-box__selected-value">
              <span style={{ opacity: 1 }}>
                {selectedSort.sortByPreview
                  ? `Sort By: ${selectedSort.sortByPreview}`
                  : 'Sort By:'}
              </span>
            </div>
          </div>
          <div
            className={`filter__filter-box__options ${
              isSortByOpen ? 'open' : ''
            }`}
          >
            {sortOptions.map((option) => (
              <div key={option.value} className="filter__filter-box__option">
                <input
                  className="filter__filter-box__s-c filter__filter-box__top"
                  type="radio"
                  name="platform"
                  value={option.value}
                  onChange={(e) => handleSortByChange(e, option.label)}
                />
                <input
                  className="filter__filter-box__s-c filter__filter-box__bottom"
                  type="radio"
                  name="platform"
                  value={option.value}
                  onChange={(e) => handleSortByChange(e, option.label)}
                />
                <span className="filter__filter-box__label">
                  {option.label}
                </span>
              </div>
            ))}
            <div className="filter__filter-box__option-bg"></div>
          </div>
        </div>
      </div>

      <div className="filter__filter-box">
        <div id="filter__filter-box__box">
          <input
            type="checkbox"
            className="filter__filter-box__options-view-button"
            checked={isSortOrderOpen}
            onChange={toggleSortOrderOptions}
          />
          <div className="filter__filter-box__select-button filter__filter-box__border">
            <div className="filter__filter-box__selected-value">
              <span style={{ opacity: 1 }}>
                {selectedSort.sortOrderPreview
                  ? `Order: ${selectedSort.sortOrderPreview}`
                  : 'Order:'}
              </span>
            </div>
          </div>
          <div
            className={`filter__filter-box__options ${
              isSortOrderOpen ? 'open' : ''
            }`}
          >
            <div className="filter__filter-box__option">
              <input
                className="filter__filter-box__s-c filter__filter-box__top"
                type="radio"
                name="platform"
                value="asc"
                onChange={(e) => handleSortOrderChange(e, 'Ascending')}
              />
              <input
                className="filter__filter-box__s-c filter__filter-box__bottom"
                type="radio"
                name="platform"
                value="asc"
                onChange={(e) => handleSortOrderChange(e, 'Ascending')}
              />
              <span className="filter__filter-box__label">Ascending</span>
            </div>
            <div className="filter__filter-box__option">
              <input
                className="filter__filter-box__s-c filter__filter-box__top"
                type="radio"
                name="platform"
                value="desc"
                onChange={(e) => handleSortOrderChange(e, 'Descending')}
              />
              <input
                className="filter__filter-box__s-c filter__filter-box__bottom"
                type="radio"
                name="platform"
                value="desc"
                onChange={(e) => handleSortOrderChange(e, 'Descending')}
              />
              <span className="filter__filter-box__label">Descending</span>
            </div>
            <div className="filter__filter-box__option-bg"></div>
          </div>
        </div>
      </div>

      <button
        className={cn('filter__apply-btn', {
          'filter__apply-btn--disabled': !isFilterSelected,
        })}
        onClick={applyFilter}
        disabled={!isFilterSelected}
      >
        Apply
      </button>
    </div>
  );
});
