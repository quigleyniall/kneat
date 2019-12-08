import React from 'react';
import Button from '../Button';
import './Dropdown.scss';

interface IProps {
  btnText: string;
  btnClass: string;
  children: React.ReactNode;
}

interface IState {
  activeDropDown: boolean;
}

class DropDown extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeDropDown: false
    };
  }

  openDropDown = () => {
    this.setState({ activeDropDown: true });
  };

  closeDropDown = () => {
    this.setState({ activeDropDown: false });
  };

  render() {
    const { activeDropDown } = this.state;
    const { btnClass, btnText, children } = this.props;
    return (
      <div
        data-test="dropdown-wrapper"
        className="dropdown-wrapper"
        onMouseEnter={this.openDropDown}
        onMouseLeave={this.closeDropDown}
      >
        <Button
          data-test="dropdown-button"
          text={btnText}
          onPress={this.openDropDown}
          btnClass={btnClass}
        />
        <div
          data-test="dropdown-info"
          className={activeDropDown ? 'dropdown show' : 'dropdown hide'}
          style={{ width: '300px' }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default DropDown;
