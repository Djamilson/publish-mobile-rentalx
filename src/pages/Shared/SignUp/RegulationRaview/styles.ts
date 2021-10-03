import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.header};

  margin-top: ${getStatusBarHeight() + RFValue(30)}px;

  width: 100%;

  height: 50px;
  margin-left: 24px;

  justify-content: center;
`;

export const HeaderSub = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.header};

  position: absolute;

  width: 100%;

  justify-content: center;
  margin: 0;
  margin-top: ${RFValue(15)}px;
`;

export const Details = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;

  justify-content: space-between;

  margin-top: 38px;
  padding: 0 ${RFValue(15)}px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(14)}px;

  text-transform: uppercase;
`;

export const RentalView = styled.View``;

export const Period = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main};
  font-size: ${RFValue(25)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 24px;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 24px;
`;
