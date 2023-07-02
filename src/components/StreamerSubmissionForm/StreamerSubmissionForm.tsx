import React, { memo, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import cn from 'classnames';
import { createStreamer } from '../../api/streamers';
import { Streamer, FormDetails } from '../../types';
import { SelectPlatform, AvatarImage } from '../';
import './streamer-submission-form.scss';

type Props = {
  addStreamer: (streamer: Streamer) => void;
};

export const StreamerSubmissionForm: React.FC<Props> = memo(
  ({ addStreamer }) => {
    const [formData, setFormData] = useState<FormDetails>({
      name: '',
      platform: '',
      description: '',
      avatarPreview: null,
      avatarFile: null,
      isVisibleOnMobile: false,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { name, platform, description, avatarFile } = formData;

      if (!name.trim() || !description.trim() || !platform || !avatarFile) {
        toast.error('Please fill in all required fields.');
        return;
      }

      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('platform', platform);
        formDataToSend.append('description', description);
        formDataToSend.append('image', avatarFile);

        const newStreamer = await createStreamer(formDataToSend);
        addStreamer(newStreamer);

        setFormData({
          name: '',
          platform: '',
          description: '',
          avatarPreview: null,
          avatarFile: null,
          isVisibleOnMobile: formData.isVisibleOnMobile,
        });

        toast.success('A new streamer has been added!👾');
      } catch (error) {
        toast.error('Failed to create streamer');
      }
    };

    const handleImageChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              avatarPreview: reader.result as string,
              avatarFile: file,
            }));
          };

          reader.readAsDataURL(file);
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatarPreview: null,
            avatarFile: null,
          }));
        }

        e.target.value = '';
      },
      []
    );

    const toggleFormVisibility = useCallback(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isVisibleOnMobile: !prevFormData.isVisibleOnMobile,
      }));
    }, []);

    const handleCloseForm = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isVisibleOnMobile: false,
      }));
    };

    const { name, platform, description, avatarPreview, isVisibleOnMobile } =
      formData;

    return (
      <>
        <div
          className={cn('streamer-submission-form', {
            'streamer-submission-form--visible': isVisibleOnMobile,
          })}
        >
          <form
            onSubmit={handleSubmit}
            className="streamer-submission-form__form"
          >
            <div
              className="streamer-submission-form__close-btn"
              onClick={handleCloseForm}
            >
              <i className="fa-solid fa-xmark" />
            </div>

            <AvatarImage
              previewUrl={avatarPreview}
              handleImageChange={handleImageChange}
            />

            <input
              type="text"
              value={name}
              placeholder="Streamer's Name"
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  name: e.target.value,
                }))
              }
              className="streamer-submission-form__name"
            />

            <SelectPlatform
              selectedPlatform={platform}
              setSelectedPlatform={(selectedPlatform) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  platform: selectedPlatform,
                }))
              }
            />

            <textarea
              value={description}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  description: e.target.value,
                }))
              }
              className="streamer-submission-form__description"
              placeholder="Description..."
            />

            <button type="submit" className="streamer-submission-form__btn">
              Submit
            </button>
          </form>
        </div>

        <>
          {!isVisibleOnMobile && (
            <div
              onClick={toggleFormVisibility}
              className="streamer-submission-form__toggle-btn"
            >
              <i className="fa-solid fa-plus"></i>
            </div>
          )}
        </>
      </>
    );
  }
);
