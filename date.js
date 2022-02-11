
const today = new Date();

exports.getDate = () => {
  return today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
}

exports.getDay = () => {
  return today.toLocaleDateString('en-US', { weekday: 'long'});
}
