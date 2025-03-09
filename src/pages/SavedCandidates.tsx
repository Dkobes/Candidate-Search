import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    try {
      const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setSavedCandidates(storedCandidates);
    } catch (error) {
      console.error('Error parsing saved candidates from localStorage:', error);
      setSavedCandidates([]);
    }
  }, [])

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate, index) => (
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