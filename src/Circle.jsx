import PropTypes from 'prop-types';

const Circle = ({ xAxis, yAxis, backgroundColor }) => {
  return (
    <div
      style={{ left: `${xAxis}px`, top: `${yAxis}px`, backgroundColor }}
      className="circle"
    ></div>
  );
};

export default Circle;

Circle.propTypes = {
  xAxis: PropTypes.number.isRequired,
  yAxis: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
