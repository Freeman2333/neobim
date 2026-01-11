import React from "react";
import "./App.css";
import { TrussPreview } from "./Truss.Preview";
import { useTrussSpecification } from "./useTrussSpecification";
import { Point } from "./types";

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

  const [errors, setErrors] = React.useState({
    trussWidth: "",
    pitch: "",
    maxVerticalMemberSpacing: "",
    memberSize: "",
  });

  React.useEffect(() => {
    setErrors({
      trussWidth: trussWidth <= 0 ? "Width must be greater than 0." : "",
      pitch:
        pitch <= 0 || pitch >= 90
          ? "Pitch must be between 1 and 89 degrees."
          : "",
      maxVerticalMemberSpacing:
        maxVerticalMemberSpacing <= 0 ? "Spacing must be greater than 0." : "",
      memberSize: memberSize <= 0 ? "Member size must be greater than 0." : "",
    });
  }, [trussWidth, pitch, maxVerticalMemberSpacing, memberSize]);

  const hasErrors = Object.values(errors).some(Boolean);

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
          <div className="input-group">
            <label className="input-label" htmlFor="truss-width">
              Truss Width (m):
            </label>
            <input
              id="truss-width"
              className="styled-input"
              type="number"
              value={trussWidth}
              min={0.01}
              onChange={(e) => setTrussWidth(Number(e.target.value))}
            />
            {errors.trussWidth && (
              <div className="error-message">{errors.trussWidth}</div>
            )}
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="pitch">
              Pitch (degrees):
            </label>
            <input
              id="pitch"
              className="styled-input"
              type="number"
              value={pitch}
              min={1}
              max={89}
              onChange={(e) => setPitch(Number(e.target.value))}
            />
            {errors.pitch && (
              <div className="error-message">{errors.pitch}</div>
            )}
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="max-spacing">
              Max Vertical Member Spacing (m):
            </label>
            <input
              id="max-spacing"
              className="styled-input"
              type="number"
              value={maxVerticalMemberSpacing}
              min={0.01}
              onChange={(e) =>
                setMaxVerticalMemberSpacing(Number(e.target.value))
              }
            />
            {errors.maxVerticalMemberSpacing && (
              <div className="error-message">
                {errors.maxVerticalMemberSpacing}
              </div>
            )}
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="member-size">
              Member Size (mm):
            </label>
            <input
              id="member-size"
              className="styled-input"
              type="number"
              min={1}
              value={memberSize}
              onChange={(e) => setMemberSize(Number(e.target.value))}
            />
            {errors.memberSize && (
              <div className="error-message">{errors.memberSize}</div>
            )}
          </div>
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
        {hoveredMember && (
          <div className="hovered-member-info">
            <div>
              <b>Member Coordinates</b>
            </div>
            <div>
              Start: ({hoveredMember.start.x.toFixed(2)},{" "}
              {hoveredMember.start.y.toFixed(2)})
            </div>
            <div>
              End: ({hoveredMember.end.x.toFixed(2)},{" "}
              {hoveredMember.end.y.toFixed(2)})
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
