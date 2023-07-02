import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './breadcrumbs.scss';

type Props = {
  streamerName: string;
};

export const Breadcrumbs: React.FC<Props> = memo(({ streamerName }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="breadcrumbs">
      <span className="breadcrumbs__back" onClick={goBack}>
        Back
      </span>
      <i className="fa-solid fa-angle-right" />
      <span>{streamerName}</span>
    </div>
  );
});
