import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export class Create extends React.Component{
    constructor(props){
        super(props)
        this.fetch = this.fetch.bind(this)
        this.rend = this.rend.bind(this)
        this.subm = this.subm.bind(this)
        this.state = {
            data: '',
            arr: []
        }
    }
    componentDidMount(){
    }
    componentDidUpdate(){
    }
    rend(e){
        console.log(e.target.value);
        let ans = e.target.value
        this.setState((prev)=>{
            return {
                arr: [...prev.arr, ans]
            }
        });
        e.target.value = ''
    }
    fetch(){
        axios.get('/api/create').then((response)=>{
            console.log(response.data)
        })
    }
    subm(e){
        e.preventDefault();
        axios.post('/api/users', {
            username: e.target.elements.username.value,
            surname: e.target.elements.surname.value
        }).then((e)=>{console.log(e.data.errors)}).catch((e)=>{e})
    }
    render(){
    return (
        <div>
            <h1>Create</h1>
            <button onClick={this.fetch}>Fetch</button>
            <input type='text' onBlur={this.rend} placeholder='here i am'/>
            {this.state.arr.map((el)=>{
                return <p key={el}>{el}</p>
            })}
            <Link to='/'>Go back</Link>
            <form onSubmit={this.subm}>
                <input type="text" name='username'/>
                <input type='text' name='surname'/>
                <button>submit</button>
            </form>
        </div>
    );
}
}