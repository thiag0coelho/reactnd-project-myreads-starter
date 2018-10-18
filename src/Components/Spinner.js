import React from 'react';
import { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

const override = css`
position: fixed;
z-index: 999;
overflow: show;
margin: auto;
top: 0;
left: 0;
bottom: 0;
right: 0;
display: block;
`;

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="sweet-loading">
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={150}
          color="#2e7c31"
          loading={loading}
        />
      </div>
    );
  }
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;
