import { useEffect, useState } from 'react';
import Loading from '../Loading';
import ErrorBoundary from '../ErrorBoundary';
import OurFallbackComponent from '../FallBack';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const url = `https://randomuser.me/api/?page=${number}&results=10&seed=abc`;

  const getUsers = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    setUsers(data.results);
  };
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  const handleNext = () => {
    if (number < 5) {
      setNumber(number + 1);
    } else {
      setNumber(1);
    }
  };

  const handlePrev = () => {
    if (number > 1) {
      setNumber(number - 1);
    } else if (number === 1) {
      setNumber(5);
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <ErrorBoundary FallbackComponent={OurFallbackComponent}>
        <section className='container'>
          <div className='grid-users'>
            {users.map((user) => {
              const {
                gender,
                email,
                phone,
                dob: { age },
                name: { first, last },
                picture: { large: image },
              } = user;

              return (
                <div className='card' key={email}>
                  <img src={image} alt={first} className='image' />
                  <div>
                    <span>
                      {first} {last}
                    </span>
                    <div>{gender}</div>
                    <div>{age}</div>
                    <div>{email}</div>
                    <div>{phone}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='functions'>
            <button onClick={handlePrev} className='button'>
              Prev
            </button>
            <span
              onClick={() => setNumber(1)}
              className={`number ${number === 1 ? 'active' : null}`}
            >
              1
            </span>
            <span
              onClick={() => setNumber(2)}
              className={`number ${number === 2 ? 'active' : null}`}
            >
              2
            </span>
            <span
              onClick={() => setNumber(3)}
              className={`number ${number === 3 ? 'active' : null}`}
            >
              3
            </span>
            <span
              onClick={() => setNumber(4)}
              className={`number ${number === 4 ? 'active' : null}`}
            >
              4
            </span>
            <span
              onClick={() => setNumber(5)}
              className={`number ${number === 5 ? 'active' : null}`}
            >
              5
            </span>

            <button onClick={handleNext} className='button'>
              Next
            </button>
          </div>
        </section>
      </ErrorBoundary>
    );
  }
};

export default Home;
