'use strict';

const icon = require('./plugin-icon.png');
const slevaPoplatnika = -2070;

const calculateSuperHruba = (hruba) => {
  return hruba * 1.34;
};

const calculateZalohaDane = (superHruba) => {
  return superHruba * 0.15;
};

const calculateSocialni = (hruba) => {
  return hruba * 0.065;
};

const calculateZdravotni = (hruba) => {
  return hruba * 0.045;
};

const plugin = (scope) => {
  let match = scope.term.match(/^\d+$/);
  if (match) {
    const hruba = scope.term;
    if (hruba >= 11000) {
      const superHruba = calculateSuperHruba(hruba);
      const zaloha = calculateZalohaDane(superHruba);
      const socialni = calculateSocialni(hruba);
      const zdravotni = calculateZdravotni(hruba);
      const cista = Math.ceil(hruba - zaloha - slevaPoplatnika - socialni - zdravotni);
      scope.display({
        icon: icon,
        title: `Your take-home wage is ${cista}`,
        subtitle: `for entered gross wage ${scope.term}`
      });
    }
  }
};

module.exports = {
  fn: plugin
}