import React, { useMemo } from "react";
import "./App.css";
import { TrussPreview } from "./Truss.Preview";
import { ITrussSpecification, Point } from "./ITrussSpecification";

function App() {
  const [trussWidth, setTrussWidth] = React.useState(20);
  const [pitch, setPitch] = React.useState(17);
  const [maxVerticalMemberSpacing, setMaxVerticalMemberSpacing] =
    React.useState(1.5);
  const [memberSize, setMemberSize] = React.useState(50);

  const trussSpecification: ITrussSpecification = useMemo(() => {
    // Clamp values to prevent division by zero or negative values
    const safeMaxVerticalMemberSpacing = Math.max(
      maxVerticalMemberSpacing,
      0.01
    );
    const safeTrussWidth = Math.max(trussWidth, 0.01);

    // 1. Calculate the number of panels (verticals)
    const numPanels = Math.ceil(safeTrussWidth / safeMaxVerticalMemberSpacing);
    const panelWidth = safeTrussWidth / numPanels;

    // 2. Calculate radians from pitch (degrees to radians)
    const radians = (pitch * Math.PI) / 180;

    // 3. Generate bottom chord nodes (evenly spaced along x-axis, y=0), centered at origin
    const centerX = safeTrussWidth / 2;
    const bottomNodes: Point[] = [];
    for (let i = 0; i <= numPanels; i++) {
      bottomNodes.push({ x: i * panelWidth - centerX, y: 0 });
    }

    // 4. Generate top chord nodes (apex at center, rest at panel points), centered at origin
    const topNodes: Point[] = [];
    for (let i = 0; i <= numPanels; i++) {
      let y;
      if (i <= numPanels / 2) {
        y = i * panelWidth * Math.tan(radians);
      } else {
        y = (safeTrussWidth - i * panelWidth) * Math.tan(radians);
      }
      topNodes.push({ x: i * panelWidth - centerX, y });
    }

    // 5. Define bottom chord as a single member (start to end)
    const bottomChord: [Point, Point] = [
      bottomNodes[0],
      bottomNodes[bottomNodes.length - 1],
    ];

    // 6. Define top chords as segments between top nodes
    const topChords: [Point, Point][] = [];
    for (let i = 0; i < topNodes.length - 1; i++) {
      topChords.push([topNodes[i], topNodes[i + 1]]);
    }

    // 7. Define vertical members (from each bottom node to top node)
    const verticalMembers: [Point, Point][] = [];
    for (let i = 0; i <= numPanels; i++) {
      verticalMembers.push([bottomNodes[i], topNodes[i]]);
    }

    // 8. Define diagonal members (Double-Howe pattern)
    const diagonalMembers: [Point, Point][] = [];
    // Diagonals from bottom to top, skipping the apex
    for (let i = 0; i < numPanels / 2; i++) {
      diagonalMembers.push([bottomNodes[i], topNodes[i + 1]]);
      diagonalMembers.push([
        bottomNodes[numPanels - i],
        topNodes[numPanels - i - 1],
      ]);
    }

    return {
      bottomChord,
      topChords,
      verticalMembers,
      diagonalMembers,
    };
  }, [trussWidth, pitch, maxVerticalMemberSpacing]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ margin: "10px" }}>
            <label>
              Truss Width (m):
              <input
                type="number"
                value={trussWidth}
                onChange={(e) => setTrussWidth(Number(e.target.value))}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
          <div style={{ margin: "10px" }}>
            <label>
              Pitch (degrees):
              <input
                type="number"
                value={pitch}
                onChange={(e) => setPitch(Number(e.target.value))}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
          <div style={{ margin: "10px" }}>
            <label>
              Max Vertical Member Spacing (m):
              <input
                type="number"
                value={maxVerticalMemberSpacing}
                onChange={(e) =>
                  setMaxVerticalMemberSpacing(Number(e.target.value))
                }
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
          <div style={{ margin: "10px" }}>
            <label>
              Member Size (mm):
              <input
                type="number"
                min={1}
                value={memberSize}
                onChange={(e) => setMemberSize(Number(e.target.value))}
                style={{ marginLeft: 8, width: 80 }}
              />
            </label>
          </div>
        </div>
        <TrussPreview
          trussSpecification={trussSpecification}
          memberSize={memberSize}
        />
      </header>
    </div>
  );
}

export default App;
