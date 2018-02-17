// @flow
import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/fontawesome-free-solid";

import Actions from "./ActionsStyles";

export default () => (
  <Actions>
    <FontAwesomeIcon
      className="tooltipped"
      data-position="bottom"
      data-delay="25"
      data-tooltip="Edit"
      size="lg"
      icon={faEdit}
    />
    <FontAwesomeIcon
      className="tooltipped"
      data-position="bottom"
      data-delay="25"
      data-tooltip="Delete"
      size="lg"
      icon={faTrashAlt}
    />
  </Actions>
);
