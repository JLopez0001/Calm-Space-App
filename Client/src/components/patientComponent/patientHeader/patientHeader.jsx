function PatientHeader({ firstName, lastName, patientId }) {
    
    return (
        <div className="patient-header">
            <h1>{firstName} {lastName}</h1>
            <p>Patient ID: {patientId}</p>
        </div>
    );
}

export default PatientHeader;