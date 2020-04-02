import "jest";
import * as React from "react";
import { expect } from "chai";
import { configure, mount, shallow, ShallowWrapper, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import styles from "./MentalHealthAndWellnessBot.module.scss";
import MentalHealthAndWellnessBot from "./MentalHealthAndWellnessBot";

// Suppress icon warnings. https://github.com/EduShareGeorgian/portalSPFx/issues/793#issuecomment-590915206
import { setIconOptions } from "office-ui-fabric-react/lib/Styling";
import ChatPanel from "./ChatPanel";
import LocalStorageService from "../services/LocalStorageService";
setIconOptions({
  disableWarnings: true,
});

/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-expression */
/* tslint:disable:no-function-expression */
/* tslint:disable:no-empty */
/* tslint:disable:typedef */

describe("MentalHealthAndWellnessBot", function() {
  describe("render", function() {
    const defaultStrings: IMentalHealthAndWellnessBotWebPartStrings = {
      ChatPanelTitle: "Chat",
      ChatPanelCloseButtonAriaLabel: "Close",
    } as IMentalHealthAndWellnessBotWebPartStrings;

    /**
     * returns a `<MentalHealthAndWellnessBot />` component where the
     *   `Open Chat` button has been clicked
     */
    function getComponentWithOpenPanel(): ReactWrapper {
      const wrapper: ReactWrapper = mount(
        <MentalHealthAndWellnessBot openChatButtonLabel={"Open Chat"} strings={defaultStrings} />
      );

      const button: ReactWrapper = wrapper.find(`button.${styles.openChatButton}`);

      button.simulate("click");

      return wrapper;
    }

    it("should not show the panel by default", function() {
      // Arrange
      const wrapper: ReactWrapper = mount(
        <MentalHealthAndWellnessBot openChatButtonLabel={"Open Chat"} strings={defaultStrings} />
      );

      // Assert
      expect(wrapper.state("isChatPanelOpen"), "before clicking Open Chat button isChatPanelOpen state should be false")
        .to.be.false;

      expect(wrapper.find(`.ms-Panel.is-open`), "the panel should be closed").to.be.empty;
    });

    it("should show panel when `Open Chat` button is clicked", function() {
      // Arrange & Act
      const wrapper: ReactWrapper = getComponentWithOpenPanel();

      // Assert
      expect(wrapper.state("isChatPanelOpen"), "after clicking Open Chat button isChatPanelOpen state should be true")
        .to.be.true;

      expect(wrapper.find(`.ms-Panel.is-open`), "the panel should be open").to.have.lengthOf(1);
    });

    it("should set isChatPanelOpen state to false when panel onDismissed is called", function() {
      // Arrange
      const wrapper: ReactWrapper = getComponentWithOpenPanel();

      const panel: ReactWrapper = wrapper.find(`PanelBase[onDismissed]`);

      const onDismissedFunction: () => {} = panel.prop("onDismissed");

      // Act
      onDismissedFunction();

      wrapper.update();

      // Assert
      expect(
        wrapper.state("isChatPanelOpen"),
        "after clicking panel Close button isChatPanelOpen state should be false"
      ).to.be.false;

      expect(wrapper.find(`.ms-Panel.is-open`), "the panel should be closed").to.have.lengthOf(0);
    });

    it("should have a ChatPanel with hasTeachingBubbleBeenSeen of false when local storage is missing", function() {
      // Arrange
      const wrapper: ShallowWrapper = shallow(
        <MentalHealthAndWellnessBot openChatButtonLabel={"Open Chat"} strings={defaultStrings} />
      );

      // Assert
      expect(wrapper.find(ChatPanel).prop("hasTeachingBubbleBeenSeen")).to.be.false;
    });

    describe("local storage is false", function() {
      let originalLocalStorageFunction: () => boolean;

      beforeEach(function() {
        originalLocalStorageFunction = LocalStorageService.getHasTeachingBubbleBeenDismissed;
        LocalStorageService.getHasTeachingBubbleBeenDismissed = () => {
          return false;
        };
      });

      afterEach(function() {
        LocalStorageService.getHasTeachingBubbleBeenDismissed = originalLocalStorageFunction;
      });

      it("should have a ChatPanel with hasTeachingBubbleBeenSeen of false when local storage is false", function() {
        // Arrange
        const wrapper: ShallowWrapper = shallow(
          <MentalHealthAndWellnessBot openChatButtonLabel={"Open Chat"} strings={defaultStrings} />
        );

        // Assert
        expect(wrapper.find(ChatPanel).prop("hasTeachingBubbleBeenSeen")).to.be.false;
      });
    });

    describe("local storage is true", function() {
      let originalLocalStorageFunction: () => boolean;

      beforeEach(function() {
        originalLocalStorageFunction = LocalStorageService.getHasTeachingBubbleBeenDismissed;
        LocalStorageService.getHasTeachingBubbleBeenDismissed = () => {
          return true;
        };
      });

      afterEach(function() {
        LocalStorageService.getHasTeachingBubbleBeenDismissed = originalLocalStorageFunction;
      });

      it("should have a ChatPanel with hasTeachingBubbleBeenSeen of true when local storage is true", function() {
        // Arrange
        const wrapper: ShallowWrapper = shallow(
          <MentalHealthAndWellnessBot openChatButtonLabel={"Open Chat"} strings={defaultStrings} />
        );

        // Assert
        expect(wrapper.find(ChatPanel).prop("hasTeachingBubbleBeenSeen")).to.be.true;
      });

      it("should have a ChatPanel with onTeachingBubbleDismissed function that set's local storage hasTeachingBubbleBeenSeen to true when called", function() {
        // Arrange
        const wrapper: ShallowWrapper = shallow(
          <MentalHealthAndWellnessBot openChatButtonLabel={"Open Chat"} strings={defaultStrings} />
        );

        LocalStorageService.getHasTeachingBubbleBeenDismissed = () => {
          return true;
        };

        // Assert
        expect(wrapper.find(ChatPanel).prop("hasTeachingBubbleBeenSeen")).to.be.true;
      });
    });
  });
});
