import React from "react";
import { Point } from "../types";
import "../App.css";

interface MemberTooltipProps {
  member: { start: Point; end: Point };
}

export const MemberTooltip: React.FC<MemberTooltipProps> = ({ member }) => (
  <div className="hovered-member-info">
    <div>
      <b>Member Coordinates</b>
    </div>
    <div>
      Start: ({member.start.x.toFixed(2)}, {member.start.y.toFixed(2)})
    </div>
    <div>
      End: ({member.end.x.toFixed(2)}, {member.end.y.toFixed(2)})
    </div>
  </div>
);
