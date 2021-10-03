import React from 'react';

import { Container, Content, TRegulation } from './styles';

interface IProps {
  regulation: string;
}

function Regulation({ regulation }: IProps) {
  return (
    <Container>
      <Content>
        <TRegulation>{regulation}</TRegulation>
      </Content>
    </Container>
  );
}

export { Regulation };
