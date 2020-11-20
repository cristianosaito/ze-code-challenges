import React from 'react'
import { shallow } from 'enzyme'
import Products from '../pages/products'

describe('Testing Visual Component',()=> {
    it('renders without crashing', () => {
        const wrapper = shallow(
            <Products
              
              match={{params: {lat: 1, long:2}, isExact: true, path: "", url: ""}}
            />
          );
          expect(wrapper).toMatchSnapshot();
      });
});
