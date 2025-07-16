import { useState } from 'react';
import { submitForm, useThumbnail } from '../api';


export default function EditThumbnail() {
    const [id, setId, thumbnailData, setThumbnailData] = useThumbnail();
    const SECTIONS = [
        "Code Contribution",
        "Art Contribution"
    ];

    const handleChange = (fieldName) => (e) => setThumbnailData({ ...thumbnailData, [fieldName]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = {
            title: thumbnailData.title || '',
            link: thumbnailData.link || '',
            info: thumbnailData.info || '',
            section: parseInt(thumbnailData.section) || 0,
            img_src: thumbnailData.img_src || 'https://via.placeholder.com/300x200'
        };
        console.log("Submitting", submitData);

        const result = await submitForm("PUT", submitData, id);

        if (result) {
            e.target.reset();
        }
    }
    return (
        <form className="form-container-grid" onSubmit={handleSubmit}>
            <label htmlFor="thumbnailId" className='form-label'>Thumbnail ID</label>
            <input type="number" value={id} onChange={(e) => setId(parseInt(e.target.value)) || -1} />

            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name="title" id="title" className="form-input"
                value={thumbnailData.title}
                onChange={handleChange("title")} />

            <label htmlFor="link" className="form-label">Link</label>
            <input type="url" name="link" id="link" className="form-input"
                value={thumbnailData.link}
                onChange={handleChange("link")} />

            <label htmlFor="info" className="form-label">Information</label>
            <textarea name="info" id="info" className="form-textarea" value={thumbnailData.info}
                onChange={handleChange("info")} />

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
