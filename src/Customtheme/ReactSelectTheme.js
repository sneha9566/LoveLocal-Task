export const customStylesReactSelect = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#e2e8f0',
      borderRadius: '6px',
      minHeight: '30px',
      minWidth: '200px',
      boxShadow: state.isFocused ? null : null,
    }),
    valueContainer: (provided) => ({
      ...provided,
      minHeight: '30px',
      padding: '0 6px',
    }),
  
    input: (provided) => ({
      ...provided,
      margin: '0px',
      '::before': {
        position: 'relative',
      },
      '::after': {
        position: 'relative',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      minHeight: '30px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#E5E5FF',
      color: 'black',
      fontWeight: 500,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      backgroundColor: '#E5E5FF',
      color: 'black',
      fontWeight: 500,
    }),
  };
  
  export default customStylesReactSelect;
  