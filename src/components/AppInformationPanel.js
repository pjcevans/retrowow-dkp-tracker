import React from 'react';
import { Panel, OverlayTrigger, Button, Tooltip } from 'react-bootstrap';

const AppInformationPanel = (props) => {
  const title = (
    <h4>Help</h4>
  );
  const what = (
    <Tooltip id="what">
      This page shows the DKP record for several guilds on VG. The dataset is most
      accurate when dkp exports are uploaded after each raid. Disclaimer: where this
      is not the case there will be potentially unusual data.
    </Tooltip>
  );
  const how = (
    <Tooltip id="how">
      You can add players to two kinds of graph to compare their relative dkp
      values over time. This can be useful for:
      <ul>
        <li>Not having to keep a record of your own dkp</li>
        <li>Checking that you received all of the dkp that you should have after a raid</li>
        <li>Visualising attendance (since attendance equals dkp)</li>
        <li>Generally inspecting the dkp dataset & getting to the bottom of dkp confusion</li>
      </ul>
    </Tooltip>
  );
  const huh = (
    <Tooltip id="huh">
      It&#8217;s fine, just search for some of the Top 10 DKP holders & look at
      the pretty graphs XD
    </Tooltip>
  );
  const totals = (
    <Tooltip id="totals">
      The totals graph shows each selected player&#8217;s dkp at the time of each
      dkp export. It&#8217;s interesting rather than useful.
    </Tooltip>
  );
  const changes = (
    <Tooltip id="changes">
      The changes graph shows the change since the last export for each selected player.
      This is much more useful as it allows a direct comparison between how much
      DKP different players earned over time.
    </Tooltip>
  );
  const tips = (
    <Tooltip id="tips">
      <ul>
        <li>If you attended the full raid: Add other players who also attended
            the full raid & select the Changes graph. Other players who attended
            the full raid should have the same change value as you. Differences due to donation
            DKP should be obvious.</li>
        <li>Clicking the button for the currently selected graph changes the colour of the
            lines already plotted on the graph, whee!</li>
        <li>Add everyone you&#8217;re competing for loot with to the Totals graph and
            then weep or rejoice!</li>
      </ul>
    </Tooltip>
  );
  return(
    <div>
    <Panel header={title} bsStyle="warning">
      <OverlayTrigger placement="right" overlay={what}>
        <Button bsStyle="default">What is this page?</Button>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={how}>
        <Button bsStyle="default">What can I do?</Button>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={totals}>
        <Button bsStyle="default">The Totals graph</Button>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={changes}>
        <Button bsStyle="default">The Changes graph</Button>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={tips}>
        <Button bsStyle="default">Tips</Button>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={huh}>
        <Button bsStyle="default">What is a dkp? What is a VG?</Button>
      </OverlayTrigger>
    </Panel>
    </div>
  )

}
export default AppInformationPanel
