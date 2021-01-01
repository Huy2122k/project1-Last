import React from 'react';

class About extends React.Component {
    componentWillMount () {
        console.log('abc');
    }
    render() {
        return (
            <div className="About">
                Day la trang gioi thieu nhe
            </div>
        );
    }
}

export default About;