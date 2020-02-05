import React, { Component }from 'react';
import { TopBar, } from 'cauldron-react';
import '../App.css';

export default class Header extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        }
    }
    
    render() {
        return(
            <TopBar className='Header'>
                <a href="http://www.deque.com" className='HomeLink'>
                    <img src="https://accessibility.deque.com/hubfs/logo-white.svg" width="100" alt="Link to Deque Home" title="Deque"></img>
                </a>
          </TopBar>
        );
    }
}