import React, { Component } from 'react'
import axios from 'axios'

export default class paymentDisplay extends Component {
    state={
        Data:[]
    }

    // initialising data fetching from API
 async componentDidMount(){
const{data}= await axios.get('/api/employee/attendances');
this.setState({ Data:data})
 }
    render() {
        const{Data}=this.state
        return (
            <div>
                {Data}
            </div>
        )
    }
}
