import { shallow , mount} from "enzyme";
import App from './App';

test('should render header', () => {
  const view = shallow(<App />);
  const header = view.find("header");
    expect(header).toHaveLength(1); 
});

test('should render a table', () => {
  const view = mount(<App />);
  const table = view.find("table");
  expect(table).toHaveLength(1); 
});
