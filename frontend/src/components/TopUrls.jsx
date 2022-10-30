import { Container, Grid } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ShowInfo } from './ShowInfo';
import { ShowInfoTech } from './ShowInfoTech';

const TopUrls = ({ top, bandera }) => {

  const clothes = (!bandera)? top.filter(el => el.categoria === "Clothes").sort((a, b) => b.incidencia - a.incidencia).slice(0, 5):top.filter(el => el.categoria === "Clothes").sort((a, b) => b.incidencia - a.incidencia)
  const tech = (!bandera)? top.filter(el => el.categoria === "Tech").sort((a, b) => b.incidencia - a.incidencia).slice(0, 5) : top.filter(el => el.categoria === "Tech").sort((a, b) => b.incidencia - a.incidencia)
  return (
    <div style={{
      textAlign: "center",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "start",
      marginBottom: "100px"
    }}>
      <Container style={{ width: "40%", marginTop: "5%" }}>
        <h1>{!bandera?"Top 5 Páginas de vestimenta":"Páginas de vestimenta"}</h1>
        <Grid>
          {clothes.map((item, index) =>
            <Card key={index} style={{ marginTop: "5%", height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CardContent>
                <Typography sx={{ fontSize: 17 }} style={{ fontWeight: "bold" }} color="text.secondary" gutterBottom>
                  {index + 1}. {item.tituo}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item.url}
                </Typography>

                <Typography variant="body2">
                  Bayes Probabilidad: {item.probTotal}
                  <br />
                </Typography>

                <Typography variant="body2">
                  Incidencia: {item.incidencia}
                  <br />
                </Typography>
                <div style={{ marginTop: '15px' }}>
                  <ShowInfo item={item} />
                </div>
              </CardContent>

            </Card>

          )}
        </Grid>
      </Container>

      <Container style={{ width: "40%", marginTop: "5%" }}>
        <h1>{!bandera?"Top 5 Páginas de tecnología":"Páginas de tecnología"}</h1>
        <Grid>
          {tech.map((item, index) =>
            <Card key={index} style={{ marginTop: "5%", height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CardContent>
                <Typography sx={{ fontSize: 17 }} style={{ fontWeight: "bold" }} color="text.secondary" gutterBottom>
                  {index + 1}. {item.tituo}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item.url}
                </Typography>

                <Typography variant="body2">
                  Bayes Probabilidad: {item.probTotal}
                  <br />
                </Typography>

                <Typography variant="body2">
                  Incidencia: {item.incidencia}
                  <br />
                </Typography>
                <div style={{ marginTop: '15px' }}>
                  <ShowInfoTech item={item} />
                </div>

              </CardContent>

            </Card>
          )}
        </Grid>
      </Container>
    </div>
  )
}

export { TopUrls }