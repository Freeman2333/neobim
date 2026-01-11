import { Canvas } from "@react-three/fiber";
import { ITrussSpecification } from "./ITrussSpecification";
import { Line, OrbitControls } from "@react-three/drei";

export function TrussPreview({
  trussSpecification,
}: {
  trussSpecification: ITrussSpecification;
}) {
  return (
    <Canvas style={{ height: 500 }}>
      <OrbitControls />
      <Line
        points={trussSpecification.bottomChord?.map((point) => [
          point.x,
          point.y,
          0,
        ])}
        color="yellow"
      />
      {trussSpecification.topChords?.map((points) => (
        <Line
          points={points.map((point) => [point.x, point.y, 0])}
          color="red"
        />
      ))}
      {trussSpecification.verticalMembers?.map((points) => (
        <Line
          points={points.map((point) => [point.x, point.y, 0])}
          color="green"
        />
      ))}
      {trussSpecification.diagonalMembers?.map((points) => (
        <Line
          points={points.map((point) => [point.x, point.y, 0])}
          color="blue"
        />
      ))}
    </Canvas>
  );
}
