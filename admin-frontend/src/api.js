import { useState, useEffect } from "react";

export const URL = import.meta.env.VITE_BACKEND_URL

export function useThumbnail(thumbnailId = -1) {
    const [id, setId] = useState(thumbnailId);
    const [thumbnailData, setThumbnailData] = useState({
        title: "Zilch",
        info: "Zero",
        link: "jeremygordon.dev"
    })

    useEffect(() => {
        if (id < 0) return;

        getThumbnailData(id)
            .then((data) => {
                if (data) {
                    setThumbnailData(data);
                }
            })
    }, [id]);

    return [id, setId, thumbnailData, setThumbnailData];
}

export function useAllThumbnails() {
    const [thumbnailData, setThumbnailData] = useState([]);

    useEffect(() => {
        const getThumbnails = async () => {
            const response = await fetch(URL + "/projects");
            if (!response.ok) console.error("Backend says: " + response.statusText);
            const data = await response.json();
            setThumbnailData(data);
        }

        getThumbnails();
    }, []);

    return thumbnailData;
}

export async function submitForm(method, data, id = -1) {
    try {
        const endpoint = URL + "/admin/thumbnails" + (id > 0 ? `/${id}` : "");
        const response = await fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': import.meta.env.VITE_ADMIN_API_KEY
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`Status ${response.status}`);

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getThumbnailData(thumbnailId) {
    try {
        const response = await fetch(URL + "/projects/" + thumbnailId);
        if (!response.ok)
            throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        return {
            title: data.title,
            info: data.info,
            link: data.link
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}
