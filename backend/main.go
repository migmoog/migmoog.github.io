package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			return
		}
		next.ServeHTTP(w, r)
	})
}
func main() {
	// open database from DATABASE_URL environment variable

	http.Handle("/", withCORS(http.HandlerFunc(indexHandler)))
	http.Handle("/projects", withCORS(http.HandlerFunc(projectsHandler)))

	log.Fatal(http.ListenAndServe(":5174", nil))
}

// print a hello world at the index
func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, World!")
}

type Thumbnail struct {
	Title  string `json:"title"`
	Link   string `json:"link"`
	ImgSrc string `json:"img_src"`
	Info   string `json:"info"`
}

// /projects handler
func projectsHandler(w http.ResponseWriter, r *http.Request) {
	// open database from DATABASE_URL environment variable
	//
	db, err := sql.Open("sqlite3", os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Println("Error opening database:", err)
		return
	}
	defer db.Close()
	// get data from thumbnails table
	rows, err := db.Query("SELECT title, link, img_source, info FROM thumbnails")
	if err != nil {
		fmt.Println("Error querying database:", err)
		return
	}
	defer rows.Close()

	var thumbnails []Thumbnail
	for rows.Next() {
		var t Thumbnail
		if err := rows.Scan(&t.Title, &t.Link, &t.ImgSrc, &t.Info); err != nil {
			fmt.Println("Error scanning row:", err)
			return
		}
		thumbnails = append(thumbnails, t)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(thumbnails); err != nil {
		fmt.Println("Error encoding JSON:", err)
	}
}
