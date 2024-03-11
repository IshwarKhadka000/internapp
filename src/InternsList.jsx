import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const InternList = () => {
    const [data, setData] = useState(null)
    const[loader, setLoader]=useState(false)
    const[error, setError]=useState(' ')

    useEffect(()=>{
        async function LoadInterns() {
            setLoader(true)
            setError(' ')
            try {
                const list = await axios.get('http://localhost:3000/internmembers')
                setData(list.data)
                console.log(list)
            } catch (e) {
                console.log(e)
                setError('Sorry, Empty interns list')

            } finally {
                setLoader(false)
            }
        } 
        LoadInterns();
    }, [])


    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Intern List</h2>

                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Name</td>
                                <td>Address</td>
                                <td>DOB</td>
                                <td>Selection Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map( intern =>(
                                    <tr key={intern.id}> 
                                        <td>{intern.name}</td>
                                        <td>{intern.address}</td>
                                        <td>{intern.dob}</td>
                                        <td>{intern.selectionstatus}</td>
                                        <td>
                                            <Link to={`/edit/${intern.id}`}>Edit</Link>
                                        </td>
                                    </tr>
                                ) )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );

}

export default InternList;