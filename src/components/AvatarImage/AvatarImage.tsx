import React, { memo } from 'react';
import cn from 'classnames';
import './avatar-image.scss';

type Props = {
  previewUrl: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AvatarImage: React.FC<Props> = memo(
  ({ previewUrl, handleImageChange }) => {
    return (
      <div className="avatar-image">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Selected Image"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            className="avatar-image__image"
          />
        )}
        <label
          className={cn('avatar-image__label', {
            'avatar-image__label--filled': previewUrl,
          })}
        >
          <i className="fa-solid fa-user"></i>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>
      </div>
    );
  }
);
