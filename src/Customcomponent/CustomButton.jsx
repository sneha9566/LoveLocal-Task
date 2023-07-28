import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import PropTypes, { func } from 'prop-types';
import { ReactSVG } from 'react-svg';

const CustomButton = ({
  id,
  buttonColor,
  variant,
  buttonText,
  onClick,
  size,
  borderColor,
  _hover,
  rightIcon,
  svg,
  ...props
}) => {
  const borderValue = useColorModeValue('#e2e8f0', '#3F444E');
  return (
    <Button
      data-testid={id}
      size={size}
      colorScheme={buttonColor}
      variant={variant}
      onClick={onClick}
    //   fontSize="md"
      borderColor={borderColor || borderValue}
      _hover={_hover}
      {...props}
    >
      {svg && <ReactSVG src={svg} />}
      {buttonText}
      {rightIcon}
    </Button>
  );
};

CustomButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string.isRequired,
  buttonColor: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.string,
  borderColor: PropTypes.string,
  _hover: PropTypes.object,
  rightIcon: PropTypes.element,
  svg: PropTypes.string,
};

CustomButton.defaultProps = {
  buttonText: 'Click',
  onClick: func,
  buttonColor: '#6868F7',
  id: '',
  size: 'sm',
  borderColor: '',
  _hover: {
    background: '#5757D8',
    color: 'white',
  },
  rightIcon: '',
  svg: null,
};

export default CustomButton;
