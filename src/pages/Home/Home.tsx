import { useEffect, useState } from 'react';
import { StreamerSubmissionForm, StreamerList } from '../../components';
import { Streamer } from '../../types/Streamer';
import { getStreamers } from '../../api/streamers';
import './home.scss';

export const Home: React.FC = () => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);

  useEffect(() => {
    fetchStreamers();
    console.log('render');
  }, []);

  const fetchStreamers = async () => {
    try {
      const fetchedStreamers = await getStreamers();
      setStreamers(fetchedStreamers);
    } catch (error) {
      console.error('Failed to fetch streamers:', error);
    }
  };

  const addStreamer = (streamer: Streamer) => {
    setStreamers((prevStreamers) => [...prevStreamers, streamer]);
  };

  return (
    <div className="home">
      <StreamerList streamers={streamers} fetchStreamers={fetchStreamers} />
      <StreamerSubmissionForm addStreamer={addStreamer} />
    </div>
  );
};
