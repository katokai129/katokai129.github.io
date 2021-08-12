'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
      return "Hello World!";

  }
}
const domContainer = document.querySelector('#hello');
ReactDOM.render(e(LikeButton), domContainer);