import React,{Component} from 'react';
import './products.css';
import Card from './../../components/card';
import axios from 'axios';
const url = 'https://api.code-challenge.ze.delivery/public/graphql';

class Products extends Component{

  constructor(props){
    super(props);
    this.state={
      categories:[],
      products:[],
      distributor:null,
      lat:null,
      lng:null
    }
  }

  getDistributor = (lat,long) =>{
    const now = new Date();
    const algorithm = "NEAREST"
    const headers = {
      'Content-Type': 'application/json'
    };
    const query = `query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
      pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
        __typename
        id
        status
        tradingName
        officialName
        deliveryTypes {
          __typename
          pocDeliveryTypeId
          deliveryTypeId
          price
          title
          subtitle
          active
        }
        paymentMethods {
          __typename
          pocPaymentMethodId
          paymentMethodId
          active
          title
          subtitle
        }
        pocWorkDay {
          __typename
          weekDay
          active
          workingInterval {
            __typename
            openingTime
            closingTime
          }
        }
        address {
          __typename
          address1
          address2
          number
          city
          province
          zip
          coordinates
        }
        phone {
          __typename
          phoneNumber
        }
      }
    }`
    
    axios({
      url: url,
      method: 'post',
      headers: headers,
      data: {
        query: query,
        variables:{
          algorithm: algorithm,
          lat: lat,
          long: long,
          now: now
        }
      },
    }).then((result) => {
      let dist = result.data.data.pocSearch[0];
      this.setState({distributor:dist});
    });
  }

  getProductCategory = (lat,long) => {
    const now = new Date();
    const algorithm = "NEAREST"
    const headers = {
      'Content-Type': 'application/json'
    };
    const query = `query allCategoriesSearch {
      allCategory{
        title
        id
      }
    }`
    
    axios({
      url: url,
      method: 'post',
      headers: headers,
      data: {
        query: query,
        variables:{
          algorithm: algorithm,
          lat: lat,
          long: long,
          now: now
        }
      },
    }).then((result) => {
      let cat = result.data.data.allCategory;
      this.setState({categories:cat});
      this.getProducts(null);
    });
  }



  getProducts = (catId) => {    
    const headers = {
      'Content-Type': 'application/json'
    };
    const query = `query poc($id: ID!, $categoryId: Int, $search: String){
      poc(id: $id) {
        id
        products(categoryId: $categoryId, search: $search) {
          id
          title
          rgb
          images {
            url
          }
          productVariants {
            availableDate
            productVariantId
            price
            inventoryItemId
            shortDescription
            title
            published
            volume
            volumeUnit
            description
            subtitle
            components {
              id
              productVariantId
              productVariant {
                id
                title
                description
                shortDescription
              }
            }
          }
        }
      }
    }`
    
    axios({
      url: url,
      method: 'post',
      headers: headers,
      data: {
        query: query,
        variables:{
          id: "532",
          search: "",
          categoryId: catId
        }
      },
    }).then((result) => {
      let prod = result.data.data.poc.products;
      this.setState({products:prod});
    });
  }

  componentDidMount(){
    const lat = this.props.match.params.lat;
    const long = this.props.match.params.lng;
    this.setState({lat:lat});
    this.setState({lng:long});
    //this.getDistributor(lat,long);
    this.getProductCategory(lat,long);
  }
   
    render(){
    return(
      <div className="products">
        <div className="row">
          <div className="full-column">
            <ul>
              <li><span onClick={()=>this.getProducts(null)}>Todas</span></li>
            {this.state.categories.map((category)=>(
                <li key={category.id} onClick={()=>this.getProducts(category.id)}><span>{category.title}</span></li>
            )              
            )}
            </ul>
          </div>
        </div>
        <div className="row">
          {this.state.products.map((product)=>(
            <div className="column" key={product.id}>
              <Card produto={product}></Card>
            </div>
          )
          )}          
        </div>         
      </div>
    );
  }
}

export default Products;