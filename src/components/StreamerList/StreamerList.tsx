import React, { useEffect } from 'react';
import { Streamer } from '../../types/Streamer';
import { StreamerItem } from '../index';
import './streamer-list.scss';

type Props = {
  streamers: Streamer[];
  fetchStreamers: () => void;
};

export const StreamerList: React.FC<Props> = ({
  streamers,
  fetchStreamers,
}) => {
  useEffect(() => {
    console.log('StreamerList rendered');
  }, [streamers]);

  return (
    <div className="streamer-list">
      {streamers.map((streamer) => (
        <StreamerItem
          streamer={streamer}
          key={streamer._id}
          fetchStreamers={fetchStreamers}
        />
      ))}
    </div>
  );
};
