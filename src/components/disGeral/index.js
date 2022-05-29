import { StyledDisGeral } from "./style";
import {dataDisjGeral} from "./../../database"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DisGeral = ({register}) => {
  return (
    <StyledDisGeral>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="grouped-select">Disj. Geral</InputLabel>
              <Select defaultValue="" id="grouped-select" label="disjuntor-geral" {...register("disjuntorGeral")}>
                <MenuItem value={0}>
                  <em>Não tem</em>
                </MenuItem>
                <ListSubheader>Tamanho 0,08</ListSubheader>
                {dataDisjGeral["0.08"].map((disjuntor, index) => (
                  <MenuItem key={index} value={disjuntor}>{disjuntor}</MenuItem>
                ))}
                <ListSubheader>Tamanho 0,15</ListSubheader>
                {dataDisjGeral["0.15"].map((disjuntor, index) => (
                  <MenuItem key={index} value={disjuntor}>{disjuntor}</MenuItem>
                ))}
                <ListSubheader>Tamanho 0,20</ListSubheader>
                {dataDisjGeral["0.20"].map((disjuntor, index) => (
                  <MenuItem key={index} value={disjuntor}>{disjuntor}</MenuItem>
                ))}

              </Select>
            </FormControl>
    </StyledDisGeral>
  )
}

export default DisGeral;