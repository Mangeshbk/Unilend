import React from 'react';
import Particles from 'react-particles';
import particlesConfig from './particleConfig';

function ParticlesBg() {
  return (
    <Particles style={{ zIndex: '-1' }} params={particlesConfig}></Particles>
  );
}

export default ParticlesBg;
