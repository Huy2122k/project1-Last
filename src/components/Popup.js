// @flow

import React, { Component } from "react";

import MouseMonitor from "./MouseMonitor";

type Props = {
  onMouseOver: (content: React$Element<*>) => void,
  popupContent: React$Element<*>,
  onMouseOut: () => void,
  onClick: () => void,
  children: React$Element<*>
};

type State = {
  mouseIn: boolean
};

var sameSentence = new Array();

class Popup extends Component<Props, State> {
  state: State = {
    mouseIn: false
  };

  props: Props;

  render() {
    const { onMouseOver, popupContent, onMouseOut, res, sentence,onPressSentence ,num,clickRemove} = this.props;

    return (
      <div 
        onMouseOver={() => {
          this.setState({ mouseIn: true });
          onMouseOver(
            <MouseMonitor
              onMoveAway={() => {
                if (this.state.mouseIn) {
                  return;
                }

                onMouseOut();
              }}
              paddingX={60}
              paddingY={30}
              children={popupContent}
            />
          );

        }}
        onMouseOut={() => {
          this.setState({ mouseIn: false });
        }}
        
        onClick={() => {
          let sentenceNumber = num //popupContent.props.sentence.number;
          let result_sentence = new Array();

          let object_key_1 = Object.keys(res);
          object_key_1.forEach(function (item) {
            let object_key_2 = Object.keys(res[item]);
            object_key_2.forEach(function (item2) {
              if (item2 == sentenceNumber) {
                sameSentence = res[item][item2].refs;
              }
            })
          });
          if(onPressSentence){
            onPressSentence(sameSentence)
          }
          //onPressSentence
          // res.forEach(function () {
          //   console.log('abc');
          // });

          // let id = Date.now();
          // res.s.forEach( function(e1) {
            // e1.s.forEach( function(e2) {
            //   if (e2[0] == sentenceNumber) {
            //     let free;
            //     if (e1.o.substr(0, 25) != e1.u.substr(0, 25)) {
            //       free = true;
            //     } else {
            //       free = false;
            //     }
            //     id++;
            //     result_sentence.push({
            //       'origin_url': e1.o,
            //       'free': free,
            //       'name': e1.n,
            //       'percent': parseInt(e2[2]*10000)/100,
            //       'text': e2[9],
            //       'show': false,
            //       id
            //     });
            //   }
            // });
          // });
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Popup;
