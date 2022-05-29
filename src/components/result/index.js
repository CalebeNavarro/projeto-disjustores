import { StyleResult } from "./style";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {dataDisjGeral} from "./../../database"
import { useState } from "react";

function createData(name, socialName, type) {
  return {name, socialName, type};
}


const Result = ({data}) => {
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState("");

  const quadroObj = {
    "0.4": "400x400x200",
    "0.6": "600x600x200",
    "1.0": "1000x600x200",
    "1.2": "1200x600x200",
    "1.6": "1600x600x200",
    "1.8": "1800x800x600",
    "2": "2000x800x600"
  }

  const nylonObj = {
    "400x400x200": 0.4,
    "600x600x200": 0.6,
    "1000x600x200": 1.0,
    "1200x600x200": 1.2,
    "1600x600x200": 1.8,
    "1800x800x600": 2.2,
    "2000x800x600": 2.2
  }

  const fooTamanhoQuadro = (number) => {
    let atualQuadro = Math.ceil(number*10)/10;
    let find = false;
    while (find === false) {

      if (quadroObj[atualQuadro.toString()]) {
        return quadroObj[atualQuadro.toString()];
      }
      atualQuadro = Math.round((atualQuadro + 0.1) * 10) / 10;
      if (atualQuadro > 2) {
        if (!error) {
          setNameError(`Altura do quadro ${atualQuadro}m. Nossa maior quadro 2000x800x600`);
        }
        return undefined
      }
    }
    return quadroObj[atualQuadro.toString()];
  }

  const findWidthDisjuntorGeral = (name) => {
    if (name === "none") {

      return 0
    }
    for (let key in dataDisjGeral) {
      const isHave = dataDisjGeral[key].some(element => element === name)
      if (isHave) {
        return Number(key);
      }
    }
  }

  const make = ({contador, disjuntor1p, disjuntor2p, disjuntor3p, disjuntorGeral, dr2p, dr4p, contadorName}) => {
    const widthDisjuntorGeral = findWidthDisjuntorGeral(disjuntorGeral)
    
    const contadorM =  contador > 4 ? 0.25 : 0.1;
    const tamanhoQuadro = (((disjuntor1p*0.02) + (disjuntor2p*0.04) + (disjuntor3p*0.06) + (dr2p*0.04) + (dr4p*0.08)) / 2) + 0.3 + widthDisjuntorGeral + contadorM;
    const atualQuadro = fooTamanhoQuadro(tamanhoQuadro);

    if (atualQuadro === undefined) {
      if (!error) {
        setError(true);
      }
      return []
    } else {
      if (error) {
        setError(false)
      }
    }

    const barramentGeral = parseFloat(((((disjuntor1p*0.02) + (disjuntor2p*0.04) + (disjuntor3p*0.08) + (dr2p*0.04) + (dr4p*0.08)) / 2) + 0.15) * 3).toFixed(2);

    const baseQuadro = atualQuadro.split("x")[1]/1000;
    const alturaQuadro = parseFloat(atualQuadro.split("x")[0]/1000).toFixed(2);
    const barramentoAux = parseFloat(((disjuntor1p/2) + disjuntor2p + (disjuntor3p*1.5)) * 0.17).toFixed(2);


    const quantidadeCanaleta = parseFloat(baseQuadro + (2*alturaQuadro)).toFixed(2);
    const trilho = parseFloat((disjuntor1p*0.02) + (disjuntor2p*0.04) + (disjuntor3p*0.06) + (dr2p*0.04) + (dr4p*0.08)).toFixed(2);

    const bastaoNylon = nylonObj[atualQuadro];

    const policarbonato = parseFloat((baseQuadro - 0.05) * (alturaQuadro - 0.05)).toFixed(2);
    
    return   [
        createData('Tamanho do quadro', disjuntorGeral , atualQuadro+"MM"),
        createData('Espaço p/ contatores', contadorName, contadorM+"m"),
        createData('Quantidade de Barramento geral', "",barramentGeral+"m"),
        createData("Barramento Terra e Neutro", "3/4 x 1/8 146A",alturaQuadro+"m"), // 0,6m
        createData('Quantidade de barramento Aux', "",barramentoAux+"m"), // 0,765m
        createData('Quantidade da canaleta', "",quantidadeCanaleta+"m"),
        createData('Isoladores', "16X30X1/4",5+" unidades"),
        createData('DPS', "",4+" unidades"),
        createData('Trilho', "",trilho+"m"),
        createData('Bastão Nylon', "16 MM",bastaoNylon+"m"),
        createData('Policarbonato', "",policarbonato+"m"),
      ];
  }

  const rows = make(data);
  
  return (
    error ? (
      <div>
        <h3>Aconteceu algum erro de calculo, possível problema</h3>
        <p>{nameError}</p>
      </div>
    ) : (
      <StyleResult>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Tamanhos</TableCell>
              <TableCell align="right">Especificação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.socialName}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </StyleResult>
    )
    
  )
}

export default Result;
