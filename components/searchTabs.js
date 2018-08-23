import React, { Component } from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import Search from './search.js'

class SearchTabs extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
    
        this.state = {
          key: 0
        };
      }

    handleSelect(key){
        this.setState({
            key
        })
        this.props.handleTabs(key)
    }
    render() {
        return (
            <Tabs
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                id="controlled-tab-example">
                <Tab eventKey={0} title="Term">
                    <Search handleSearch={this.props.handleSearch} searchPlaceHolder="Search Term"/>
                </Tab>
                <Tab eventKey={1} title="Screen Name">
                    <Search handleSearch={this.props.handleSearch} searchPlaceHolder="Search Screen Name"/>
                </Tab>
                <Tab eventKey={2} title="Name">
                    <Search handleSearch={this.props.handleSearch} searchPlaceHolder="Search Name"/>
                </Tab>
                


            </Tabs>
        );
    }
}


export default SearchTabs;