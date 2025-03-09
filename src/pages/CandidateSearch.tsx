import { useState, useEffect, useRef } from 'react';
import { searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';


export const searchGithubUser = async (username: string): Promise<any> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${username}`);
  }
  return response.json();
};

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate>({
    avatar_url: '',
    name: '',
    username: '',
    location: '',
    email: '',
    company: '',
    html_url: '',
  });
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const index = useRef(0);

  // Fetch candidates and the first candidate's data
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const githubUsers = await searchGithub();
        setSavedCandidates(githubUsers); 
        await fetchCandidateDetails(githubUsers[index.current].login);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setNoMoreCandidates(true);
      }
    };

    const fetchCandidateDetails = async (username: string) => {
      try {
        const user = await searchGithubUser(username);
        setCandidate({
          avatar_url: user.avatar_url,
          name: user.name || '',
          username: user.login,
          location: user.location || 'N/A',
          email: user.email || 'N/A',
          company: user.company || 'N/A',
          html_url: user.html_url || 'N/A',
        });
      } catch (error) {
        console.error('Error fetching candidate details:', error);
    setCandidate({
      avatar_url: '',
      name: '',
      username: 'Not Found',
      location: 'N/A',
      email: 'N/A',
      company: 'N/A',
      html_url: '',
      });
    }
    };

    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]') as Candidate[];
    if (!saved.some((c) => c.username === candidate.username)) {
      const updatedCandidates = [...saved, candidate];
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    }
    getNextCandidate();
  };

  const getNextCandidate = async () => {
    index.current += 1;
    if (index.current < savedCandidates.length) {
      await fetchCandidateDetails(savedCandidates[index.current].username); 
    } else {
      setNoMoreCandidates(true);
    }
  };

  const fetchCandidateDetails = async (username: string) => {
    try {
      const user = await searchGithubUser(username);
      setCandidate({
        avatar_url: user.avatar_url,
        name: user.name || '',
        username: user.login,
        location: user.location || 'N/A',
        email: user.email || 'N/A',
        company: user.company || 'N/A',
        html_url: user.bio || 'N/A',
      });
    } catch {
      setCandidate({
        avatar_url: '',
        name: '',
        username: 'Not Found',
        location: 'N/A',
        email: 'N/A',
        company: 'N/A',
        html_url: 'N/A',
      });
    }
  };

  const display = () => {
    if (noMoreCandidates) {
      return (
        <div style={{ backgroundColor: 'black', borderRadius: 25, textAlign: 'center', padding: '20px' }}>
          <h2>No More Candidates Available</h2>
        </div>
      );
    }
    return (
      <div className="card" style={{ backgroundColor: 'black', borderRadius: 25, padding: '20px' }}>
        <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} />
        <div style={{ marginLeft: 15 }}>
          <h2>
            {candidate.name} ({candidate.username})
          </h2>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <p>Bio: {candidate.html_url}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {display()}
      <button onClick={saveCandidate}>Save</button>
      <button onClick={getNextCandidate} style={{ marginLeft: 15 }}>
        Next
      </button>
    </div>
  );
};

export default CandidateSearch;