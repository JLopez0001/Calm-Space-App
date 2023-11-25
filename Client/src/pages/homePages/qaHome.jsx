import QAHomeScreen from "../../components/qaComponent/qaHome";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';

const QAHomePage = () => {

    const [cookies, _] = useCookies(["access_token"])
    const loggedInUsername = window.localStorage.getItem("username");
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const qaID = window.localStorage.getItem("userID");
                const response = await axios.get(`http://localhost:3001/qa/notes/${qaID}`,
                { headers: { access_token: cookies.access_token }});
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div>
            <QAHomeScreen 
                userName={loggedInUsername}
                notes={notes}
            />
        </div>
    );
};

export default QAHomePage;
