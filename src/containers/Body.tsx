import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import * as colors from '@mui/material/colors';
import { useMemo, useState } from 'react';
import Rating from '../components/Rating';

const data = {
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
  '7': 0,
  '8': 0,
  '9': 0,
  '10': 0,
  '11': 0,
};

const listOfColors: Record<number, string>[] = Object.values(colors);

function getColor(id: string, s: number): string {
  const newId = Number(id) % 20;
  return listOfColors[newId][s];
}

function ratingCalculator(ratings: Record<string, number>) {
  const total = Object.values(ratings).reduce((acc, value) => acc + value, 0);

  const avg = total / 11;

  const sum = Object.values(ratings).reduce((acc, value) => {
    const a = value > avg ? value - avg : 0;
    return acc + a;
  }, 0);

  return Math.floor(Math.round(total + sum) / 11);
}

function ratingGroup(ratings: Record<string, number>): Record<number, number> {
  const result: Record<string, number> = {};

  // data 객체의 값들을 반복하면서 중복 카운팅
  Object.values(ratings).forEach((value) => {
    if (result[value] === undefined) {
      result[value] = 1; // 값이 처음 나온 경우 초기화
    } else {
      result[value] += 1; // 값이 이미 나온 경우 카운트 증가
    }
  });

  return result;
}

export default function Body() {
  const [ratings, setRatings] = useState<Record<string, number>>(data);

  function updateRatings(id: string, value: number) {
    ratings[id] = ratings[id] + value;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: value,
    }));
  }

  const result = useMemo(() => ratingCalculator(ratings), [ratings]);

  const group = useMemo(() => ratingGroup(ratings), [ratings]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>{result}</Grid>
      <Grid xs={12}>
        <Stack direction='row' spacing={1}>
          {Object.entries(group).map(([value, count]) => (
            <Chip
              key={`chip_rating_${value}`}
              avatar={
                <Avatar
                  sx={{
                    backgroundColor: getColor(value, 200),
                  }}>
                  {value}
                </Avatar>
              }
              label={count}
              sx={{
                backgroundColor: getColor(value, 100),
              }}
            />
          ))}
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='1' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='2' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='3' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='4' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='5' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='6' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='7' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='8' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='9' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='10' />
      </Grid>
      <Grid xs={6}>
        <Rating onUpdate={updateRatings} id='11' />
      </Grid>
      <Grid xs={6}></Grid>
    </Grid>
  );
}
