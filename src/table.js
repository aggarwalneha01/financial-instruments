import React from 'react';

 const Table =(props) =>  {

    const getKeys = (props) => {
      return Object.keys(props.data[0]);
    }
    
    const getHeader = (props) => {
      var keys = getKeys(props);
      return keys.map((key, index)=>{
        return <th key={index}>{key.toUpperCase()}</th>
      })
    }

    const sortByTicker = (a, b) => {
        if(a.ticker > b.ticker) {
            return 1;
        }
        if (a.ticker < b.ticker) {
            return -1;
        }
        return 0;
    }
    
    const sortByPrice = (a, b)=> {
        if(a.price < b.price) {
            return 1;
        }
        if (a.price > b.price) {
            return -1;
        }
        return sortByTicker(a, b);
    }

    const sortData = (a, b) => {
        if (a.assetClass > b.assetClass) {
            return -1;
        }
        if (a.assetClass < b.assetClass) {
            return 1;
        }
        return  sortByPrice(a, b);
    }

    const getRowsData = (props) => {
      var items = props.data;
      items.sort((a, b) => {
          return sortData(a, b);
      });
      var keys = getKeys(props);
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
    
        return (
          <div >
            <table>
            <thead>
              <tr>{getHeader(props)}</tr>
            </thead>
            <tbody>
              {getRowsData(props)}
            </tbody>
            </table>
          </div>
          
        );
    
}

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    let priceClass = '';
    if(key === 'price'){
        priceClass = (props.data[key] >= 0) ? 'bluepriceclass': 'redpriceclass';
    }
    return <td key={index} className={priceClass}>{props.data[key]}</td>
  })
}


export default Table;