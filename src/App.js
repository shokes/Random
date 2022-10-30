import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState(1);

  const url = `https://randomuser.me/api/?page=${number}&results=10&seed=abc`;

  const getUsers = async () => {
    const response = await fetch(url);
    const data = await response.json();

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
    } else if (number < 1) {
      setNumber(5);
    }
  };

  return (
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
        <button onClick={handlePrev}>prev</button>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>

        <button onClick={handleNext}> next</button>
      </div>
    </section>
  );
}

export default App;
