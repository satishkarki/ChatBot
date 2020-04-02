import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "MentalHealthAndWellnessBotWebPartStrings";
import MentalHealthAndWellnessBot, { IMentalHealthAndWellnessBotProps } from "./components/MentalHealthAndWellnessBot";

export interface IMentalHealthAndWellnessBotWebPartProps {
  openChatButtonLabel: string;
}

export default class MentalHealthAndWellnessBotWebPart extends BaseClientSideWebPart<
  IMentalHealthAndWellnessBotWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IMentalHealthAndWellnessBotProps> = React.createElement(
      MentalHealthAndWellnessBot,
      {
        openChatButtonLabel: this.properties.openChatButtonLabel,
        strings: strings,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("openChatButtonLabel", {
                  label: strings.ConfigPaneOpenChatFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
