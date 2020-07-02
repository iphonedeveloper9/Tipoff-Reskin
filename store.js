/**
 * Store
 *
 * @format
 * @flow strict-local
 */

const data = {
  teams: {
    0: { name: 'Team 1' },
    1: { name: 'Team 2' },
  },

  // rounds: 1,
  rounds: 4,

  durationInSeconds: 60,

  maxTurns() {
    return Object.keys(this.teams).length * this.rounds - 1;
  }
};

exports.store = () => data;
