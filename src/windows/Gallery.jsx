import { WindowControls } from '#components';
import WindowWrapper from '#components/hoc/WindowWrapper';
import React from 'react';
import { gallery } from '#constants';

const Gallery = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Gallery</h2>
      </div>

      <div className="gallery">
        <ul>
          {gallery.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`gallery-${id}`} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const GalleryWindow = WindowWrapper(Gallery, 'photos');
export default GalleryWindow;