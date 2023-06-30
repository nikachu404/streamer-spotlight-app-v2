import React, { useState } from 'react';
import { createStreamer } from '../../api/streamers';
import { Streamer } from '../../types/Streamer';
import { SelectPlatform } from '../SelectPlatform/SelectPlatform';
import './streamer-submission-form.scss';

type Props = {
  addStreamer: (streamer: Streamer) => void;
};

export const StreamerSubmissionForm: React.FC<Props> = ({ addStreamer }) => {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newStreamer = await createStreamer(name, platform, description);
      addStreamer(newStreamer);

      setName('');
      setPlatform('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create streamer:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="streamer-submission-form">
        <input
          type="text"
          value={name}
          placeholder="Streamer's Name"
          onChange={(e) => setName(e.target.value)}
          className="streamer-submission-form__name"
        />

        <SelectPlatform
          selectedPlatform={platform}
          setSelectedPlatform={setPlatform}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="streamer-submission-form__description"
          placeholder="Description..."
        />

        <button type="submit" className="streamer-submission-form__btn">
          Submit
        </button>
      </form>
    </>
  );
};
