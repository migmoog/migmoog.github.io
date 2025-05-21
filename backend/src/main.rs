use axum::{ response::IntoResponse, routing::get, Router};
use tokio::net::TcpListener;
use url::Url;

// gets served as a json
struct Thumbnail {
    title: String, // title of the thumb
    link: Url,     // link to the game
    img_src: Url,  // to thumbnail's image
    info: String,  // the thumbnail's description
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> anyhow::Result<()> {
    let router = Router::new().route("/", get(index));

    let listener = TcpListener::bind("0.0.0.0:5174").await?;

    axum::serve(listener, router).await?;
    Ok(())
}

async fn index() -> impl IntoResponse {
    println!("Hello, world!");
    "Hello World".into_response()
}
