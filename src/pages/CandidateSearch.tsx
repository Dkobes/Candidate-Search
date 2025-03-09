import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateQuery from '../interfaces/Candidate.interface';



const CandidateSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<CandidateQuery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
  }
  setLoading(true);
  setError(null);
  
    try {
      const candidates: CandidateQuery[] = await searchGithub(query);
      const user: CandidateQuery | null = await searchGithubUser(query);

      const combinedResults = user ? [...candidates, user] : candidates;
      setResults(combinedResults);
    } catch {
      setError('Failed to search candidates');
    } finally {
      setLoading(false);
    }
  };

  fetchCandidates();
}, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <input
        type="text"
        placeholder="Enter candidate name"
        value={query}
        onChange={handleInputChange}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <p>Name: {result.name}</p>
              <p>URL: <a href={result.url}>{result.url}</a></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

export default CandidateSearch;
