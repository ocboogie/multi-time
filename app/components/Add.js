// @flow
import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";

import AddFab from "./AddStyles";

export type Props = {|
  click: () => void
|};

export default ({ click }: Props) => (
  <div className="fixed-action-btn">
    <div
      onClick={click}
      onKeyDown={click}
      role="button"
      tabIndex={0}
      className="btn-floating btn-large waves-effect waves-light red"
    >
      <AddFab>
        <FontAwesomeIcon size="lg" icon={faPlus} />
      </AddFab>
    </div>
  </div>
);
