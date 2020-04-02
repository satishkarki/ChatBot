import "jest";
import * as React from "react";
import { expect as chaiExpect } from "chai";
import { configure, mount, shallow, ShallowWrapper, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import ChatPanel from "./ChatPanel";

// Suppress icon warnings. https://github.com/EduShareGeorgian/portalSPFx/issues/793#issuecomment-590915206
import { setIconOptions } from "office-ui-fabric-react/lib/Styling";
import { TeachingBubbleContent } from "office-ui-fabric-react/lib/TeachingBubble";
import { Coachmark } from "office-ui-fabric-react/lib/Coachmark";
import { Panel } from "office-ui-fabric-react/lib/Panel";
setIconOptions({
  disableWarnings: true,
});

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-expression */
/* tslint:disable:no-function-expression */
/* tslint:disable:no-empty */
/* tslint:disable:typedef */

describe("ChatPanel", function() {
  const defaultStrings: IMentalHealthAndWellnessBotWebPartStrings = {
    ChatPanelTitle: "Chat",
    ChatPanelCloseButtonAriaLabel: "Close",
  } as IMentalHealthAndWellnessBotWebPartStrings;

  describe("render", function() {
    it("should call onTeachingBubbleDismissed when teaching bubble is dismissed", function() {
      // Arrange
      const onTeachingBubbleDismissed = jest.fn();

      const wrapper: ReactWrapper = mount(
        <ChatPanel
          hasTeachingBubbleBeenSeen={false}
          isOpen={true}
          onDismissed={undefined}
          onTeachingBubbleDismissed={onTeachingBubbleDismissed}
          strings={defaultStrings}
          url={"bot URL"}
        />
      );

      wrapper.find(Panel).prop("onOpened")(); // Open the panel by calling the Panel `onOpened` method
      wrapper.update();

      const teachingBubbleDismissFunction = wrapper.find(TeachingBubbleContent).prop("onDismiss");

      // Act
      teachingBubbleDismissFunction();
      wrapper.update();

      // Assert
      expect(onTeachingBubbleDismissed).toHaveBeenCalled();
      expect(wrapper.find(Coachmark)).toHaveLength(0); // The coachmark should be hidden now too
    });

    it("should not show the coachmark when hasTeachingBubbleBeenSeen is true", function() {
      // Arrange
      const wrapper: ReactWrapper = mount(
        <ChatPanel
          hasTeachingBubbleBeenSeen={true}
          isOpen={true}
          onDismissed={undefined}
          onTeachingBubbleDismissed={undefined}
          strings={defaultStrings}
          url={"bot URL"}
        />
      );

      // Assert
      chaiExpect(wrapper.state("isCoachmarkVisible"), "isCoachmarkVisible should be false").to.be.false;

      chaiExpect(wrapper.find(Coachmark), "the Coachmark should not be visible").to.be.empty;

      // Act
      wrapper.find(Panel).prop("onOpened")(); // Call the Panel `onOpened` method

      // Assert
      chaiExpect(wrapper.state("isCoachmarkVisible"), "isCoachmarkVisible should still be false").to.be.false;

      chaiExpect(wrapper.find(Coachmark), "the Coachmark should still not be visible").to.be.empty;
    });
  });
});
