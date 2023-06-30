import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createStreamer } from '../../api/streamers';
import { Streamer } from '../../types/Streamer';
import { SelectPlatform, AvatarImage } from '../index';
import './streamer-submission-form.scss';

type Props = {
  addStreamer: (streamer: Streamer) => void;
};

export const StreamerSubmissionForm: React.FC<Props> = ({ addStreamer }) => {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('');
  const [description, setDescription] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !platform || !description || !avatarFile) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('platform', platform);
      formData.append('description', description);
      formData.append('image', avatarFile);

      const newStreamer = await createStreamer(formData);
      addStreamer(newStreamer);

      setName('');
      setPlatform('');
      setDescription('');
      setAvatarPreview(null);
      setAvatarFile(null);
    } catch (error) {
      toast.error('Failed to create streamer');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    } else {
      setAvatarPreview(null);
      setAvatarFile(null);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="streamer-submission-form">
        <AvatarImage
          previewUrl={avatarPreview}
          handleImageChange={handleImageChange}
        />

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
