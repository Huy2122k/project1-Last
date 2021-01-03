// @flow

import React,{PureComponent} from "react";
import type { T_Highlight } from "../../src/types";
import iconLeftArrow from '../images/left-arrow.png';
import iconRightArrow from '../images/right-arrow.png';
import iconClosePopup from '../images/close.png';
import iconDownArrow from '../images/down-arrow.png';
import iconUpArrow from '../images/up-arrow.png';
import {Legend,Donut} from 'britecharts-react';
import {AiFillDelete ,AiOutlineClose ,AiOutlineCaretLeft,AiFillCaretRight,AiOutlineDownload} from "react-icons/ai";
import { FcDownload} from "react-icons/fc";
import { Button ,Menu} from 'antd';
const donutData = require('./donutChart.fixtures').default;
type T_ManuscriptHighlight = T_Highlight;
type Props = {
  highlights: Array<T_ManuscriptHighlight>,
  resetHighlights: () => void
};

var offset = -1;
var arrayValue;
function  with4(data) {
  const withResources = [];
   if(data.hasOwnProperty("res") && data.res.s) {
      data.res.s.map((element, index) => {
          /*if(element.r && (
              (type.typeName == 'Tài liệu nội bộ' && element['uni-id'] == uni_id && element.private)
              || (type.typeName == 'Tài liệu nội bộ trường khác' && element['uni-id'] != uni_id && element.private)
              || (!element.private && type.typeName == 'Internet'))){*/
                  let abc = element.n.replace("txt", "pdf")
                  const obj ={
                      quantity : parseInt(element.r*100)/100  ,
                      percentage : parseInt(element.r*100)/100 ,
                      name : `${abc.slice(0, 30).trim()}…`,
                      id : index+1
                  };
                      withResources.push(obj);              
             // }
          }
      );
  }
  return withResources;
};



class Sidebar extends PureComponent{
  constructor(props) {
    super(props);
    console.log("khoi tao");
    this.state={
      data: props.data,
      uni_id: props.uni_id,
      currentItem:{},
      showPopUp:false,
      showPopUpErr:false,
      source: [
        {
          typeName: "Tài liệu nội bộ"
        },
        {
          typeName: "Tài liệu nội bộ trường khác"
        },
        {
          typeName: "Internet"
        },
      ],
      valueClick: {
        name: '',
        link: '',
        text: ''
      }
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   var {data} = this.props
  //   let resourceType = []
  //   if (data.hasOwnProperty("res") && data.res.s) {
  //     data.res.s.forEach(function (element, index) {
  //       if (!resourceType.includes(element.type)) {
  //         resourceType.push(element.type)
  //       }
  //     })
  //     this.setState({
  //       source: resourceType
  //     })
  //   }
  // }

  handleClick=(element, index)=>()=>{
    var x = document.getElementsByClassName("sidebar__highlight");
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('active');
    }
    if (document.getElementById('document-popup-primary') !== null) {
      document.getElementById('document-popup-primary').remove();
    }
    document.getElementById(index).classList.add('active');
    offset = 0;
    if (element.s.length) {
      arrayValue = element;
      this.setState({
        valueClick: {
          name: element.n,
          link: element.o,
          text: element.s[offset][9],
          private: element.private
        }
      })
      this.setState({
        showPopUp: true
      });
    } else {
      this.setState({
        showPopUp: false
      });
    }
  }
  // saveJS=(data,url) =>()=>{
  //   fs.writeFile ('../outputJson/'+ url + "_result.json", JSON.stringify(data), function(err) {
  //   if (err) throw err;
  //   console.log('complete');
  //   });
  // }
  exportToJsonFile =  (jsonData) => () => {
    jsonData.highlights_converted = this.props.hl;
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
  showDetail=(index) =>()=>{
    let ele = document.getElementById('type-document-' + index)
    if (ele.classList.contains('show')) {
      ele.classList.remove('show')
      document.getElementById('img-down-' + index).src = iconDownArrow
    } else {
      ele.classList.add('show')
      document.getElementById('img-down-' + index).src = iconUpArrow
    }
  }
  
  nextSlide = () => {
    if (offset == arrayValue.s.length - 1) {
      offset = 0;
    } else {
      offset++;
    }
    const {valueClick}=this.state;
    valueClick.text=arrayValue.s[offset][9];
    this.setState({
      valueClick: {
        ...valueClick
      }
    })
  }

  clickLink = () => {
    this.setState({
        showPopUpErr: true,
    })
  }

  preSlide = () => {
    if (offset == 0) {
      offset = arrayValue.s.length - 1;
    } else {
      offset--;
    }
    const {valueClick}=this.state;
    valueClick.text=arrayValue.s[offset][9];
    this.setState({
      valueClick: {
        ...valueClick
      }
    })
  }

  updateCustomValue=(customValue)=>{
    this.setState({
      customValue
    });
  }

  closePopup = () => {
    this.setState({
      showPopUp: false
    })
  }

  closePopupErr=() => {
    this.setState({
      showPopUpErr: false,
    })
  }
  

  render(){
    console.log("render sidebar");
    const {uni_id,showPopUp,currentItem,showPopUpErr,valueClick,source} = this.state;
    const { data, clickRemoveDoc ,clickRemoveSource,onchangeShowCmt,showCommentBar} = this.props;
    const legendMargin = {
      top: 10,
      bottom: 10,
      left: 0,
      right: 0,
    };
    return(
      <div className="sidebar" style={{ width: "25vw" }}>
        <div className="content-sidebar">
          <div className="title__sidebar">
          <Button type = "primary" size = "middle"   shape="circle" icon= {showCommentBar? (<AiFillCaretRight/>) : (<AiOutlineCaretLeft/>)  } onClick = {()=>{ onchangeShowCmt(); }} ></Button>
            Tất cả các nguồn ({ data.res ? parseInt(data.res.r*100)/100 : '' }%)
          <Button  size = "middle"   shape="circle" icon= {<FcDownload/> } onClick = { this.exportToJsonFile(data)}  ></Button>
          </div>
          
          {/* { <Donut width={300} height='500'  data={with4(data)} highlightSliceById= {1} /> } */}
           { (data.res.s.length!=0)?
           (<div>
                  <Donut
                    data={with4(data)}
                    height={350}
                    width={350}
                    externalRadius={350 / 2.5}
                    internalRadius={350 / 5}
                    isAnimated={true}
                    highlightSliceById={1}
                    //customMouseOver={this._handleMouseOver.bind(this)}
                    //customMouseOut={this._handleMouseOut.bind(this)}
                  />
                  <Legend
                    data={with4(data)}
                    height={200}
                    width={300}
                    margin={legendMargin}
                    highlightEntryById={1}
                  />
                </div>) : ''
                }
          <ul className="sidebar__highlights">
          { source ? source.map((type, order) => (
              <li key={order}>
                <div className="title-type" >
                <Button size={"default"} shape="circle"  icon={ <img className="img-fluid" id={'img-down-' + order} src={iconDownArrow}  /> } onClick={this.showDetail(order)} />
                  <span>{ type.typeName }</span>
                  <Button size={"default"} shape="circle"  icon= {<AiFillDelete/> } onClick = {()=>{ source.splice(order,1);  clickRemoveSource(type.typeName); this.setState({ source : source  }) }} />
                  
                </div>
                <Menu 
                  id={'type-document-' + order}
                  className="sidebar__highlights collapse">
                {data.hasOwnProperty("res") && data.res.s ? data.res.s.map((element, index) => (
                  element.r && (
                    (type.typeName == 'Tài liệu nội bộ' && element['uni-id'] == uni_id && element.private)
                    || (type.typeName == 'Tài liệu nội bộ trường khác' && element['uni-id'] != uni_id && element.private)
                    || (!element.private && type.typeName == 'Internet')) ?
                  <Menu.Item 
                    key={index}
                    id={index}
                    onClick={this.handleClick(element, index)}
                  > 
                    {/* <div className="item_document_org clearfix"onClick={this.handleClick(element, index)} > */}
                    <div style ={{display : "flex" , justifyContent : "space-between" , alignItems : "center" }} >
                      <div style = {{ textOverflow: "ellipsis" , overflow: "hidden" }} >
                       <strong>{parseInt(element.r*100)/100}% </strong>
                        {element.n.replace("txt", "pdf")}
                      </div>
                      <Button size={"default"}  shape="circle" icon= {<AiOutlineClose/> } onClick = {()=>{ clickRemoveDoc(index); }} />
                      {/* <button className="float-right" onClick = {()=>{ clickRemoveDoc(index); }}  > xóa </button> */}
                    </div>
                  </Menu.Item>
                 
                  : ''
                  
                )) : ''}
                </Menu>
              </li>
            )) : ''}
          </ul>
        </div>
        { showPopUp ? 
          <div className="item_document_popup" id="document-popup-sidebar">
            <div className="link_popup">
              <div className="float-left">
              { valueClick.private == false?
                <a href={valueClick.link} target="_blank">{valueClick.name.replace("txt", "pdf")}</a>
                : <p onClick={this.clickLink}>{valueClick.name.replace("txt", "pdf")}</p>
              }
              </div>
              <div className="float-right">
                <div className="icon-arrow mr-3" onClick={this.preSlide}>
                  <img src={iconLeftArrow} className="img-fluid" />
                </div>
                <div className="icon-arrow" onClick={this.nextSlide}>
                <img src={iconRightArrow} className="img-fluid"/>
                </div>
              </div>
              <div className="icon-close-popup" onClick={this.closePopup}>
                <img src={iconClosePopup} className="img-fluid"/>
              </div>
            </div>
            <div className="content_popup">
              {valueClick.text}
            </div>
          </div> : ''}

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
          
      </div>
    );
  }

}

export default Sidebar;
