import { useState } from 'react';
import { useThumbnail, URL } from '../api';

const SECTIONS = [
    "Code Contribution",
    "Art Contribution"
];

function ThumbnailPanel({ method,
    isBlank = true, thumbnailId = -1 }) {
    let thumbnail;
    if (!isBlank) {
        thumbnail = useThumbnail(thumbnailId);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submission = new FormData(e.target);
        const endpoint = thumbnail?.id > 0
            ? `${URL}/admin/thumbnails/${thumbnail.id}`
            : `${URL}/admin/thumbnails`;
        const response = await fetch(endpoint,
            {
                method: method,
                headers: {
                    'X-API-Key': import.meta.env.VITE_ADMIN_API_KEY,
                },
                body: submission
            }
        );

        if (!response.ok) {
            console.error("Form submission error, ", response.status, response.statusText);
            return;
        }
        const result = await response.json();
        console.log(`Form submission result ${result}`);
    }

    return (
        <form className="form-container-grid" onSubmit={handleSubmit}>
            {isBlank ? <></> :
                <><label htmlFor="thumbnailId" className='form-label'>Thumbnail ID</label>
                    <input type="number" value={thumbnail?.id} onChange={(e) => thumbnail.set(parseInt(e.target.value)) || -1} /></>}

            <label htmlFor="title" className="form-label">Title</label>
            {isBlank ?<></> : <h5 className='original-title'>{thumbnail?.data.title || ""}</h5>}
            <input type="text" name="title" id="title" className="form-input"
                required/>

            <label htmlFor="link" className="form-label">Link</label>
            {isBlank  ? <></> : <h5 className='original-link'>{thumbnail?.data.link || ""}</h5>}
            <input type="url" name="link" id="link" className="form-input"
                required/>

            <label htmlFor="info" className="form-label">Information</label>
            {isBlank ? <></> : <h5 className='original-info'>{thumbnail?.data.info || ""}</h5>}
            <textarea name="info" id="info" className="form-textarea"
                required/>

            <label htmlFor="thumb_image" className='form-label'>Thumbnail Image</label>
            <input type="file" accept="image/*" name="thumb_image" id="thumb_image" required/>

            <label htmlFor="section" className="form-label">Section</label>
            <select name="section" id="section" className="form-select" required>
                {SECTIONS.map((sectionName, sectionNo) => {
                    return <option value={sectionNo} key={sectionNo}>{sectionName}</option>;
                })}
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export function NewThumbnail() {
    return <ThumbnailPanel
        method="POST" />
}

export function EditThumbnail() {
    return <ThumbnailPanel
        method="PUT"
        isBlank={false} />
}