import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./index.css";

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            translateValue: 0,
            placementValue: this.props.placementValue
        }

    }

    static propTypes = {
        element: PropTypes.any,
        children: PropTypes.any,
        containerClass: PropTypes.string,
        elementClass: PropTypes.string,
        dropDownClass: PropTypes.string,
    }

    static defaultProps = {
        placementValue: "bottom-end",
        containerClass: "custom-drop-down",
        elementClass: "custom-drop-down__elem",
        dropDownClass: "custom-drop-down__content"
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
        const elem = this.elem;
        if (elem && elem.contains(event.target)) {
            return;
        }

        this.setState({
            isOpen: false
        });
    }

    closeInSide = () => {
        this.setState({
            isOpen: false
        });
    }

    setPlacement = () => {

        const elem = this.elem;

        if (!elem) {
            return;
        }

        const windowHeight = window.innerHeight / 2;

        const elemTop = elem.getBoundingClientRect().top;
        const elemHeight = elem.children[1].clientHeight;

        if (windowHeight < elemTop) {
            this.setState({
                isOpen: !this.state.isOpen,
                translateValue: -elemHeight,
                placementValue: "top-end"
            });
        } else {
            this.setState({
                isOpen: !this.state.isOpen,
                translateValue: 0,
                placementValue: "bottom-end"
            });
        }
    }

    getChildrensFunc = (children) => {
        if (!children) {
            return null;
        }

        const filterChildren = children.map((c, i) => {
            if (c && c.props && c.props.clickinside === "true") {
                c = <span className="clickInSide" onClick={this.closeInSide}>{c}</span>
            }

            return <Fragment key={i}>{c}</Fragment>;
        });

        return filterChildren;
    }

    render() {
        const { isOpen, placementValue, translateValue } = this.state;
        const { element, children, containerClass, elementClass, dropDownClass } = this.props;
        const dropDownClassName = isOpen ? `${dropDownClass} show` : dropDownClass;
        const styles = { transform: `translateY(${translateValue}px)` };

        return (
            <span ref={(n) => { this.elem = n; }} className={containerClass}>
                <span className={elementClass} onClick={this.setPlacement}>{element}</span>
                <div className={dropDownClassName} placement={placementValue} style={styles}>{this.getChildrensFunc(children)}</div>
            </span>
        );
    }
}

export default DropDown;