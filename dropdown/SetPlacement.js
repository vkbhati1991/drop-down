
const PLACEMENT = {
    LEFT: "left",
    RIGHT: "right",
    RIGHTTOP: "right-top",
    RIGHTBOTTOM: "right-bottom",
    LEFTTOP: "left-top",
    LEFTBOTTOM: "left-bottom"
};

const PX = "px";

const SetPlacement = (el, placement, drdWidth) => {

    if (!el) return;

    let contentStyle = null;

    const elOffset = el.getBoundingClientRect();

    const _left = elOffset.left;
    const _top = elOffset.top;
    const _height = elOffset.height;
    const _width = elOffset.width;
    const _wHeight = window.innerHeight;
    const _wWidth = window.innerWidth;

    const _topStyle = _top + _height;
    const _bottomStyle = _wHeight - _top;

    const rightBottom = () => {
        const right = _wWidth - _left - _width;
        contentStyle = { right: `${right}${PX}`, top: `${_topStyle}${PX}`, width: `${drdWidth}${PX}` };
    }

    const rightTop = () => {
        const right = _wWidth - _left - _width;
        contentStyle = { right: `${right}${PX}`, bottom: `${_bottomStyle}${PX}`, width: `${drdWidth}${PX}` };
    }

    const leftTop = () => {
        contentStyle = { left: `${_left}${PX}`, bottom: `${_bottomStyle}${PX}`, width: `${drdWidth}${PX}` };
    }

    const leftBottom = () => {
        contentStyle = { left: `${_left}${PX}`, top: `${_topStyle}${PX}`, width: `${drdWidth}${PX}` };
    }

    switch (placement) {

        case PLACEMENT.RIGHTBOTTOM:
            rightBottom();
            break;

        case PLACEMENT.RIGHTTOP:
            rightTop();
            break;

        case PLACEMENT.LEFTTOP:
            leftTop();
            break;

        case PLACEMENT.LEFTBOTTOM:
            leftBottom();
            break;

        default:
            rightBottom();
    }

    return contentStyle;
}

export default SetPlacement;