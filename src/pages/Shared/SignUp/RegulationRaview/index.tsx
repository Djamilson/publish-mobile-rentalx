import React, { useState, useEffect } from "react";

import { StyleSheet, StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { BackButton } from "../../../../components/BackButton";

import { LoadAnimation } from "../../../../components/LoadAnimation";

import { database } from "../../../../database";
import { Regulation as ModelRegulation } from "../../../../database/model/Regulation";

import { IRegulationDTO } from "../../../../dtos/RegulationDTO";
import { Regulation } from "../../../../components/TermsAndConditions/Regulation";

import {
  Container,
  Header,
  HeaderSub,
  Details,
  Description,
  Brand,
  RentalView,
  Period,
  Price,
  Title,
  SubTitle,
} from "./styles";
export function RegulationRaview() {
  const [loading, setLoading] = useState(true);
  const [regulation, setRegulation] = useState<IRegulationDTO>(
    {} as IRegulationDTO
  );

  const navigation = useNavigation<any>();

  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrolHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      //aqui muda a distâcia entre o header e o ScrollView
      //260 distância do top até inicio do scrollView

      //100 largura do meu header final

      height: interpolate(
        scrollY.value,
        [0, 260],
        [260, 112],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    let isMounted = true;

    async function loadRegulation() {
      try {
        const regulationCollection =
          database.get<ModelRegulation>("regulations");

        regulationCollection
          .query()
          .fetch()
          .then((res) => {
            setRegulation(res[0]);
          });
      } catch {
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRegulation();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {
            backgroundColor: theme.colors.header,
          },
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} color={theme.colors.shape} />

          <Animated.View style={sliderCarsStyleAnimation}>
            <HeaderSub>
              <Title>Privacidade {"\n"}e Termos</Title>

              <SubTitle>Leia nossas informações.</SubTitle>
            </HeaderSub>
          </Animated.View>
        </Header>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrolHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>1. Termos</Brand>
          </Description>

          <RentalView>
            <Period>Tempo de leitura</Period>
            <Price>{regulation.reading_time} min</Price>
          </RentalView>
        </Details>

        {loading ? (
          <LoadAnimation />
        ) : (
          regulation && <Regulation regulation={regulation.regulation} />
        )}
      </Animated.ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    overflow: "hidden",
    zIndex: 1,
  },
  back: {
    marginTop: 0,
  },
});
