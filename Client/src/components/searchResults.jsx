import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ results }) => {
  if (results.length === 0) {
    return null; // Don't render anything if there are no results
  }

  return (
    <div className="table-responsive">
      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Patient ID</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.patientID}>
                  <td>{`${result.firstName} ${result.lastName}`}</td>
                  <td>
                    <Link to={`/patient/${result.patientID}`}>
                      {result.patientID}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
