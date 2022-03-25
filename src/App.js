
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  // Set State
  const [data, setData] = useState([]);

  // fetch data from api url
  const fetchData = async () => {
    const response = await axios.get('https://storage.googleapis.com/aller-structure-task/test_data.json');
    // console.log('data====>', response.data[0]);
    setData(response.data[0]);
  }

  // update title here
  const updateTitle = (e) => {
      // Hit API for update title
      //  ... API not provided
  }

  // Fetch data at first render
  useEffect(() => {
    fetchData();
  }, [])


  const handleChange = (event, i, index) => {
    // console.log('iiiiiii', i, '=====', index)
    const newDataValue = [...data];
    newDataValue[index].columns[i].title = event.target.value;
    setData(newDataValue);
  }

  // console.log('data state=====>', data)

  return (
    <div className="App">
      {/* Headling all data */}
      <h1 className='text-primary mt-5'>All Data</h1>
      <div className='container mt-3'>
        {data && data.map((el, index) => (
          <div key={index} style={{ border: '1px solid blue', borderRadius: 5, marginBottom: 15 }}>
            <div className='m-5'>
              <h3 className='text-secondary'>{el.type + ' ' + (index + 1)}</h3>
              <hr />
              <div className='row'>
                {el.columns && el.columns.map((e, i) => (
                  <div key={i} className={`col-md-${e.width}`}>
                    <div>
                      <h1 className='mb-3'>{e.type}</h1>
                      <a href={e.url} rel="noreferrer" target='_blank'>
                        <img src={e.imageUrl} alt={'sample'} className='mb-3' style={{ maxHeight: '65px' }} />
                      </a>
                      <div className='d-flex input-class'>
                        <input className='form-control' name='title' placeholder='Edit title...' onChange={(event) => handleChange(event, i, index)} value={e.title} />
                        <button className='btn btn-success mt-2' onClick={updateTitle} >Edit Title</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}        
      </div>
    </div>
  );
}

export default App;
