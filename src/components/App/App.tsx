import Building from "../Building/Building";

const App: React.FC = () => {
  return (
    <>
      <Building floorsNumber={9} elevatorsNumber={1} />
      <br />
      <Building floorsNumber={9} elevatorsNumber={2} />
      <br />
      <Building floorsNumber={12} elevatorsNumber={3} />
    </>
  );
}

export default App;
