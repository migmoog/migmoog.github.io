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

    return {
        id: id,
        set: setId,
        data: thumbnailData,
        setDataField: function(fieldName, value) {
           this.data[fieldName] = value;
        }
    };
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
