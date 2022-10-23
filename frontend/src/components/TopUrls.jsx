import { Container, Grid } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const TopUrls = ({ top }) => {
  const clothes = top.filter(el => el.categoria === "Clothes").sort((a, b) => b.incidencia - a.incidencia).slice(0, 5)
  const tech = top.filter(el => el.categoria === "Tech").sort((a, b) => b.incidencia - a.incidencia).slice(0, 5)
  return (
    <div style={{
      textAlign: "center",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginBottom: "100px"
  }}>
      <Container style={{ width: "40%", marginTop: "5%" }}>
        <h1>Top 5 Páginas de vestimenta</h1>
        <Grid>
          {clothes.map((item, index) =>
            <Card key={index} style={{ marginTop: "5%" }}>
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

              </CardContent>
              <CardActions>
                <Button href={item.url} size="small">Ir al sitio</Button>
              </CardActions>
            </Card>

          )}
        </Grid>
        </Container>

      <Container style={{ width: "40%", marginTop: "5%" }}>
        <h1>Top 5 Páginas de tecnología</h1>
        <Grid>
          {tech.map((item, index) =>
            <Card key={index} style={{ marginTop: "5%" }}>
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

              </CardContent>
              <CardActions>
                <Button href={item.url} size="small">Ir al sitio</Button>
              </CardActions>
            </Card>

          )}
        </Grid>
        </Container>
        </div>
        )
}

        export {TopUrls}