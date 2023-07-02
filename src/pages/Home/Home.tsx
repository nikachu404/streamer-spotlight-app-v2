import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  StreamerSubmissionForm,
  StreamerList,
  Pagination,
  Filter,
} from '../../components';
import { Streamer } from '../../types/Streamer';
import { getStreamers } from '../../api/streamers';
import { streamersPerPage } from '../../constants';
import './home.scss';

export const Home: React.FC = () => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchStreamers();
  }, [currentPage, sortBy, sortOrder]);

  const fetchStreamers = useCallback(async () => {
    try {
      const response = await getStreamers(
        currentPage,
        streamersPerPage,
        sortBy,
        sortOrder
      );
      setStreamers(response.streamers);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error('Failed to fetch streamers:(');
    }
  }, [currentPage, sortBy, sortOrder]);

  const addStreamer = useCallback((streamer: Streamer) => {
    setStreamers((prevStreamers) => [...prevStreamers, streamer]);
    fetchStreamers();
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleFilterChange = useCallback(
    (sortBy: string, sortOrder: string) => {
      setSortBy(sortBy);
      setSortOrder(sortOrder);
    },
    []
  );

  return (
    <div className="home">
      <div className="home__main">
        <div className="home__filter">
          <Filter onFilterChange={handleFilterChange} />
        </div>
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
