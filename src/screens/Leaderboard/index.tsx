/* eslint-disable no-restricted-globals */
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { startOfWeek, startOfMonth } from 'date-fns';

import Header from '../../components/Header';

import backgroundImage from '../../assets/images/splash.png';

import {
  Container,
  Title,
  StartDateMenu,
  StartDateOption,
  StartDateText,
  Table,
  TableLine,
  PositionText,
  NameText,
  WeighText,
  ScoreText,
  Image,
} from './styles';

interface ScoreData {
  id: string;
  name: string;
  totalWeight: number;
}

const Leaderboard: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<
    'week' | 'month' | 'all'
  >('month');
  const [scores, setScores] = useState<ScoreData[]>([]);

  const startDate = useMemo(() => {
    if (selectedStartDate === 'month') return startOfMonth(new Date());
    if (selectedStartDate === 'week') return startOfWeek(new Date());
    return new Date(2000, 0, 1);
  }, [selectedStartDate]);

  useEffect(() => {
    setScores([
      {
        id: 'asdad',
        name: 'Joao Silva',
        totalWeight: 1510,
      },
      {
        id: 'asdds4gsad',
        name: 'Pedro Pereira',
        totalWeight: 1224,
      },
      {
        id: 'asdafasad',
        name: 'Thiago Cardoso',
        totalWeight: 922,
      },
      {
        id: 'adwqsdad',
        name: 'Paulino Serafim',
        totalWeight: 121,
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        // contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Title>Leaderboard</Title>
          <StartDateMenu>
            <StartDateOption
              isSelected={selectedStartDate === 'week'}
              onPress={() => setSelectedStartDate('week')}
            >
              <StartDateText>Essa semana</StartDateText>
            </StartDateOption>
            <StartDateOption
              isSelected={selectedStartDate === 'month'}
              onPress={() => setSelectedStartDate('month')}
            >
              <StartDateText>Esse mês</StartDateText>
            </StartDateOption>
            <StartDateOption
              isSelected={selectedStartDate === 'all'}
              onPress={() => setSelectedStartDate('all')}
            >
              <StartDateText>Tudo</StartDateText>
            </StartDateOption>
            <StartDateText>{String(startDate)}</StartDateText>
          </StartDateMenu>
          <Table>
            <TableLine>
              <View style={{ flex: 1 }} />
              <WeighText>papel (kg)</WeighText>
              <ScoreText>árvores</ScoreText>
            </TableLine>
            {scores.map((score, index) => (
              <TableLine key={score.id}>
                <PositionText>{`# ${index}`}</PositionText>
                <NameText>{score.name}</NameText>
                <WeighText>{score.totalWeight}</WeighText>
                <ScoreText>{score.totalWeight}</ScoreText>
              </TableLine>
            ))}
          </Table>
          <Image source={backgroundImage} resizeMode="contain" />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Leaderboard;
