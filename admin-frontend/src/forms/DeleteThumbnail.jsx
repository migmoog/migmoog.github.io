import { submitForm, useThumbnail } from "../api";

export default function DeleteThumbnail() {
    const [id, setId] = useThumbnail();
    const handleSubmit = (e) => {
        e.preventDefault();

        const result = submitForm("DELETE", {}, id);
        if (result) {
            e.target.reset();
        }
    }
    return (
        <form className="form-container-grid" onSubmit={handleSubmit}>
            <label htmlFor="thumbnailId" className='form-label'>Thumbnail ID</label>
            <input type="number" value={id} onChange={(e) => setId(parseInt(e.target.value)) || -1} />
            <button type="submit">Submit</button>
        </form>
    );
}
