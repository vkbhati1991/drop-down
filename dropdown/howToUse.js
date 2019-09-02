import React from 'react';
import DropDown from "./index";


function HowToUse() {
    return (
        <div className="dropdownbox">
            <DropDown
                element={<div className="elemDropdown">ClickMe</div>}
                containerClass="custom-drop-down"
                elementClass="custom-drop-down__elem"
                dropDownClass="custom-drop-down__content"
                placement="left"
                width={200}
            >
                Modernizr runs quickly on page load to detect features;
                it then creates a JavaScript object with the results,
                 and adds classes to the html element
         <div className="click" clickinside="true">Click Inside</div>
            </DropDown>
        </div>
    );

}

export default HowToUse;
