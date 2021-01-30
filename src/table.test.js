import "./setupTests.js";
import { shallow, mount } from "enzyme";
import Table from './table';


const sampleData= [
  {
    "ticker": "ALPHA",
    "price": 3150.67,
    "assetClass": "Credit"
  },
  {
    "ticker": "GAMMA",
    "price": -1791.37,
    "assetClass": "Equities"
  },
  {
    "ticker": "GAMMA",
    "price": 2299.1,
    "assetClass": "Macro"
  },
  {
    "ticker": "BETA",
    "price": 3791.37,
    "assetClass": "Equities"
  }];

describe('table', ()=> {
  test('should render a table', () => {
    const view = shallow(<Table data={sampleData}/>);
    const table = view.find("table");
    expect(table).toHaveLength(1); 
  });

  test('should render three columns', () => {
    const view = shallow(<Table data={sampleData}/>);
    const tableHeader = view.find("th");
    expect(tableHeader).toHaveLength(3);
  });

  test('should render table headers', () => {
    const view = shallow(<Table data={sampleData}/>);
    const tableHeader = view.find("th");
    expect(tableHeader.at(0).text()).toBe("TICKER");
    expect(tableHeader.at(1).text()).toBe('PRICE');
    expect(tableHeader.at(2).text()).toBe("ASSETCLASS");
  });

  test('should have only one tbody tag', () => {
    const view = shallow(<Table data={sampleData}/>);
    const tbody = view.find('tbody');
    expect(tbody).toHaveLength(1);
  });

  test('should render correct background color for assetClass', () => {
    const view = mount(<Table data={sampleData}/>);
    const rows = view.find("RenderRow");
    expect(rows).toHaveLength(4);
 
    const macroClass = view.find(".whiteclass");
    const creditClass = view.find(".greenclass");
    const equitiesClass = view.find(".blueclass");

    expect(macroClass).toHaveLength(1);
    expect(creditClass).toHaveLength(1);
    expect(equitiesClass).toHaveLength(2);
    
    expect(macroClass.first().find('td')
    .map(column => column.text())).toContain("Macro");

    expect(creditClass.first().find('td')
    .map(column => column.text())).toContain("Credit");

    expect(equitiesClass.first().find('td')
    .map(column => column.text())).toContain("Equities");
  
  });

  test('should render correct color for price', () => {
    const view = mount(<Table data={sampleData}/>);

    const negativePriceClass = view.find(".redpriceclass");
    expect(negativePriceClass).toHaveLength(1);

    const positivePriceClass = view.find(".bluepriceclass");
    expect(positivePriceClass).toHaveLength(3);
    
  });

  test('should sort assetclass Macro first, then Equities and Credit last,', () => {
    const view = mount(<Table data={sampleData}/>);
    const row = view.find('RenderRow');

    expect(row.at(0).find('td')
    .map(column => column.text())[2]).toBe("Macro");

    expect(row.at(1).find('td')
    .map(column => column.text())[2]).toBe("Equities");
    
    expect(row.at(2).find('td')
    .map(column => column.text())[2]).toBe("Equities");

    expect(row.at(3).find('td')
    .map(column => column.text())[2]).toBe("Credit");

    expect(row.at(3).find('td')
    .map(column => column.text())[2]).not.toBe("Macro");
  });

  test('should sort Price in descending order,', () => {
    const view = mount(<Table data={sampleData}/>);
    const row = view.find('RenderRow');

    expect(row.at(1).find('td')
    .map(column => column.text())[1]).toBe("3791.37");
    
    expect(row.at(2).find('td')
    .map(column => column.text())[1]).toBe("-1791.37");

  });

  test('should sort Ticker in alphabetical order,', () => {
    const view = mount(<Table data={sampleData}/>);
    const row = view.find('RenderRow');

    expect(row.at(1).find('td')
    .map(column => column.text())[0]).toBe("BETA");

    expect(row.at(2).find('td')
    .map(column => column.text())[0]).toBe("GAMMA");
    
    

  });

})

