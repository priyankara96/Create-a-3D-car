import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Sphere({ color }) {
  const sphere = useRef();
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

  function getInitialPosition() {
    let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15); 
    if(v.x < 0) v.x -= 1.75;
    if(v.x > 0) v.x += 1.75;

    return v;
  }

  function resetPosition() {
    let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, Math.random() * 10 + 10); 
    if(v.x < 0) v.x -= 1.75;
    if(v.x > 0) v.x += 1.75;

    setPosition(v);
  }

  useFrame(
    (state, delta) => {
      time.current += delta * 5;
      let newZ = position.z - (time.current);

      if(newZ < -10) {
        resetPosition();
        time.current = 0;
      }

      sphere.current.position.set(
        position.x, 
        position.y, 
        newZ, 
      )
      sphere.current.rotation.x += delta * xRotSpeed;
      sphere.current.rotation.y += delta * yRotSpeed;
    },
    [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh
      ref={sphere}
      rotation-x={Math.PI * 0.9}
      scale={scale}
      castShadow
    >
      <sphereGeometry args={[1, 32, 16]} />
      <meshStandardMaterial color={color} envMapIntensity={1} />
    </mesh>
  );
}

export function Spheres() {
  const [arr] = useState(() => {
    let a = [];
    for(let i = 0; i < 50; i++) a.push(0);
    return a;
  });

  return <>
    {arr.map((e, i) => <Sphere key={i} color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4] }/>)}
  </>
}
