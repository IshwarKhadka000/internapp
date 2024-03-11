import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import InternList from './InternsList';
import AddIntern from './AddIntern';
import EditIntern from './EditInterns';

function  App() {
return (
    <div>
        <h1 className="App">
            CRUD Operation
        </h1>
        
        <BrowserRouter>
            <div>
                <p><Link to="/form">Add Interns</Link></p>
                <p><Link to="/table">View Interns</Link></p>
            </div>
                
            <Routes>
                <Route path="/form" element={<AddIntern/>}></Route>
                <Route path="/table" element={<InternList />}></Route>
                <Route path="/edit/:id" element={<EditIntern/>}></Route>
            </Routes>

        </BrowserRouter>
    </div>
);

}

export default App;
