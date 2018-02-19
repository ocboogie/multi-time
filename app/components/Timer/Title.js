// @flow
import React from "react";
import geoPattern from "geopattern";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/fontawesome-free-solid";

import Title, { Fab } from "./TitleStyles";

export type Props = {
  title: string
};

export default (props: Props) => {
  const pattern = geoPattern.generate(props.title);

  return (
    <Title
      style={{
        backgroundImage: `url('data:image/svg+xml;utf8,${pattern.toSvg()}')`
        // backgroundImage: pattern.toDataUrl()
      }}
    >
      <span className="card-title">{props.title}</span>
      <a
        href="/"
        className="btn-floating halfway-fab waves-effect waves-light red"
      >
        <Fab>
          <FontAwesomeIcon size="lg" icon={faPlay} />
        </Fab>
      </a>
    </Title>
  );
};
