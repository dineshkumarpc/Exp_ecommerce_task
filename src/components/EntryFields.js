import React, { Component } from 'react'
import TimePicker from 'react-time-picker';
import LatestNews from './LatestNews';
import Webcam from "react-webcam";
import ShowLog from './ShowLog'
import '../styles/Fields.css'
const camera = "environment";

export class EntryFields extends Component {
    constructor(props) {
        super(props)
        this.mediaRecorder = undefined;

        this.state = {
            name: '',
            selfie: '',
            email: '',
            typeOfVisit: '',
            personToVisit: '',
            dateOfEntry: "",
            timeOfEntry: '',
            timeOfExit: '',
            checked: "No Image",
            logData: [],
            checkValid:true,


        }
        if (localStorage.getItem('logData')) {
            this.setState({
                logData: JSON.parse(localStorage.getItem('logData'))
            })
        }
    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value,

        });


    }
    handleSubmit = (e) => {
        e.preventDefault();
           
        const {name,email,typeOfVisit,personToVisit,timeOfEntry,timeOfExit,checked}= this.state
        this.setState({
            checkValid:false
        })
         
        if(
            name.length > 0  && email.length > 0 && typeOfVisit.length > 0 && personToVisit.length > 0 && timeOfEntry.length > 0 && timeOfExit.length > 0 && checked === 'Captured Image'
        ){
        let obj = [{
            name: this.state.name,
            email: this.state.email,
            typeOfVisit: this.state.typeOfVisit,
            personToVisit: this.state.personToVisit,
            dateOfEntry: this.state.dateOfEntry,
            timeOfEntry: this.state.timeOfEntry,
            timeOfExit: this.state.timeOfExit,
            photo: this.state.photo
        }]
        if (!localStorage.getItem('logData')) {
            localStorage.setItem('logData', JSON.stringify(obj))
            this.setState({
                logData: obj
            })
        } else {
            let data = JSON.parse(localStorage.getItem('logData'))
            let ob = obj
            this.setState({
                logData: data.concat(ob)
            })
            localStorage.setItem('logData', JSON.stringify(data.concat(ob)))
        }
        this.setState({
           name: '',
           selfie: '',
           email: '',
           typeOfVisit: '',
           personToVisit: '',
           timeOfEntry: '',
           timeOfExit: '',
           checkValid:true,
           checked: "No Image",
        })
    }

    }
    onChangeTime1 = time =>{
         this.setState({ timeOfEntry:time})
    }
    onChangeTime2 = time =>{
         this.setState({ timeOfExit:time})

   }

    handleWebcamDidMount = elem => {
        this.refs = elem;
    };
    handleCapture = e => {
        e.preventDefault();
        this.setState({
            photo: this.refs.getScreenshot(),
            checked: "Captured Image"
        }, () => {
        });
       
    };
    componentDidMount() {
        let f = new Date();
        this.setState({
            dateOfEntry: f.getDay() + 1 + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
        })
        if(JSON.parse(localStorage.getItem('logData'))){
            this.setState({
                logData: JSON.parse(localStorage.getItem('logData'))
            })
        }
    }
    render() {
        // const{logData}=this.state
        return (
            <div>
                <div className="container-fluid ">

                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#visitor">Visitor Form</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#latest">Latest News</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div id="visitor" className=" tab-pane active"><br />
                        <div className="row">
                        <div className='col-md-6'>
                            <div className="shadow p-3 mb-5 bg-white rounded my-2">
                                <p className="text-center">Add Visitor</p>
                                <form >
                                    <div className="form-row">

                                        <div className="form-group col-md-6">
                                            <label  >Name</label>
                                            <input type="text" className="form-control" name='name' value={this.state.name} onChange={(e) => this.handleChange(e)} placeholder="Name" required />
                   {this.state.name.length>0 || this.state.checkValid?<span></span>:<span className="invalid">Required</span>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Selfie</label>
                                            <input type="text" data-toggle="modal" data-target="#exampleModalCenter" className="form-control" name='selfie' value={this.state.checked} onChange={(e) => this.handleChange(e)} placeholder="Selfie" />
                                            {this.state.checked!=="No Image" || this.state.checkValid?<span></span>:<span className="invalid">Required</span>}
                                        </div>

                                    </div>

                                    <div className="form-row">

                                        <div className="form-group col-md-6">
                                            <label >Email</label>
                                            <input type="email" className="form-control" name='email' value={this.state.email} onChange={(e) => this.handleChange(e)} placeholder="Email" />
                                            {this.state.email.length>0 || this.state.checkValid?<span></span>:<span className="invalid">Required</span>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Type of Visit</label>
                                            <select name='typeOfVisit' onChange={(e) => this.handleChange(e)} className="form-control" >
                                                <option selected>Choose...</option>
                                                <option value='Meeting' >Meeting</option>
                                                <option value='Delivary' >Delivary</option>
                                                <option value='Person'>Person</option>
                                            </select>
                                            {this.state.typeOfVisit.length>0 || this.state.checkValid?<span></span>:<span className="invalid">Required</span>}
                                        </div>

                                    </div>

                                    <div className="form-row">

                                        <div className="form-group col-md-6">
                                            <label >Person To Visit</label>
                                            <input type="text" name='personToVisit' className="form-control" value={this.state.personToVisit} onChange={(e) => this.handleChange(e)} placeholder="Person Name" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Date of Entry</label>
                                            <input type="text" name='dateOfEntry' className="form-control"
                                                value={this.state.dateOfEntry} disabled />

                                        </div>

                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6 ">
                                            <label className="mr-3">Entry Time : </label>
                                            <TimePicker
                                                onChange={(e) => this.onChangeTime1(e)}
                                                value={this.state.timeOfEntry}
                                            />
                                            {this.state.timeOfEntry.length>0 || this.state.checkValid?<span></span>:<p className="invalid">Required</p>}


                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="mr-3">Exit Time : </label>
                                            <TimePicker
                                                onChange={(e) => this.onChangeTime2(e)}
                                                value={this.state.timeOfExit}
                                            />
                                        {this.state.timeOfExit.length>0 || this.state.checkValid?<span></span>:<p className="invalid">Required</p>}

                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 offset-md-5">
                                            <button type="submit" className="btn btn-primary " onClick={(e) => this.handleSubmit(e)} >Submit</button>
                                        </div>
                                    </div>



                                </form>


                            </div>
                        </div>

                        <div className='col-md-6'>
                        <ShowLog data={this.state.logData}/>
                           

                        </div>

                    </div>
                        </div>
                        <div id="latest" className=" tab-pane fade"><br />
                            <LatestNews />
                        </div>
                    </div>




                   
                </div>

                {/* <div className="container-fluid bg-light">
                    <h1 className="text-center">Latest News</h1>
                    <LatestNews></LatestNews>
                </div> */}
                {/* modal */}
                <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Selfie</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div >
                                    <Webcam
                                        audio={false}
                                        videoConstraints={{ facingMode: camera }}
                                        ref={this.handleWebcamDidMount}
                                    />
                                </div>
                                <div className="row">
                                        <div className="col-md-6 offset-md-5">
                                        <button className="btn btn-primary" data-dismiss="modal" onClick={this.handleCapture}>Capture Photo</button>
                                        </div>
                                    </div>

                               

                            </div>

                        </div>
                    </div>
                </div>





            </div>
        )
    }
}

export default EntryFields
