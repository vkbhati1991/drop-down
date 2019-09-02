import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./index.css";
import DropDownBody from "./DropDownBody";

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }

        this.el = React.createRef();
        this.container = React.createRef();

    }

    static propTypes = {
        element: PropTypes.any,
        children: PropTypes.any,
        containerClass: PropTypes.string,
        elementClass: PropTypes.string,
        width: PropTypes.number,
    }

    static defaultProps = {
        placement: "right",
        containerClass: "custom-drop-down",
        elementClass: "custom-drop-down__elem",
        width: 300
    }

    componentDidUpdate() {
        if (this.state.isOpen) {
            document.addEventListener("mousedown", this.handleOutside);
        } else {
            document.removeEventListener("mousedown", this.handleOutside);
        }
    }

    componentWillUnmount() {
        document.addEventListener("mousedown", this.handleOutside);
    }

    handleOutside = (event) => {
        const el = this.el.current;
        const cn = this.container.current;

        if (!el || !cn) return;
        
        const isNotClose = (el && el.contains(event.target)) || (cn && cn.elem && cn.elem.contains(event.target));
       
        if (isNotClose) {
            return;
        }

        this.setState({
            isOpen: false
        });
    }

    openDropDown = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getElem = () => {
        const { element, elementClass } = this.props;
        return (
            <span ref={this.el} className={elementClass} onClick={this.openDropDown}>{element}</span>
        );
    }

    getContent = (children) => {
        if (!children) {
            return null;
        }

        return children.map((c, i) => {
            if (c && c.props && c.props.clickinside === "true") {
                c = <span className="clickInSide" onClick={this.openDropDown}>{c}</span>
            }

            return <Fragment key={i}>{c}</Fragment>;
        });
    }

    render() {
        const { children, width, containerClass, placement } = this.props;

        return (
            <Fragment>
                {this.getElem()}
                {this.state.isOpen && <DropDownBody
                    ref={this.container}
                    children={this.getContent(children)}
                    containerClass={containerClass}
                    placement={placement}
                    width={width}
                    el={this.el.current}
                />}
            </Fragment>
        );
    }
}

export default DropDown;