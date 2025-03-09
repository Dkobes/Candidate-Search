import React, { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import CandidateInterface from '../interfaces/Candidate.interface';

interface CandidateSearchProps {
  saveCandidate?: (candidate: CandidateInterface) => void;
}

const CandidateSearch: React.FC<CandidateSearchProps> = ({ saveCandidate = () => {} }) => {
  const [candidates, setCandidates] = useState<CandidateInterface[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const result = await searchGithub();
        setCandidates(result);
      } catch (err) {
        setError('Failed to fetch candidates');
      }
    };
    fetchCandidates();
  }, []);

    const currentCandidate = candidates[currentCandidateIndex];

    const handleSave= () => {
      if (currentCandidate) {
        saveCandidate(currentCandidate);
        handleNext();
      }
    };

    const handleNext = () => {
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
    };

    return (
      <div>
        <h1>Candidate Search Engine</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {currentCandidate ? (
          <div>
            <img src={currentCandidate.avatar} alt={`${currentCandidate.name}'s avatar`} />
            <p>Name: {currentCandidate.name}</p>
            <p>Username: {currentCandidate.username}</p>
            <p>Location: {currentCandidate.location}</p>
            <p>Email: {currentCandidate.email}</p>
            <p>Company: {currentCandidate.company}</p>
            <p>
              URL: <a href={currentCandidate.url}>{currentCandidate.url}</a>
            </p>
            <button onClick={handleSave}>+</button>
            <button onClick={handleNext}>-</button>
          </div>
        ) : (
          <p>No more candidates available.</p>
        )}
      </div>
    );
  };

export default CandidateSearch;