import React from 'react';

import CheckBox from '@react-native-community/checkbox';

interface IProps {
  toggleCheckBox: boolean;
  setToggleCheckBox: (item: boolean) => void;
}

function Checkbox({ toggleCheckBox, setToggleCheckBox }: IProps) {
  return (
    <CheckBox
      disabled={false}
      value={toggleCheckBox}
      onValueChange={(newValue) => setToggleCheckBox(newValue)}
      lineWidth={2}
      hideBox={true}
      boxType={'circle'}
      onCheckColor={'#6F763F'}
      onFillColor={'#4DABEC'}
      onTintColor={'#F4DCF8'}
      animationDuration={0.5}
      onAnimationType={'bounce'}
      offAnimationType={'stroke'}
    />
  );
}

export { Checkbox };
