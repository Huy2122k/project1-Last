import React from 'react';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import './fonts/Linearicons-Free-v1.0.0/icon-font.min.css'
import './vendor/animate/animate.css'
import './vendor/css-hamburgers/hamburgers.min.css'
import './vendor/animsition/css/animsition.min.css'
import './vendor/select2/select2.min.css'
import './vendor/daterangepicker/daterangepicker.css'
import './css/main.css'
import './css/util.css'
class indexz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      Pdf_url: '', 
      Json_url: ''
    };
  }
  mySubmitHandler = (event) => {
    let x = this.myTrim(this.state.Pdf_url);
    let y = this.myTrim(this.state.Json_url);
    console.log(x);
    console.log(y);
       if(x===y){
          // do sth
          console.log("OK");
       }else{
        event.preventDefault();
        alert('pdf file và json file không thuộc cùng tài liệu');
       }
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  myTrim(x) {
    return x.replace('/result.json','').replace('/uploadFile.pdf','');
  }
  componentDidMount () {
        const scripts2 = document.createElement("script");
        scripts2.src = './vendor/jquery/jquery-3.2.1.min.js'
        scripts2.async = true;
        document.head.appendChild(scripts2);
        
        
        //hhh
        setTimeout(function(){
          const script = document.createElement("script");
        script.src = './js/main.js';
        script.async = true;
        document.body.appendChild(script);
      }, 3000); 
    }
    render() {
        return (
        <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <form className="login100-form validate-form" name="myForm" onSubmit={this.mySubmitHandler} action="/hightlight" method="get">
                  <span className="login100-form-title p-b-43">
                    Kiểm tra đạo văn
                  </span>
                  <div className="wrap-input100 validate-input">
                    <input className="input100" type="url" name="Pdf_url" onChange={this.myChangeHandler}/>
                    <span className="focus-input100" />
                    <span className="label-input100">Pdf URL</span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input type = "url" className="input100" name="Json_url" onChange={this.myChangeHandler}/>
                    <span className="focus-input100" />
                    <span className="label-input100">JSON Link</span>
                  </div>
                  <div className="flex-sb-m w-full p-t-3 p-b-32">
                    <div className="contact100-form-checkbox">
                      <input className="input-checkbox100" id="ckb1" type="checkbox" name="DHBK" />
                      <label className="label-checkbox100" htmlFor="ckb1">
                        Trường ĐHBKHN?
                      </label>
                    </div>
                  </div>
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn" type="submit"> 
                      Xem
                    </button>
                  </div>
                  <div className="text-center p-t-46 p-b-20">
                    <span className="txt2">
                    </span>
                  </div>
                </form>
                <div className="login100-more" style={{backgroundImage: 'url("images/bg-01.jpg")'}}>
                </div>
              </div>
            </div>
          </div>          
        );
    }
}

export default indexz;