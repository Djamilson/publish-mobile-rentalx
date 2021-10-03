import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { StatusBar, Alert, Platform } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Yup from 'yup';
import { synchronize } from '@nozbe/watermelondb/sync';
import { useNetInfo } from '@react-native-community/netinfo';

import { useAuth } from '../../../hooks/auth';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { PasswordInput } from '../../../components/PasswordInput';
import { api } from '../../../_services/apiClient';
import { database } from '../../../database';
import { Regulation as ModelRegulation } from '../../../database/model/Regulation';

import {
  Container,
  Content,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
  ForgotPassword,
} from './styles';

export function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { signIn } = useAuth();

  const [flagUpdateRegulations, setFlagUpdateRegulations] = useState(0);
  const netInfo = useNetInfo();
  const screenIsFocused = useIsFocused();

  async function handleSignIn() {
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ooops!', error.message);
      } else {
        Alert.alert(
          'Error na autenticação!',
          'Ocorreu um erro ao tentar fazer login, tente novamente',
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  function handleForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  //regulation

  async function offLineSynchronize() {
    const regulationCollection = database.get<ModelRegulation>('regulations');

    await regulationCollection
      .query()
      .fetch()
      .then((item) => {
        return item
          ? item?.map((item: any) => {
              return {
                id: item.id,
                updated_at_: item._raw.updated_at_,
              };
            })
          : [];
      })
      .then(async (res) => {
        await synchronize({
          database,
          pullChanges: async () => {
            try {
              const { data: myDate } = await api.get(`regulations/sync/pull`, {
                params: { regulations: JSON.stringify(res) },
              });

              const { changes, latestVersion } = myDate;

              return { changes, timestamp: latestVersion };
            } catch (error: any) {
              throw new Error(error);
            }
          },
          pushChanges: async ({}) => {
            //envia para a api
          },
        });
      })
      .catch(() => {});

    setFlagUpdateRegulations(flagUpdateRegulations + 1);
  }

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offLineSynchronize();
    }
  }, [netInfo.isConnected, screenIsFocused]);

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Content>
            <StatusBar
              barStyle="dark-content"
              translucent
              backgroundColor="transparent"
            />
            <Header>
              <Title>
                Estamos{'\n'}
                quase lá.
              </Title>
              <SubTitle>
                Faça seu login para começar{'\n'}
                uma experiência incrível.
              </SubTitle>
            </Header>
            <Form>
              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                value={email}
                onChangeText={(e: any) => setEmail(e)}
              />

              <PasswordInput
                iconName="lock"
                placeholder="Sua senha"
                onChangeText={(e: any) => setPassword(e)}
                value={password}
              />
            </Form>
            <Footer>
              <Button
                title="Login"
                onPress={handleSignIn}
                loading={loading}
                enabled={!loading}
              />

              <ForgotPassword
                color={theme.colors.background_primary}
                title="Esqueci minha senha"
                onPress={handleForgotPassword}
                enabled={true}
                loading={false}
              />

              <Button
                color={theme.colors.background_secundary}
                title="Criar conta gratuita"
                onPress={handleNewAccount}
                enabled={true}
                loading={false}
                light={true}
              />
            </Footer>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
