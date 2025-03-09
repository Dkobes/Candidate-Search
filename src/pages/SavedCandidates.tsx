import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    const array = localStorage.getItem('candidates');
    if (array) {
      const data: Candidate[] = JSON.parse(array);
      setCandidates(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  return (
    <div>
      <h1>Saved Candidates</h1>
      {candidates.length > 0 ? (
        <ul>
          {candidates.map((candidate, index) => (
            <li key={index}>
              <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
              <p>Name: {candidate.name}</p>
              <p>Username: {candidate.username}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <p>
                URL: <a href={candidate.html_url}>{candidate.html_url}</a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been accepted.</p>
      )}
    </div>
  );
};

export default SavedCandidates;