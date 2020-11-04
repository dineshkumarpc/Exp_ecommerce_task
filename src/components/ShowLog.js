import React from 'react'

function ShowLog(props) {
    return (
        <div>
            <div className="table-responsive">


                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Email</th>
                            <th scope="col">Type Of Visit</th>
                            <th scope="col">Person To Visit</th>
                            <th scope='col'>Date of Entry</th>
                            <th scope='col'>Time of Entry</th>
                            <th scope='col'>Time of Exit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data?.length > 0 ?
                            props.data?.map((x, index) => {
                                return <tr key={index}>
                                    <td>{x.name}</td>
                                    <td><img src={`${x.photo}`} alt='No Image Found' width="30" height="30" /></td>
                                    <td>{x.email}</td>
                                    <td>{x.typeOfVisit}</td>
                                    <td>{x.personToVisit}</td>
                                    <td>{x.dateOfEntry}</td>
                                    <td>{x.timeOfEntry}</td>
                                    <td>{x.timeOfExit}</td>
                                </tr>
                            })
                            : <></>}




                    </tbody>
                </table> </div>
        </div>
    )
}

export default ShowLog
