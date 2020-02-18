import React, { Component, Fragment } from 'react';

export default class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            fileName: 'Choose File',
        }
    }

    onChange = e => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name
        });
    }

    render() {
        console.log(this.state.file);
        return (
            <Fragment>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" onChange={this.onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">
                        {this.state.fileName}
                    </label>
                </div>
                {/* <input type='submit' value='Upload'> </input> */}
            </Fragment>
        );
    }
}