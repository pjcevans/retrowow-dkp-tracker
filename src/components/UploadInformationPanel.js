import React from 'react';
import { Panel, OverlayTrigger, Button, Tooltip } from 'react-bootstrap';

const AppInformationPanel = (props) => {
  const title = (
    <h4>Help</h4>
  );

  const date = (
    <Tooltip id="date">
      The date format is "milis", which is the number of miliseconds since sometime
      in 1970... If you need to upload an export for a date other than the present
      just google for "milis converter" and get a number representing whatever date
      and time you would like to upload an export for.
    </Tooltip>
  );
  const addon = (
    <Tooltip id="addon">
      <ul>
        <li>Install the addon like any other</li>
        <li>To be safe, open the guild panel and select "Show Offline Players"</li>
        <li>Type /epgpexport</li>
        <li>Type /reloadui</li>
        <li>The export is complete</li>
      </ul>
    </Tooltip>
  );
  const where = (
    <Tooltip id="where">
      Within your WoW folder: WTF\Account \ACCOUNTNAME \SavedVariables \EPGPexport.lua
    </Tooltip>
  );
  const help = (
    <Tooltip id="help">
      Dont Panic. Its probably easy to fix, in the meantime just save the addon
      output in a file or in a forum post, make sure you have the date in milis saved also. Then -
      Find me on Discord: pjce#4547
    </Tooltip>
  );
  const anythingElse = (
    <Tooltip id="anythingElse">
      Please find me on Discord: pjce#4547
    </Tooltip>
  );
  return(
    <div>
    <Panel header={title} bsStyle="warning">
      <OverlayTrigger placement="bottom" overlay={addon}>
        <Button bsStyle="default">How do I use the WoW addon?</Button>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={where}>
        <Button bsStyle="default">Where do I find the export once I have exported it?</Button>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={help}>
        <Button bsStyle="default">Something has gone extremely wrong</Button>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={date}>
        <Button bsStyle="default">What is that date?</Button>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={anythingElse}>
        <Button bsStyle="default">Anything else</Button>
      </OverlayTrigger>
    </Panel>
    </div>
  )

}
export default AppInformationPanel
