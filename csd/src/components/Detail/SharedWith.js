import React, { Component }from 'react';
import '../../styles/detailView.css';
import { get, post} from '../../services/api';

export default class SharedWith extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            reporter: this.props.reporter,
            issueRef: this.props.issueRef,
            shared: false,
        }
    }

    isShared() {
        get('request/'+this.state.issueRef+'/participant').then((result) => {
            if(result.values.length === 0) {
                //console.log('isnt shared');
                this.setState({shared:false})
            } else {
                //console.log('is shared');
                this.setState({shared:true})
            }
        });
    }

    componentDidMount() {
        this.isShared();
    }

    handleCheckboxChange = changeEvent => {
        //const { name } = changeEvent.target;

        if(this.state.shared) {
            //delete shares
            this.setState({
                shared: false
            })
        } else {
            post('organizationuser')
            this.setState({
                shared: true
            })
        }
    }

    render() {
        return (
            <span>
                <p className='Descriptor Text'>
                    Reporter<br/>
                    <span className='Content Text'>
                        {this.state.reporter}
                    </span>
                </p>
                {/* <Checkbox
                    id="Shared With Organization"
                    label="Shared With Organization"
                    name="Shared With Organization"
                    value="1"
                    checked={this.state.shared}
                    checkboxRef={() => this.checkBoxHandler()}
                /> */}
                {/* <label>
                    <input type='checkbox'
                        checked={this.state.shared}
                        onChange={this.handleCheckboxChange}
                    />
                    Is Shared
                </label> */}
                
                
            </span>
        );
    }
}