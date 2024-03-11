import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

const EditIntern = () => {
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(' ');
    const [intern, setIntern] = useState({
        name: '',
        address: '',
        dob: null,
        selectionstatus: "false"
    });

    useEffect(() => {
        async function loadIntern() {
            setLoader(true);
            setError(' ');
            try {
                const response = await axios.get(`http://localhost:3000/internmembers/${id}`);
                setIntern(response.data);
            } catch (e) {
                console.log(e);
                setError('Sorry, Cannot fetch intern data');
            } finally {
                setLoader(false);
            }
        }
        loadIntern();
    }, [id]);

    const handleNameChange = (event) => {
        setIntern({ ...intern, name: event.target.value });
    };

    const handleAddressChange = (event) => {
        setIntern({ ...intern, address: event.target.value });
    };

    const handleDobChange = (date) => {
        setIntern({ ...intern, dob: date });
    };

    const handleSelectionStatusChange = (event) => {
        setIntern({ ...intern, selectionstatus: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoader(true);
            setError(' ');
            await axios.put(`http://localhost:3000/internmembers/${id}`, intern);
            alert('Intern details updated successfully');
        } catch (e) {
            console.error('Error:', e);
            setError('Sorry, Failed to update intern details');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="container">
            <h2>Edit Intern Details</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Intern's Name:</label></td>
                            <td><input type="text" id="name" value={intern.name} onChange={handleNameChange} required /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><br /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="address">Address:</label></td>
                            <td><input type="text" id="address" value={intern.address} onChange={handleAddressChange} required /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><br /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="dob">DOB:</label></td>
                            <td>
                                <ReactDatePicker
                                    selected={intern.dob}
                                    onChange={handleDobChange}
                                    dateFormat="yyyy-MM-dd"
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
                                <select id="selectionstatus" name="selectionstatus" value={intern.selectionstatus} onChange={handleSelectionStatusChange} required>
                                    <option value="false">False</option>
                                    <option value="true">True</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" ><button type="submit">Update</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default EditIntern;
