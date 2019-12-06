import React from 'react';
import DropDown from '../Dropdown/Dropdown';
import CheckBox from '../Checkbox/Checkbox';
import './AddRemoveFromTable.scss';

interface Props {
  onCheckboxChange: (e) => void;
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
      btnClass="btn"
      btnText="Add/Remove Data From Table"
      renderData={tableHeaders}
      render={({ renderData }) => {
        return renderData.map(key => (
          <CheckBox
            name="columns"
            onCheckboxChange={onCheckboxChange}
            check={key}
            checked={checkBoxActive.includes(key)}
          />
        ));
      }}
    />
  </div>
);

export default AddRemoveFromTable;