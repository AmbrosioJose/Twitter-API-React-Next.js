import React, { Component } from 'react';
import {FormGroup, FormControl,  Button,ButtonToolbar} from 'react-bootstrap';


class Search extends Component {
    state = {
        search:''
    }
    
    onChange= (e)=>{
        console.log('change')
        this.setState({search: e.target.value})
    }
    onClick =() =>{
        console.log('clicked')
        this.props.handleSearch(this.state.search)
    }
    handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            console.log('pressed enter')
            this.props.handleSearch(this.state.search)
          }
    }
    
    render() {
        
        return (
            <div className="well" >
                <FormGroup controlId="formControlsSelect">
                    <FormControl   placeholder={this.props.searchPlaceHolder} type="text" onKeyUp={this.handleKeyPress} onChange={this.onChange} ></FormControl>
                    <ButtonToolbar>
                        <Button  bsStyle="primary" onClick={this.onClick} bsSize="large" block>Go</Button>
                    </ButtonToolbar>
                </FormGroup>

            </div>
            

        );
    }
}


export default Search;