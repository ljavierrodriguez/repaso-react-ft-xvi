import './App.css';
import { useState } from 'react';

function App() {
  const [url] = useState('https://api-4geeks-python.herokuapp.com');
  //const [url] = useState('http://127.0.0.1:5000');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [is_active, setIsActive] = useState(true);
  const [picture, setPicture] = useState(null);

  const [user, setUser] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);
    formData.append('is_active', is_active);
    formData.append('picture', picture)

    fetch(`${url}/api/register`, {
      method: 'POST',
      body: formData,
      /* headers: {
        'Content-Type': 'multipart/form-data'
      } */
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.id) {
          e.target.reset();
          setUsername('');
          setPassword('');
          setIsActive(true);
          setPicture(null);
          setUser(data);
        }

      })


  }

  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="email" name='username' value={username} onChange={e => setUsername(e.target.value)} className="form-control" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="is_active" className="form-label">
                  <input type="checkbox" name='is_active' checked={is_active} onChange={e => setIsActive(!is_active)} /> Active
                </label>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="picture" className="form-label">Picture</label>
                <input type="file" name='picture' onChange={e => setPicture(e.target.files[0])} className="form-control" />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary gap-2">
                  Register
                </button>
              </div>
            </form>
            <br />
            {
              !!user &&
              (
                <div className="card mb-3" style={{maxWidth: "540px"}}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={user?.avatar} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{user?.username}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }


          </div>
        </div>
      </div>

    </>
  );
}

export default App;
