// @flow

import React, { Component } from "react";

import "../style/Tip.css";
import { Button } from 'antd';
import {AiOutlineComment} from "react-icons/ai"

type State = {
  compact: boolean,
  text: string,
  emoji: string
};

type Props = {
  onConfirm: (comment: { text: string, emoji: string }) => void,
  onOpen: () => void,
  onUpdate?: () => void
};

class Tip extends Component<Props, State> {
  state = {
    compact: true,
    text: "",
    emoji: ""
  };

  state: State;
  props: Props;

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, text, emoji } = this.state;

    return (
      <div className="Tip">
        {compact ? (
          /*<div
            //className="Tip__compact"
            onClick={() => {
              //onOpen();
              this.setState({ compact: false });
            }}
          >
            Thêm bình luận
          </div>*/
          <Button type="primary" style={ {backgroundColor : "green"} } icon={<AiOutlineComment/> } onClick={() => {
            //onOpen();
            this.setState({ compact: false });
          }} 
          >Thêm bình luận</Button>
        ) : (
          <form
            className="Tip__card"
            onSubmit={event => {
              event.preventDefault();
              onConfirm({ text, emoji });
            }}
          > <p style={{color : "#5c5c55", fontSize: " 16px" }} >Thêm bình luận </p>
            <div>
              <textarea
                width="100%"
                placeholder="nội dung..."
                autoFocus
                value={text}
                onChange={event => this.setState({ text: event.target.value })}
                ref={node => {
                  if (node) {
                    node.focus();
                  }
                }}
              />
              {/* <div>
                {[ "😱", "😍", "🔥", "😳", "⚠️"].map(_emoji => (
                  <label key={_emoji}>
                    <input
                      checked={emoji === _emoji}
                      type="radio"
                      name="emoji"
                      value={_emoji}
                      onChange={event =>
                        this.setState({ emoji: event.target.value })
                      }
                    />
                    {_emoji}
                  </label>
                ))}
              </div> */}
            </div>
            <div>
              <Button type="primary" htmlType="submit"> Thêm </Button>
              
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Tip;
