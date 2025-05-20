Plan:

```rs
// gets served as a json
struct Thumbnail {
   title: String,  // title of the thumb
   link: Url, // link to the game
   imgSrc: Url, // to thumbnail's image. Probably served over a cdn
   info: String, // the thumbnail's description
} 
```

Backend has database or file containing the data necessary for thumbnails.
 - maybe use a SQL database as a learning experience.
 - bonus feature, let the backend have a special feature that allows me to add a new entry

Frontend contacts the backend, asks for JSONs that contain the necessary information for a 
Thumbnail component. (App.jsx).