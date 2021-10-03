import React from 'react';
import LottieView from 'lottie-react-native';
import { Container } from './styles';
import loadingCar from '../../assets/loadingCar.json';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        style={{ height: 200 }}
        resizeMode="contain"
        source={loadingCar}
        autoPlay
        loop
      />
    </Container>
  );
}
