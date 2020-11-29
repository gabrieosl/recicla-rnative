/* eslint-disable no-restricted-globals */
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { startOfWeek, startOfMonth } from 'date-fns';

import { useAuth } from '../../context/Auth';

import { gramsToCarbonCredit, gramToPaper } from '../../utils/conversion';

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
  const { getRecyclingsPerUser } = useAuth();
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
    getRecyclingsPerUser(startDate).then(recyclings => {
      console.log(recyclings);
      if (!recyclings) return;
      const scoresSumObject: { [key: string]: ScoreData } = {};
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < recyclings.length; x++) {
        const item = recyclings[x];
        if (scoresSumObject[item.userId]) {
          scoresSumObject[item.userId].totalWeight += item.weightInGrams;
        } else {
          scoresSumObject[item.userId] = {} as ScoreData;
          scoresSumObject[item.userId].totalWeight = item.weightInGrams;
          scoresSumObject[item.userId].name = item.userName;
        }
      }
      const scoresSumArray: ScoreData[] = [];
      const keys = Object.keys(scoresSumObject);
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < keys.length; x++) {
        const scoreData = scoresSumObject[keys[x]];
        scoresSumArray.push({
          id: keys[x],
          name: scoreData.name,
          totalWeight: scoreData.totalWeight,
        });
      }

      setScores(scoresSumArray);
    });
  }, [getRecyclingsPerUser, startDate]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
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
          </StartDateMenu>
          <Table>
            <TableLine>
              <View style={{ flex: 1 }} />
              <WeighText>papel (folhas A4)</WeighText>
              <ScoreText>Crédito Carbono</ScoreText>
            </TableLine>
            {scores.map((score, index) => (
              <TableLine key={score.id}>
                <PositionText>{`# ${index + 1}`}</PositionText>
                <NameText>{score.name}</NameText>
                <WeighText>
                  {gramToPaper(score.totalWeight).toFixed(0)}
                </WeighText>
                <ScoreText>
                  {gramsToCarbonCredit(score.totalWeight).toFixed(1)}
                </ScoreText>
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
