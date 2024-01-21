import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';

type Props = {
  id: string;
  defaultValue: number;
  onUpdate: (id: string, value: number) => void;
  disabled?: boolean;
  max?: number;
  size: string;
};

export default function Rating(props: Props) {
  const {
    id,
    onUpdate,
    disabled,
    defaultValue = 80,
    max = 99,
    size = 'medium',
  } = props;

  const [point, setPoint] = useState(String(defaultValue));

  useEffect(() => {
    onUpdate(id, defaultValue);
  }, [id, defaultValue]);

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const intValue = parseInt(value) ?? 0;

    if (value === '') {
      setPoint(value);
    } else if (intValue > 0 && intValue <= max) {
      setPoint(value);
      onUpdate(id, intValue);
    }
  }

  function click(value: number) {
    const intPoint = (parseInt(point) ?? 0) + value;

    if (intPoint > 0 && intPoint <= max) {
      setPoint(String(intPoint));
      onUpdate(id, intPoint);
    }
  }

  return (
    <Paper elevation={0}>
      <ToggleButtonGroup size={size} exclusive disabled={disabled}>
        <ToggleButton
          value='left'
          aria-label='left aligned'
          onClick={() => click(-1)}>
          <RemoveIcon />
        </ToggleButton>
        <TextField
          id='outlined-basic'
          variant='outlined'
          onChange={change}
          value={point}
        />
        <ToggleButton
          value='right'
          aria-label='right aligned'
          onClick={() => click(1)}>
          <AddIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
}
