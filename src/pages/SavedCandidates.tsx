import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);

  const reject = (id: number): any => {
    const newCandidates = candidates.filter((candidate: any) => id !== candidate.id);
    setCandidates(newCandidates);
  };

  useEffect(() => {
    const array = localStorage.getItem('candidates');
    const data = (JSON.parse(array as string));
    setCandidates(data);
  }, [])

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
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Email</th>
              <th scope="col">Company</th>
              <th scope="col">Bio</th>
              <th scope="col">Reject</th>
            </tr>
            <tbody>
              {candidates.map((candidate: any) => {
                return (
                  <tr key={candidate.id}>
                    <th scope="row"><img src={candidate.avatar_url}/></th>
                    <td><h3>{candidate.name}</h3><h3>({candidate.username})</h3></td>
                    <td>{candidate.location}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.company}</td>
                    <td>{candidate.bio}</td>
                    <td><button onClick={() => reject(candidate.id)}>Reject</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </>
      )}
    </>
  );
};

export default SavedCandidates;