// @flow

import React, { Component } from "react";

import URLSearchParams from "url-search-params";
import Sidebar from "./Sidebar";
import { message} from 'antd';
import 'antd/dist/antd.css';
import type { T_Highlight, T_NewHighlight } from "../../src/types";

import "./style/App.css";
// import res from './res.json';
import res from '../../result_v1.json';
import PDFViewer from "./PDFViewer";
import iconDownload from '../images/cloud-download.png';
import iconLeftArrow from '../images/left-arrow.png';
import iconRightArrow from '../images/right-arrow.png';
import iconClosePopup from '../images/close.png';
import axios from 'axios';
import { assign, set } from "lodash";

type T_ManuscriptHighlight = T_Highlight;

type Props = {};

type State = {
  highlights: Array<T_ManuscriptHighlight>
};

var offset = 0;
var hightlight_link = '';
var uni_id;

// const searchParams = new URLSearchParams(location.search);
// const url = searchParams.get("url") || DEFAULT_URL;


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      highlights: JSON,
      contentPopup: {
        name: '',
        link: '',
        text: ''
      },
      dataSameArray: new Array(),
      showPopup: false,
      showPopUpErr: false,
      showCommentBar : false,
      url: String,
      res: JSON,
    }
    this.state.State;
  }
  onPressSentence= (value) => {
    offset = 0;
    this.setState({
      dataSameArray: value
    });
    let detailDoc = this.state.res.res.s[value[0][0]];
    this.setState({
      contentPopup: {
        name: detailDoc.n,
        link: detailDoc.o,
        text: value[0][2],
        private: detailDoc.private
      }
    })
    if (document.getElementById('document-popup-sidebar') !== null) {
      document.getElementById('document-popup-sidebar').remove();
    }
    this.setState({
      showPopup: true
    })
  }

  preSlide = () => {
    if (offset == 0) {
      offset = this.state.dataSameArray.length - 1;
    } else {
      offset--;
    }
    let detailDoc = this.state.res.res.s[this.state.dataSameArray[offset][0]];
    this.setState({
      contentPopup: {
        name: detailDoc.n,
        link: detailDoc.o,
        text: this.state.dataSameArray[offset][2],
        private: detailDoc.private
      }
    })
  }

  nextSlide = () => {
    if (offset == this.state.dataSameArray.length - 1) {
      offset = 0;
    } else {
      offset++;
    }
    let detailDoc = this.state.res.res.s[this.state.dataSameArray[offset][0]];
    this.setState({
      contentPopup: {
        name: detailDoc.n,
        link: detailDoc.o,
        text: this.state.dataSameArray[offset][2],
        private: detailDoc.private
      }
    })
  }
  ScrolltoHL = ( highlight) => {
    this.viewer.scrollToComment(highlight);
  }
  closePopup = () => {
    this.setState({
      showPopup: false
    })
  }
  closeCommentBox = () => {
    this.setState({
      showCommentBar: false
    })
  }
  openCommenrBox = () => {
    if(this.state.res.hasOwnProperty("comment")){
      this.setState({
        showCommentBar: true
      })
    }
    else{ alert("Chưa có bình luận được thêm!");}
  }
   Addsuccess = (mess) => {
    message.success(mess);
  };
  componentWillMount () {
      let query = new URLSearchParams(this.props.location.search);
      let origin_link = query.get('origin_link');
      let json_link = query.get('json_link');
      uni_id = query.get('uni_id');
      if (query.has('hightlight_link')) {
        hightlight_link = query.get('hightlight_link');
      }

      this.setState({
        url: "20132320_Tran_Thi_Dieu_Linh_1528176806088.pdf"  //origin_link
      });
      
      const preview = this.preview;
      fetch("http://202.191.56.254:8000/log-check/2020.11.08.16.15.21SCMCGQ3Z/result.json")
      
      .then((Response) => Response.json())
      .then((responseJson) => {
        preview(responseJson);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // init highlights
     preview = async (responseJson) => {
      let highlights = [];
      let hightlight_set= new Set();
    this.setState({
      res: responseJson
    });
    const {res} = this.state;
    
    Object.keys(res.highlight).map((page, _) => {
      Object.keys(res.highlight[page]).map((senIdx, _) => {
        let highlight = res.highlight[page][senIdx];
        if (!highlight.hasOwnProperty("boxes")) return;
        highlight.boxes.map((box, _) => {
        let hightlightset = {
          page: parseInt(page.replace("page", "")) ,
          position: [box[0], (828.5-box[1])+ box[3],box[0] + box[2],828.5-box[1] ],
          content: " ",
          color: [255, 255, 0],
        }  
        let highlight_elm = {
          'position': {
            'boundingRect': {
              height: res.highlight[page]["height"],
              width: res.highlight[page]["width"],
              x1: box[0],
              x2: box[0] + box[2],
              y1: box[1],
              y2: box[1] + box[3]
            },
            'pageNumber': parseInt(page.replace("page", "")) + 1,
            'rects': [
              {
                height: res.highlight[page]["height"],
                width: res.highlight[page]["width"],
                x1: box[0],
                x2: box[0] + box[2],
                y1: box[1],
                y2: box[1] + box[3]
              }
              ] 
            },
            'content': {
              'text': highlight['refs'][0][2],
            },
            'comment': {
              'emoji': "",
              'text': highlight['refs'][0][2]
            },
            'sentence': {
              'number': senIdx
            } 
          }; // end highlight elm
          highlights.push(highlight_elm);
          hightlight_set.add(hightlightset);
        }); // end boxes.map
      }); // end object.keys
    });
    console.log(JSON.stringify(Array.from(hightlight_set)));
    this.setState({
      highlights: highlights
    });
  }
  addComment(highlight: T_NewHighlight) {
    console.log("add coment");
    console.log(highlight);
    let res_t = this.state.res;
    if(res_t["comment"]){
      res_t["comment"].push(highlight);
    }
    else{
      let comment = [];
      comment.push(highlight);
      res_t["comment"] = comment;
    } 
    console.log(res_t);
    this.setState({
      res: res_t,
    });
}

 removeDoc = (index) => {
     const  {highlights}  = this.state; 
     let data = this.state.res   
     let sentences = data.res.s;  
     let mySet = new Set();
     sentences.splice(index, 1);
     sentences.map((element,indexz) => {
        
        element.s.forEach( temp => {
           mySet.add(temp[0]); 
        });
      }
     );
     const array = Array.from(mySet);
     let newhl =  highlights.filter((item) =>{  
       let num = item.sentence.number;
       for( var i = 0 ;i< array.length;i++){
          if(array[i]==num){
            return true;
          }
       }
     }); // update highlight
     data["res"]["nSimilarSentences"] = mySet.size;
     data["res"]["r"] = 100 * data["res"]["nSimilarSentences"] / data["res"]["nSentences"] ; 
     this.Addsuccess("Loại bỏ văn bản thành công!");
     this.setState({
      highlights : newhl,
      res : data,
     }); 
  }
  clickRemove = (text,index) => {
    const  {highlights}  = this.state;
     let newhl =  highlights.filter(item => item.content.text !== text);
     let data = this.state.res
     let sentences = data.res.s;
     sentences.map((element,indexz) => {
        //console.log("before : " + element.r + " with:" + element.s.length );
        let mySet = new Set();
        element.s = element.s.filter( item => item[8] !== text);
        element.s.forEach( temp => {
           mySet.add(temp[0]); 
        });
        element.r = (mySet.size/570)*100;
        //console.log("after : " + element.r + " with:" + element.s.length );
        data.res.s[indexz] = element ;
      }
     );
  data["res"]["susSenIndices"] = data["res"]["susSenIndices"].filter(value => value !=index ); 
   data["res"]["nSimilarSentences"]=data["res"]["susSenIndices"].length;
   data["res"]["r"] = 100 * data["res"]["nSimilarSentences"] / data["res"]["nSentences"] ; 
   
    this.setState({
      highlights: newhl,
      res : data,
  }); 

      thiss.Addsuccess("Loại bỏ đoạn thành công !");
}
  clickLink = () => {
    this.setState({
        showPopUpErr: true,
    })
  }

  closePopupErr=() => {
    this.setState({
      showPopUpErr: false,
    })
  }

  render() {
    console.log("render parent");
    const { highlights, contentPopup, dataSameArray, showPopup, showPopUpErr, url, res, showCommentBar } = this.state;
    //const contenComnent = 
    return (
      <div className="Home" style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            height: "100vh",
            width: "75vw",
            overflowY: "scroll",
            position: "relative"
          }}
        >
          <PDFViewer  
          onPressSentence={this.onPressSentence} ref={(ref)=>{this.viewer=ref;}}
          url={url} highlights={highlights} res={res.highlight} clickRemove ={this.clickRemove} addCmt={this.addComment.bind(this)} />
        </div>
        {
          showCommentBar ? <button style = {{height: "100vh",width: "1vw",}} onClick = { () => {this.closeCommentBox();}}  > &gt; &nbsp;  </button> : 
          <button style = {{height: "100vh",width: "1vw",textAlign :"center" }} onClick = { () => {this.openCommenrBox()}}  >&lt;  </button>
        }
        {showCommentBar ? (<div className="sidebar"
          style={{
            height: "100vh",
            width: "15vw",
            overflowY: "scroll",
            position: "relative"
          }}>
         <div className="title__comment" >Bình luận</div>  
        <ul className="sidebar__highlights">
        {this.state.res.comment.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              this.ScrolltoHL(highlight);
            }}
          >
            <div>
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
          </li>
        ))}
      </ul>
        </div> ): ''} 
        <Sidebar
          style={{
            height: "100vh",
            width: "25vw",
            overflowY: "scroll",
            position: "relative"
          }}
          clickRemoveDoc = {this.removeDoc.bind(this) }
          uni_id={uni_id}
          data={res}
          ref={(ref)=>{this.sidebar=ref;}}
        />
        
        { showPopup ? <div className="item_document_popup" id="document-popup-primary">
          <div className="link_popup">
            <div className="float-left">
            { contentPopup.private == false?
                <a href={contentPopup.link} target="_blank">{contentPopup.name.replace("txt", "pdf")}</a>
                : <p onClick={this.clickLink}>{contentPopup.name.replace("txt", "pdf")}</p>
              }
            </div>
            { dataSameArray.length > 1 ? <div className="float-right">
              <div className="icon-arrow mr-3" onClick={this.preSlide}>
                <img src={iconLeftArrow} className="img-fluid" />
              </div>
              <div className="icon-arrow" onClick={this.nextSlide}>
                <img src={iconRightArrow} className="img-fluid"/>
              </div>
            </div> : "" }
            <div className="icon-close-popup" onClick={this.closePopup}>
              <img src={iconClosePopup} className="img-fluid"/>
            </div>
          </div>
          <div className="content_popup">
            {contentPopup.text}
          </div>
        </div> : ''};
        { showPopUpErr ?
            <div className="backpop fixed">
                <div className="item_document_popup_2" id="document-popup-sidebar">
                <div className="link_popup element-center">
                  <div className="float-left text-center">
                    Tài liệu lưu trong hệ thống
                  </div>
                  <div className="float-right">
                  </div>
                  <div className="icon-close-popup" onClick={this.closePopupErr}>
                    <img src={iconClosePopup} className="img-fluid"/>
                  </div>
                </div>
                <div className="content_popup">
                  Do tài liệu là tài sản trí tuệ của tác giả và chưa được công bố rộng rãi trên Internet, chúng tôi không thể cho bạn xem toàn bộ nội dung tại thời điểm này
                </div>
              </div>
            </div>: ''
          }
        { hightlight_link != '' ?
          <div className="footer-show">
            <div className="footer-right">
              <a href={hightlight_link} target="_blank">
                <div className="clearfix">
                  <div className="float-left mr-1">
                    <img src={iconDownload} />
                  </div>
                  <div className="float-left">
                    Tải xuống bản hightlight
                  </div>
                </div>
              </a>
            </div>
          </div>
        : '' }
      </div>

    );
    
  }
}

export default Home;
