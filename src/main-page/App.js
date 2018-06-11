import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header'
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from '../search-results';
import HouseDetail from '../house/house';

class App extends Component {
  state = {}

  componentDidMount() {
    this.fetchHouses();
  }
  fetchHouses = () => {
    fetch('/houses.json')
      .then(rsp => rsp.json())
      .then(houses => {
        this.allHouses = houses;
        this.determineFeaturedHouse();
        this.chooseCountries();
      })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const index = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[index];
      this.setState({featuredHouse});
    }
  }

  chooseCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
    countries.unshift(null);
    this.setState({ countries });
  }
  
  filterHouses = (country) => {
    this.setState({ activeHouse: null })
    const filteredHouses = this.allHouses.filter( h => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }
  
  setActiveHouse = (house) => {
    this.setState({ activeHouse: house })
  }
  
  
  render() {
    let activeComponent = null;

    if (this.state.country)
      activeComponent = <SearchResults country={this.state.country}
        filteredHouses = {this.state.filteredHouses}
        setActiveHouse= {this.setActiveHouse} />;
    if (this.state.activeHouse)
      activeComponent = <HouseDetail house = {this.state.activeHouse} />;

    if(!activeComponent)
      activeComponent = <FeaturedHouse house={this.state.featuredHouse}/>;
    return (
      <div className="container">
        <Header subtitle = 'Providing world wild houses'/>
        <HouseFilter 
          countries = {this.state.countries}
          filterHouses = {this.filterHouses}
        />
        {activeComponent}
      </div>
    );
  }
}

export default App;
