import React, {useState} from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios";
const AddIntern = () => {
    
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(' ')
    const[name, setName] = useState(' ');
    const[address, setAddress] = useState(' ');
    const[dob, setDob] = useState(null);
    const[selectionstatus, setselectionstatus] = useState("false")

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleDobChange = (date) => {
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        setDob(dateOnly);
    };

    const handleSelectionStatusChange = (event) => {
        setselectionstatus(event.target.value.toString());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const internDetails = {name, address, dob, selectionstatus};

        try {
            setLoader(true)
            setError(' ')
            const interns = await axios.post('http://localhost:3000/internmembers', {
                name,
                address,
                dob,
                selectionstatus
            });
            alert('Intern added Successfully !!!')
            

        }catch (e){
            console.error('Error:', e)
            setError('Sorry, Failed to add new intern details')
        }finally{
            setLoader(false)
        }

    };

    return (
        <div className="container">
            <h2>Add New Intern</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Intern's Name:</label></td>
                            <td><input type="text" id="name" value={name} onChange={handleNameChange} required /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><br /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="address">Address:</label></td>
                            <td><input type="text" id="address" value={address} onChange={handleAddressChange} required /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><br /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="dob">DOB:</label></td>
                            <td>
                                <ReactDatePicker
                                    selected={dob}
                                    onChange={handleDobChange}
                                    dateFormat="yyyy-mm-dd"
                                    maxDate={new Date()}
                                    name="dob"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><br /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="selectionstatus">Selection Status:</label></td>
                            <td>
                                <select id="selectionstatus" name="selectionstatus" value={selectionstatus} onChange={handleSelectionStatusChange} required>
                                    <option value="false">False</option>
                                    <option value="true">True</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" ><button type="submit">Save</button></td>
                        </tr>
                    </tbody>
                </table>

            </form>

        </div>
    );   
}

export default AddIntern;