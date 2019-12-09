import React from 'react';
import { Page, Heading } from '../../components';

const Home = () => (
  <Page data-test="page" navHeader="Welcome to the Star Wars Fan Page">
    <Heading text="Click a link in the side bar to get started!" />
  </Page>
);
export default Home;
