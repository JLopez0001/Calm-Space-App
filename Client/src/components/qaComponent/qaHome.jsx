import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const QAHomeScreen = ({ userName, notes }) => {

    const formatDate = (dateString) => {
        if(!dateString) return ""; // Return empty string if dateString is null or undefined
        const dateObj = new Date(dateString);
        const yyyy = dateObj.getUTCFullYear();
        const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // January is 0!
        const dd = String(dateObj.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    return (
        <div className='qa-home-screen'>
            <div className="greeting-user">
                <h1>Welcome {userName}</h1>
            </div>
            <div className='table-info table-responsive'>
                <div className='row'>
                    <div className='col'>
                        <table className='table table-striped table-bordered table-hover'>

                            <thead>
                                <tr>
                                    <th colSpan="4">Tasks To Review</th>
                                </tr>
                                <tr>
                                    <th>Appointment Date</th>
                                    <th>Patient Name</th>
                                    <th>From UserID</th>
                                    <th>Service</th>
                                </tr>
                            </thead>

                            <tbody>
                                {notes.length > 0 ? (
                                
                                    notes.map(note => (
                                        <tr key={note._id}>
                                            <td>{formatDate(note.appointmentDate)}</td>
                                            <td>
                                                <Link className='link' to={`/patient/${note.patient.patientID}`}>
                                                    {note.patient.firstName} {note.patient.lastName}
                                                </Link>
                                            </td>
                                            <td>{note.therapist.username}</td>
                                            <td>
                                                <Link className='link' to={`/note/${note._id}`}>
                                                    {note.service}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No notes to review</td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QAHomeScreen;
