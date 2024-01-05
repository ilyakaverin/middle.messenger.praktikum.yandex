import { expect } from 'chai';
import { Block } from '../block';

interface ITestProps {
  [key: string]: unknown
}

describe('Block', () => {


  class TestBlock extends Block {
    constructor(props: ITestProps ) {
      super({ type: "div", ...props });
    }

    render() {
      return new DocumentFragment()
    }

  }

  const component = new TestBlock({type: 'div', text: 'haha'})



  it('creates', () => {
    console.log(new TestBlock({type: 'div', text: 'haha'}));
    expect(component).to.exist;
  });

  it('inherits block', () => {
    expect(component).is.instanceOf(Block)
  });

  it('getting props', () => {
    expect(component.props.text).to.eq('haha');
  });

  it('updating props', () => {
    component.setProps({text: 'amazing'})
    expect(component.props.text).to.eq('amazing');
  });



});