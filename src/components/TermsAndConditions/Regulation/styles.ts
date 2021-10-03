import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 10,
    flexGrow: 1,
    paddingBottom: 120,
  },
  showsVerticalScrollIndicator: false,
})``;

export const TRegulation = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};

  line-height: 26px;
  text-align: justify;
`;

export const Title = styled.Text`
  margin-bottom: 30px;
  letter-spacing: 2.8px;
  text-transform: uppercase;

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};

  line-height: ${RFValue(25)}px;
`;
