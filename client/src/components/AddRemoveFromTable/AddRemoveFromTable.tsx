import React from 'react';
import DropDown from '../Dropdown/Dropdown';
import CheckBox from '../Checkbox/Checkbox';
import './AddRemoveFromTable.scss';

interface Props {
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tableHeaders: string[];
  checkBoxActive: string[];
}

const AddRemoveFromTable = ({
  onCheckboxChange,
  checkBoxActive,
  tableHeaders
}: Props) => (
  <div className="searchoptions">
    <DropDown
      data-test="dropdown"
      btnClass="btn"
      btnText="Add/Remove Data From Table"
    >
      {tableHeaders.map((header, index) => (
        <CheckBox
          data-test="check-box"
          key={index}
          name="columns"
          onCheckboxChange={onCheckboxChange}
          text={header}
          checked={checkBoxActive.includes(header)}
        />
      ))}
    </DropDown>
  </div>
);

export default AddRemoveFromTable;
