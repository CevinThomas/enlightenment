import React from "react";
import {shallow} from "enzyme";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BottomBarLogo from "../../src/components/bottomBarLogo";
import QuestionView from "../../src/components/questionView";

Enzyme.configure( { adapter: new Adapter() } );

test( "Has BottomBarLogo", () => {
    const wrapper = shallow( <QuestionView/> );
    expect( wrapper.find( BottomBarLogo ) ).toHaveLength( 1 );
} );
