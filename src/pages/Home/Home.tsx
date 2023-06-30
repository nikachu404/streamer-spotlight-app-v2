import React, { useEffect, useState } from 'react';
import {
  StreamerSubmissionForm,
  StreamerList,
  Pagination,
} from '../../components';
import { Streamer } from '../../types/Streamer';
import { getStreamers } from '../../api/streamers';
import './home.scss';

export const Home: React.FC = () => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStreamers();
  }, [currentPage]);

  const fetchStreamers = async () => {
    try {
      const response = await getStreamers(currentPage, 4);
      setStreamers(response.streamers);
      setTotalPages(response.totalPages);

      console.log(response);
    } catch (error) {
      console.error('Failed to fetch streamers:', error);
    }
  };

  const addStreamer = (streamer: Streamer) => {
    setStreamers((prevStreamers) => [...prevStreamers, streamer]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="home">
      <div className="home__main">
        <StreamerList streamers={streamers} fetchStreamers={fetchStreamers} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <StreamerSubmissionForm addStreamer={addStreamer} />
    </div>
  );
};
