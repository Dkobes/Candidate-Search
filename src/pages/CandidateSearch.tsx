import React, { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import CandidateQuery from '../interfaces/Candidate.interface';

interface CandidateSearchProps {
  saveCandidate: (candidate: CandidateQuery) => void;
}

const CandidateSearch: React.FC<CandidateSearchProps> = ({ saveCandidate }) => {
  const [query, setQuery] = useState<string>(''); 
  const [results, setResults] = useState<CandidateQuery[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 
  const [searchKey, setSearchKey] = useState<string>('');


  useEffect(() => {
    const fetchCandidates = async () => {
      if (!searchKey.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

    try {
      const candidates = await searchGithub(); 
      setResults(candidates);
    } catch (err) {
      setError('Failed to search candidates'); 
    } finally {
      setLoading(false);
    }
  };
      fetchCandidates();
      }, [searchKey]);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSearch = (): void => {
    setSearchKey(query);
  };

  return (
    <div>
      <h1>Candidate Search Engine</h1>
      <input
        type="text"
        placeholder="Enter candidate name"
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <p>Name: {result.name}</p>
              <p>
                URL: <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a>
              </p>
              <button onClick={() => saveCandidate(result)}>Save Candidate</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidateSearch;