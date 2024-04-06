import styled from "styled-components";

const Toolbar_v3 = ({
  position,
  rotation,
  scale,
  handlePositionChange,
  handleScaleChange,
  handleRotationChange,
}: any) => {
  return (
    <>
      <Container>
        <label>
          X:
          <input
            type="number"
            name="x"
            value={position.x}
            onChange={handlePositionChange}
          />
        </label>
        <label>
          Y:
          <input
            type="number"
            name="y"
            value={position.y}
            onChange={handlePositionChange}
          />
        </label>
        <label>
          Z:
          <input
            type="number"
            name="z"
            value={position.z}
            onChange={handlePositionChange}
          />
        </label>
        <label>
          RX:
          <input
            type="number"
            name="x"
            value={rotation.x}
            onChange={handleRotationChange}
          />
        </label>
        <label>
          RY:
          <input
            type="number"
            name="y"
            value={rotation.y}
            onChange={handleRotationChange}
          />
        </label>
        <label>
          RZ:
          <input
            type="number"
            name="z"
            value={rotation.z}
            onChange={handleRotationChange}
          />
        </label>
        <label>
          SX:
          <input
            type="number"
            name="x"
            value={scale.x}
            onChange={handleScaleChange}
          />
        </label>
        <label>
          SY:
          <input
            type="number"
            name="y"
            value={scale.y}
            onChange={handleScaleChange}
          />
        </label>
        <label>
          SZ:
          <input
            type="number"
            name="z"
            value={scale.z}
            onChange={handleScaleChange}
          />
        </label>
      </Container>
    </>
  );
};

export default Toolbar_v3;

const Container = styled.div`
  background-color: #373c4b;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 20rem;
  label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #fff;
    input {
      color: #373c4b;
    }
  }
`;
