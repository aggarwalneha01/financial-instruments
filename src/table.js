import React from 'react';

export default class Table extends React.Component {
    
    constructor(props){
      super(props);
      this.getHeader = this.getHeader.bind(this);
      this.getRowsData = this.getRowsData.bind(this);
      this.getKeys = this.getKeys.bind(this);
    }

    getKeys = () => {
      return Object.keys(this.props.data[0]);
    }
    
    getHeader = () => {
      var keys = this.getKeys();
      return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
      })
    }

    sortByTicker = (a, b) => {
        if(a.ticker > b.ticker) {
            return 1;
        }
        if (a.ticker < b.ticker) {
            return -1;
        }
        return 0;
    }
    
    sortByPrice = (a, b)=> {
        if(a.price < b.price) {
            return 1;
        }
        if (a.price > b.price) {
            return -1;
        }
        return this.sortByTicker(a, b);
    }

    sortData = (a, b) => {
        if (a.assetClass > b.assetClass) {
            return -1;
        }
        if (a.assetClass < b.assetClass) {
            return 1;
        }
        return this.sortByPrice(a, b);
    }

    getRowsData = () => {
      var items = this.props.data;
      items.sort((a, b) => {
          return this.sortData(a, b);
      });
      var keys = this.getKeys();
      return items.map((row, index)=>{
          let tableclass;
          if(items[index].assetClass==='Macro'){
              tableclass = 'whiteclass';
          }
          if (items[index].assetClass==='Equities'){
            tableclass = 'blueclass';
          }
          if (items[index].assetClass==='Credit'){
            tableclass = 'greenclass';
          }
    
        return <tr className={tableclass} key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
      })
    }
    
    render() {
        return (
          <div >
            <table>
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>
              {this.getRowsData()}
            </tbody>
            </table>
          </div>
          
        );
    }
}

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    let priceClass = '';
    if(key === 'price'){
        priceClass = (props.data[key] >= 0) ? 'bluepriceclass': 'redpriceclass';
    }
    return <td key={props.data[key]} className={priceClass}>{props.data[key]}</td>
  })
}