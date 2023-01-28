import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { BookItemType } from "../../types";
import "./note.css";
import { useActions } from "../../hooks/use-actions";

interface NoteProps {
  book: BookItemType;
}

const Note: React.FC<NoteProps> = ({ book }) => {
  const { note, key } = book;

  const [editing, setEditing] = useState<boolean>(false);
  const [noteValue, setNoteValue] = useState<string>("");
  const [oldValue, setOldValue] = useState<string>("");

  const { editNote } = useActions();

  useEffect(() => {
    setNoteValue(note);
  }, [note]);

  const changeNote = () => {
    editNote(key, noteValue);
    setEditing(false);
  };

  const noteChangeInitiated = () => {
    setOldValue(noteValue);
    setEditing(true);
  };

  const cancelChange = () => {
    setNoteValue(oldValue);
    setEditing(false);
  };

  return (
    <div>
      <div className="flex">
        <p>Beleska</p>
        <Button
          icon="pi pi-pencil"
          onClick={noteChangeInitiated}
          className="edit-note-button"
          disabled={editing}
        />
      </div>
      {editing ? (
        <InputTextarea
          className="w-full"
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          rows={5}
          autoResize
        />
      ) : (
        <div>
          {noteValue || (
            <em className="text-sm">Ne postoji beleska za ovu knjigu</em>
          )}
        </div>
      )}
      <div>
        {editing && (
          <div className="text-right">
            <Button className="mr-1" label="Potvrdi" onClick={changeNote} />
            <Button label="Otkazi" onClick={cancelChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
