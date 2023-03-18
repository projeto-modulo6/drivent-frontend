import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGetAllLocales from '../../hooks/api/useGetLocales';
import LocaleContainer from './LocaleContainer';

export default function EventLocaleContainer({ dayId, setDayId }) {
  const { getAllLocales } = useGetAllLocales();
  const [locales, setLocales] = useState([]);

  useEffect(() => {
    async function retrieveLocales() {
      let tempLocales = await getAllLocales();
      tempLocales = tempLocales.map((entry) => {
        return { name: entry.name, id: entry.id };
      });

      setLocales(tempLocales);
    }

    retrieveLocales();
  }, []);

  return (
    <Container>
      {locales.map((locale) => (
        <LocaleContainer
          key={locale.id}
          localeId={locale.id}
          localeName={locale.name}
          dayId={dayId}
          setDayId={setDayId}
        />
      ))}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  margin: 61px 0 0 0;
`;
