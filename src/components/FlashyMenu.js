import React from "react";
const FlashyMenu = ({ children }) => {
    return (
      <div className="flashy-menu">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="flashy-menu-item">
            {child}
          </div>
        ))}
      </div>
    );
  };
  
  export default FlashyMenu;