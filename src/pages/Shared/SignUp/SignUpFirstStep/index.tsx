import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import * as Yup from "yup";

import { BackButton } from "../../../../components/BackButton";
import { Bullet } from "../../../../components/Bullet";
import { Input } from "../../../../components/Input";

import { Button } from "../../../../components/Button";

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  FormObjects,
  FormTitle,
  CheckboxContainer,
  CheckboxTitle,
  Steps,
} from "./styles";
import { Checkbox } from "../../../../components/TermsAndConditions/Checkbox";
import { useTheme } from "styled-components/native";

export function SignUpFirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const nameGroup = "role-client";

  const theme = useTheme();

  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }

  function handleSeeTerms() {
    navigation.navigate("RegulationRaview");
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("A sua CNH é obrigatória"),

        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),

        name: Yup.string().required("Nome obrigatório"),
      });
      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: { ...data, nameGroup } });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Ooops!", error.message);
      } else {
        Alert.alert(
          "Error na autenticação!",
          "Ocorreu um erro ao tentar fazer login, tente novamente"
        );
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>

          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </SubTitle>
          <Form>
            <FormObjects>
              <FormTitle>1. Dados</FormTitle>

              <CheckboxContainer>
                <Checkbox
                  toggleCheckBox={toggleCheckBox}
                  setToggleCheckBox={setToggleCheckBox}
                />
                <CheckboxTitle>{`⬅️ Aceita os Termos!`}</CheckboxTitle>
              </CheckboxContainer>
            </FormObjects>
            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={(e: any) => setName(e)}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={(e: any) => setEmail(e)}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={String(driverLicense)}
              onChangeText={(e: any) => setDriverLicense(e)}
            />
          </Form>
          {toggleCheckBox ? (
            <Button title="Próximo" onPress={handleNextStep} />
          ) : (
            <Button
              title="Ver os termos"
              onPress={handleSeeTerms}
              color={theme.colors.check}
            />
          )}
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
