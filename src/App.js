import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';

export default function App() {
  const [items, setItems] = useState();
  const [theme, setTheme] = useState();

  useEffect(() => {
    const queryString = require('query-string');
    const params = queryString.parse(window.location.search);

    fetch(`${params.api}/items`)
      .then((resp) => resp.json())
      .then((json) => setItems(json));

    fetch(`${params.api}/themes`)
      .then((resp) => resp.json())
      .then((json) => setTheme(createMuiTheme(json)));
  }, []);

  return (
    <>
      {items && theme ? (
        <ThemeProvider theme={theme}>
          <Carousel animation="slide" navButtonsAlwaysVisible={true}>
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </ThemeProvider>
      ) : (
        <p>loading</p>
      )}
    </>
  );
}

function Item(props) {
  return (
    <Card raised>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="300"
        width="800"
        image="https://picsum.photos/800/300"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.item.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
