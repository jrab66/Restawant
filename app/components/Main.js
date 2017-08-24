import React, { Component } from "react";
import { Route, Link, Redirect, Switch } from "react-router-dom";

import RestaurantLogin from "./children/Restaurant/RestaurantLogin";
import RestaurantSignup from "./children/Restaurant/RestaurantSignup";
import RestaurantDashboard from "./children/Restaurant/RestaurantDashboard";
import InfluencerLogin from "./children/Influencer/InfluencerLogin";
import InfluencerSignup from "./children/Influencer/InfluencerSignup";
import InfluencerDashboard from "./children/Influencer/InfluencerDashboard";
import AdminLogin from "./children/Admin/AdminLogin";
import Home from "./children/Home";

import helpers from "./utils/helpers";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantAuth: null,
      influencerAuth: null,
      restaurantData: null,
      influencerData: null
    }
  }

  componentDidMount() {
    helpers.checkRestaurantAuth().then(response => {
      if (response.data.id !== undefined) {
        this.setState({ restaurantAuth: true });
        this.setState({ restaurantData: response.data });
      }
    });

    helpers.checkInfluencerAuth().then(response => {
      if (response.data.id !== undefined) {
        this.setState({ influencerAuth: true });
        this.setState({ influencerData: response.data });
      }
    });
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">Restawant</Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/restaurant/login"><i className="fa fa-cutlery" aria-hidden="true"></i> Restaurants</Link></li>
                <li><Link to="/influencer/login"><i className="fa fa-user" aria-hidden="true"></i> Influencers</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container main">
          <div className="row">
            <Switch>
              <Route exact path="/restaurant/login" render={(props) => (
                <RestaurantLogin {...props}
                />
              )} />
              <Route exact path="/restaurant/signup" render={(props) => (
                <RestaurantSignup {...props}
                />
              )} />
              { 
                this.state.restaurantAuth ? <Route path="/restaurant/dashboard" render={(props) => (
                <RestaurantDashboard {...props}
                  restaurantData={this.state.restaurantData} 
                /> )} /> : null
              }
              <Route exact path="/influencer/login" render={(props) => (
                <InfluencerLogin {...props}
                />
              )} />
              <Route exact path="/influencer/signup" render={(props) => (
                <InfluencerSignup {...props}
                />
              )} />
              { 
                this.state.influencerAuth ? <Route path="/influencer/dashboard" render={(props) => (
                <InfluencerDashboard {...props}
                  influencerData={this.state.influencerData}
                /> )} /> : null
              }
              <Route exact path="/admin" render={(props) => (
                <AdminLogin {...props}
                />
              )} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;