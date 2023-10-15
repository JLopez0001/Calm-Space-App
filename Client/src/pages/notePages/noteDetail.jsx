import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom"; // Import useParams

import NoteDetails from "../../components/noteComponents/note/noteDetails";

const NoteDetailsPage = () => {
    const { noteID } = useParams(); // Access route parameters using useParams

    const [note, setNote] = useState(null);

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/qa/note/${noteID}`);
                setNote(response.data);
            } catch (error) {
                console.error("Error fetching note details:", error);
            }
        };

        fetchNoteDetails();
    }, [noteID]);

    return (
        <NoteDetails note={note} /> 
    );
};

export default NoteDetailsPage;
