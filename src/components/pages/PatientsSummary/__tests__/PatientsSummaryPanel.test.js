import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import PatientsSummaryPanel from '../header/PatientsSummaryPanel';

const testProps = {
  onCategorySelected: () => {},
  selectedCategory: {
    problems: true,
    contacts: true,
    allergies: true,
    medications: true,
  },
};

describe('Component <PatientsSummaryPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PatientsSummaryPanel
        onCategorySelected={testProps.onCategorySelected}
        selectedCategory={testProps.selectedCategory}
        onViewOfBoardsSelected={() => {}}
      />).dive();
    expect(component).toMatchSnapshot();

    expect(component.instance().props.onCategorySelected).toEqual(testProps.onCategorySelected);
    expect(component.instance().props.selectedCategory).toEqual(testProps.selectedCategory);

    expect(component.find('.heading')).toHaveLength(1);
    expect(component.find('.heading').text()).toEqual('SHOW');
    expect(component.find('.form-group')).toHaveLength(1);
    expect(component.find('PTCustomInput')).toHaveLength(5);

    component.instance().toggleCheckbox('dashboard-name');
    component.setState({ selected: {
      problems: true,
      contacts: false,
      allergies: true,
      medications: false,
    } });
    component.setState({ selected: {
      problems: true,
      contacts: false,
      allergies: true,
      medications: false,
    } });
    expect(component.find('PTCustomInput')).toHaveLength(5);

    component.instance().toggleRadio('test')

    component.setState({
      selectedViewOptions: {
        full: false,
        preview: true,
      },
    })

    component.setProps({
      patientsSummaryHasPreviewSettings: true,
    })
  });
});