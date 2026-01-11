import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Point, TrussSpecification } from "./types";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface TrussPreviewProps {
  trussSpecification: TrussSpecification;
  memberSize: number;
  onMemberHover?: (member: { start: Point; end: Point } | null) => void;
}

function MemberBox({
  start,
  end,
  color,
  memberSize,
  onHover,
  highlight,
}: {
  start: Point;
  end: Point;
  color: string;
  memberSize: number;
  onHover?: (member: { start: Point; end: Point } | null) => void;
  highlight?: boolean;
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
  const { gl } = useThree();
  return (
    <mesh
      position={mid.toArray()}
      quaternion={orientation}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (gl && gl.domElement) gl.domElement.style.cursor = "pointer";
        onHover && onHover({ start, end });
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        if (gl && gl.domElement) gl.domElement.style.cursor = "";
        onHover && onHover(null);
      }}
    >
      <boxGeometry args={[length, size, size]} />
      <meshStandardMaterial color={highlight ? "orange" : color} />
    </mesh>
  );
}

function renderMembers(
  members: [Point, Point][],
  color: string,
  keyPrefix: string,
  memberSize: number,
  hovered: { start: Point; end: Point } | null,
  onHover?: (member: { start: Point; end: Point } | null) => void
) {
  return members?.map(([start, end], i) => (
    <MemberBox
      key={keyPrefix + i}
      start={start}
      end={end}
      color={color}
      memberSize={memberSize}
      onHover={onHover}
      highlight={!!(hovered && hovered.start === start && hovered.end === end)}
    />
  ));
}

export function TrussPreview({
  trussSpecification,
  memberSize,
  onMemberHover,
}: TrussPreviewProps) {
  const [hovered, setHovered] = useState<null | { start: Point; end: Point }>(
    null
  );

  useEffect(() => {
    if (onMemberHover) onMemberHover(hovered);
  }, [hovered, onMemberHover]);

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
          onHover={setHovered}
          highlight={
            !!(
              hovered &&
              hovered.start === trussSpecification.bottomChord[0] &&
              hovered.end === trussSpecification.bottomChord[1]
            )
          }
        />
      )}
      {renderMembers(
        trussSpecification.topChords,
        "red",
        "top",
        memberSize,
        hovered,
        setHovered
      )}
      {renderMembers(
        trussSpecification.verticalMembers,
        "green",
        "vert",
        memberSize,
        hovered,
        setHovered
      )}
      {renderMembers(
        trussSpecification.diagonalMembers,
        "blue",
        "diag",
        memberSize,
        hovered,
        setHovered
      )}
    </Canvas>
  );
}
