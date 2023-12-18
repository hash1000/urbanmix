/* eslint-disable */
import './styles.css';
import * as THREE from 'three';
import { useContext, useLayoutEffect, useRef, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls } from '@react-three/drei';

import { meshMap } from '@/shared/data/firebase/fakeApartmentData';
import { AppContextProvider } from '@/shared/context/AppContextProvider';
import { CircularProgress } from '@mui/material';

const regular = new THREE.MeshStandardMaterial({ color: 'lightgray' });
const inspect = new THREE.MeshStandardMaterial({ color: '#B52B76' });
const construct = new THREE.MeshStandardMaterial({ color: '#B09838' });
const lease = new THREE.MeshStandardMaterial({ color: '#54A455' });
// const unhovered = new THREE.MeshStandardMaterial({ color: "orange" });

const Model = (props) => {
  const { apartmentData, setApartmentData } = useContext(AppContextProvider);
  const object = useLoader(GLTFLoader, './centered.glb');
  const modelRef = useRef();
  useLayoutEffect(() => {
    const stateMap = {};
    apartmentData.forEach((apt) => {
      stateMap[apt.name] = apt.state;
    });
    object.scene.traverse((o) => {
      if (meshMap[o.name] in stateMap) {
        o.material =
          { 1: inspect, 2: construct, 3: lease }[stateMap[meshMap[o.name]]] ||
          regular;
      } else {
        o.material = regular;
      }
    });
  }, [object.scene, apartmentData]);

  return (
    <primitive
      ref={modelRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (!meshMap[e.object.name]) return;
        setApartmentData((prev) =>
          prev.map((apt) => {
            if (apt.name === meshMap[e.object.name]) {
              return { ...apt, highlighted: true };
            }
            return apt;
          })
        );
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        if (!meshMap[e.object.name]) return;
        setApartmentData((prev) =>
          prev.map((apt) => {
            if (apt.name === meshMap[e.object.name]) {
              return { ...apt, highlighted: false };
            }
            return apt;
          })
        );
      }}
      onClick={(e) => {
        if (!meshMap[e.object.name]) return;
        e.stopPropagation();
      }}
      object={object.scene}
      {...props}
    />
  );
};

export default function BuildingModel() {
  const { apartmentData } = useContext(AppContextProvider);
  if (!apartmentData || apartmentData.length === 0) return <CircularProgress />;

  return (
    <div className="App" style={{ padding: '20px' }}>
      <Canvas>
        <color attach="background" args={['#15151a']} />
        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
