import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);

  const reject = (id: number): void => {
    const newCandidates = candidates.filter((candidate: Candidate) => candidate.id !== id);
    setCandidates(newCandidates);
  }

  useEffect(() => {
    const array = localStorage.getItem('candidates');
    const data = array ? JSON.parse(array) : []; 
    setCandidates(data);
  }, []);

  useEffect(() => localStorage.setItem('candidates', JSON.stringify(candidates)), [candidates])

  return (
    <>
      {JSON.stringify(candidates) === '[]' ? (
        <div style={{backgroundColor: 'black', borderRadius: 25, textAlign: 'center'}}>
          <h2>No Candidates Saved</h2>
        </div>
      ) : (
        <>
          <h1>Potential Candidates</h1>
          <table className="table">
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Location</th>
      <th scope="col">Email</th>
      <th scope="col">Company</th>
      <th scope="col">Reject</th>
    </tr>
  </thead>
  <tbody>
    {candidates.map((candidate: Candidate) => (
      <tr key={candidate.id}>
        <td><img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} /></td>
        <td>
          <h3>{candidate.name}</h3>
          <h3>({candidate.username})</h3>
        </td>
        <td>{candidate.location}</td>
        <td>{candidate.email}</td>
        <td>{candidate.company}</td>
        <td><button onClick={() => reject(candidate.id)}>Reject</button></td>
      </tr>
    ))}
  </tbody>
</table>
      </>
      )}
    </>
  );
};

export default SavedCandidates;