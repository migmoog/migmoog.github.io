import { useState } from 'react';
import { useAllThumbnails } from '../api';
import { ThumbnailRow } from './components';


export default function ViewThumbnails() {
    const thumbnailData = useAllThumbnails();
    console.log(thumbnailData);

    return (
        <div className='form-container'>
        {thumbnailData.map(thumb => {
            return <ThumbnailRow
                key={thumb.id}
                id={thumb.id}
                title={thumb.title}
                link={thumb.link}
                img_src={thumb.img_src}
                info={thumb.info}
                section={thumb.section}/>;
        })}
        </div>
    );
}
