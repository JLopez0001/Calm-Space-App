import Table from 'react-bootstrap/Table';

const QAUsers = ( {qaUsers} ) => {

    return (
        <div className='d-flex align-items-center'>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th colSpan="3"> Available QA Users</th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Provider Code</th>
                    </tr>
                </thead>
                <tbody>
                    {qaUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.providerCode}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
    
}

export default QAUsers;