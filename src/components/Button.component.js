import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const ButtonComponent = ({ colSize, label, onClick = e => null, btnClass = '' }) => {
  return (
    <Col xs={colSize}>
      <Button
        variant='secondary'
        size='lg'
        className={`btn ${btnClass}`}
        onClick={e => onClick(label)}>
        {label}
      </Button>
    </Col>
  );
};

export { ButtonComponent };
