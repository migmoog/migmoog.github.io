import "./index.css"
import "./forms.css"

import { useState } from 'react'
import NewThumbnail from './forms/NewThumbnail';
import EditThumbnail from './forms/EditThumbnail';
import DeleteThumbnail from './forms/DeleteThumbnail';
import ViewThumbnails from './forms/ViewThumbnails';

const ACTIONS_TO_THUMBS = {
  "New Thumbnail": "POST",
  "Edit Thumbnail": "PUT",
  "Delete Thumbnail": "DELETE",
  "View List Of Thumbnails": "GET"
}

function App() {
  const [actionForm, setActionForm] = useState(<NewThumbnail/>);
  const handleChange = (event) => {
    switch (event.target.value) {
      case "POST":
        setActionForm(<NewThumbnail />); break;
      case "PUT":
        setActionForm(<EditThumbnail />); break;
      case "DELETE":
        setActionForm(<DeleteThumbnail />); break;
      case "GET":
        setActionForm(<ViewThumbnails />); break;
      default:
        setActionForm(<h2>you haven't picked anything</h2>);
    }
  };

  return (
    <>
      <h1>Jeremy's Admin Panel</h1>
      <select name="Action" id="action-select" onChange={handleChange}>{
        Object.entries(ACTIONS_TO_THUMBS).map(([actionName, httpMethod]) => {
          return <option value={httpMethod} key={httpMethod}>{actionName}</option>;
        })
      }</select>

      {actionForm}
    </>
  )
}

export default App
