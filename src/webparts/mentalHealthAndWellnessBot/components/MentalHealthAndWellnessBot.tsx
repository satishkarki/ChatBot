import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

import styles from "./MentalHealthAndWellnessBot.module.scss";
import ChatPanel from "./ChatPanel";
import LocalStorageService from "../services/LocalStorageService";

export interface IMentalHealthAndWellnessBotProps {
  openChatButtonLabel: string;
  strings: IMentalHealthAndWellnessBotWebPartStrings;
}

export interface IMentalHealthAndWellnessBotState {
  hasTeachingBubbleBeenSeen: boolean;
  isChatPanelOpen: boolean;
}

export default class MentalHealthAndWellnessBot extends React.Component<
  IMentalHealthAndWellnessBotProps,
  IMentalHealthAndWellnessBotState
> {
  public constructor(props: IMentalHealthAndWellnessBotProps) {
    super(props);

    this.handleOpenChatButtonClick = this.handleOpenChatButtonClick.bind(this);
    this.handleChatPanelDismissed = this.handleChatPanelDismissed.bind(this);
    this.handleTeachingBubbleDismissed = this.handleTeachingBubbleDismissed.bind(this);

    this.state = {
      hasTeachingBubbleBeenSeen: LocalStorageService.getHasTeachingBubbleBeenDismissed(),
      isChatPanelOpen: false,
    };
  }

  public render(): React.ReactElement<IMentalHealthAndWellnessBotProps> {
    return (
      <div className={styles.mentalHealthAndWellnessBot}>
        <PrimaryButton
          className={styles.openChatButton}
          onClick={this.handleOpenChatButtonClick}
          text={this.props.openChatButtonLabel}
        />
        <ChatPanel
          hasTeachingBubbleBeenSeen={this.state.hasTeachingBubbleBeenSeen}
          isOpen={this.state.isChatPanelOpen}
          onDismissed={this.handleChatPanelDismissed}
          onTeachingBubbleDismissed={this.handleTeachingBubbleDismissed}
          strings={this.props.strings}
          url={
            "https://webchat.botframework.com/embed/healthbotgeorgian-bot?s=sH6PJHlS1c0.6Qpxm32vpfqU50hS17ZmTvCj1pF_9EptKDFcVp2ZpoY"
          }
        />
      </div>
    );
  }

  private handleOpenChatButtonClick(): void {
    this.setState((prevState, props) => {
      return {
        isChatPanelOpen: true,
      };
    });
  }

  private handleChatPanelDismissed(): void {
    this.setState((prevState, props) => {
      return {
        isChatPanelOpen: false,
      };
    });
  }

  private handleTeachingBubbleDismissed(): void {}
}
