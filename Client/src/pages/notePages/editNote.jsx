import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import NoteForm from "../../components/noteComponent/createNote/createNoteForm";

const EditNotePage = () => { 
    const { noteID } = useParams(); 
    const [note, setNote] = useState(null);

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/qa/note/${noteID}`);
                setNote(response.data);
                console.log("Fetched note:", response.data);
            } catch (error) {
                console.error("Error fetching note details:", error);
            }
        };

        fetchNoteDetails();
    }, [noteID]);

    console.log("Full note object:", note);


    if (!note) return <p>Loading note details...</p>;

    return (
        <NoteForm 
            note={note} 
            isEditMode={true} 
        />
    );
};

export default EditNotePage;