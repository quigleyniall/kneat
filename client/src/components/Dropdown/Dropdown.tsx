import React from 'react';
import Button from '../Button';
import './Dropdown.scss';

interface IProps {
  btnText: string;
  btnClass: string;
  render: Function;
  renderData: string[];
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
    const { btnClass, renderData, btnText } = this.props;
    return (
      <div
        data-test="dropdown-wrapper"
        className="dropdown-wrapper"
        onMouseEnter={this.openDropDown}
        onMouseLeave={this.closeDropDown}
      >
        <Button text={btnText} onPress={() => {}} btnClass={btnClass} />
        <div
          data-test="dropdown"
          className={activeDropDown ? 'dropdown show' : 'dropdown hide'}
          style={{ width: '300px' }}
        >
          {this.props.render({
            renderData
          })}
        </div>
      </div>
    );
  }
}

export default DropDown;
