import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";

import styles from "./MentalHealthAndWellnessBot.module.scss";
import { Coachmark } from "office-ui-fabric-react/lib/Coachmark";
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { TeachingBubbleContent } from "office-ui-fabric-react/lib/TeachingBubble";

export interface IChatPanelProps {
  hasTeachingBubbleBeenSeen: boolean;
  isOpen: boolean;
  onDismissed: () => void;
  onTeachingBubbleDismissed: () => void;
  strings: IMentalHealthAndWellnessBotWebPartStrings;
  url: string;
}

export interface IChatPanelState {
  isCoachmarkVisible: boolean;
}

export default class ChatPanel extends React.Component<IChatPanelProps, IChatPanelState> {
  private chatIframeRef = React.createRef<HTMLIFrameElement | null>();

  public constructor(props: IChatPanelProps) {
    super(props);

    this.handlePanelOpened = this.handlePanelOpened.bind(this);
    this.handleTechingBubbleDismiss = this.handleTechingBubbleDismiss.bind(this);

    this.state = {
      isCoachmarkVisible: false,
    };
  }

  public render(): React.ReactElement<IChatPanelProps> {
    return (
      <Panel
        className={styles.panel}
        closeButtonAriaLabel={this.props.strings.ChatPanelCloseButtonAriaLabel}
        headerText={this.props.strings.ChatPanelTitle}
        isOpen={this.props.isOpen}
        onDismissed={this.props.onDismissed}
        onOpened={this.handlePanelOpened}
        type={PanelType.medium}
      >
        <iframe className={styles.chatPanel} src={this.props.url} ref={this.chatIframeRef}>
          {this.props.strings.UnableToLoadChatIframe}
        </iframe>
        {this.state.isCoachmarkVisible && (
          <Coachmark
            target={this.chatIframeRef.current}
            positioningContainerProps={{
              directionalHint: DirectionalHint.leftBottomEdge,
              doNotLayer: false,
            }}
            ariaAlertText="A Coachmark has appeared"
            ariaDescribedBy={"coachmark-desc1"}
            ariaLabelledBy={"coachmark-label1"}
            ariaDescribedByText={"Press enter or alt + C to open the Coachmark notification"}
            ariaLabelledByText={"Coachmark notification"}
            delayBeforeCoachmarkAnimation={2000}
          >
            <TeachingBubbleContent
              headline={this.props.strings.ChatTeachingBubbleHeadline}
              hasCloseIcon={true}
              closeButtonAriaLabel={this.props.strings.ChatTeachingBubbleCloseButtonAriaLabel}
              onDismiss={this.handleTechingBubbleDismiss}
              ariaDescribedBy={"example-description1"}
              ariaLabelledBy={"example-label1"}
            >
              {this.props.strings.ChatTeachingBubbleMessage}
            </TeachingBubbleContent>
          </Coachmark>
        )}
      </Panel>
    );
  }

  private handlePanelOpened(): void {
    if (!this.props.hasTeachingBubbleBeenSeen) {
      this.setState({
        isCoachmarkVisible: true,
      });
    }
  }

  private handleTechingBubbleDismiss(): void {
    this.setState({
      isCoachmarkVisible: false,
    });

    this.props.onTeachingBubbleDismissed();
  }
}
