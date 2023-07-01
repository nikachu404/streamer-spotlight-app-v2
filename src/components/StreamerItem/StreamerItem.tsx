import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Streamer } from '../../types/Streamer';
import { voteStreamer } from '../../api/streamers';
import './streamer-item.scss';

type StreamerItemProps = {
  streamer: Streamer;
  fetchStreamers: () => void;
};

export const StreamerItem: React.FC<StreamerItemProps> = ({
  streamer,
  fetchStreamers,
}) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  useEffect(() => {
    const storedUpvoted = localStorage.getItem(`upvote-${streamer._id}`);
    const storedDownvoted = localStorage.getItem(`downvote-${streamer._id}`);

    setIsUpvoted(storedUpvoted === 'true');
    setIsDownvoted(storedDownvoted === 'true');
  }, [streamer]);

  const handleUpvote = async (streamerId: string) => {
    try {
      if (isUpvoted) {
        setIsUpvoted(false);
        localStorage.removeItem(`upvote-${streamerId}`);
        await voteStreamer(streamerId, 'unvoteUpvote');
      } else {
        setIsUpvoted(true);
        localStorage.setItem(`upvote-${streamerId}`, 'true');
        await voteStreamer(streamerId, 'upvote');

        if (isDownvoted) {
          setIsDownvoted(false);
          localStorage.removeItem(`downvote-${streamerId}`);
          await voteStreamer(streamerId, 'unvoteDownvote');
        }
      }

      fetchStreamers();
    } catch (error) {
      console.error('Failed to vote for streamer:', error);
    }
  };

  const handleDownvote = async (streamerId: string) => {
    try {
      if (isDownvoted) {
        setIsDownvoted(false);
        localStorage.removeItem(`downvote-${streamerId}`);
        await voteStreamer(streamerId, 'unvoteDownvote');
      } else {
        setIsDownvoted(true);
        localStorage.setItem(`downvote-${streamerId}`, 'true');
        await voteStreamer(streamerId, 'downvote');

        if (isUpvoted) {
          setIsUpvoted(false);
          localStorage.removeItem(`upvote-${streamerId}`);
          await voteStreamer(streamerId, 'unvoteUpvote');
        }
      }

      fetchStreamers();
    } catch (error) {
      console.error('Failed to vote for streamer:', error);
    }
  };

  return (
    <div className="streamer-item">
      <Link to={`/${streamer._id}`} className="streamer-item__main-info">
        <img
          src={streamer.image}
          alt={streamer.name}
          className="streamer-item__image"
        />
        <div className='streamer-item__info'>
          <div className="streamer-item__name">{streamer.name}</div>
          <div className="streamer-item__platform">{streamer.platform}</div>
        </div>
      </Link>

      <div className="streamer-item__votes">
        <span
          className={cn('streamer-item__upvotes', {
            'streamer-item__upvote--active': isUpvoted,
          })}
          onClick={() => handleUpvote(streamer._id)}
        >
          <i className="fa-solid fa-arrow-up streamer-item__upvote"></i>
          {` ${streamer.upvotes}`}
        </span>

        <span
          className={cn('streamer-item__downvotes', {
            'streamer-item__downvote--active': isDownvoted,
          })}
          onClick={() => handleDownvote(streamer._id)}
        >
          <i className="fa-solid fa-arrow-down streamer-item__downvote"></i>
          {` ${streamer.downvotes}`}
        </span>
      </div>
    </div>
  );
};
