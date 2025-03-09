import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import CandidateInterface from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC<{ saveCandidate?: (candidate: CandidateInterface) => void }> = ({ saveCandidate = () => {} }) => {
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

    const handleSave = () => {
      if (currentCandidate) {
        const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
        const updatedCandidates = [...storedCandidates, currentCandidate];
        localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
        saveCandidate(currentCandidate);
        setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
      }
    };

    const handleSkip = () => {
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
              URL: <a href={currentCandidate.html_url}>{currentCandidate.html_url}</a>
            </p>
            <button onClick={handleSave}>+</button>
            <button onClick={handleSkip}>-</button>
          </div>
        ) : (
          <p>No more candidates available.</p>
        )}
      </div>
    );
  };

export default CandidateSearch;