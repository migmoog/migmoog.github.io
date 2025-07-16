import { useState } from "react";
import { submitForm } from "../api";

export default function NewThumbnail() {
    const [formData, setFormData] = useState(new FormData());
    const SECTIONS = [
        "Code Contribution",
        "Art Contribution"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataObj = new FormData(e.target);

            // Convert FormData to regular object
            const thumbnailData = {
                title: formDataObj.get('title'),
                link: formDataObj.get('link'),
                info: formDataObj.get('info'),
                section: parseInt(formDataObj.get('section')),
                img_src: formDataObj.img_src || 'https://via.placeholder.com/300x200'
            };

            console.log('Submitting:', thumbnailData);

            const result = await submitForm("POST", thumbnailData);

            if (result) {
                e.target.reset(); // Reset the form
                setFormData({ title: '', link: '', info: '', section: 0, img_src: '' });
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="form-container-grid">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name="title" id="title" className="form-input" required />

            <label htmlFor="link" className="form-label">Link</label>
            <input type="url" name="link" id="link" className="form-input" required />

            <label htmlFor="info" className="form-label">Information</label>
            <textarea name="info" id="info" className="form-textarea" required></textarea>

            <label htmlFor="image-upload" className="form-label">Image</label>
            <input type="file" accept='image/*' name='image-upload' className='form-label' />

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
