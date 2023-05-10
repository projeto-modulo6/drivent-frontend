import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import qs from 'query-string';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label, LabelGitHub } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import { OAuth } from '../../components/OAuth';
import useSignInOAuth from '../../hooks/api/useSignInOAuth';
import useGetTokenOAuth from '../../hooks/api/useGetTokenOAuth';
import OAuthContext from '../../contexts/OAuthContext';
import Splash from '../../components/Splash';
import useSignInSyncGitHub from '../../hooks/api/useSignInSyncGitHub';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const { oAuthData, setOAuthData } = useContext(OAuthContext);
  const { signInOAuth } = useSignInOAuth();
  const { getTokenOAuth } = useGetTokenOAuth();
  const { signInSyncGitHub } = useSignInSyncGitHub();

  /* eslint-disable */
  useEffect(async () => {
    /* eslint-enable */
    const { code } = qs.parseUrl(window.location.href).query;
    if (code) {
      setLoading(true);
      try {
        const response = await getTokenOAuth({ code });
        setOAuthData(response);
        try {
          const data = await signInOAuth(response);
          setUserData(data);
          setOAuthData({ tokenGitHub: '' });
          navigate('/dashboard');
        } catch (err) {
          toast('Faça o log-in para o Driven.t se conectar com o seu GitHub');
          console.log(err);
        }
      } catch (err) {
        console.log('err', err);
      }
    } else {
      setOAuthData({ tokenGitHub: '' });
    }
    setLoading(false);
  }, []);

  async function submit(event) {
    event.preventDefault();

    try {
      let userData;
      if (oAuthData?.tokenGitHub) {
        const params = { email, password, tokenGitHub: oAuthData.tokenGitHub };
        userData = await signInSyncGitHub(params);
      } else {
        userData = await signIn(email, password);
      }
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  return (
    <>
      {loading ? (
        <Splash loading />
      ) : (
        <AuthLayout background={eventInfo.backgroundImageUrl}>
          <Row>
            <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
            <Title>{eventInfo.title}</Title>
          </Row>
          <Row>
            <Label>Entrar</Label>
            <form onSubmit={submit}>
              <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input
                label="Senha"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
                Entrar
              </Button>
            </form>
            {oAuthData.tokenGitHub ? null : <OAuth></OAuth>}
          </Row>
          <Row>
            <Link to="/enroll">Não possui login? Inscreva-se</Link>
          </Row>
        </AuthLayout>
      )}
    </>
  );
}
