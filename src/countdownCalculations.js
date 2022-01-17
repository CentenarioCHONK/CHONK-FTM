const countDownDate = new Date(Date.UTC(2022, 0, 17, 22, 0));
const countdownDateStageOne = new Date(Date.UTC(2022, 0, 17, 20, 0));
const countdownDateStageTwo = new Date(Date.UTC(2022, 0, 17, 20, 30));
const countdownDateStageThree = new Date(Date.UTC(2022, 0, 17, 21, 0));
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;

const whitelistSpots = {
  'stageOne': [
    '0x04e6a6a18b87263c1e51a497723888da7FBFfBc7',
    '0x79D47E71aa0C74CB6fF220329dfFc8d705BC1dc0',
  ],
  'stageTwo': [
    '0x6c93e995f9AaB014B908bb87BCd3268a135e53E0',
    '0xff909dde7fC5dDe0aE06E42ea1aFaeA8904DDC68',
    '0x0c30ccDAB056A4e743E1d2FAdef1398f1244B82a'
  ],
  'stageThree': [
    '0x1E1C34D385375A66162c792346D65eC0B5024a0a',
  ]
}

const getCountdownDate = address => {
  if (whitelistSpots.stageOne.includes(address))
    return countdownDateStageOne;
  if (whitelistSpots.stageTwo.includes(address))
    return countdownDateStageTwo;
  if (whitelistSpots.stageThree.includes(address))
    return countdownDateStageThree;
  return new Date();
}

export const isCountdownDone = address => {
  if (address) {
    return getCountdownDate(address) < new Date();
  }
  return countDownDate < new Date();
}

export const getTimeRemaining = () => {
  const milliseconds = countDownDate.getTime() - new Date().getTime();
  const seconds = Math.floor(milliseconds % minute / second);
  const minutes = Math.floor(milliseconds % hour / minute);
  const hours = Math.floor(milliseconds % day / hour);
  const days = Math.floor(milliseconds % week / day);
  const weeks = Math.floor(milliseconds / week);
  return `${weeks}w ${days}d ${hours}h ${minutes}m ${seconds}s`;
}