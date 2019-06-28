import React, { Component } from "react";
import PropTypes from "prop-types";

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            translateValue: 0,
            placementValue: this.props.PlacementValue
        }
    }

    static propTypes = {
        element: PropTypes.any,
        children: PropTypes.any
    }

    static defaultProps = {
        PlacementValue: "bottom-end"
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

    render() {
        const { isOpen, placementValue, translateValue } = this.state;
        const { element, children } = this.props;
        const drodownClassName = "custom-drop-down";
        const elemClassName = "custom-drop-down__elem";
        const classValue = isOpen ? "custom-drop-down__content show" : "custom-drop-down__content";
        const styles = { transform: `translateY(${translateValue}px)` };

        return (
            <span ref={(n) => { this.elem = n; }} className={drodownClassName}>
                <span className={elemClassName} onClick={this.setPlacement}>{element}</span>
                <div className={classValue} placement={placementValue} style={styles}>{children}</div>
            </span>
        );
    }
}

export default DropDown;