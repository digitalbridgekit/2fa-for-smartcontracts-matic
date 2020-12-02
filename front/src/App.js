import React from 'react';
import logo from './img/logo.jpeg';
import playstore from './img/AppStore_Buttons_googleplay-1.png';
import appstore from './img/AppStore_Buttons_appstore-1.png';
import scqr from './img/SC-QR-chart.png';
import Alert from '@material-ui/lab/Alert';
import {
  Button,
  TextField,
  Grid,
  Card,
  Typography,
  CardContent
} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Web3 from 'web3';
import { CONTRACT_ADDRESS } from './config.js';
import { ABI } from './config.js';


const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#3148e3',
      
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.free_state = "FREE";
    this.work_state = "BUSY";
    this.qr_page = "QR";
    this.pin_page = "PIN"
    this.state = {
      sourceAddress: null,
      status: "FREE",
      currentPage: "QR",
      pinOk: null,
      value: "",
      transactionHash: null,
      error: null,
    };
    this.clientContract = null;
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getSourceAddress();
  }
  
  getSourceAddress() {
    
    const ethEnabled = () => {
      if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable().then((accountList) => {
          this.setState({sourceAddress: accountList[0]});
          //console.log(accountList);
          this.clientContract = new window.web3.eth.Contract(ABI, CONTRACT_ADDRESS);
          this.clientContract.events.RequestGAPINCheckFulfilled({} , (error, event) => 
                {
                  console.log(event.returnValues.requestId);
                  console.log(event.returnValues.allowed);
                  this.responsePINCheck(event.returnValues.allowed);
                  this.setState({ transactionHash: null });
                  //this.setState({message: event.returnValues._message});
                });
        });  
          
        return true;
      }
      return false;
    }
    
    if (!ethEnabled()) {
      alert("Please install MetaMask to use this dApp!");
    } 
  }

  callRequestPINCheck() {
        
    window.web3.eth.net.getId()
      .then(networkId => {
        if (networkId.toString() !== '80001') {
          this.setState({ error: 'Wrong network. Please connect to Mumbai Matic network.' });
        } else {
          this.setState({
            status: "BUSY",
            pinOk: false,
          });
          
          this.clientContract.methods.requestGAPINCheck('alice',parseInt(window.web3.utils.sha3(this.state.value).slice(2,14),16)).send({ from: this.state.sourceAddress })
               .on('receipt', ({ transactionHash }) => this.setState({ transactionHash })).catch(error => this.setState({ error: error.message }))
               .finally(() => {console.log('1 of 2 stages finished ok!') });
      
        }
      });
 
  }

  responsePINCheck(_pinOk) {
    if (!_pinOk) this.setState({error: "Wrong PIN"});

    this.setState({
      status: "FREE",
      pinOk: _pinOk,
    });
   
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(_action) {
    if (_action === "SEND" && this.state.status === "FREE") {
      if (!document.getElementById("pin").value) {
        this.setState({error: 'Error, PIN number is empty!'});
      } else {
        this.setState({error: null});
        this.setState({pinOk: false});
        this.callRequestPINCheck();
      }
    } else {
        if (_action === "RESET") {
          this.setState({ status:  "FREE"});
          this.setState({pinOk: null});
          this.setState({value: ''});
          this.setState({error: null});
        } else {
          if (_action === "NEXT") {
            this.setState({ status:  "FREE"});
            this.setState({pinOk: null});
            this.setState({ currentPage:  "PIN"});
          }
        }
    }
  }
   
  render() {
    console.log(this.state.sourceAddress);
    
    return (
    <div >
      <div align="center" style={{ marginTop: 0, marginLeft: 0, marginRight: 0, backgroundColor: "white" }}>
        <Grid container direction="column" spacing={8} justify="center">
        <div id="QR" hidden={(this.state.currentPage.localeCompare("QR") !== 0)} align="center" style={{ marginTop: 10 , backgroundColor: "white"}} >
        <Card style={{maxWidth: 360}}> 
            <div>
              <div>
                <img src={logo} alt="logo" width="60%" style={{marginTop: 80, marginBottom: 40}}/>  
                <CardContent>
                <Typography gutterBottom component="p">
                  Open Google Authenticator <br/>and scan this code
                </Typography>
                </CardContent>
                < img width="200" alt="GA QR code" src={scqr} />
              </div>
              <div style={{padding:20}} algin="center">
              <CardContent>
                <Typography gutterBottom component="p">
                  Press to install Google Authenticator
                </Typography>
              </CardContent>
                <a target="blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
                <img alt="get it on playstore" style={{width: 133, paddingRight: 20 , height: 40}} src={playstore}/></a>
                <a target="blank" href="https://apps.apple.com/es/app/google-authenticator/id388497605">
                <img alt="get it on appstore"  style={{width: 133, height: 40}} src={appstore}/></a>
              </div>
            </div>
            <div style={{ padding: 20 }}>
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="primary" size="large" onClick={() => this.handleClick("NEXT")}>
                Next
              </Button>
            </ThemeProvider>
            </div>
          </Card>
          </div> 

          <div id="PIN" hidden={(this.state.currentPage.localeCompare("PIN") !== 0)} style={{ marginTop: 10 , backgroundColor: "white"}}>

          <Grid>
            <Card style={{maxWidth: 360}}> 
              <img src={logo} alt="logo" width="60%" style={{marginTop: 80, marginBottom: 40}}/>  
              

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Security verification
                  </Typography>
                  <Typography gutterBottom component="p">
                    To secure your account, please complete the following verification
                  </Typography>
                  <Typography gutterBottom component="p">
                    Google verification code.
                  </Typography>
                  <div>
                  <TextField id="pin" disabled={(this.state.status === "BUSY" || this.clientContract === null)} required placeholder="Input your current PIN number" value={this.state.value} onChange={this.handleChange} style={{padding: 24}} />
                  </div>
                  {(this.clientContract !== null && this.state.pinOk == null && this.state.error == null && !(this.state.status === "BUSY") && !this.state.pinOk)? 
                    <Alert severity="info">Enter the 6 digit code from Google Authenticator.</Alert>
                    : ''
                  }
                  {(this.state.pinOk !== null && this.state.pinOk && this.state.status === "FREE")? 
                    <Alert severity="success">Check, Successful!</Alert>
                    : ''
                  }
                  {this.state.error !== null ? 
                    <Alert severity="error">{this.state.error}</Alert>
                    : ''
                  }
                  {this.clientContract === null ? 
                    <Alert severity="error">Connect Metamask wallet to continue!</Alert>
                    : ''
                  }
                  {(this.state.transactionHash !== null && this.state.status === "BUSY")? 
                    <Alert severity="info"> 1 of 2 stages finished ok!</Alert>
                    : ''
                  }
                  {(this.state.status === "BUSY") ? 
                    <CircularProgress style={{padding: 10}}/>
                    : ''
                  }
                </CardContent>
              
              <div style={{ padding: 10 }}>
              <ThemeProvider theme={theme}>
                <Button variant="contained" style={{ margin: 10 }} disabled={(this.state.status === "BUSY" || this.clientContract === null)} color="primary" size="large" onClick={() => this.handleClick("SEND")}>
                  Send
                </Button>
                <Button variant="contained" style={{ margin: 10 }} disabled={(this.state.status === "BUSY" || this.clientContract === null)} color="primary" size="large" onClick={() => this.handleClick("RESET")}>
                  Reset
                </Button>
              </ThemeProvider>
              </div>
            </Card>
          </Grid>

        </div>
      </Grid>
      </div>  
    </div>      
    );
  }
}

export default App;
