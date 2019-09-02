import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import SetPlacement from "./SetPlacement";

const PLACEMENT = {
    LEFT: "left",
    RIGHT: "right",
    RIGHTTOP: "right-top",
    RIGHTBOTTOM: "right-bottom",
    LEFTTOP: "left-top",
    LEFTBOTTOM: "left-bottom"
};

class DropDownBody extends Component {
    constructor(props) {
        super(props);
        this.elem = document.createElement("div");
        const contentStyle = SetPlacement(props.el, props.placement, props.width);

        this.state = {
            contentStyle
        };

        this.dropdown = React.createRef();
    }

    static propTypes = {
        contentClass: PropTypes.string,
        children: PropTypes.any,
        contentStyle: PropTypes.any
    }

    componentDidMount() {
        document.body.appendChild(this.elem);
        const getPlacement = this.getPlacement();
        const contentStyle = SetPlacement(this.props.el, getPlacement, this.props.width);

        this.setState({
            contentStyle
        });
    }

    componentWillUnmount() {
        document.body.removeChild(this.elem);
    }


    getPlacement = () => {
        let _placement;

        const _el = this.props.el;
        const _drd = this.dropdown.current;

        if (!_el || !_drd) return;

        const el = _el.getBoundingClientRect();
        const drd = _drd.getBoundingClientRect();

        const elTop = window.innerHeight - el.top + el.height;

        switch (this.props.placement) {
            case PLACEMENT.RIGHT:
                _placement = elTop < drd.height ? PLACEMENT.RIGHTTOP : PLACEMENT.RIGHTBOTTOM;
                break;

            case PLACEMENT.LEFT:
                _placement = elTop < drd.height ? PLACEMENT.LEFTTOP : PLACEMENT.LEFTBOTTOM;
                break;

            default:
                _placement = PLACEMENT.RIGHTBOTTTOM;
                break;
        }

        return _placement;
    }

    renderComponent = () => {
        const { containerClass, children } = this.props;
        return (
            <div ref={this.dropdown} style={this.state.contentStyle} className={containerClass}>{children}</div>
        )
    }

    render() {
        return ReactDOM.createPortal(this.renderComponent(), this.elem);
    }
}

export default DropDownBody;