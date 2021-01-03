import { highlight } from "britecharts-react";
import { remove } from "lodash";
import React, { Component } from "react";
import {
    PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    AreaHighlight
} from "../../src";
import Spinner from "./Spinner";
import type { T_Highlight, T_NewHighlight } from "../../src/types"
//import {DeleteOutlined} from '@ant-design/icons';
import { Button ,Popconfirm } from 'antd';
import {AiFillDelete} from "react-icons/ai"
const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => location.hash.slice("#highlight-".length);

const resetHash = () => {
    location.hash = "";
};

const HighlightPopup = ({ sentence ,content ,clickRemove,onRemove}) =>
(   
    <Popconfirm title="Bạn có chắc chắn loại bỏ?" okText="Có" cancelText="Không">
        <Button type="primary"  icon={<AiFillDelete/> } onClick = {()=>{  clickRemove(content.text,sentence.number);  onRemove(); } } danger >
            Loại bỏ đoạn trùng lặp
        </Button>
    </Popconfirm>
)
 

export default class PDFViewer extends Component {

    constructor(props) {
        super(props);
    }

    // resetHighlights = () => {
    //     this.setState({
    //         highlights: []
    //     });
    // };

     scrollViewerTo = (highlight: any) => { };

     scrollToComment= (highlight: any) => {
         if (highlight) {
            this.scrollViewerTo(highlight);
         }
     };

    // componentDidMount() {
    //     window.addEventListener(
    //         "hashchange",
    //         this.scrollToHighlightFromHash,
    //         false
    //     );
    // }

    // getHighlightById(id: string) {
    //     const { highlights } = this.state;

    //     return highlights.find(highlight => highlight.id === id);
    // }

    // addHighlight(highlight: T_NewHighlight) {
    //     console.log("add highlight");
    //     console.log(highlight);

    //     const { highlights } = this.state;
       
    //     this.setState({
    //     highlights: [{ ...highlight, id: getNextId() }, ...highlights]
    //     });
    // }

    // updateHighlight(highlightId: string, position: Object, content: Object) {
    //     console.log("Updating highlight", highlightId, position, content);

    //     this.setState({
    //         highlights: this.state.highlights.map(h => {
    //             return h.id === highlightId
    //                 ? {
    //                     ...h,
    //                     position: { ...h.position, ...position },
    //                     content: { ...h.content, ...content }
    //                 }
    //                 : h;
    //         })
    //     });
    // }

    render() {        
        const { highlights, url, res, sentence,onPressSentence, clickRemove, addCmt } = this.props; 

        
        return (
            <PdfLoader url={url} beforeLoad={<Spinner />}>
                {pdfDocument => (
                    <PdfHighlighter
                        pdfDocument={pdfDocument}
                        // enableAreaSelection={event => event.altKey}
                         onScrollChange={resetHash}
                         scrollRef={scrollTo => {
                           this.scrollViewerTo = scrollTo;
                        }}
                        onSelectionFinished={(
                            position,
                            content,
                            hideTipAndSelection,
                            transformSelection
                        ) => (
                                <Tip
                                    onOpen={transformSelection}
                                    onConfirm={comment => {
                                        console.log("OK")
                                        addCmt({ content, position, comment });
                                        hideTipAndSelection();
                                    }}
                                />
                            )}
                        highlightTransform={(
                            highlight,
                            index,
                            setTip,
                            hideTip,
                            viewportToScaled,
                            screenshot,
                            isScrolledTo
                        ) => {
                            const isTextHighlight = !Boolean(
                                highlight.content && highlight.content.image
                            );

                            const component = isTextHighlight ? (
                                <Highlight
                                    isScrolledTo={isScrolledTo}
                                    position={highlight.position}
                                    comment={highlight.comment}
                                />
                            ) : (
                                    <AreaHighlight
                                        highlight={highlight}
                                        onChange={boundingRect => {
                                            this.updateHighlight(
                                                highlight.id,
                                                { boundingRect: viewportToScaled(boundingRect) },
                                                { image: screenshot(boundingRect) }
                                            );
                                        }}
                                    />
                                );
                            return (
                                <Popup
                                    popupContent={<HighlightPopup {...highlight} clickRemove={clickRemove} onRemove={hideTip} /> }
                                    onMouseOver={popupContent =>
                                          setTip(highlight, highlight => popupContent)
                                    }
                                    onMouseOut={hideTip}
                                    onPressSentence={onPressSentence}
                                    key={index}
                                    num={highlight.sentence.number}
                                    children={component}
                                    res={res}
                                />
                            );
                        }}
                        highlights={highlights}
                    />
                )}
            </PdfLoader>
        );
    }
}