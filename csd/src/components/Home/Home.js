import React, { Component }from 'react';
import { Layout, Main, Toast, } from 'cauldron-react';
import Grid from '@material-ui/core/Grid';
import IssueTable from './IssueTable';
import Header from '../Header';
import '../../App.css';
import '../../styles/home.css'
import Footer from '../Footer';


export default class Home extends Component {

    componentDidMount() {
        document.title = "Support | Deque Systems";
    }

    constructor(props) {
        super(props);

        this.state = {
            submitSuccess: props.submitSuccess,
        }
    }

    render() {
        return (
            <div>
                <Header></Header>
                
                <Layout>
                    <Main className='Page'>
                     <Toast
                        show={this.state.submitSuccess}
                        autoHide={5000}
                        type="confirmation"
                        >
                        Your Request Has Been Submitted
                    </Toast>
                    <Toast
                        show={this.state.submitSuccess === false}
                        autoHide={5000}
                        type="caution"
                        >
                        Request Failed, try again later
                    </Toast>
                    <Grid container spacing={3} >
                        <Grid item xs={12} md={5}>
                            <h1 className='HeadText'>
                                Deque Customer Support
                            </h1>
                            <p className='BodyText'>
                                Welcome to the Deque Customer support center. Here, you can raise a new customer support request, view the status of your pending requests, or modify submitted requests.
                            </p>
                            <p className='BodyText'>
                                You can raise a Customer Support Request at the link below
                            </p>
                            <p className='ButtonContainer'>
                                <a href="/request" className='RequestLink' alt="Link to make new support request">
                                    Make a Request
                                </a>
                            </p>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <h2 className='SecondHead'>
                                Open Requests
                            </h2>
                            <div >
                                <IssueTable></IssueTable>
                            </div>
                        </Grid>
                    </Grid>
                    </Main>
                    <Footer/>
                </Layout>
            </div>
        );
    }
}