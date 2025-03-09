import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const currentPage: string = useLocation().pathname;

  return (
    <ul className='nav'>
      <li className='nav-item'>
        <Link 
          to='/'
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>
            Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          to='/SavedCandidates'
          className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}>
            Potential Candidates
        </Link>
      </li>
    </ul>
  )
};

export default Nav;