import { Canvas } from "@react-three/fiber";
import { ITrussSpecification, Point } from "./ITrussSpecification";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface TrussPreviewProps {
  trussSpecification: ITrussSpecification;
  memberSize: number;
}

function MemberBox({
  start,
  end,
  color,
  memberSize,
}: {
  start: Point;
  end: Point;
  color: string;
  memberSize: number;
}) {
  const size = memberSize / 1000;
  const startVec = new THREE.Vector3(start.x, start.y, 0);
  const endVec = new THREE.Vector3(end.x, end.y, 0);
  const delta = new THREE.Vector3().subVectors(endVec, startVec);
  const length = delta.length();

  const mid = new THREE.Vector3()
    .addVectors(startVec, endVec)
    .multiplyScalar(0.5);

  const orientation = new THREE.Quaternion();
  orientation.setFromUnitVectors(
    new THREE.Vector3(1, 0, 0),
    delta.clone().normalize()
  );
  return (
    <mesh position={mid.toArray()} quaternion={orientation}>
      <boxGeometry args={[length, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function renderMembers(
  members: [Point, Point][],
  color: string,
  keyPrefix: string,
  memberSize: number
) {
  return members?.map(([start, end], i) => (
    <MemberBox
      key={keyPrefix + i}
      start={start}
      end={end}
      color={color}
      memberSize={memberSize}
    />
  ));
}

export function TrussPreview({
  trussSpecification,
  memberSize,
}: TrussPreviewProps) {
  return (
    <Canvas style={{ height: 500 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 10, 10]} intensity={0.5} />
      <OrbitControls />
      {trussSpecification.bottomChord && (
        <MemberBox
          start={trussSpecification.bottomChord[0]}
          end={trussSpecification.bottomChord[1]}
          color="yellow"
          memberSize={memberSize}
        />
      )}
      {renderMembers(trussSpecification.topChords, "red", "top", memberSize)}
      {renderMembers(
        trussSpecification.verticalMembers,
        "green",
        "vert",
        memberSize
      )}
      {renderMembers(
        trussSpecification.diagonalMembers,
        "blue",
        "diag",
        memberSize
      )}
    </Canvas>
  );
}
