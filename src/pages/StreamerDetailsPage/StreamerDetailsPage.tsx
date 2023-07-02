import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Streamer } from '../../types/Streamer';
import { getStreamer } from '../../api/streamers';
import { Breadcrumbs } from '../../components';
import './streamer-details.scss';

export const StreamerDetailsPage: React.FC = () => {
  const { streamerId } = useParams();
  const [streamerDetails, setStreamerDetails] = useState<Streamer | null>(null);

  useEffect(() => {
    fetchStreamerDetails();
  }, [streamerId]);

  const fetchStreamerDetails = async () => {
    try {
      if (streamerId) {
        const fetchedStreamer = await getStreamer(streamerId);
        setStreamerDetails(fetchedStreamer);
      }
    } catch (error) {
      console.error('Failed to fetch streamer details:', error);
    }
  };

  return (
    <div className="streamer-details">
      {streamerDetails ? (
        <>
          <Breadcrumbs streamerName={streamerDetails.name} />
          <div className="streamer-details__container">
            <img
              src={streamerDetails.image}
              alt={streamerDetails.name}
              className="streamer-details__image"
            />
            <div className="streamer-details__info">
              <h2 className="streamer-details__name">{streamerDetails.name}</h2>

              <div className="streamer-details__platform">
                <div className="streamer-details__platform-title">
                  Platform:
                </div>
                {streamerDetails.platform}
              </div>

              <div className="streamer-details__description">
                <div className="streamer-details__description-title">
                  Description:
                </div>
                {streamerDetails.description}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading streamer details...</p>
      )}
    </div>
  );
};
