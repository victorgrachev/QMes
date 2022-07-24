import React from 'react';
import Picker, { IEmojiPickerProps } from 'emoji-picker-react';

export type TPropsModalEmoji = {
  onSelect: IEmojiPickerProps['onEmojiClick'];
};

export const ModalEmoji: React.FC<TPropsModalEmoji> = ({ onSelect }) => {
  return (
    <Picker
      onEmojiClick={onSelect}
      groupNames={{
        smileys_people: '',
      }}
      groupVisibility={{
        animals_nature: false,
        food_drink: false,
        travel_places: false,
        activities: false,
        objects: false,
        symbols: false,
        flags: false,
        recently_used: false,
      }}
      pickerStyle={{
        position: 'absolute',
        height: '300px',
        left: '1rem',
        bottom: '4rem',
        userSelect: 'none',
      }}
      native
      preload
      disableAutoFocus
      disableSearchBar
      disableSkinTonePicker
    />
  );
};
