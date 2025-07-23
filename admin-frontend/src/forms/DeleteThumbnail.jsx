import { useState } from "react";
import { useThumbnail, URL } from "../api";

export default function DeleteThumbnail() {
    const thumbnail = useThumbnail();
    const [status, setStatus] = useState(<></>);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (thumbnail.id < 0) return;

        const endpoint = `${URL}/admin/thumbnails/${thumbnail.id}`;
        const response = await fetch(endpoint,
            {
                method: "DELETE",
                headers: {
                    'X-API-Key': import.meta.env.VITE_ADMIN_API_KEY
                }
            }
        );
        if (!response.ok) {
            console.error(`Unsuccessfull delete: `, response.status, response.statusText);
            setStatus(<h4>Failed to delete</h4>);
        } else {
            setStatus(<h4>Successful delete</h4>)
        }
    }
    return (
        <form className="form-container-grid" onSubmit={handleSubmit}>
            <label htmlFor="thumbnailId" className='form-label'>Thumbnail ID</label>
            <input type="number" value={thumbnail.id} onChange={(e) => thumbnail.set(parseInt(e.target.value)) || -1} />
            <button type="submit">Submit</button>
            {status}
        </form>
    );
}
