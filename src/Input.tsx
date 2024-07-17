import React from "react";

interface propType {
  location: string;
  onChange: any;
}
class Input extends React.Component<propType> {
  render() {
    const { location, onChange } = this.props;

    return (
      <div>
        <input
          type="text"
          placeholder="Search for loaction..."
          value={location}
          onChange={onChange}
        ></input>
      </div>
    );
  }
}

export default Input;
