import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { getStoredNotes } from "~/data/note";
import styles from "~/styles/note-details.css";

export default function NoteDetailsPage() {

  const note = useLoaderData();

  return <main id="note-details">
    <header>
      <nav>
        <Link to="/notes">Back to All Notes</Link>
      </nav>
      <h1>{note.title}</h1>
    </header>
    <p id="note-details-content">{note.content}</p>
  </main>
}

export async function loader({params}: any) {
  
  const notes = await getStoredNotes()
  const noteId = params.noteId;

  const selectedNote = notes.find(note => note.id === noteId);

  if(!selectedNote) throw json({message: "Could not find note for id " + noteId}, {status: 404});

  return selectedNote;
}

export function CatchBoundary() {

  const caughtResponse = useCatch();
  const message = caughtResponse.data?.message || "Data not found";

  return (
  <main>
    
    <p className="info-message">{message}</p>
  </main>
  )
}

export function meta({data}: any) {
  return {
    title: data.title,
    description: "Manage your notes with ease."
  };
}

export function links() {
  return [{rel: "stylesheet", href: styles}];
}