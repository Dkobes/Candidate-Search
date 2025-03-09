import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

interface GithubUserResponse {
  login: string;
  avatar_url: string;
  html_url: string;
  location?: string; 
  email: string;    
  company?: string;  
  name: string;    
}

const CandidateSearch: React.FC<{ saveCandidate?: (candidate: Candidate) => void }> = ({ saveCandidate = () => {} }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const result: GithubUserResponse[] = await searchGithub(); 
        const formattedResults: Candidate[] = result.map(candidate => ({
          name: candidate.name || 'N/A', 
          username: candidate.login,
          location: candidate.location || 'N/A',
          email: candidate.email || 'N/A',
          company: candidate.company || 'N/A',
          html_url: candidate.html_url,
          avatar: candidate.avatar_url,
        }));
        setCandidates(formattedResults);
      } catch (err) {
        setError('Failed to fetch candidates');
      }
    };
    fetchCandidates();
  }, []);

    const currentCandidate = candidates[currentCandidateIndex];

    const handleSave = () => {
      if (currentCandidate) {
        const storedCandidates: Candidate[] = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
        const isDuplicate = storedCandidates.some(candidate => candidate.username === currentCandidate.username);
  
        if (!isDuplicate) {
          const updatedCandidates = [...storedCandidates, currentCandidate];
          localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
          saveCandidate(currentCandidate);
          setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
        } else {
          setError('This candidate has already been saved.');
        }
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
            <button onClick={handleSave}>Save</button>
            <button onClick={handleSkip}>Skip</button>
          </div>
        ) : (
          <p>No more candidates available.</p>
        )}
      </div>
    );
  };

export default CandidateSearch;