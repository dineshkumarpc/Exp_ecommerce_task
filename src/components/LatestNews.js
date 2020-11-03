import React, { Component } from 'react'
import { readAxios } from '../Services/APIService'
export class LatestNews extends Component {
    constructor(props) {
        super(props)

        this.state = {
            latestNews: [],
            date:""
        }
    }
    getLatestNewsData = async () => {
        let response = await readAxios()
        if (response) {
            this.setState({
                latestNews: response.articles
            })
        }
    }

    componentDidMount() {
       
    
        this.getLatestNewsData()
    }
    render() {
        return (
            <div>
                <table className="table table-responsive table-bordered">
                    <thead className="">
                        <tr>
                            <th scope="col">Author</th>
                            <th scope="col">Content</th>
                            <th scope="col">Image</th>
                            <th scope="col">Description</th>
                            <th scope="col">Published At</th>
                            <th scope="col">Name</th>
                            <th scope="col">Title</th>
                           

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.latestNews?.map((item =>
                            <tr key={item.content}>
                                <td>{item.author}</td>
                                <td>{item.content}</td>
                                <td><img
                                    src={item.urlToImage}
                                    alt="new"
                                    width="100"
                                    height="100"
                                /></td>

                                <td>{item.description}</td>
                                <td>{item.publishedAt}</td>
                                <td>{item.source.name}</td>
                                <td>{item.title}</td>
                             

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default LatestNews
