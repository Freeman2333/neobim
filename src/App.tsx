import React from "react";
import "./App.css";
import { TrussPreview } from "./Truss.Preview";
import { useTrussSpecification } from "./useTrussSpecification";
import { Point } from "./types";
import { NumericInput } from "./components/NumericInput";
import { MemberTooltip } from "./components/MemberTooltip";
import { useTrussValidation } from "./hooks/useTrussValidation";

function App() {
  const [trussWidth, setTrussWidth] = React.useState(20);
  const [pitch, setPitch] = React.useState(17);
  const [maxVerticalMemberSpacing, setMaxVerticalMemberSpacing] =
    React.useState(1.5);
  const [memberSize, setMemberSize] = React.useState(50);
  const [hoveredMember, setHoveredMember] = React.useState<null | {
    start: Point;
    end: Point;
  }>(null);

  const { errors, hasErrors } = useTrussValidation({
    trussWidth,
    pitch,
    maxVerticalMemberSpacing,
    memberSize,
  });

  const trussSpecification = useTrussSpecification(
    trussWidth,
    pitch,
    maxVerticalMemberSpacing
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className="truss-title">Truss Designer</div>
        <div className="truss-panel">
          <NumericInput
            id="truss-width"
            label="Truss Width (m):"
            value={trussWidth}
            onChange={setTrussWidth}
            error={errors.trussWidth}
            min={0.01}
          />
          <NumericInput
            id="pitch"
            label="Pitch (degrees):"
            value={pitch}
            onChange={setPitch}
            error={errors.pitch}
            min={1}
            max={89}
          />
          <NumericInput
            id="max-spacing"
            label="Max Vertical Member Spacing (m):"
            value={maxVerticalMemberSpacing}
            onChange={setMaxVerticalMemberSpacing}
            error={errors.maxVerticalMemberSpacing}
            min={0.01}
          />
          <NumericInput
            id="member-size"
            label="Member Size (mm):"
            value={memberSize}
            onChange={setMemberSize}
            error={errors.memberSize}
            min={1}
          />
        </div>
        {!hasErrors && (
          <TrussPreview
            trussSpecification={trussSpecification}
            memberSize={memberSize}
            onMemberHover={setHoveredMember}
          />
        )}
        {hasErrors && (
          <div className="truss-error">
            Please fix the errors above to see the truss preview.
          </div>
        )}
        {hoveredMember && <MemberTooltip member={hoveredMember} />}
      </header>
    </div>
  );
}

export default App;
