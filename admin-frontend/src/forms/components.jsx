import { useEffect } from 'react';
import '../forms.css';

function LoadingPlaceholder() {
    return <div className='placeholder-content'><h3>
        Loading response...
    </h3></div>
}

function ThumbnailRow({ id, title, link, img_src, info, section }) {
    const sectionNames = ["Code Contribution", "Art Contribution"];
    
    return (
        <div className="thumbnail-row">
            <div className="thumbnail-image">
                {img_src ? (
                    <img src={img_src} alt={title} className="thumbnail-img" />
                ) : (
                    <div className="thumbnail-placeholder">No Image</div>
                )}
            </div>
            
            <div className="thumbnail-content">
                <div className="thumbnail-header">
                    <h4 className="thumbnail-title">{title}</h4>
                    <span className="thumbnail-id">ID: {id}</span>
                </div>
                
                <div className="thumbnail-info">
                    <p className="thumbnail-description">{info}</p>
                </div>
                
                <div className="thumbnail-footer">
                    <span className="thumbnail-section">
                        Section: {sectionNames[section] || 'Unknown'}
                    </span>
                    <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="thumbnail-link"
                    >
                        View Project →
                    </a>
                </div>
            </div>
            
            
            {
            // This is a big fat TODO
            /* <div className="thumbnail-actions">
                <button className="action-btn edit-btn" onClick={() => console.log('Edit', id)}>
                    Edit
                </button>
                <button className="action-btn delete-btn" onClick={() => console.log('Delete', id)}>
                    Delete
                </button>
            </div> */}
        </div>
    );
}

export { LoadingPlaceholder, ThumbnailRow };


