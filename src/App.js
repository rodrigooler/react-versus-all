import React, { Component } from "react";
import styled from "styled-components";
import {format} from 'date-fns';

const VUE =
  "https://api.github.com/repos/vuejs/vue";
const REACT = "https://api.github.com/repos/facebook/react";

const Button = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 8px;
  margin: 0;
  color: white;
  background-color: black;
  border: 0;
  border-radius: 4px;
  appearance: none;
  &:hover {
    background-color: black;
  }
`;

class App extends Component {
  state = {
    reactStargazersCount: 0,
    vueStargazersCount: 0,
    updatedDate: new Date()
  };

  componentDidMount() {
    this.getStars();

    setInterval(() => this.getStars(), 3000);
  }

  getStars = async () => {
    // Vue
    const responseVue = await fetch(VUE);
    const resultVue = await responseVue.json();

    // React
    const responseReact = await fetch(REACT);
    const resultReact = await responseReact.json();

    this.setState({
      reactStargazersCount: resultReact.stargazers_count,
      vueStargazersCount: resultVue.stargazers_count,
      updatedDate: new Date(),
    })
  } 

  render() {
    const {reactStargazersCount, vueStargazersCount, updatedDate} = this.state;

    return (
      <div>
        <p>REACT: {reactStargazersCount}</p>
        <p>VUE: {vueStargazersCount}</p>
        <p>{format(updatedDate, "YYYY-MM-DD hh:mm:ss"}</p>
      </div>
    );
  }
}

export default App;