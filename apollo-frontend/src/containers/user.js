import React from "react";
import { connect } from "react-redux";
import { setName } from "../actions/userActions";
import Test from "../components/ReduxTest";

class TestContainer extends React.Component {
    render(){
        return (
            <div className="test">
                <Test username={this.props.user.name} changeUsername={(name) => this.props.setName(name)}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer);
