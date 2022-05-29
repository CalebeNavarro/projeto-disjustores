import { StyledForm } from "./sytle";

import { useState } from "react";

import { dataContador } from "../../database";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import TextField from '@mui/material/TextField';

import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import DisGeral from "../disGeral";
import { dataDisjGeral } from "../../database";

const schema = yup.object().shape({
  disjuntorGeral: yup.string().required().transform((value, originalValue) => !originalValue ? "none" : value),

  disjuntor1p: yup.number().required().transform((value, originalValue) => !originalValue ? 0 : value),
  disjuntor2p: yup.number().required().transform((value, originalValue) => !originalValue ? 0 : value),
  disjuntor3p: yup.number().required().transform((value, originalValue) => !originalValue ? 0 : value),

  dr2p: yup.number().required().transform((value, originalValue) => !originalValue ? 0 : value),
  dr4p: yup.number().required().transform((value, originalValue) => !originalValue ? 0 : value),

  contador: yup.number().transform((value, originalValue) => !originalValue ? 0 : value),
  contadorName: yup.string().transform((value, originalValue) => !originalValue ? 0 : value),
});



const Form = ({setData}) => {
  const [contador, setContador] = useState('');

  const handleChange = (event) => {
    setContador(event.target.value);
  };


  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });



  const onSubmit = (data) => {
    setData(data);
  }

  return (
    <StyledForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>Disjuntor Geral</p>
          <section>
           <DisGeral register={register}/>
          </section>
        </div>

        <div>
          <p>Quantidade dos disjuntores</p>
          <section>
            <TextField
              id="outlined-number"
              label="1p"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              {...register("disjuntor1p")}
            />
            <TextField
              id="outlined-number"
              label="2p"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              {...register("disjuntor2p")}
            />
            <TextField
              id="outlined-number"
              label="3p"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              {...register("disjuntor3p")}
            />
          </section>   
        </div>
        
        <div>
          <p>Quantidade de DRs</p>
          <section>
            <TextField
              id="outlined-number"
              label="2P"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              {...register("dr2p")}
            />

            <TextField
              id="outlined-number"
              label="4P"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              {...register("dr4p")}

            />
          </section>
        </div>

        <div>
          <p>Contator</p>
          <section>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Contador</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Contador"
                {...register("contadorName")}
                onChange={handleChange}
                defaultValue="Sem contador"
              >
                <MenuItem value="Sem contador">Sem contador</MenuItem>
                {dataContador.map((name, index) => (
                  <MenuItem key={index} value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
                id="outlined-number"
                label="Quantidade"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                disabled={!contador || contador==="Sem contador" ? true : false}
                {...register("contador")}
              />
          </section>
        </div>

        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Calcular
        </Button>
      </form>
    </StyledForm>
  )
}

export default Form;