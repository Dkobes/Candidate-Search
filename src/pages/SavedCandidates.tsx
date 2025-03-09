import React, { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
      const savedCandidates = localStorage.getItem("candidates");
      if (savedCandidates) {
          setCandidates(JSON.parse(savedCandidates)); 
      }
  }, []);

  return (
      <div>
          <h2>Saved Candidates</h2>
          {candidates.length === 0 ? (
              <p>No candidates saved.</p>
          ) : (
              <ul>
                  {candidates.map((candidate, index) => (
                      <li key={index}>
                          <h3>{candidate.username}</h3>
                          <p>Location: {candidate.location || "Not available"}</p>
                          <img src={candidate.avatar} alt={candidate.username} />
                          <p>
                              <a href={candidate.url} target="_blank" rel="noopener noreferrer">
                                  View Profile
                              </a>
                          </p>
                      </li>
                  ))}
              </ul>
          )}
      </div>
  );
};

export default SavedCandidates;