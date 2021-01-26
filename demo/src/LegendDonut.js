import React,{ PureComponent } from "react";
import {Donut , Legend} from 'britecharts-react';
import {withResponsiveness , ResponsiveContainer}  from 'britecharts-react';
const ResponsiveDonut = withResponsiveness(Donut);
const ResponsiveLegend = withResponsiveness(Legend);

 class LegendDonut extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        highlightedSlice: 1,
      };
    }

    _handleMouseOver(data) {
      this.setState({
        highlightedSlice: data.data.id
      });
    }

    _handleMouseOut() {
       console.log("mouseout");
    }

    render() {
      const {data,data2} = this.props;
      const legendMargin = {
        top: 10,
        bottom: 10,
        left: 0,
        right: 30,
      };

      return (
          <ResponsiveContainer 
            render={
              ({width}) =>
                <div>
                  <Donut
                    data={data}
                    height={width}
                    width={width}
                    externalRadius={width / 2.5}
                    internalRadius={width / 5}
                    isAnimated={true}
                    highlightSliceById={this.state.highlightedSlice}
                    /*customMouseOver={this._handleMouseOver.bind(this)}
                    */customMouseOut={this._handleMouseOut.bind(this)}
                  />
                  <Legend
                    data={data2}
                    height={250}
                    width={width}
                    margin={legendMargin}
                    highlightEntryById={this.state.highlightedSlice}
                  />
                </div>
              }

          />
      );
    }
  }

  export default LegendDonut;